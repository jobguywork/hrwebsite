<template>
  <div class="dashboard">
    <Statics :data="data" />
    <el-row :gutter="30">
      <el-col :span="12">
        <Reviews :pagination="false" :per-page-default="4" />
      </el-col>
      <el-col :span="12">
        <Interviews :pagination="false" :per-page-default="4" />
      </el-col>
    </el-row>
  </div>
</template>
<script>
// import axios from 'axios'
import Statics from '@/components/Pages/Dashboard/Statics/Statics'
import Reviews from '@/components/Pages/Review/Reviews/Reviews'
import Interviews from '@/components/Pages/Interview/Interviews/Interviews'

export default {
  name: 'Dashboard',
  middleware: 'authenticated',
  components: {
    Statics,
    Reviews,
    Interviews
  },
  async asyncData(app) {
    const ID = app.store.state.auth.user.user.admin_of_company.id
    const { data } = await app.$axios.$get(`/company/${ID}/statics/`)
    return {
      data
    }
  },
  head() {
    return {
      title: 'داشبورد'
    }
  }
}
</script>

<style lang="scss" scoped>
#dashboard-container {
  background: #fff;
}
</style>
