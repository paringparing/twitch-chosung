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
          :href="loginLink"
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
import { computed, defineComponent, watch } from 'vue'
import { createToast } from 'mosha-vue-toastify'
import Header from './components/Header.vue'
import { event } from 'vue-gtag'
import axios from 'axios'
import { getPopupWindow } from './utils/popup'

export default defineComponent({
  components: { Header },
  setup() {
    const store = useStore()
    return {
      loading: computed(() => store.state.loading),
      user: computed<string | null>(() => store.state.channel),
      store,
    }
  },
  data() {
    return {
      channel: '',
    }
  },
  computed: {
    loginLink() {
      const clientId = process.env.API_APPLICATION_ID
      return `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
        process.env.API_CALLBACK as string
      )}&response_type=token&scope=`
    },
  },
  created() {
    watch(
      () => (this as any).$route,
      () => {
        event('page_view', { path: '/' + window.location.hash.slice(1) })
      }
    )
    setInterval(() => {
      const w = window as any
      if (((w.popupInstance as Window)?.closed ?? true) && w.popupSetup) {
        w.popupInstance = null
        w.popupSetup = false
        this.store.commit('popupConnected', false)
        createToast('팝업창과의 연결이 끊어졌습니다.', {
          type: 'danger',
        })
      }
    }, 1000)
    window.addEventListener('popup_connected', () => {
      ;(window as any).popupSetup = true
      this.$nextTick(() => {
        this.store.commit('popupConnected', false)
        this.$nextTick(() => {
          this.store.commit('popupConnected', true)
        })
      })
      getPopupWindow()?.dispatchEvent(new CustomEvent('popup_setup'))
      createToast('팝업창과 연결되었습니다', {
        type: 'success',
      })
    })
    const store = useStore()
    if (window.location.hash.startsWith('#/callback#')) {
      ;(async () => {
        const query = new URLSearchParams(
          window.location.hash.slice('#/callback#'.length)
        )
        const {
          data: { data },
        } = await axios.get('https://api.twitch.tv/helix/users?ids=468542410', {
          headers: {
            Authorization: `Bearer ${query.get('access_token')}`,
            'Client-Id': process.env.API_APPLICATION_ID as string,
          },
        })
        localStorage.channel = data[0].login
        window.location.href = '/'
      })().catch(() => {
        alert('로그인 시도 중 오류가 발생했습니다.')
      })
      return
    }
    store.dispatch('loadChannel').then(async () => {
      const { data } = await axios.get(
        'https://raw.githubusercontent.com/paringparing/twitch-chosung/data/suggest.json'
      )
      store.commit('suggested', data)
      console.log(`Loaded ${data.length} word sets`)

      if (!store.state.channel) return store.commit('loading', false)

      store.dispatch('tmi', store.state.channel).then(() => {
        event('login', { method: 'Twitch', username: store.state.channel })
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
      localStorage.channel = (this as any).channel
      window.location.reload()
    },
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
