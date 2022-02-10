<template>
  <div class="px-8 py-6">
    <div class="container mx-auto items-center flex">
      <div class="text-3xl font-bold">초성 퀴즈</div>
      <div class="flex-grow" />
      <div
        class="flex gap-4 items-center cursor-pointer"
        @click="logout"
        v-if="user"
      >
        <img
          :src="user.avatar"
          alt=""
          class="w-12 h-12 rounded-full ring ring-black ring-opacity-10"
        />
        <div class="text-lg font-light">{{ user.nick }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { User } from '../store'

export default defineComponent({
  name: 'Header',
  setup() {
    const store = useStore()

    return {
      user: computed(() => store.state.user as User),
    }
  },
  methods: {
    logout: () => {
      window.location.pathname = '/auth/logout'
    },
  },
})
</script>

<style scoped></style>
