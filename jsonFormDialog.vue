<template lang="pug">
  el-dialog(:title="title" :visible="visible" @update:visible="$emit('update:visible', $event)" :append-to-body="true")
    json-form( ref='jsonForm' :config="formConfig", :value="formData", v-if="visible && !formConfig.__file" :edit-readonly-list="editReadonlyList")
    component(ref='jsonForm' v-if="formConfig.__file" :is="formConfig" :value="formData" :config="formData")
    el-row.mt-3
      el-col(:span="12").text-right.pr-5
        el-button(@click="cancel") 取 消
      el-col(:span="12").text-left.pl-5
        el-button(type="primary" @click="confirm") 确 定
</template>

<script>
import JsonForm from './jsonForm'
import _ from 'lodash'

export default {
  name: 'json-form-dialog',
  props: ['visible', 'formConfig', 'formData', 'editReadonlyList', 'title'],
  data() {
    return {
      dialogVisible: false,
      customFormData: undefined
    }
  },
  components: { JsonForm },
  created() {
    // formConfig 是组件的时候克隆一下
    if (this.formData && this.formConfig.__file) {
      this.customFormData = _.cloneDeep(this.formData)
    }
  },
  methods: {
    confirm() {
      this.$refs.jsonForm.validate().then(formData => {
        this.$emit('confirm', formData)
        this.$emit('update:visible', false)
      }).catch(e => {
        this.$message({
          message: '输入有误',
          type: 'warning'
        })
      })
    },
    cancel() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
