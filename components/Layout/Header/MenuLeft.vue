<template>
  <div class="menu-left">
    <el-dropdown trigger="click" class="user-menu" @command="handleCommand">
      <span class="pl-15 pr-15 layout-h layout-center-center el-dropdown-link">
        <span class="compnay ml-10">
          {{ $company.name }}
        </span>
        <el-avatar :size="42" :src="$company.logo | mediaUrl" />
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="about">
          <div class="rtl">
            <i class="far fa-sticky-note" />
            <span class="text">
              درباره ما
            </span>
          </div>
        </el-dropdown-item>
        <el-dropdown-item command="gallery">
          <div class="rtl">
            <i class="fas fa-images" />
            <span class="text">
              گالری
            </span>
          </div>
        </el-dropdown-item>
        <el-dropdown-item command="logout" divided>
          <div class="rtl">
            <i class="fas fa-power-off" />
            <span class="text">
              خروج
            </span>
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  methods: {
    handleCommand(command) {
      switch (command) {
        case 'about':
          this.$router.push('/about')
          break
        case 'gallery':
          this.$router.push('/gallery')
          break
        case 'logout':
          this.$store.commit('company/RESET')
          this.$logout()
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.user-menu {
  height: 82px;
  border-right: 1px solid #e0e0e0;
  ::v-deep {
    .el-avatar {
      box-shadow: 0 0 3px rgba($color: #000000, $alpha: 0.2);
      position: relative;
    }
  }
}
</style>
