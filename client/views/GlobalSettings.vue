<template>
  <div>
    <Header />
    <div class="px-3">
      <div class="container mx-auto">
        <section>
          <div class="text-2xl font-bold">게임플레이 설정</div>
          <div class="grid mt-2 grid-cols-1 md:grid-cols-2">
            <label>
              <input
                :checked="showChat"
                @change="updateIsTwitchChatEnabled"
                type="checkbox"
              />
              <span class="ml-2">트위치 채팅 활성화</span>
            </label>
          </div>
        </section>
        <div
          @click="startGame"
          class="px-4 py-2 mt-2 border-2 border-green-400 rounded-md text-center cursor-pointer"
        >
          게임 시작
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import Header from '../components/Header.vue'
import { useStore } from 'vuex'

export default defineComponent({
  components: { Header },
  setup() {
    const store = useStore()

    return { store, showChat: computed(() => store.state.showChat) }
  },
  methods: {
    updateIsTwitchChatEnabled(e: InputEvent) {
      this.store.commit('showChat', (e.target as HTMLInputElement).checked)
    },
    startGame() {
      this.$router.push('/play')
    },
  },
})
</script>

<style scoped></style>
