<template>
  <div>
    <Header />
    {{ user }}
  </div>
</template>
<script lang="ts">
import { useStore } from 'vuex'
import { computed } from 'vue'
import { User } from '../store'
import Header from '../components/Header.vue'

export default {
  components: { Header },
  setup() {
    const store = useStore()

    return {
      user: computed<User>(() => store.state.user),
    }
  },
}
</script>
