export const state = () => {
  return {
    company: {
      name: null,
      logo: null
    }
  }
}

export const mutations = {
  SET_COMPANY(state, payload) {
    state.company = payload
  },
  RESET(state) {
    state.company = {
      name: null,
      logo: null
    }
  }
}

export const actions = {
  async getCompany({ commit, rootState }) {
    // eslint-disable-next-line no-console
    if (rootState.auth.user) {
      const slug = rootState.auth.user.user.admin_of_company.company_slug
      try {
        const { data } = await this.$axios.$get(`/public/company/${slug}/`)

        commit('SET_COMPANY', data)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('getCompany -> error', error)
      }
    }
  }
}
