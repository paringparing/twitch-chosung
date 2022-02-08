<template>
  <div class="h-screen flex flex-col">
    <Header />
    <div class="p-4 flex-grow">
      <div
        class="container m-auto h-full flex items-center justify-center gap-12"
      >
        <div
          class="w-64 h-24 flex items-center justify-center rounded-md text-2xl font-bold shadow-xl"
        >
          커스텀
        </div>
        <div
          class="w-64 h-24 flex items-center justify-center rounded-md text-2xl font-bold shadow-xl"
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
