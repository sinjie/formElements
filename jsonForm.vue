<template lang="pug">
  mixin formItem(dataString, columnsCount)
    table-column-layout(:data=dataString :min-columns-count=columnsCount)
      template(slot-scope="scope")
        template(v-if='!hideList || hideList.indexOf(scope.item.prop) === -1 && !scope.item.hide')
          template(v-if="exist(scope.item)")
            el-row.details-page-row(v-if="scope.item.isDetailsPage || isDetailsPage")
              div(:style="{float:'left',boxSizing:'border-box', width: formConfig.labelWidth, textAlign: 'right',paddingRight: '12px'}" ) {{scope.item.label && (scope.item.label + '：')}}
              div(:style="{float:'left', width: 'calc(100% - '+ scope.item.labelWidth +')'}" )
                component(:form="self" :ref="scope.item.prop" :is="components[scope.item.type] || scope.item.type" :size="scope.item.size || formConfig.size" :isDetailsPage="scope.item.isDetailsPage || isDetailsPage"  v-model="formData[scope.item.prop]" :config="scope.item.config" :readonly="(editFlag && editReadonlyList && editReadonlyList.indexOf(scope.item.prop) > -1)|| scope.item.readonly")
            el-form-item(v-else :showMessage="!isDetailsPage" :prop="scope.item.prop" :label="scope.item.label && (scope.item.label + '：')" :rules="scope.item.rules" :label-width="scope.item.labelWidth" :style="scope.item.style")
              component(:form="self" :ref="scope.item.prop" :is="components[scope.item.type] || scope.item.type" :size="scope.item.size || formConfig.size" :isDetailsPage="scope.item.isDetailsPage || isDetailsPage"  v-model="formData[scope.item.prop]" :config="scope.item.config" :readonly="(editFlag && editReadonlyList && editReadonlyList.indexOf(scope.item.prop) > -1)|| scope.item.readonly")
  el-form(:id="id" ref='form' :label-width="formConfig.labelWidth" :model="formData" :size="formConfig.size" :style="formConfig.style")
    template(v-if="formConfig.groups")
      groups-wrapper(:form-config="formConfig")
        div(slot-scope="scope" :style="formConfig.groupStyle")
          + formItem("scope.group.items", "scope.group.columnsCount")
    template(v-if="formConfig.items")
      + formItem("formConfig.items", "formConfig.columnsCount")
</template>

<script>
import components from './formElements'
  
import _ from 'lodash'
import JQuoteCollapse from './layout/group/quoteCollapse/quoteCollapse'
import TableColumnLayout from '../tableColumnLayout/tableColumnLayout'
import { addCSSWithId, removeElementBySelector } from '../../utils/domUtil'
import GroupsWrapper from './layout/group/groupsWrapper'
  
export default {
  name: 'jsonForm',
  components: { GroupsWrapper, TableColumnLayout, JQuoteCollapse },
  props: ['config', 'value', 'editReadonlyList', 'isDetailsPage', 'hideList', 'mounted', 'cloneValue'],
  data() {
    return {
      formData: undefined,
      formConfig: undefined,
      components,
      editFlag: false,
      customData: {},
      self: this,
      id: _.uniqueId('json-form')
    }
  },
  provide() {
    return {
      getFormData: () => {
        return this.formData
      }
    }
  },
  beforeDestroy() {
    removeElementBySelector(`#${this.id}`)
  },
  watch: {
    value() {
      if (this.cloneValue === false) {
        this.formData = this.value || {}
      } else {
        Object.assign(this.formData, _.cloneDeep(this.value) || {})
      }
    }
  },
  created() {
    let formConfig
    if (typeof this.config === 'function') {
      formConfig = this.config()
    } else {
      formConfig = _.cloneDeep(this.config)
    }
      
    if (!_.isEmpty(this.value)) {
      this.editFlag = true
    }
    if (Array.isArray(this.config)) {
      formConfig = {
        items: formConfig
      }
    }
      
    if (formConfig.gap) {
      addCSSWithId(
        `.el-form-item--mini.el-form-item {
              margin-bottom: ${formConfig.gap};
            }
            .details-page-row {
              margin-bottom: ${formConfig.gap};
            }
            `
        , this.id)
    }
      
    formConfig.labelWidth || (formConfig.labelWidth = '130px')
      
    let data = {}
    let initItems = (items) => {
      items.forEach(one => {
        // - if (typeof one.rules === 'function') {
        // -   this.$nextTick(() => {
        // -     one.rules = one.rules.call(this, this.formData)
        // -   })
        // - }
        data[one.prop] = one.defaultValue || undefined
        one.type || (one.type = 'input')
        one.style || (one.style = {})
        one.hide || (one.hide = false)
          
        if (one.style.width === undefined) {
          one.style.width = formConfig.itemWidth
        }
        if (one.required && typeof one.required !== 'function') {
          if (!one.rules) {
            one.rules = []
          }
          if (['input', 'textArea'].indexOf(one.type) > -1) {
            one.rules.push({ required: true, message: `请输入${one.label}`, trigger: 'blur' })
          } else {
            one.rules.push({ required: true, message: `请输入${one.label}` })
          }
        } else if (typeof one.required === 'function') {
          if (!one.rules) {
            one.rules = []
          }
          const setRequired = (value, oldValue) => {
            if (value !== oldValue) {
              if (value) {
                if (!_.some(one.rules, rule => rule.required)) {
                  if (['input', 'textArea'].indexOf(one.type) > -1) {
                    one.rules.push({ required: true, message: `请输入${one.label}`, trigger: 'blur' })
                  } else {
                    one.rules.push({ required: true, message: `请输入${one.label}` })
                  }
                }
              } else {
                // one.rules.splice(_.findIndex(one.rules, one => one.required), 1)
                one.rules = one.rules.filter(one => !one.required)
              }
            }
          }
          this.$watch(() => one.required(this.formData || {}), setRequired, {
            immediate: true
          })
        }
      })
    }
    // 列数
    formConfig.columnsCount || (formConfig.columnsCount = 1)
    formConfig.size || (formConfig.size = 'mini')
      
    // l
      
    // l顺序
    if (formConfig.items) {
      initItems(formConfig.items)
    } else if (formConfig.groups) {
      formConfig.groups.forEach(one => {
        one.columnsCount || (one.columnsCount = formConfig.columnsCount)
        initItems(one.items)
      })
    }
      
    this.formConfig = formConfig
    this.formData = data
    if (this.cloneValue === false) {
      this.formData = this.value || {}
    } else {
      Object.assign(this.formData, _.cloneDeep(this.value) || {})
    }
    // l
      
    let itemConfigs = {}
    let itemComponents = {}
    if (this.formConfig.items) {
      _.each(this.formConfig.items, item => {
        itemConfigs[item.prop] = item
      })
    }
    if (this.formConfig.groups) {
      _.each(this.formConfig.groups, group => {
        _.each(group.items, item => {
          itemConfigs[item.prop] = item
        })
      })
    }
      
    _.each(itemConfigs, one => {
      Object.defineProperty(itemComponents, one.prop, {
        get: () => {
          if (!this.$refs[one.prop]) {
            return
          }
          if (_.isArray(this.$refs[one.prop])) {
            return this.$refs[one.prop][0]
          }
          return this.$refs[one.prop]
        }
      })
    })
    this.itemConfigs = itemConfigs
    this.itemComponents = itemComponents
  },
  mounted() {
    // getItems
    if (this.mounted) {
      this.mounted(this.itemConfigs, this.itemComponents, this)
    }
  },
  methods: {
    exist(item) {
      return item.exist === undefined || item.exist.call(this, this.formData)
    },
    validate() {
      return this.$refs.form.validate().then(() => {
        return this.formData
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
