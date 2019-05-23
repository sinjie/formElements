<template lang="pug">
  span(v-if="isDetailsPage") {{value}}
  el-radio-group(v-else :value="value" @input="$emit('input', $event)" :size="size" :disabled="readonly" )
    el-radio(v-for="item in config.options" :label="item.value") {{item.label}}
</template>
<script>
export default {
  name: 'j-radio',
  props: ['config', 'value', 'readonly', 'isDetailsPage', 'size']
}
</script>

<style scoped lang="scss">

</style>
