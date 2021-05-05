<template>
  <client-only>
    <file-pond
      ref="pond"
      name="uploadfile"
      label-idle="تصاویر خود را اینجا رها کنید..."
      :allow-multiple="true"
      accepted-file-types="image/jpeg, image/png"
      :server="server"
      :files="uploads"
    />
  </client-only>
</template>

<script>
import getUuid from 'uuid-by-string'
// Import Vue FilePond
import vueFilePond from 'vue-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'

// Import FilePond plugins
// Please note that you need to install these plugins separately

// Import image preview plugin styles
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'

// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import { UPLOAD_URL } from '@/config/app'

// Create component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
)

export default {
  components: {
    FilePond
  },
  data() {
    return {
      uploads: [],
      server: UPLOAD_URL
    }
  },
  mounted() {
    let uuid = getUuid(this.$currentUser.email)
    uuid = uuid.replaceAll('-', '')
    this.server = {
      url: `${this.server}?uid=${uuid}`,
      process: {
        onload: (res) => {
          // eslint-disable-next-line no-console
          const file = JSON.parse(res)
          if (file.success) {
            this.$emit('appendFile', file.path)
            // select the right value in the response here and return
            return res
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
.filepond--root {
  min-height: 180px;
  cursor: pointer;
  &:hover {
    .filepond--drip {
      border-color: #0f9d58;
    }
  }
}
.filepond--drip {
  background-color: #fff;
  opacity: 1;
  border: 1px dashed #d9d9d9;
  transition: 0.3s all ease-in-out;
}

.filepond--root .filepond--drop-label {
  display: block;
}

.filepond--drop-label.filepond--drop-label label {
  direction: rtl;
  font-family: 'Vazir', sans-serif;
  height: 180px;
  line-height: 180px;
  display: block;
  width: 100%;
  cursor: pointer;
}
</style>
