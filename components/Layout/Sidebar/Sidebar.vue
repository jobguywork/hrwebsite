<template>
  <div class="dashboard-sidebar">
    <div class="nice-scroll">
      <el-menu :default-active="currentMenu" @select="onSelect">
        <el-menu-item index="index">
          <i class="fas fa-home"></i>
          <span class="label mr-5">داشبورد</span>
        </el-menu-item>
        <el-menu-item index="review">
          <i class="fas fa-comments"></i>
          <span class="label mr-5">تجربه کاری</span>
        </el-menu-item>
        <el-menu-item index="interview">
          <i class="fas fa-mug-hot"></i>
          <span class="label mr-5">تجربه مصاحبه</span>
        </el-menu-item>
        <el-menu-item index="about">
          <i class="fas fa-address-card"></i>
          <span class="label mr-5">درباره ما</span>
        </el-menu-item>
        <el-menu-item index="gallery">
          <i class="fas fa-images"></i>
          <span class="label mr-5">گالری</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentMenu() {
      return this.$router.history.current.name
    }
  },
  methods: {
    onSelect(page) {
      this.$router.push({ name: page })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-sidebar {
  width: 281px;
  height: calc(100vh - 82px);
  margin-top: 82px;
  background: #fff;
  border-left: 1px solid #e0e0e0;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
  position: fixed;
  .nice-scroll {
    height: 100%;
    li {
      user-select: none;
    }
    ::v-deep {
      .el-menu {
        li {
          border-right: 3px solid transparent;
        }
        li:hover,
        li.is-active {
          color: $main-color;
          background: rgba($main-color, $alpha: 0.04);
          border-color: $main-color;
          i {
            color: $main-color;
          }
        }
      }
    }
  }
}
</style>
