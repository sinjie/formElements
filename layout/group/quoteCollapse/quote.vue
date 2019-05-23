<template lang="pug">
  div(:style="{borderWidth: outerBorderWidth, borderColor:color,paddingBottom:borderBottomGap, borderStyle: 'solid'}")
    .inner-wrapper(:style="{paddingLeft: paddingLeft,borderColor:color, borderStyle: 'solid', borderWidth:innerBorderWidth,fontSize:fontSize}")
      slot
</template>

<script>
export default {
  name: 'j-quote',
  data() {
    return {
      outerBorderWidth: `0 0 ${Math.round(this.size / 16)}px 0`,
      fontSize: this.size + 'px',
      borderBottomGap: Math.round(this.size / 4) + 'px',
      paddingLeft: Math.round(this.size / 4) + 'px',
      innerBorderWidth: `0 0 0 ${Math.round(this.size / 4)}px `
    }
  },
  props: {
    size: {
      default: 16,
      type: Number
    },
    color: {
      default: '#6a737d',
      type: String
    }
  },
  created() {

  }
}
</script>

<style scoped lang="scss">
  .inner-wrapper::after {
    content: '';
    display: table;
    clear: both;
  }
</style>
