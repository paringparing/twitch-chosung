import { createStore } from 'vuex'
import axios from 'axios'
import { Client } from 'tmi.js'
import { Word } from '../types'

export type User = {
  id: string
  channel: string
  avatar: string | null
  nick: string
}

export type History = { user: string; word: string }[]

export default createStore({
  state: {
    user: null as null | User,
    loading: true,
    tmi: null as Client | null,
    wordSet: null as Word[] | null,
    history: [
      {
        user: '파링___',
        word: '샌즈',
      },
      {
        user: '파링___',
        word: '테스트',
      },
      {
        user: '키뮤',
        word: '테스트2',
      },
    ] as History,
  },
  getters: {
    user: (state) => state.user,
    loading: (state) => state.loading,
    tmi: (state) => state.tmi,
    wordSet: (state) => state.wordSet,
    history: (state) => state.history,
  },
  mutations: {
    user: (state, payload) => (state.user = payload),
    loading: (state, payload) => (state.loading = payload),
    tmi: (state, payload) => (state.tmi = payload),
    wordSet: (state, payload) => (state.wordSet = payload),
    history: (state, payload) => (state.history = payload),
  },
  actions: {
    fetchUser: async ({ commit }) => {
      const { data } = await axios
        .get('/api/user')
        .catch(() => ({ data: null }))
      if (!data) {
        commit('user', null)
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
