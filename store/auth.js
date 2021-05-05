export const state = () => {
  return {
    user: null
  }
}

export const mutations = {
  setAuth(state, payload) {
    state.user = payload
  }
}

export const actions = {
  setAuth({ commit }, payload) {
    commit('setAuth', payload)
  },
  logout({ commit }) {
    commit('setAuth', null)
    this.$cookies.remove('user')
  }
}
