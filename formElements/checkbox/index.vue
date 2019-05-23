<template lang="pug">
  span(v-if="isDetailsPage") {{value}}
  div(v-else)
    .form-element-label(v-if="config&&config.label" :class="{'form-element-label-required':config&&config.required}") {{config.label}}
    el-checkbox(v-if="!config || !config.options" :class="{'float-right':config&&config.position==='right'}" :value="value" @input="$emit('input', $event)" :disabled="readonly")
    el-checkbox-group(v-else-if="config&&config.options" :disabled="readonly" :size="size" :value="value" @input="$emit('input', $event)" )
      el-checkbox(v-for="item in config.options" :label="item[config.optionsValueKey]") {{item[config.optionsLabelKey]}}
</template>
<script>
export default {
  props: ['config', 'value', 'readonly', 'isDetailsPage', 'size'],
  data() {
    return {}
  }
}
</script>
<style scoped lang="scss">
.form-element-label{
  font-size: 13px;
  color:#666;
  display: inline-block;
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
