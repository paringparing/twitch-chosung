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

export default {
  setup() {
    const store = useStore()
    return { loading: computed(() => store.state.loading) }
  },
  created() {
    const store = useStore()
    store.dispatch('fetchUser').then(() => {
      store.commit('loading', false)
      console.log('end')
    })
  },
}
</script>
