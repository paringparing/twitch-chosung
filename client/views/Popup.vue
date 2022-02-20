<template>
  <div class="p-4">
    <div v-if="connected">
      <div v-if="currentWord">
        <div class="text-2xl pb-2">현재 단어</div>
        <div class="text-2xl pt-2 border-t">{{ currentWord.word }}</div>
        <div class="pb-2" v-if="currentWord.category">
          <div class="text-xl">주제</div>
          <div>{{ currentWord.category }}</div>
        </div>
        <div class="text-xl border-t pt-2">힌트</div>
        <div>{{ currentWord.hint }}</div>
        <div
          class="p-2 border border-2 rounded-md text-center cursor-pointer"
          @click="nextWord"
        >
          {{ answerVisible ? '다음 / 결과 보기' : '정답 보기' }}
        </div>
      </div>
      <div v-else>단어를 기다리는 중...</div>
    </div>
    <div v-else>연결중...</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Word } from '../types'

export default defineComponent({
  data() {
    return {
      connected: false,
      interval: null as NodeJS.Timer | null,
      currentWord: null as Word | null,
      answerVisible: false,
    }
  },
  mounted() {
    if (!window.opener) {
      return
    }
    window.opener.popupSetup = false
    this.interval = setInterval(() => {
      window.opener.popupInstance = window
      if (!window.opener.popupSetup) {
        ;(window.opener as Window).dispatchEvent(
          new CustomEvent('popup_connected')
        )
      }
    }, 1000)
    window.addEventListener('popup_setup', this.setup)
    window.addEventListener('state_changed', this.stateChanged as any)
  },
  methods: {
    setup() {
      this.connected = true
      window.opener.onPopupConnected?.()
      window.removeEventListener('popup_setup', this.setup)
    },
    stateChanged(e: CustomEvent) {
      console.log(e.detail)
      switch (e.detail.action) {
        case 'set_word':
          this.currentWord = e.detail.value
          break
        case 'set_answer_visible':
          this.answerVisible = e.detail.value
          break
        case 'end':
          this.currentWord = null
          break
      }
    },
    nextWord() {
      window.opener.onNextWord?.()
    },
  },
  beforeUnmount() {
    if (this.interval) {
      clearInterval(this.interval)
    }
    window.removeEventListener('popup_setup', this.setup)
    window.removeEventListener('state_changed', this.stateChanged as any)
  },
})
</script>

<style>
@import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css);
@tailwind base;
@tailwind components;
@tailwind utilities;
body {
  @apply select-none;
}
* {
  font-family: 'Spoqa Han Sans Neo', sans-serif;
}
</style>
