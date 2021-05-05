<template>
  <PageGallery />
</template>

<script>
import PageGallery from '@/components/Pages/Gallery/PageGallery'

export default {
  middleware: 'authenticated',
  components: {
    PageGallery
  },
  head() {
    return {
      title: 'گالری'
    }
  }
}
</script>

<style lang="scss" scoped></style>
