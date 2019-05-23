<template lang="pug">
  span(v-if="isDetailsPage") {{value}}
  el-date-picker(v-else :type="config && config.type" :value="value" @input="$emit('input', $event);" :readonly="readonly" :size="size" :value-format="getValueFormat()")
</template>
<script>
export default {
  name: 'j-date',
  props: ['config', 'value', 'readonly', 'isDetailsPage', 'size'],
  methods: {
    getValueFormat() {
      if (this.config && ['date', 'daterange'].indexOf(this.config.type) > -1) {
        return 'yyyy-MM-dd'
      } else {
        return 'yyyy-MM-dd HH:mm:ss'
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
