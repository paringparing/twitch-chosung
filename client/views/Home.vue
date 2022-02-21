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
    <div class="border-t p-4">
      <div class="flex gap-4 items-center">
        <div class="text-lg font-bold">초성 퀴즈</div>
        <div class="bg-black bg-opacity-10 h-1 rounded-full w-4" />
        <a
          href="https://morrc.notion.site/1-0-3-WIP-8ab3be2ebc0f4ac8a08016ee24b2adb9"
          rel="noreferrer"
          target="_blank"
          >1.0.3 패치노트</a
        >
      </div>
      <div class="pt-4 flex gap-12 flex-wrap">
        <div class="flex flex-col">
          <div class="text-xl font-bold">링크</div>
          <a
            href="https://github.com/paringparing/twitch-chosung"
            target="_blank"
            rel="noreferrer"
            >GitHub</a
          >
          <a
            href="https://morrc.notion.site/bb1326138ff348829a045cd3c87a5975"
            target="_blank"
            rel="noreferrer"
            >Notion</a
          >
          <a
            href="https://forms.gle/KcNTRyAhbYWZf69P9"
            target="_blank"
            rel="noreferrer"
            >단어 / 주제 추천 / 오타 신고 등등</a
          >
        </div>
        <div class="flex flex-col">
          <div class="text-xl font-bold">개발</div>
          <a
            href="https://morrc.notion.site/b81c7728f1614ae79a6ea21565a4bf56?v=82a061495a334726b4311e9a289f459a"
            target="_blank"
            rel="noreferrer"
            >트래킹보드</a
          >
        </div>
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
