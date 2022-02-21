<template>
  <div>
    <Header />
    <div class="px-8">
      <div class="container mx-auto">
        <div class="text-3xl font-bold">단어 컬렉션 - 컴퓨터 리부팅하면 저장이 안됩니다. 내보내기를 사용해주세요!</div>
        <div class="grid grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
          <router-link
            v-for="[index, i] in Object.entries(collectionList)"
            :to="`/custom/${index}`"
          >
            <div class="border p-4 text-center rounded-md">
              {{ i.title }}
            </div>
          </router-link>
          <div class="flex gap-4">
            <div
              class="border flex-grow p-4 rounded-md flex justify-center items-center cursor-pointer"
              @click="createItem"
            >
              <font-awesome-icon icon="add" />
            </div>
            <input
              type="file"
              ref="fileSelect"
              style="display: none"
              @input="loadItem"
            />
            <div
              class="border flex-grow p-4 rounded-md flex justify-center items-center cursor-pointer"
              @click="$refs.fileSelect.click()"
            >
              <font-awesome-icon icon="upload" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from '../../components/Header.vue'
import { WordSet } from '../../types'
import { z } from 'zod'
import { createToast } from 'mosha-vue-toastify'

const itemSchema = z.object({
  title: z.string(),
  words: z.array(
    z.object({
      word: z.string(),
      hint: z.string(),
    })
  ),
})

export default defineComponent({
  components: { Header },
  mounted() {},
  computed: {
    collectionList() {
      return (
        localStorage.wordSet ? JSON.parse(localStorage.wordSet) : []
      ) as WordSet[]
    },
  },
  methods: {
    createItem() {
      this.collectionList.push({
        title: 'New Collection',
        words: [],
      })
      localStorage.wordSet = JSON.stringify(this.collectionList)
      this.$router.push(`/custom/${this.collectionList.length - 1}`)
    },
    async loadItem(e: InputEvent) {
      const file = (e.target as HTMLInputElement).files?.item(0)
      try {
        if (!file) return
        const data = JSON.parse(await file.text())
        await itemSchema.parseAsync(data)
        this.collectionList.push(data)
        localStorage.wordSet = JSON.stringify(this.collectionList)
        await this.$router.push(`/custom/${this.collectionList.length - 1}`)
      } catch {
        createToast('로드 실패', { type: 'danger' })
      } finally {
        ;(e.target as HTMLInputElement).value = ''
      }
    },
  },
})
</script>
