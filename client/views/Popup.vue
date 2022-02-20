<template>
  <div>팝-업</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  created() {
    if (!window.opener) {
      return
    }
    setInterval(() => {
      if (!window.opener.popupInstance) {
        window.opener.popupInstance = window
        ;(window.opener as Window).dispatchEvent(
          new CustomEvent('popup_connected')
        )
      }
    }, 1000)
  },
  mounted() {
    console.log('sans')
  },
})
</script>

<style>
@import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css);
@tailwind base;
@tailwind components;
@tailwind utilities;
body {
  @apply select-none;
}
* {
  font-family: 'Spoqa Han Sans Neo', sans-serif;
}
</style>
