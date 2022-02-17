<template>
  <div class="px-8 py-6">
    <div class="container mx-auto items-center flex">
      <router-link to="/">
        <div class="text-3xl font-bold">초성 퀴즈</div>
      </router-link>
      <div class="flex-grow" />
      <div
        class="flex gap-4 items-center cursor-pointer"
        @click="logout"
        v-if="user"
      >
        <div class="text-lg font-light">{{ user }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Header',
  setup() {
    const store = useStore()

    return {
      user: computed(() => store.state.channel as string | null),
      store,
    }
  },
  methods: {
    logout: () => {
      delete localStorage.channel
      window.location.pathname = '/'
      window.location.reload()
    },
  },
})
</script>

<style scoped></style>
