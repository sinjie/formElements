<template lang="pug">
  .clearfix(style="text-align:center")
    span(v-if="isDetailsPage")
      svg-html-icon(:value="showValue" class="svgIcon" :style="{color: config.color, fontSize: config.fontSize}")
    el-upload(v-else :http-request="request" :on-change="importSvgIcon" action="" :on-remove='svgIconRemove' :auto-upload="false"  :show-file-list="false" style="display:inline-block;")
      //el-button(v-if="!value" icon="el-icon-plus" style="float:left")
      .picture-card(v-if="!value" :style="{height:  (config && this.config.fontSize || '75px'), width: (config && this.config.fontSize || '75px')}")
        i.el-icon-plus(style="text-align: center;")
      el-tooltip( v-else position="right" placement="right" effect="dark")
        template(slot="content")
          el-button(type="text" style="padding:0px;color:white" @click="$emit('input', '')") 删除
        svg-html-icon( :value="showValue" class="svgIcon" :style="{float:'left',cursor:'pointer',color: config.color, fontSize: config.fontSize}")
</template>

<script>
import axios from 'axios'
import SvgHtmlIcon from '../../../svgHtmlIcon/svgHtmlIcon'

function getFileURL(file) {
  let url = null
  if (window.createObjectURL !== undefined) { // basic
    url = window.createObjectURL(file)
  } else if (window.webkitURL !== undefined) { // webkit or chrome
    url = window.webkitURL.createObjectURL(file)
  } else if (window.URL !== undefined) { // mozilla(firefox)
    url = window.URL.createObjectURL(file)
  }
  return url
}

function parseDom(arg) {
  let objE = document.createElement('div')
  objE.innerHTML = arg
  return objE.childNodes
}

function parseStr(arg) {
  let objE = document.createElement('div')
  objE.appendChild(arg)
  return objE.innerHTML
}

export default {
  name: 'j-svg',
  components: { SvgHtmlIcon },
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
  },
  data() {
    return {
      svgFileName: undefined,
      showValue: this.value
    }
  },
  watch: {
    value: {
      handler(v) {
        this.showValue = v
        if (!v) {
          return
        }
        let dom = parseDom(this.showValue)[0]
        this.showValue = parseStr(dom)
      },
      immediate: true
    }
  },
  created() {

  },
  methods: {
    request(file) {
      var fileType = file.file.name.substr(file.file.name.lastIndexOf('.') + 1)
      if (fileType !== 'svg') {
        this.$message({
          type: 'warning',
          message: '请选择 .svg文件fcedsfs',
          duration: '1000'
        })
        return false
      }
    },
    svgIconRemove() {
      this.svgFileName = undefined
      this.$emit('input', undefined)
    },
    importSvgIcon(file, fileList) {
      let fileType = file.name.substr(file.name.lastIndexOf('.') + 1)
      const isSmall10Kb = file.size < 10 * 1024
      if (fileType !== 'svg') {
        this.$message({
          message: file.name + '文件不是 .svg 格式',
          type: 'warning'
        })
        return false
      } else if (!isSmall10Kb) {
        this.$message({
          message: file.name + '文件大小不能超过 10KB!',
          type: 'warning'
        })
        return isSmall10Kb
      } else {
        file.url = getFileURL(file.raw)
        axios.get(file.url).then(data => {
          let str = data.data
          str = str.match(/<svg[\S\s]*>[\S\s]*<\/svg>/m)[0]
          let dom = parseDom(str)[0]
          str = parseStr(dom)
          this.$emit('input', str)
          this.svgFileName = file.name
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .clear-float {

  }

  .clearfix:after {
    content: '';
    clear: both;
    display: block;
  }

  .picture-card {
    display: table-cell;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    cursor: pointer;
    vertical-align: middle;
  }
</style>
