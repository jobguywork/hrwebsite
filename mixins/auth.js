export default {
  computed: {
    $currentUser() {
      if (this.$store.state.auth.user) {
        return this.$store.state.auth.user.user
      }
    },
    $company() {
      if (this.$store.state.company.company) {
        return this.$store.state.company.company
      }
    },
    $isLogin() {
      if (this.$store.state.auth.user) {
        return !!this.$store.state.auth.user.token
      } else {
        return false
      }
    },
    $token() {
      if (this.$store.state.auth.user) {
        return this.$store.state.auth.user.token
      }
    },
    $avatar() {
      if (this.$store.state.auth.user.avatar) {
        return this.$store.state.auth.user.user.avatar
      }
      return '/img/avatar/1.webp'
    }
  },
  methods: {
    $logout() {
      this.$store.dispatch('auth/logout')
      this.$router.push('/auth/login')
    }
  }
}
