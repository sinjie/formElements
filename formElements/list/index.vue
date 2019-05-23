<template lang="pug">
  div(v-if="!isDetailsPage")
    el-row
      el-button.float-right(@click="addItem" :disabled="readonly") 添加
    el-table(border :data="value")
      el-table-column(:label="one.label" v-for="one in config.columns")
        template(slot-scope="scope")
          component(:is="formElements[one.type] || one.type || formElements['input']" v-model="scope.row[one.prop]" :readonly="readonly" :config="scope.row.config" :isDetailsPage="isDetailsPage" :form="form")
      el-table-column(label="操作" width="130")
        template(slot-scope="scope")
          el-button.page-table-icon-btn(@click="value.splice(scope.$index,1)" size="mini" icon="el-icon-delete" title="删除" :disabled="readonly")
          el-button.page-table-icon-btn(@click="prev(scope.$index)" size="mini" icon="el-icon-upload2" :disabled="(scope.$index==0?true:false) || readonly" title="上移" )
          el-button.page-table-icon-btn(@click="next(scope.$index)" size="mini" icon="el-icon-download" :disabled="(scope.$index==value.length-1?true:false) || readonly" title="下移")
  div(v-else)
</template>
<script>
  import formElements from '../index'
  
  export default {
    props: ['config', 'value', 'readonly', 'isDetailsPage', 'size', 'form'],
    data() {
      return {
        formElements
      }
    },
    mounted() {
      if (!this.value) {
        this.$emit('input', [])
      }
    },
    methods: {
      addItem() {
        let item = {}
        this.config.columns.forEach(one => {
          if (typeof one.prop === 'string') {
            item[one.prop] = undefined
          }
        })
        this.value.push(item)
      },
      prev(index) {
        var item = this.value[index]
        this.value[index] = this.value[Number(index - 1)]
        this.value[Number(index - 1)] = item
        this.$emit('input', [...this.value])
      },
      next(index) {
        var item = this.value[index]
        this.value[index] = this.value[Number(index + 1)]
        this.value[Number(index + 1)] = item
        this.$emit('input', [...this.value])
      }
    }
  }
</script>
<style lang="scss" scoped>
  .page-table-icon-btn {
    padding: 6px !important;
    margin-left: 0 !important;
    margin-right: 10px !important;
  }
</style>
