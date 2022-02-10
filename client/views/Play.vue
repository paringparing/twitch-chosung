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

export default defineComponent({
  components: { Header },
  setup() {
    const store = useStore()

    return {
      wordSet: computed<Word[]>(() => store.state.wordSet),
    }
  },
  mounted() {
    if (!this.wordSet) {
      createToast('단어 데이터가 설정되지 않았습니다.', { type: 'danger' })
      this.$router.push('/')
    }
  },
})
</script>

<style scoped></style>
