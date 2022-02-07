import { createStore } from 'vuex'
import axios from 'axios'

export type User = {
  id: string
  channel: string
}

export default createStore({
  state: {
    user: null,
    loading: true,
  },
  getters: {
    user: (state) => state.user,
    loading: (state) => state.loading,
  },
  mutations: {
    user: (state, payload) => (state.user = payload),
    loading: (state, payload) => (state.loading = payload),
  },
  actions: {
    fetchUser: async ({ commit }) => {
      const { data } = await axios
        .get('/api/user')
        .catch(() => ({ data: null }))
      if (!data) {
        window.location.pathname = '/auth/login'
        return
      } else {
        commit('user', data)
      }
      console.log('loaded user')
    },
  },
})
