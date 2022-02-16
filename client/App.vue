<template>
  <div>
    <div v-if="loading">loading</div>
    <div v-else-if="user">
      <router-view />
    </div>
    <div v-else class="min-h-screen flex flex-col">
      <Header />
      <div class="flex-grow flex justify-center items-center">
        <div>
          <input v-model="channel" type="text" placeholder="채널 이름" class="border rounded-md p-2">
          <div @click.stop="setChannel" class="border cursor-pointer border-blue-300 text-blue-300 rounded-md p-2 text-center mt-2">저장하기</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { computed } from 'vue'
import { createToast } from 'mosha-vue-toastify'
import Header from './components/Header.vue'

export default {
  components: { Header },
  setup() {
    const store = useStore()
    return {
      loading: computed(() => store.state.loading),
      user: computed<string | null>(() => store.state.channel),
    }
  },
  data() {
    return {
      channel: ''
    }
  },
  created() {
    const store = useStore()
    store.dispatch('loadChannel').then(() => {
      if (!store.state.channel) return store.commit('loading', false)

      store.dispatch('tmi', store.state.channel).then(() => {
        createToast('트위치 채팅 연결 성공', {
          type: 'success',
        })
        store.commit('loading', false)
        console.log('end')
      })
    })
  },
  methods: {
    setChannel() {
      localStorage.channel = this.channel
      window.location.reload()
    }
  }
}
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
