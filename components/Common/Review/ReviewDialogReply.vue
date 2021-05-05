<template>
  <el-dialog
    class="reply"
    :title="title"
    :visible.sync="dialogVisible"
    :rules="rules"
    width="70%"
    center
  >
    <ElForm ref="form" v-loading="loading" :model="form">
      <el-form-item prop="reply">
        <Editor v-model="form.reply" />
      </el-form-item>
      <ElButton type="primary" size="mini" @click="onSave">
        <i class="fas fa-save"></i>
        <span class="mr-5">ذخیره</span>
      </ElButton>
    </ElForm>
  </el-dialog>
</template>

<script>
import Editor from '@/components/Common/Editor/Editor'

export default {
  components: {
    Editor
  },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    review: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      form: {
        reply: ''
      },
      rules: {
        reply: [
          {
            required: true,
            message: 'فیلد پاسخ الزامی است.',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    title() {
      return `ارسال پاسخ به تجربه کاری: ${this.review.title}`
    },
    dialogVisible: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  mounted() {
    this.getReview()
  },
  methods: {
    async onSave() {
      try {
        const valid = await this.$refs.form.validate()
        // eslint-disable-next-line no-console
        console.log('onSave -> valid', valid)
        if (valid) {
          this.loading = true
          const id = this.review.id
          await this.$axios.put(`/company_review/${id}/reply/`, this.form)
          this.loading = false
          this.$notify({
            message: 'پاسخ با موفقیت ذخیره شد.',
            type: 'success'
          })
        }
      } catch (error) {
        this.loading = false
        // eslint-disable-next-line no-console
        console.log('onSave -> error', error)
      }
    },
    async getReview() {
      try {
        this.loading = true
        const { id } = this.review
        const { data } = await this.$axios.get(`/public/company_review/${id}/`)
        this.loading = false
        this.form.reply = data.data.reply ? data.data.reply : ''
        // eslint-disable-next-line no-console
      } catch (error) {
        this.loading = false
        // eslint-disable-next-line no-console
        console.log('getReview -> error', error)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
