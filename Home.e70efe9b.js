function e(e){Object.defineProperty(e,"__esModule",{value:!0,configurable:!0})}function t(e,t,r,o){Object.defineProperty(e,t,{get:r,set:o,enumerable:!0,configurable:!0})}var r=("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequired8b0;r.register("dynDQ",(function(o,l){let n;e(o.exports),t(o.exports,"default",(()=>a));n=r("6JSVr"),n.__esModule&&(n=n.default),n.render=r("fAMzm").render,r("gUCJ5").default(n),n.__scopeId="data-v-5231f9",n.__file="Home.vue";var a=n})),r.register("6JSVr",(function(o,l){e(o.exports),t(o.exports,"default",(()=>i));var n=r("1Za3e"),a=r("jgDES"),d=r("ecd4d"),s=r("jDATe"),i=d.defineComponent({components:{Header:n.default},setup:()=>({store:a.useStore()}),mounted(){"true"!==localStorage.tutorialShown__main&&(localStorage.tutorialShown__main="true",this.showTutorial())},methods:{showTutorial(){s.default().addStep({intro:'"초성 퀴즈"는 트위치 채팅으로 플레이하는 방송용 미니게임 입니다. 설명서 https://bit.ly/3HbTjDI'}).addStep({intro:"추천 모드는 초성퀴즈 개발자가 추가한 단어들로 플레이 할 수 있는 플레이 방식입니다.",element:this.$refs.suggestedButton}).addStep({intro:"커스텀 모드는 유저가 직접 단어를 추가해서 플레이 가능한 플레이 방식입니다.",element:this.$refs.customButton}).start()}}})})),r.register("fAMzm",(function(e,o){t(e.exports,"render",(()=>u));var l=r("ecd4d");const n={class:"h-screen flex flex-col"},a={class:"px-8 flex-grow"},d={class:"flex justify-end container mx-auto"},s={class:"container m-auto h-full flex items-center justify-center lg:justify-between gap-12 flex-col lg:flex-row p-24"},i={ref:"customButton",class:"w-64 h-24 flex items-center justify-center rounded-md text-2xl font-bold border border-2"},c={ref:"suggestedButton",class:"w-64 h-24 flex items-center justify-center rounded-md text-2xl font-bold border cursor-pointer border-2"},f=l.createStaticVNode('<div class="border-t p-4"><div class="flex gap-4 items-center"><div class="text-lg font-bold">초성 퀴즈</div><div class="bg-black bg-opacity-10 h-1 rounded-full w-4"></div><a href="https://morrc.notion.site/1-0-3-WIP-8ab3be2ebc0f4ac8a08016ee24b2adb9" rel="noreferrer" target="_blank">1.0.3 패치노트</a></div><div class="pt-4 flex gap-12 flex-wrap"><div class="flex flex-col"><div class="text-xl font-bold">링크</div><a href="https://github.com/paringparing/twitch-chosung" target="_blank" rel="noreferrer">GitHub</a><a href="https://morrc.notion.site/bb1326138ff348829a045cd3c87a5975" target="_blank" rel="noreferrer">Notion</a><a href="https://forms.gle/KcNTRyAhbYWZf69P9" target="_blank" rel="noreferrer">단어 / 주제 추천 / 오타 신고 등등</a></div><div class="flex flex-col"><div class="text-xl font-bold">개발</div><a href="https://morrc.notion.site/b81c7728f1614ae79a6ea21565a4bf56?v=82a061495a334726b4311e9a289f459a" target="_blank" rel="noreferrer">트래킹보드</a></div></div></div>',1);function u(e,t){const r=l.resolveComponent("Header"),o=l.resolveComponent("font-awesome-icon"),u=l.resolveComponent("router-link");return l.openBlock(),l.createElementBlock("div",n,[l.createVNode(r),l.createElementVNode("div",a,[l.createElementVNode("div",d,[l.createElementVNode("div",{onClick:t[0]||(t[0]=(...t)=>e.showTutorial&&e.showTutorial(...t)),class:"border-2 w-8 h-8 flex justify-center items-center rounded-full cursor-pointer"},[l.createVNode(o,{icon:"question"})])]),l.createElementVNode("div",s,[l.createVNode(u,{to:"/custom"},{default:l.withCtx((()=>[l.createElementVNode("div",i," 커스텀 ",512)])),_:1}),l.createVNode(u,{to:"/suggest"},{default:l.withCtx((()=>[l.createElementVNode("div",c," 추천 ",512)])),_:1})])]),f])}})),r.register("gUCJ5",(function(e,r){t(e.exports,"default",(()=>o));var o=e=>{}}));
//# sourceMappingURL=Home.e70efe9b.js.map
