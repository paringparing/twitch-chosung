<template>
  <div>{{ user }}</div>
</template>
<script lang="ts">
import { useStore } from 'vuex'
import { computed } from 'vue'
import { User } from '../store'

export default {
  setup() {
    const store = useStore()

    return {
      user: computed<User>(() => store.state.user),
    }
  },
}
</script>
