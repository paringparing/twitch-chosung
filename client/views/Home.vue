<template>
  <div class="h-screen flex flex-col">
    <Header />
    <div class="px-8 flex-grow">
      <div
        class="container m-auto h-full flex items-center justify-center lg:justify-between gap-12 flex-col lg:flex-row p-24"
      >
        <router-link to="/custom">
          <div
            class="w-64 h-24 flex items-center justify-center rounded-md text-2xl font-bold border"
          >
            커스텀
          </div>
        </router-link>
        <div
          class="w-64 h-24 flex items-center justify-center rounded-md text-2xl font-bold border cursor-pointer"
          @click="promptSuggestCount"
        >
          추천
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Header from '../components/Header.vue'
import suggestedWords from '../../suggest.json'
import Swal from 'sweetalert2'
import _ from 'lodash'
import { useStore } from 'vuex'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { Header },
  setup() {
    const store = useStore()
    return { store }
  },
  methods: {
    async promptSuggestCount() {
      const res = await Swal.fire({
        title: '추천 개수 선택',
        icon: 'question',
        input: 'range',
        inputValue: suggestedWords.length,
        inputAttributes: {
          min: 1,
          max: suggestedWords.length,
          step: 1,
        } as any,
      })
      if (res.isConfirmed) {
        const items = _.sampleSize(suggestedWords, parseInt(res.value))
        this.store.commit('wordSet', items)
        await this.$router.push('/play')
      }
    },
  },
})
</script>
