<template>
  <div>
    <Header />
    <div class="px-8">
      <div class="container mx-auto">
        <div class="text-3xl mb-2 font-bold">순위</div>
        <table
          class="table-auto border divide-black divide-opacity-10 divide-y w-full"
        >
          <thead>
            <tr>
              <th class="w-12 h-12 border-r">#</th>
              <th class="h-12 border-r">유저</th>
              <th class="h-12 border-r">맞춘 개수</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            <tr v-for="[index, item] in Object.entries(ranking)">
              <td class="h-12 w-12 text-center border-r">
                {{ parseInt(index) + 1 }}
              </td>
              <td class="h-12 px-4 border-r">
                {{ item.user }}
              </td>
              <td class="h-12 px-4 border-r">{{ item.count }}개</td>
            </tr>
          </tbody>
        </table>
        <div class="text-3xl mb-2 font-bold mt-8">기록</div>
        <table
          class="table-auto border divide-black divide-opacity-10 divide-y w-full"
        >
          <thead>
            <tr>
              <th class="w-12 h-12 border-r">#</th>
              <th class="h-12 border-r">유저</th>
              <th class="h-12">단어</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            <tr v-for="[index, item] in Object.entries(history)">
              <td class="h-12 w-12 text-center border-r">
                {{ parseInt(index) + 1 }}
              </td>
              <td class="h-12 px-4 border-r">
                {{ item.user ?? '없음' }}
              </td>
              <td class="h-12 px-4">
                {{ item.word }}
              </td>
            </tr>
          </tbody>
        </table>
        <div class="flex justify-end mt-4">
          <a
            @click="goToHome"
            class="bg-red-500 text-white py-3 px-6 rounded-md transition-all hover:brightness-90 active:brightness-75 cursor-pointer"
          >
            홈으로
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { History } from '../store'
import { createToast } from 'mosha-vue-toastify'
import Header from '../components/Header.vue'
import _ from 'lodash'

export default defineComponent({
  components: { Header },
  setup() {
    const store = useStore()

    return {
      history: computed<History>(() => store.state.history),
      store,
    }
  },
  computed: {
    ranking() {
      const vm = this as unknown as { history: History }
      let rank = 0
      const users = Array.from(
        new Set(vm.history.filter((x) => x.user).map((x) => x.user!))
      )
        .map((x: string) => ({
          user: x,
          count: vm.history.filter((y) => y.user === x).length,
        }))
        .map((value, index, array) => {
          if (index > 0) {
            if (array[index - 1].count === value.count) {
              return {
                ...value,
                rank: rank,
              }
            }
          }
          return {
            ...value,
            rank: ++rank,
          }
        })
      return _.sortBy(users, 'count').reverse()
    },
  },
  mounted() {
    if (!this.history.length) {
      createToast('플레이 데이터가 없습니다', { type: 'danger' })
      this.$router.push('/')
      return
    }
  },
  methods: {
    goToHome() {
      this.store.state.history = []
      this.$router.push('/')
    },
  },
})
</script>
