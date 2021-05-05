<template>
  <div class="review-page">
    <Reviews />
  </div>
</template>
<script>
import Reviews from '@/components/Pages/Review/Reviews/Reviews'
export default {
  middleware: 'authenticated',
  components: {
    Reviews
  },
  head() {
    return {
      title: 'تجربه کاری'
    }
  }
}
</script>

<style lang="scss" scoped>
#dashboard-container {
  background: #fff;
}
</style>
