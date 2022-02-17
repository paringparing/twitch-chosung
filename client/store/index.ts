import { createStore } from 'vuex'
import { Client } from 'tmi.js'
import { Word } from '../types'

export type History = { user: string; word: string }[]

export default createStore({
  state: {
    channel: null as unknown as string,
    loading: true,
    tmi: null as Client | null,
    wordSet: null as Word[] | null,
    history: [] as History,
  },
  getters: {
    channel: (state) => state.channel,
    loading: (state) => state.loading,
    tmi: (state) => state.tmi,
    wordSet: (state) => state.wordSet,
    history: (state) => state.history,
  },
  mutations: {
    channel: (state, payload) => (state.channel = payload),
    loading: (state, payload) => (state.loading = payload),
    tmi: (state, payload) => (state.tmi = payload),
    wordSet: (state, payload) => (state.wordSet = payload),
    history: (state, payload) => (state.history = payload),
  },
  actions: {
    loadChannel: async ({ commit }) => {
      const data = localStorage.channel
      if (!data) {
        commit('channel', null)
      } else {
        commit('channel', data)
      }
      console.log('loaded channel')
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
