function e(e){Object.defineProperty(e,"__esModule",{value:!0,configurable:!0})}function t(e,t,n,o){Object.defineProperty(e,t,{get:n,set:o,enumerable:!0,configurable:!0})}var n=("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequired8b0;n.register("jKEXC",(function(o,a){let r;e(o.exports),t(o.exports,"default",(()=>l));r=n("c4bHd"),r.__esModule&&(r=r.default),r.render=n("3zV4R").render,n("SbOhU").default(r),r.__scopeId="data-v-b555d6",r.__file="GlobalSettings.vue";var l=r})),n.register("c4bHd",(function(o,a){e(o.exports),t(o.exports,"default",(()=>s));var r=n("ecd4d"),l=n("1Za3e"),d=n("jgDES"),c=n("jDATe"),s=r.defineComponent({components:{Header:l.default},setup(){const e=d.useStore();return{store:e,showChat:r.computed((()=>e.state.showChat)),chatPercentageEnabled:r.computed((()=>e.state.showPercentageInChat))}},data:()=>({intro:null}),beforeUnmount(){this.intro?.removeHints()},mounted(){const e=this.intro=c.default().addHints();for(let t=0;t<2;t++)localStorage["tutorial__settings."+t]&&e.hideHint(t);e.onhintclose((e=>{localStorage["tutorial__settings."+e]=!0}))},methods:{updateIsTwitchChatEnabled(e){this.store.commit("showChat",e.target.checked)},updateIsChatPercentageEnabled(e){this.store.commit("showPercentageInChat",e.target.checked)},startGame(){this.$router.push("/play")},openPopup(){window.open("/#/popup","Quiz Popup","width=300,height=600")}}})})),n.register("3zV4R",(function(e,o){t(e.exports,"render",(()=>b));var a=n("ecd4d");const r={class:"px-3"},l={class:"container mx-auto"},d=a.createElementVNode("div",{class:"text-2xl font-bold"},"게임플레이 설정",-1),c={class:"grid mt-2 grid-cols-1 md:grid-cols-2"},s=["checked"],i=a.createElementVNode("span",{class:"ml-2"},"트위치 채팅 활성화",-1),u={key:0},h=["checked"],p=a.createElementVNode("span",{class:"ml-2"},"채팅 오버레이에서 정답 퍼센트 보기",-1),m=a.createElementVNode("div",{class:"text-2xl font-bold"},"기타",-1),g={class:"grid md:grid-cols-2"};function b(e,t){const n=a.resolveComponent("Header");return a.openBlock(),a.createElementBlock("div",null,[a.createVNode(n),a.createElementVNode("div",r,[a.createElementVNode("div",l,[a.createElementVNode("section",null,[d,a.createElementVNode("div",c,[a.createElementVNode("label",null,[a.createElementVNode("input",{checked:e.showChat,onChange:t[0]||(t[0]=(...t)=>e.updateIsTwitchChatEnabled&&e.updateIsTwitchChatEnabled(...t)),type:"checkbox"},null,40,s),i]),e.showChat?(a.openBlock(),a.createElementBlock("label",u,[a.createElementVNode("input",{checked:e.chatPercentageEnabled,onChange:t[1]||(t[1]=(...t)=>e.updateIsChatPercentageEnabled&&e.updateIsChatPercentageEnabled(...t)),type:"checkbox"},null,40,h),p])):a.createCommentVNode("",!0)])]),a.createElementVNode("section",null,[m,a.createElementVNode("div",g,[a.createElementVNode("div",{onClick:t[2]||(t[2]=(...t)=>e.openPopup&&e.openPopup(...t)),class:"bg-green-500 hover:brightness-90 active:brightness-75 transition-all text-center cursor-pointer rounded-md text-white px-4 py-2","data-hint":"스트리머용 팝업을 사용하면 플레이 중에 팝업창에서 단어를 확인할 수 있습니다.","data-hint-position":"top-left"}," 스트리머용 팝업 열기 ")])]),a.createElementVNode("div",{onClick:t[3]||(t[3]=(...t)=>e.startGame&&e.startGame(...t)),class:"px-4 py-2 mt-2 bg-green-500 hover:brightness-90 active:brightness-75 transition-all text-center rounded-md cursor-pointer text-white cursor-pointer"}," 게임 시작 ")])])])}})),n.register("SbOhU",(function(e,n){t(e.exports,"default",(()=>o));var o=e=>{}}));
//# sourceMappingURL=GlobalSettings.ae02f19a.js.map
