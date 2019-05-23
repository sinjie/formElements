<template lang="pug">
  span(v-if="isDetailsPage") {{viewValue}}
  div(v-else)
    .form-element-label(v-if="config&&config.label" :class="{'form-element-label-required':config&&config.required}") {{config.label}}
    el-select(style="width:100%" clearable :multiple="config.multiple" :placeholder="config.remoteMethod?'请搜索后选择':''" :value="value" @input="$emit('input', $event)" :disabled="readonly || disabled" :size="size" :value-key="config.optionsValueKey" :remote-method="remoteMethod" :remote="!!config.remoteMethod" filterable  )
      template(v-for="(item,index) in options")
        el-option(v-if="!config.filterOptions || config.filterOptions(item, index)" :label="item[config.optionsLabelKey]" :key="item[config.optionsValueKey]" :value="config.returnObject? item:item[config.optionsValueKey]")

</template>

<script>
import _ from 'lodash'

export default {
  name: 'j-select',
  props: ['config', 'value', 'readonly', 'isDetailsPage', 'size', 'form'],
  data() {
    return {
      options: [],
      disabled: false,
      optionsReady: true
    }
  },

  computed: {
    viewValue() {
      if (this.config.returnObject) {
        if (this.config.multiple) {
          return this.value && this.value.map(one => one[this.config.optionsLabelKey]).join(',')
        } else {
          return this.value && this.value[this.config.optionsLabelKey]
        }
      }
      if (this.config.multiple) {
        return this.value && this.value.map(one => {
          let find = this.options.find(one_ => one_[this.config.optionsValueKey] === one)
          if (find) {
            return find[this.config.optionsLabelKey]
          }
        }).join(',')
      } else {
        let find = this.options.find(one => one[this.config.optionsValueKey] === this.value)
        if (find) {
          return find[this.config.optionsLabelKey]
        }
      }
      return undefined
    }
  },
  methods: {
    getSelectedOption() {
      if (this.config.returnObject) {
        return this.value
      }
      if (!this.value) {
        return
      }
      if (this.config.multiple) {
        return _.filter(this.options, one => this.value.indexOf(one[this.config.optionsValueKey]) > -1)
      } else {
        return _.find(this.options, one => this.value === one[this.config.optionsValueKey])
      }
    },
    getSelectedOptionP() {
      if (this.config.returnObject) {
        return Promise.resolve(this.value)
      }
      if (!this.value) {
        return Promise.resolve()
      }
      if (this.config.multiple) {
        if (this.getOptionsP) {
          return this.getOptionsP.then(() => {
            return _.filter(this.options, one => this.value.indexOf(one[this.config.optionsValueKey]) > -1)
          })
        }
        return _.filter(this.options, one => this.value.indexOf(one[this.config.optionsValueKey]) > -1)
      } else {
        if (this.getOptionsP) {
          return this.getOptionsP.then(() => {
            return _.find(this.options, one => this.value === one[this.config.optionsValueKey])
          })
        }
        return _.find(this.options, one => this.value === one[this.config.optionsValueKey])
      }
    },
    disable() {
      this.disabled = true
    },
    remoteMethod(query) {
      if (!query) {
        return
      }
      Promise.resolve(this.config.remoteMethod(query)).then(data => {
        this.options = data
      })
    },
    transOptions(options) {
      if (options && options.length && typeof options[0] === 'string') {
        return options.map(one => ({
          [this.config.optionsValueKey]: one,
          [this.config.optionsLabelKey]: one
        }))
      }
      return options
    }
  },
  created() {
    this.config.optionsValueKey || (this.config.optionsValueKey = 'value')
    this.config.optionsLabelKey || (this.config.optionsLabelKey = 'label')

    if (Array.isArray(this.config.options)) {
      this.options = this.transOptions(this.config.options)
    }
    if (_.isFunction(this.config.options)) {
      this.getOptionsP = Promise.resolve(this.config.options.call(this.form)).then((data) => {
        this.optionsReady = true
        this.options = this.transOptions(data)
      })
    }
    if (!this.value && this.config.multiple) {
      this.$emit('input', [])
    }
    if (this.config.remoteMethod) {
      if (this.config.returnObject) {
        if (this.config.multiple) {
          this.value && this.value.forEach(one => this.options.push(one))
        } else {
          this.value && this.options.push(this.value)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.form-element-label{
  font-size: 13px;
  color:#666;
  &:before{
    content: '*' !important;
    color: #EF0000;
    opacity: 0;
    margin-right: 0px !important;
    display: inline-block;
    width: 10px;
  }
}
.form-element-label-required{
  &:before{
    opacity: 1!important;
  }
}
</style>
