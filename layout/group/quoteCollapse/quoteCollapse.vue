<template lang="pug">
  div(style="margin-bottom:15px;")
    j-quote(:color="color" :size="size" style="margin-bottom: 15px;")
      span(style="float:left") {{title}}
      span(:style="{float:'right',cursor:'pointer',fontSize: (size/5*4)+'px'}" @click="click") {{collapseWord}}
    div(v-show="!collapse" :style="{position:'relative', height: contentHeight?contentHeight+'px':'auto'}")
      slot
</template>

<script>
import JQuote from './quote'

export default {
  name: 'jQuoteCollapse',
  components: { JQuote },
  data() {
    return {
      collapse: false
    }
  },
  methods: {
    click() {
      this.collapse = !this.collapse
    }
  },
  computed: {
    collapseWord() {
      return this.collapse ? '展开' : '收起'
    }
  },
  props: ['title', 'color', 'size', 'contentHeight']
}
</script>

<style scoped lang="scss">
</style>
