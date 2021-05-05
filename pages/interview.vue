<template>
  <div class="review-page">
    <Interviews />
  </div>
</template>
<script>
import Interviews from '@/components/Pages/Interview/Interviews/Interviews'

export default {
  middleware: 'authenticated',
  components: {
    Interviews
  },
  head() {
    return {
      title: 'تجربه مصاحبه'
    }
  }
}
</script>

<style lang="scss" scoped>
#dashboard-container {
  background: #fff;
}
</style>
