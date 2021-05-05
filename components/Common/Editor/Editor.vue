<template>
  <client-only placeholder="در حال بارگزاری...">
    <ckeditor v-model="body" :editor="editor" :config="editorConfig" />
  </client-only>
</template>

<script>
let ClassicEditor = null

if (process.client) {
  require('@ckeditor/ckeditor5-build-classic/build/translations/fa')
  ClassicEditor = require('@ckeditor/ckeditor5-build-classic')
}
export default {
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: {
      required: true
    }
  },
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
        language: 'fa'
      }
    }
  },
  computed: {
    body: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
