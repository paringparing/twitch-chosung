<template>
  <div class="h-screen flex flex-col">
    <Header />
    <div class="px-8 flex-grow">
      <div
        class="container m-auto h-full flex items-center justify-center lg:justify-between gap-12 flex-col lg:flex-row p-24"
      >
        <router-link to="/custom">
          <div
            class="w-64 h-24 flex items-center justify-center rounded-md text-2xl font-bold border border-2"
          >
            커스텀
          </div>
        </router-link>
        <router-link to="/suggest">
          <div
            class="w-64 h-24 flex items-center justify-center rounded-md text-2xl font-bold border cursor-pointer border-2"
          >
            추천
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Header from '../components/Header.vue'
import { useStore } from 'vuex'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { Header },
  setup() {
    const store = useStore()
    return { store }
  },
})
</script>
