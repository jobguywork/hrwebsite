<template>
  <!-- Header -->
  <header
    id="header-container"
    class="rtl full-width layout-h layout-justified"
  >
    <div class="right-side">
      <div class="logo layout-h layout-center-center">
        <nuxt-link to="/">
          <img src="/images/logo.png" />
        </nuxt-link>
      </div>
    </div>
    <div class="left-side layout-h layout-justified">
      <div class="main-right mr-20">
        <ElButton type="primary" @click="onPreview">
          <i class="far fa-eye"></i>
          <span class="label">
            دیدن شرکت
          </span>
        </ElButton>
      </div>
      <div class="menu-left">
        <MenuLeft v-if="$isLogin" />
      </div>
    </div>
  </header>
  <!-- /Header -->
</template>

<script>
import MenuLeft from './MenuLeft'
import { BASE_URL } from '@/config/app'

export default {
  components: {
    MenuLeft
  },
  methods: {
    handleCommand() {},
    onPreview() {
      const slug = this.$company.company_slug
      const link = `${BASE_URL}/company/${slug}`
      window.open(link, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
#header-container {
  position: fixed;
  top: 0;
  z-index: 1000;
  line-height: 82px;
  background: #fff;
  box-shadow: 0 0 18px 0 rgba(0, 0, 0, 0.12);
  .right-side {
    width: 281px;
    border-left: 1px solid #e0e0e0;
    .logo {
      height: 100%;
      padding: 5px;
      a {
        display: block;
        height: 45px;
      }
      img {
        width: auto;
        height: 45px;
      }
    }
  }
  .left-side {
    width: calc(100% - 281px);
  }
}
</style>
