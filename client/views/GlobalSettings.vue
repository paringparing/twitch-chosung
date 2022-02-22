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
            <label v-if="showChat">
              <input
                :checked="chatPercentageEnabled"
                @change="updateIsChatPercentageEnabled"
                type="checkbox"
              />
              <span class="ml-2">채팅 오버레이에서 정답 퍼센트 보기</span>
            </label>
          </div>
        </section>
        <section>
          <div class="text-2xl font-bold">기타</div>
          <div class="grid md:grid-cols-2">
            <div
              @click="openPopup"
              class="bg-green-500 hover:brightness-90 active:brightness-75 transition-all text-center cursor-pointer rounded-md text-white px-4 py-2"
              data-hint="스트리머용 팝업을 사용하면 플레이 중에 팝업창에서 단어를 확인할 수 있습니다."
              data-hint-position="top-left"
            >
              스트리머용 팝업 열기
            </div>
          </div>
        </section>
        <div
          @click="startGame"
          class="px-4 py-2 mt-2 bg-green-500 hover:brightness-90 active:brightness-75 transition-all text-center rounded-md cursor-pointer text-white cursor-pointer"
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
import introJs, { IntroJs } from 'intro.js'

export default defineComponent({
  components: { Header },
  setup() {
    const store = useStore()

    return {
      store,
      showChat: computed(() => store.state.showChat),
      chatPercentageEnabled: computed(() => store.state.showPercentageInChat),
    }
  },
  data() {
    return {
      intro: null as IntroJs | null,
    }
  },
  mounted() {
    const intro = (this.intro = introJs().addHints())
    for (let i = 0; i < 2; i++) {
      if (localStorage['tutorial__settings.' + i]) {
        intro.hideHint(i)
      }
    }
    intro.onhintclose((stepId) => {
      localStorage['tutorial__settings.' + stepId] = true
    })
  },
  methods: {
    updateIsTwitchChatEnabled(e: InputEvent) {
      this.store.commit('showChat', (e.target as HTMLInputElement).checked)
    },
    updateIsChatPercentageEnabled(e: InputEvent) {
      this.store.commit(
        'showPercentageInChat',
        (e.target as HTMLInputElement).checked
      )
    },
    startGame() {
      this.$router.push('/play')
    },
    openPopup() {
      window.open('/#/popup', 'Quiz Popup', 'width=300,height=600')
    },
  },
})
</script>

<style scoped></style>
