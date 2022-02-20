<template>
  <div class="flex flex-col h-screen">
    <Header />
    <div
      class="flex flex-grow flex-col items-center mt-16 relative"
      v-if="ready"
    >
      <div class="chat" v-if="showChat">
        <div v-for="i in chat" :class="{ correct: i.correct, item: true }">
          <span>{{ i.state['display-name'] ?? i.state.username }}</span>
          <span>{{ i.chat }}</span>
        </div>
      </div>
      <div class="text-6xl font-black">
        {{ currentTurn + 1 }} / {{ wordSet.length }} 라운드
      </div>
      <div class="flex mt-8 border-2 border-black">
        <div
          class="border border-4 border-black w-32 h-32 flex font-bold items-center justify-center text-8xl cursor-pointer"
          @click="showChar(parseInt(i))"
          v-for="[i, char] in Object.entries(currentWord.word.split(''))"
        >
          {{
            isAnswerVisible || shownChars.includes(parseInt(i))
              ? char
              : getChosung(char)
          }}
        </div>
      </div>
      <div class="mt-8 text-4xl font-bold text-center" v-if="hintLevel >= 1">
        {{
          currentWord.category
            ? `주제: ${currentWord.category}`
            : currentWord.hint
        }}
      </div>
      <div
        class="mt-8 text-4xl font-bold text-center"
        v-if="currentWord.category && hintLevel >= 2"
      >
        {{ currentWord.hint }}
      </div>
      <div
        v-if="currentWord.category ? hintLevel <= 1 : hintLevel <= 0"
        @click="setShowHint"
        class="mt-8 text-3xl cursor-pointer"
      >
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
            v-if="!popupConnected"
          >
            {{ currentTurn + 1 === wordSet.length ? '결과 보기' : '다음' }}
          </div>
        </div>
      </div>
      <div class="flex-grow"></div>
      <div class="flex w-full justify-end p-4" v-if="!popupConnected">
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
import { computed, defineComponent, watch } from 'vue'
import { useStore } from 'vuex'
import { Word } from '../types'
import Header from '../components/Header.vue'
import { createToast } from 'mosha-vue-toastify'
import { ChatUserstate, Client } from 'tmi.js'
import Hangul from 'hangul-js'
import { History } from '../store'
import { event } from 'vue-gtag'
import { getPopupWindow } from '../utils/popup'

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
      store,
      showChat: computed(() => store.state.showChat),
      popupConnected: computed(() => store.state.popupConnected),
    }
  },
  computed: {
    currentWord() {
      const vm = this as { wordSet: Word[]; currentTurn: number }

      if (!vm.wordSet) return null

      return vm.wordSet[vm.currentTurn]
    },
  },
  data() {
    return {
      currentTurn: 0,
      ready: false,
      matchedUser: null as null | { username: string },
      hintLevel: 0,
      isAnswerVisible: false,
      chat: [] as { chat: string; state: ChatUserstate; correct?: boolean }[],
      shownChars: [] as number[],
    }
  },
  mounted() {
    if (!this.wordSet) {
      if (process.env.NODE_ENV === 'development') {
        this.store.state.wordSet = JSON.parse(localStorage.custom_words)
        this.tmi.on('message', this.onChat)
        this.ready = true
        return
      }
      createToast('단어 데이터가 설정되지 않았습니다.', { type: 'danger' })
      this.$router.push('/')
      return
    }
    this.tmi.on('message', this.onChat)
    this.ready = true
    getPopupWindow()?.dispatchEvent(
      new CustomEvent('state_changed', {
        detail: { action: 'set_word', value: this.currentWord },
      })
    )
    event('game_start', { channel: this.tmi.getChannels()[0] })
  },
  beforeUnmount() {
    getPopupWindow()?.dispatchEvent(
      new CustomEvent('state_changed', { detail: { action: 'end' } })
    )
    const w = window as any
    w.onPopupConnected = null
    w.onNextWord = null
    this.tmi.removeListener('message', this.onChat)
    event('game_end', { channel: this.tmi.getChannels()[0] })
  },
  created() {
    const w = window as any
    w.onPopupConnected = () => {
      getPopupWindow()?.dispatchEvent(
        new CustomEvent('state_changed', {
          detail: { action: 'set_word', value: this.currentWord },
        })
      )
    }
    w.onNextWord = () => {
      if (this.isAnswerVisible || this.matchedUser) {
        this.nextWord()
      } else {
        this.showAnswer()
      }
    }
  },
  methods: {
    onChat(channel: string, userState: ChatUserstate, message: string) {
      const addChat = () => {
        this.chat.push({
          chat: message,
          state: userState,
        })
        if (this.chat.length > 10) {
          this.chat.shift()
        }
      }
      if (this.matchedUser || this.isAnswerVisible) return addChat()
      const matched = this.currentWord!.word === message
      if (matched) {
        const username = (userState['display-name'] ??
          userState.username) as string
        this.matchedUser = { username }
        correctSound.play()
        this.chat.push({
          chat: message,
          state: userState,
          correct: true,
        })
        if (this.chat.length > 10) {
          this.chat.shift()
        }
        this.history.push({
          user: username,
          word: this.currentWord!.word,
        })
        getPopupWindow()?.dispatchEvent(
          new CustomEvent('state_changed', {
            detail: {
              action: 'set_answer_visible',
              value: true,
            },
          })
        )
        return
      }
      addChat()
    },
    getChosung(char: string) {
      return Hangul.disassemble(char)[0]
    },
    nextWord() {
      if (this.wordSet.length - 1 === this.currentTurn) {
        this.$router.push('/result')
        return
      }
      this.shownChars = []
      this.matchedUser = null
      this.hintLevel = 0
      this.isAnswerVisible = false
      this.currentTurn++
      getPopupWindow()?.dispatchEvent(
        new CustomEvent('state_changed', {
          detail: {
            action: 'set_answer_visible',
            value: false,
          },
        })
      )
      getPopupWindow()?.dispatchEvent(
        new CustomEvent('state_changed', {
          detail: { action: 'set_word', value: this.currentWord },
        })
      )
    },
    setShowHint() {
      this.hintLevel += 1
    },
    showAnswer() {
      this.history.push({
        user: null,
        word: this.currentWord!.word,
      })
      this.hintLevel = 2
      this.isAnswerVisible = true
      getPopupWindow()?.dispatchEvent(
        new CustomEvent('state_changed', {
          detail: {
            action: 'set_answer_visible',
            value: true,
          },
        })
      )
    },
    showChar(index: number) {
      if (this.shownChars.includes(index)) return
      this.shownChars.push(index)
      if (this.shownChars.length === this.currentWord!.word.length) {
        this.showAnswer()
      }
    },
  },
})
</script>

<style scoped lang="scss">
.chat {
  position: absolute;
  pointer-events: none;
  right: 30px;
  top: 0;

  width: 300px;
  overflow: hidden;
  align-items: stretch;

  max-height: 300px;
  height: 100%;

  display: flex;

  flex-direction: column;

  .item {
    display: flex;
    gap: 10px;

    &.correct {
      color: #18bb67;
    }
  }
}
</style>
