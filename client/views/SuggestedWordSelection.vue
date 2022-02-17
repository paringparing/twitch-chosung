<template>
  <div>
    <Header />
    <div class="px-8">
      <div class="container mx-auto mt-4">
        <div class="text-4xl font-bold">추천 단어 설정</div>
        <div class="mt-2">
          <div class="text-3xl">주제 선택</div>
          <div class="flex gap-8 flex-wrap">
            <label v-for="item in suggested" :key="item.id">
              <input type="checkbox" @change="onUpdated(item)" />
              {{ item.title }}
            </label>
          </div>
          <div class="flex gap-4">
            <span>개수</span>
            <input
              class="flex-grow"
              v-model="count"
              type="range"
              :min="0"
              :max="maxCount"
            />
            {{ count }} / {{ maxCount }}
          </div>
        </div>
        <div class="mt-2">
          <div
            @click="start"
            class="p-2 border-2 text-center rounded-md border-green-400 cursor-pointer"
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
import suggested from '../../suggest.json'
import { defineComponent } from 'vue'
import { Category } from '../types'
import { createToast } from 'mosha-vue-toastify'
import _ from 'lodash'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'SuggestedWordSelection',
  components: { Header },
  setup() {
    const store = useStore()

    return { suggested: suggested as Category[], store }
  },
  computed: {
    maxCount() {
      if (!this.categories.length) return 0
      const vm = this as unknown as { categories: string[] }
      return vm.categories
        .map(
          (x) => (suggested.find((y) => y.id === x) as Category).words.length
        )
        .reduce((a, b) => a + b)
    },
  },
  data() {
    return {
      categories: [] as string[],
      count: 0,
    }
  },
  methods: {
    onUpdated(item: Category) {
      if (this.categories.includes(item.id)) {
        this.categories = this.categories.filter((x) => x !== item.id)
        return
      }
      this.categories.push(item.id)
    },
    start() {
      if (!this.count)
        return createToast('최소 1개의 단어가 설정되어야 합니다', {
          type: 'danger',
        })
      const words = this.categories
        .map((x) => (suggested.find((y) => y.id === x) as Category).words)
        .reduce((a, b) => [...a, ...b])
      this.store.commit('wordSet', _.sampleSize(words, this.count))
      this.$router.push('/play')
    },
  },
})
</script>

<style scoped></style>
