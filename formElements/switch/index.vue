<template lang="pug">
  el-switch( :value="value" @input="$emit('input', $event)" :size="size" :disabled="isDetailsPage || readonly" )
</template>

<script>
export default {
  name: 'j-switch',
  props: ['config', 'value', 'readonly', 'isDetailsPage', 'size']
}
</script>

<style scoped lang="scss">

</style>
