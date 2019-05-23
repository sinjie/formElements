<template lang="pug">
  el-slider( :value="value" @input="$emit('input', $event)" :max="config.max" :min="config.min"  :disabled="isDetailsPage || readonly" )
</template>

<script>
export default {
  name: 'j-slider',
  props: {
    config: {
      default() {
        return {}
      }
    },
    value: {},
    readonly: {},
    isDetailsPage: {},
    size: {}
  }
}
</script>

<style scoped lang="scss">

</style>
