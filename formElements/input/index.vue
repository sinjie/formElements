<template lang="pug">
  span(v-if="isDetailsPage") {{value}}
  div(v-else)
    .form-element-label(v-if="config&&config.label" :class="{'form-element-label-required':config&&config.required}") {{config.label}}
    el-input( :value="value" @input="inputHandler" v-bind="config" :class="readonly?'readonly-input':''" :readonly="readonly" :size="size" :placeholder="config && config.placeholder")
</template>
<script>
export default {
  name: 'j-input',
  props: ['config', 'value', 'readonly', 'isDetailsPage', 'size'],
  data() {
    return {}
  },
  methods: {
    inputHandler(v) {
      if (this.config && this.config.type === 'number') {
        this.$emit('input', parseFloat(v))
      } else {
        this.$emit('input', v)
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
