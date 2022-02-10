<template>
  <div>
    <div v-if="loading">loading</div>
    <div v-else-if="user">
      <router-view />
    </div>
    <div v-else class="min-h-screen flex flex-col">
      <Header />
      <div class="flex-grow flex justify-center items-center">
        <a
          :href="'/auth/login'"
          class="py-4 px-8 flex rounded-md gap-8 items-center justify-center"
          style="background: #6441a5; color: #fff"
        >
          <font-awesome-icon :icon="['fab', 'twitch']" size="2x" />
          <div class="font-bold text-xl">트위치로 로그인하기</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { computed } from 'vue'
import { createToast } from 'mosha-vue-toastify'
import { User } from './store'
import Header from './components/Header.vue'

export default {
  components: { Header },
  setup() {
    const store = useStore()
    return {
      loading: computed(() => store.state.loading),
      user: computed<User | null>(() => store.state.user),
    }
  },
  created() {
    const store = useStore()
    store.dispatch('fetchUser').then(() => {
      if (!store.state.user) return store.commit('loading', false)

      store.dispatch('tmi', store.state.user?.channel).then(() => {
        createToast('트위치 채팅 연결 성공', {
          type: 'success',
        })
        store.commit('loading', false)
        console.log('end')
      })
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
