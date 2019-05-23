<template lang="pug">
  .j-groups-wrapper(style="height: 100%")
    el-tabs(v-model="activeName"   v-if="formConfig.groupTheme === 'tabs'" style="height:100%")
      el-tab-pane(v-for="group in formConfig.groups" :label="group.title" :name="group.title")
        slot(:group="group")
    el-collapse(v-else-if="formConfig.groupTheme === 'collapse'" v-model="extendArr")
      el-collapse-item(v-for="group in formConfig.groups", :name="group.title", :title="group.title")
        slot(:group="group")
    template(v-else)
      j-quote-collapse(v-for="group in formConfig.groups" :title="group.title" :color="formConfig.groupQuoteColor" :content-height="formConfig.groupContentHeight" :size="formConfig.groupQuoteSize")
        slot(:group="group")
</template>

<script>
import JQuoteCollapse from './quoteCollapse/quoteCollapse'

export default {
  name: 'groupWrapper',
  components: { JQuoteCollapse },
  props: ['formConfig'],
  data() {
    return {
      activeName: this.formConfig.groups[0].title,
      extendArr: this.formConfig.groups.map(one => one.title)
    }
  }
}
</script>

<style lang="scss">
  .j-groups-wrapper {
    .el-tabs__content {
      height: calc(100% - 50px);
      overflow: auto
    }
  }
</style>
