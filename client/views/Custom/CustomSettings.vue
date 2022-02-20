<template>
  <div>
    <Header />
    <div class="px-6" v-if="item">
      <div class="container mx-auto">
        <div>
          <div class="text-2xl font-bold">컬렉션 이름</div>
          <input
            type="text"
            v-model="item.title"
            class="px-4 py-2 border rounded-md mt-2 border-2 w-full"
          />
        </div>
        <div class="text-2xl font-bold mb-2 flex gap-2 mt-2">
          단어 설정
          <div
            @click="add"
            class="h-8 w-8 border rounded-md flex items-center justify-center cursor-pointer border-2"
          >
            <font-awesome-icon icon="plus" />
          </div>
        </div>
        <div class="grid lg:grid-cols-2 gap-4">
          <div class="flex gap-4" v-for="word in words">
            <div class="flex flex-grow gap-4">
              <input
                v-model="word.word"
                type="text"
                class="border rounded-md flex-grow py-2 px-3 outline-none h-12 border-2"
                placeholder="단어"
              />
              <input
                v-model="word.hint"
                type="text"
                class="border rounded-md flex-grow py-2 px-3 outline-none h-12 border-2"
                placeholder="힌트"
              />
            </div>
            <div
              class="border h-12 w-12 rounded-md flex items-center justify-center cursor-pointer border-2"
              @click="remove(word)"
            >
              <font-awesome-icon icon="minus" />
            </div>
          </div>
          <div class="flex gap-4">
            <div
              @click="save"
              class="h-12 border rounded-md flex items-center justify-center cursor-pointer flex-grow border-2"
            >
              저장
            </div>
            <div
              @click="download"
              class="h-12 rounded-md flex items-center justify-center cursor-pointer flex-grow border border-2"
            >
              다운로드
            </div>
          </div>
          <div class="flex gap-4">
            <div
              @click="deleteItem"
              class="h-12 border rounded-md flex items-center justify-center cursor-pointer flex-grow border-2"
            >
              삭제
            </div>
            <div
              @click="play"
              class="h-12 rounded-md flex items-center justify-center cursor-pointer flex-grow border border-2"
            >
              게임 시작
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Header from '../../components/Header.vue'
import { defineComponent, watch } from 'vue'
import { Word, WordSet } from '../../types'
import { createToast } from 'mosha-vue-toastify'
import { useStore } from 'vuex'
import _ from 'lodash'

function download(filename: string, text: string) {
  const element = document.createElement('a')
  element.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
  )
  element.setAttribute('download', filename)

  element.style.display = 'none'
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}

export default defineComponent({
  components: { Header },
  data: () => {
    const wordSet: WordSet[] = localStorage.wordSet
      ? JSON.parse(localStorage.wordSet)
      : []

    return {
      wordSet,
    }
  },
  computed: {
    words() {
      const set = this.wordSet[
        parseInt(this.$route.params.id as string)
      ] as WordSet
      return set.words
    },
    item() {
      const set = this.wordSet[
        parseInt(this.$route.params.id as string)
      ] as WordSet
      if (!set) {
        this.$router.push('/custom')
      }
      return set
    },
  },
  setup() {
    const store = useStore()
    return { store }
  },
  created() {
    watch(
      () => this.$route.params.id as string,
      (value) => {
        if (this.$route.name !== 'CustomList') return
        const set = this.wordSet[parseInt(value)] as WordSet
        if (!set) {
          this.$router.push('/custom')
          return []
        }
      }
    )
  },
  methods: {
    add() {
      this.words.push({ word: '', hint: '' })
    },
    remove(word: Word) {
      const id = parseInt(this.$route.params.id as string)
      this.wordSet[id].words = this.words.filter((x) => x !== word)
      this.$router.push('/custom')
    },
    save() {
      localStorage.wordSet = JSON.stringify(this.wordSet)
    },
    play() {
      if (!this.words.length) {
        createToast('최소 1개의 단어가 필요합니다', { type: 'danger' })
        return
      }
      if (this.words.find((x) => !x.word || !x.hint)) {
        createToast('불완전한 단어 설정이 존재합니다', { type: 'danger' })
        return
      }
      this.store.commit('wordSet', _.shuffle(this.words))
      this.$router.push('/settings')
    },
    deleteItem() {
      const id = parseInt(this.$route.params.id as string)
      this.wordSet.splice(id, 1)
      this.save()
    },
    download() {
      download(`${this.item.title}.json`, JSON.stringify(this.item))
    },
  },
})
</script>
