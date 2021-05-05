<template>
  <div>
    <Header />

    <div id="dashboard-container" class="rtl layout-h">
      <Sidebar />
      <!-- main-content -->
      <div class="main-content p-30">
        <nuxt />
      </div>
      <!-- /main-content -->
    </div>
  </div>
</template>

<script>
import Header from '@/components/Layout/Header/Header'
import Sidebar from '@/components/Layout/Sidebar/Sidebar'

export default {
  components: {
    Header,
    Sidebar
  }
}
</script>

<style lang="scss" scoped>
.main-content {
  width: calc(100% - 281px);
  padding-top: 112px;
  margin-right: 281px;
}
</style>
