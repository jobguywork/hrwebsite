<template>
  <div v-loading.fullscreen.lock="loading" class="page-gallery">
    <!-- form-upload -->
    <div class="form-upload mb-20 ltr">
      <client-only>
        <JgUpload @appendFile="appendFile" />
      </client-only>
    </div>
    <!-- /form-upload -->

    <div class="toolbar layout-h layout-justified mb-10">
      <span class="label my-10"> {{ form.gallery.length }} تصویر </span>
      <ElButton type="primary" size="mini" @click="onUpdate">
        ذخیره
      </ElButton>
    </div>

    <client-only>
      <div
        v-masonry
        origin-left="false"
        transition-duration="0.9s"
        item-selector=".item"
        percent-position
        column-width=".item"
        gutter="10"
      >
        <div
          v-for="(item, index) in form.gallery"
          :key="index"
          v-masonry-tile
          class="item"
        >
          <Item
            v-model="form.gallery[index]"
            :index="index"
            @remove="onRemove"
          />
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { find } from 'lodash'
import Item from './Item.vue'
import JgUpload from '@/components/Common/JgUpload'

export default {
  middleware: 'authenticated',
  components: {
    Item,
    JgUpload
  },
  data() {
    return {
      loading: false,
      form: {
        gallery: []
      }
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  },
  mounted() {
    this.getCompany()
  },
  methods: {
    async getCompany() {
      const slug = this.$currentUser.admin_of_company.company_slug
      const { data } = await this.$axios.$get(`/public/company/${slug}/`)
      this.form = data
    },
    appendFile(file) {
      this.form.gallery.push({
        path: file,
        description: 'توضیحات تصویر'
      })
    },
    async onUpdate() {
      const isNotValid = find(this.form.gallery, { description: '' })

      if (!isNotValid) {
        try {
          this.loading = true
          const ID = this.$currentUser.admin_of_company.id
          await this.$axios.$patch(`/company/${ID}/update/`, {
            gallery: this.form.gallery
          })

          this.$notify({
            message: 'گالری با موفقیت ذخیره شد.',
            type: 'success'
          })
        } catch (error) {
        } finally {
          this.loading = false
        }
      } else {
        this.$notify({
          message: 'لطفا توضیحات تصاویر را پر کنید.',
          type: 'error'
        })
      }
    },
    onRemove(index) {
      this.form.gallery.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.masonry-container {
  width: 55%;
  margin: 0 auto;
}
.item {
  width: 300px;
  img {
    border-radius: 4px;
    width: 100%;
    height: auto;
  }
}
.upload-images {
  width: 100%;
  ::v-deep {
    .el-upload,
    .el-upload-dragger {
      width: 100%;
    }
  }
}
::v-deep {
  .filepond--item {
    width: calc(20% - 0.5em);
  }
}
</style>
