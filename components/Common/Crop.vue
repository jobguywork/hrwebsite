<template>
  <div class="crop-wrap">
    <div class="layout-h layout-start layout-justified">
      <el-button size="mini" type="primary" @click="toggleShow">
        {{ btnName }}
      </el-button>
      <image-crop
        v-model="show"
        img-format="jpg"
        :height="height"
        :lang-type="'fa'"
        :url="baseUrl"
        :width="width"
        :with-credentials="withCredentials"
        field="uploadfile"
        :no-circle="noCircle"
        :no-square="noSquare"
        :params="headers"
        @crop-success="cropSuccess"
        @crop-upload-fail="cropUploadFail"
        @crop-upload-success="cropUploadSuccess"
      />
    </div>
  </div>
</template>

<script>
import getUuid from 'uuid-by-string'
import { UPLOAD_URL, MEDIA_URL } from '@/config/app'

export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    defaultImage: {
      type: String,
      default: ''
    },
    btnName: {
      type: String,
      default: 'انتخاب تصویر'
    },
    width: {
      type: Number,
      default: 48
    },
    height: {
      type: Number,
      default: 48
    },
    noCircle: {
      type: Boolean,
      default: false
    },
    noSquare: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      baseUrl: UPLOAD_URL,
      imgDataUrl: '',
      show: false,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        uid: null
      },
      withCredentials: false
    }
  },
  computed: {
    image() {
      return `${MEDIA_URL}${this.value}`
    }
  },
  methods: {
    toggleShow() {
      this.show = !this.show
    },
    cropSuccess(imgDataUrl) {
      let uuid = getUuid(this.$currentUser.email)
      uuid = uuid.replaceAll('-', '')
      this.headers.uid = uuid
      this.imgDataUrl = imgDataUrl
    },
    /**
     * upload success
     *
     * [param] response  server api return data, already json encode
     * [param] field
     */
    cropUploadSuccess(response) {
      this.$emit('input', response.path)
      // this.$msg
      //   .success()
      //   .setTitle('Upload')
      //   .setMessage('Upload success.')
    },
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    cropUploadFail() {
      this.show = false
    },
    removeImage() {
      this.$emit('input', '')
    }
  }
}
</script>

<style lang="scss">
.crop-wrap {
  .preview {
    margin-right: 10px;
    img {
      border-radius: 100px;
      width: 100px;
    }
    @media (max-width: 420px) {
      img {
        width: 80px;
      }
    }
  }
  .remove {
    margin-right: 10px;
  }
}
</style>
