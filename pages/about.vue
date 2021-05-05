<template>
  <div class="page-about">
    <FormAbout />
  </div>
</template>

<script>
import FormAbout from '@/components/Pages/About/FormAbout'

export default {
  middleware: 'authenticated',
  components: {
    FormAbout
  },
  head() {
    return {
      title: 'درباره ما'
    }
  }
}
</script>

<style lang="scss" scoped></style>
