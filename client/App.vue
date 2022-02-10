<template>
  <div>
    <div v-if="loading">loading</div>
    <div v-else>
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { computed } from 'vue'
import { createToast } from 'mosha-vue-toastify'

export default {
  setup() {
    const store = useStore()
    return { loading: computed(() => store.state.loading) }
  },
  created() {
    const store = useStore()
    store
      .dispatch('fetchUser')
      .then(() => store.dispatch('tmi', store.state.user?.channel))
      .then(() => {
        createToast('트위치 채팅 연결 성공', {
          type: 'success',
        })
        store.commit('loading', false)
        console.log('end')
      })
  },
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
