<template>
  <div>
    <Header />
    <div class="px-8">
      <div class="container mx-auto mt-4">
        <div class="text-4xl font-bold">추천 단어 설정</div>
        <div class="mt-2">
          <div
            class="text-3xl"
            data-hint="플레이할 주제를 선택해 주세요"
            data-hint-position="top-left"
          >
            주제 선택
          </div>
          <div class="grid md:grid-cols-3 gap-2">
            <div v-for="item in suggested" :key="item.id">
              <label>
                <input type="checkbox" @change="onUpdated(item)" />
                {{ item.title }}
              </label>
              <div v-if="item.description">{{ item.description }}</div>
            </div>
          </div>
          <div
            class="flex gap-4"
            data-hint="플레이할 단어의 개수를 선택해주세요(선택한 주제에서 선택됩니다)"
            data-hint-position="top-left"
          >
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
import { defineComponent } from 'vue'
import { Category } from '../types'
import { createToast } from 'mosha-vue-toastify'
import _ from 'lodash'
import { useStore } from 'vuex'
import introJs, { IntroJs } from 'intro.js'

export default defineComponent({
  name: 'SuggestedWordSelection',
  components: { Header },
  setup() {
    const store = useStore()

    return { suggested: store.state.suggested as Category[], store }
  },
  computed: {
    maxCount() {
      if (!this.categories.length) return 0
      const vm = this as unknown as { categories: string[] }
      return vm.categories
        .map(
          (x) =>
            (
              (this as any).store.state.suggested.find(
                (y: Category) => y.id === x
              ) as Category
            ).words.length
        )
        .reduce((a, b) => a + b)
    },
  },
  data() {
    return {
      categories: [] as string[],
      count: 0,
      intro: null as IntroJs | null,
    }
  },
  mounted() {
    const intro = (this.intro = introJs().addHints())
    for (let i = 0; i < 2; i++) {
      if (localStorage['tutorial__suggestedSelection.' + i]) {
        intro.hideHint(i)
      }
    }
    intro.onhintclose((stepId) => {
      localStorage['tutorial__suggestedSelection.' + stepId] = true
    })
  },
  beforeUnmount() {
    this.intro?.removeHints()
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
        .map((x) => {
          const category = this.store.state.suggested.find(
            (y: Category) => y.id === x
          ) as Category
          return category.words.map((x) => {
            x.category = category.title
            return x
          })
        })
        .reduce((a, b) => [...a, ...b])
      this.store.commit('wordSet', _.sampleSize(words, this.count))
      this.$router.push('/settings')
    },
  },
})
</script>
