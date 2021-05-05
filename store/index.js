export const actions = {
  async nuxtServerInit({ dispatch }, { req }) {
    await dispatch('auth/setAuth', this.$cookies.get('user'))
    await dispatch('company/getCompany')
  }
}
