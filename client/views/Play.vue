<template>
  <div>
    <Header />
    Play
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { Word } from '../types'
import Header from '../components/Header.vue'
import { createToast } from 'mosha-vue-toastify'
import { ChatUserstate, Client } from 'tmi.js'

export default defineComponent({
  components: { Header },
  setup() {
    const store = useStore()

    return {
      wordSet: computed<Word[]>(() => store.state.wordSet),
      tmi: computed<Client>(() => store.state.tmi),
    }
  },
  mounted() {
    if (!this.wordSet) {
      createToast('단어 데이터가 설정되지 않았습니다.', { type: 'danger' })
      this.$router.push('/')
      return
    }
    this.tmi.on('message', this.onChat)
  },
  unmounted() {
    this.tmi.removeListener('message', this.onChat)
  },
  methods: {
    onChat(channel: string, userState: ChatUserstate, message: string) {
      console.log(message)
    },
  },
})
</script>

<style scoped></style>
