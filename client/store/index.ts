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
    showPercentageInChat:
      localStorage.showChat === undefined
        ? true
        : localStorage.showPercentageInChat === 'true',
    suggested: [] as Category[],
    popupConnected: false,
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
    showPercentageInChat: (state, payload) => {
      state.showPercentageInChat = payload
      localStorage.showPercentageInChat = payload
    },
    suggested: (state, payload) => (state.suggested = payload),
    popupConnected: (state, payload) => (state.popupConnected = payload),
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
