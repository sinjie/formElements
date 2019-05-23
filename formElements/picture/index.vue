<template lang="pug">
  div.picture
    img(v-if="isDetailsPage" alt=" " :src="getImgUrl(imgUrl)" class="picture-upload" :style="{height:  (config && this.config.height || 75) + 'px', width: (config && this.config.height || 75) + 'px'}")
    el-upload(v-else :style="{display:inline-block}" :show-file-list='false'  :disabled="readonly" :on-remove='handleRemove' :on-change="handleChange"  :action="getAction()" :before-upload="beforeUpload"  :on-success='handleSuccess' )
      .picture-card(v-if="!imgUrl" :style="{height:  (config && this.config.height || 75) + 'px', width: (config && this.config.height || 75) + 'px'}")
        i.el-icon-plus(style="text-align: center;")
      el-tooltip(v-else position="right" placement="right")
        template(slot="content")
          el-button(type="text" style="padding:0px;" @click="handleRemove") 删除
        img(alt=" " :src="getImgUrl(imgUrl)" class="picture-upload" :style="{height:  (config && this.config.height || 75) + 'px', width: (config && this.config.height || 75) + 'px'}")
</template>
<script>
import { getToken } from '../../../../utils/auth'

export default {
  name: 'j-picture',
  props: ['config', 'value', 'readonly', 'isDetailsPage', 'size'],
  data() {
    return {
      imgUrl: undefined
    }
  },
  created() {
    this.imgUrl = this.value
  },
  methods: {
    getImgUrl(url) {
      return `http://${location.host}/${process.env.VUE_APP_BPM_PREFIX + '/bpm-base' + url}&token=${encodeURIComponent(getToken())}&X-token=${encodeURIComponent(getToken())}`
    },
    beforeUpload(file) {
      const isLt30M = file.size / 1024 / 1024 < 30
      if (!isLt30M) {
        this.rootForm.$message.error('上传文件大小不能超过30MB!')
      }
      return isLt30M
    },
    handleSuccess(response, file, fileList) {
      file.url = `/file?file=${encodeURIComponent(response)}`
    },
    handleChange(file, fileList) {
      var lastFileName = file.name.split('.')[file.name.split('.').length - 1]
      var imgType = ['jpg', 'jpeg', 'png', 'gif']
      if (imgType.indexOf(lastFileName.toLowerCase()) < 0) {
        this.$message({
          message: '请选择图片上传',
          type: 'warning'
        })
        return false
      } else {
        this.imgUrl = file.url
        this.$emit('input', this.imgUrl)
      }
    },
    getAction() {
      return `http://${location.host}/${process.env.VUE_APP_BPM_PREFIX}/bpm-base/file?token=${encodeURIComponent(getToken())}&X-token=${encodeURIComponent(getToken())}`
    },
    handleRemove() {
      this.imgUrl = undefined
      this.$emit('input', '')
    }
  }
}
</script>
<style lang="scss" scoped>
  .picture {
    .picture-card {
      display: table-cell;
      border: 1px dashed #c0ccda;
      border-radius: 6px;
      cursor: pointer;
      vertical-align: middle;
    }
  }
</style>
