<template>
  <div>
    <Header />
    <div class="px-6">
      <div class="container mx-auto">
        <div class="flex flex-col gap-4">
          <div class="flex gap-4" v-for="word in words">
            <div class="flex flex-grow gap-4">
              <input
                v-model="word.word"
                type="text"
                class="border rounded-md flex-grow py-2 px-3 outline-none h-12"
                placeholder="단어"
              />
              <input
                v-model="word.hint"
                type="text"
                class="border rounded-md flex-grow py-2 px-3 outline-none h-12"
                placeholder="힌트"
              />
            </div>
            <div
              class="border h-12 w-12 rounded-md flex items-center justify-center cursor-pointer"
              @click="remove(word)"
            >
              <font-awesome-icon icon="minus" />
            </div>
          </div>
          <div
            @click="add"
            class="h-12 border rounded-md flex items-center justify-center cursor-pointer"
          >
            <font-awesome-icon icon="plus" />
          </div>
          <div
            @click="save"
            class="h-12 border rounded-md flex items-center justify-center cursor-pointer"
          >
            저장
          </div>
          <div
            @click="play"
            class="h-12 border rounded-md flex items-center justify-center cursor-pointer"
          >
            시작
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Header from '../components/Header.vue'
import { defineComponent } from 'vue'
import { Word } from '../types'

export default defineComponent({
  components: { Header },
  data: () => {
    const words: Word[] = localStorage.custom_words
      ? JSON.parse(localStorage.custom_words)
      : []

    return {
      words,
    }
  },
  methods: {
    add() {
      this.words.push({ word: '', hint: '' })
    },
    remove(word: Word) {
      this.words = this.words.filter((x) => x !== word)
    },
    save() {
      localStorage.custom_words = JSON.stringify(this.words)
    },
    play() {
      alert('start')
    },
  },
})
</script>
