import { createStore } from 'vuex'
import axios from 'axios'
import { Client } from 'tmi.js'

export type User = {
  id: string
  channel: string
  avatar: string | null
  nick: string
}

export default createStore({
  state: {
    user: null as null | User,
    loading: true,
    tmi: null as Client | null,
  },
  getters: {
    user: (state) => state.user,
    loading: (state) => state.loading,
    tmi: (state) => state.tmi,
  },
  mutations: {
    user: (state, payload) => (state.user = payload),
    loading: (state, payload) => (state.loading = payload),
    tmi: (state, payload) => (state.tmi = payload),
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
    tmi: async ({ state, commit }, payload: string) => {
      if (state.tmi) {
        await state.tmi.disconnect()
      }
      const tmi = new Client({
        channels: [payload],
      })
      await tmi.connect()
      commit('tmi', tmi)
    },
  },
})
