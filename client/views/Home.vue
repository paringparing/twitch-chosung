<template>
  <div class="h-screen flex flex-col">
    <Header />
    <div class="px-8 flex-grow">
      <div
        class="container m-auto h-full flex items-center justify-center lg:justify-between gap-12 flex-col lg:flex-row p-24"
      >
        <router-link to="/custom">
          <div
            class="w-64 h-24 flex items-center justify-center rounded-md text-2xl font-bold border"
          >
            커스텀
          </div>
        </router-link>
        <div
          class="w-64 h-24 flex items-center justify-center rounded-md text-2xl font-bold border"
        >
          추천
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Header from '../components/Header.vue'

export default {
  components: { Header },
}
</script>
