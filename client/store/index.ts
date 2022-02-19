import { createStore } from 'vuex'
import { Client } from 'tmi.js'
import { Category, Word } from '../types'

export type History = { user: string | null; word: string }[]

export default createStore({
  state: {
    channel: null as unknown as string,
    loading: true,
    tmi: null as Client | null,
    wordSet: null as Word[] | null,
    history: [] as History,
    showChat:
      localStorage.showChat === undefined
        ? true
        : localStorage.showChat === 'true',
    suggested: [] as Category[],
  },
  getters: {
    channel: (state) => state.channel,
    loading: (state) => state.loading,
    tmi: (state) => state.tmi,
    wordSet: (state) => state.wordSet,
    history: (state) => state.history,
    showChat: (state) => state.showChat,
    suggested: (state) => state.suggested,
  },
  mutations: {
    channel: (state, payload) => (state.channel = payload),
    loading: (state, payload) => (state.loading = payload),
    tmi: (state, payload) => (state.tmi = payload),
    wordSet: (state, payload) => (state.wordSet = payload),
    history: (state, payload) => (state.history = payload),
    showChat: (state, payload) => {
      state.showChat = payload
      localStorage.showChat = payload
    },
    suggested: (state, payload) => (state.suggested = payload),
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
