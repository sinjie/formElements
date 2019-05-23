<template lang="pug">
  span(v-if="isDetailsPage")
    span(:style="'display:inline-block;margin-right:4px;width:14px;height:14px;background:'+value")
    | {{value}}
  el-color-picker(v-else :class="{'float-right':config&&config.position==='right'}" :value="value" @input="$emit('input',$event)" show-alpha :disabled="readonly")
</template>
<script>
export default {
  props: ['config', 'value', 'readonly', 'isDetailsPage', 'size']
}
</script>
