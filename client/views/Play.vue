<template>
  <div class="flex flex-col h-screen">
    <Header />
    <div class="flex flex-grow flex-col items-center mt-16" v-if="ready">
      <div class="text-6xl font-black">
        {{ currentTurn + 1 }} / {{ wordSet.length }} 라운드
      </div>
      <div class="flex mt-8 border-2 border-black">
        <div
          class="border border-4 border-black w-32 h-32 flex font-bold items-center justify-center text-8xl"
          v-for="char in currentWord.word.split('')"
        >
          {{ isAnswerVisible ? char : getChosung(char) }}
        </div>
      </div>
      <div class="mt-8 text-4xl font-bold" v-if="showHint">
        {{ currentWord.hint }}
      </div>
      <div v-else @click="setShowHint" class="mt-8 text-3xl cursor-pointer">
        클릭해서 힌트 보기
      </div>
      <div
        v-if="matchedUser"
        class="fixed left-0 top-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50"
      >
        <div
          class="p-8 bg-white flex flex-col items-center"
          style="min-width: 500px"
        >
          <div class="text-4xl">{{ matchedUser.username }} 정답!</div>
          <div class="text-center text-6xl mt-8 font-bold">
            {{ currentWord.word }}
          </div>
          <div
            class="border-2 text-center p-4 text-2xl mt-8 w-full cursor-pointer"
            @click="nextWord"
          >
            {{ currentTurn + 1 === wordSet.length ? '결과 보기' : '다음' }}
          </div>
        </div>
      </div>
      <div class="flex-grow"></div>
      <div class="flex w-full justify-end p-4">
        <div
          v-if="!isAnswerVisible"
          @click="showAnswer"
          class="bg-red-500 text-white py-4 px-6 rounded-lg cursor-pointer hover:brightness-90 transition-all active:brightness-75"
        >
          정답 보기
        </div>
        <div
          v-else
          @click="nextWord"
          class="bg-green-500 text-white py-4 px-6 rounded-lg cursor-pointer hover:brightness-90 transition-all active:brightness-75"
        >
          {{ currentTurn + 1 === wordSet.length ? '결과 보기' : '다음' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { Word } from '../types'
import Header from '../components/Header.vue'
import { createToast } from 'mosha-vue-toastify'
import { ChatUserstate, Client } from 'tmi.js'
import Hangul from 'hangul-js'
import { History } from '../store'
import { event } from 'vue-gtag'

const correctSound = new Audio(
  // @ts-ignore
  new URL('../assets/sfx/correct.wav', import.meta.url).toString()
)

export default defineComponent({
  components: { Header },
  setup() {
    const store = useStore()

    store.state.history = []

    return {
      wordSet: computed<Word[]>(() => store.state.wordSet as Word[]),
      tmi: computed<Client>(() => store.state.tmi as Client),
      history: computed<History>(() => store.state.history),
    }
  },
  computed: {
    currentWord() {
      const vm = this as { wordSet: Word[]; currentTurn: number }

      return vm.wordSet[vm.currentTurn]
    },
  },
  data() {
    return {
      currentTurn: 0,
      ready: false,
      matchedUser: null as null | { username: string },
      showHint: false,
      isAnswerVisible: false,
    }
  },
  mounted() {
    if (!this.wordSet) {
      createToast('단어 데이터가 설정되지 않았습니다.', { type: 'danger' })
      this.$router.push('/')
      return
    }
    this.tmi.on('message', this.onChat)
    this.ready = true
    event('game_start', { channel: this.tmi.getChannels()[0] })
  },
  unmounted() {
    this.tmi.removeListener('message', this.onChat)
    event('game_end', { channel: this.tmi.getChannels()[0] })
  },
  methods: {
    onChat(channel: string, userState: ChatUserstate, message: string) {
      if (this.matchedUser) return
      const matched = this.currentWord.word === message
      if (matched) {
        const username = (userState['display-name'] ??
          userState.username) as string
        this.matchedUser = { username }
        correctSound.play()
        this.history.push({
          user: username,
          word: this.currentWord.word,
        })
      }
    },
    getChosung(char: string) {
      return Hangul.disassemble(char)[0]
    },
    nextWord() {
      if (this.wordSet.length - 1 === this.currentTurn) {
        this.$router.push('/result')
        return
      }
      this.matchedUser = null
      this.showHint = false
      this.isAnswerVisible = false
      this.currentTurn++
    },
    setShowHint() {
      this.showHint = true
    },
    showAnswer() {
      this.history.push({
        user: null,
        word: this.currentWord.word,
      })
      this.showHint = true
      this.isAnswerVisible = true
    },
  },
})
</script>

<style scoped></style>
