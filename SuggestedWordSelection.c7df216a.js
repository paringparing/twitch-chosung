function e(e){Object.defineProperty(e,"__esModule",{value:!0,configurable:!0})}function t(e,t,o,r){Object.defineProperty(e,t,{get:o,set:r,enumerable:!0,configurable:!0})}function o(e){return e&&e.__esModule?e.default:e}var r=("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequired8b0;r.register("bpYbV",(function(o,n){let d;e(o.exports),t(o.exports,"default",(()=>a));d=r("7jU24"),d.__esModule&&(d=d.default),d.render=r("8iQ3r").render,r("6LGnB").default(d),d.__scopeId="data-v-fd5aff",d.__file="SuggestedWordSelection.vue";var a=d})),r.register("7jU24",(function(n,d){e(n.exports),t(n.exports,"default",(()=>p));var a=r("1Za3e"),i=r("27JcQ"),s=r("ecd4d"),l=r("4t2Ub"),c=r("f1q41"),u=r("jgDES"),p=s.defineComponent({name:"SuggestedWordSelection",components:{Header:a.default},setup(){const e=u.useStore();return{suggested:o(i),store:e}},computed:{maxCount(){if(!this.categories.length)return 0;return this.categories.map((e=>o(i).find((t=>t.id===e)).words.length)).reduce(((e,t)=>e+t))}},data:()=>({categories:[],count:0}),methods:{onUpdated(e){this.categories.includes(e.id)?this.categories=this.categories.filter((t=>t!==e.id)):this.categories.push(e.id)},start(){if(!this.count)return l.createToast("최소 1개의 단어가 설정되어야 합니다",{type:"danger"});const e=this.categories.map((e=>o(i).find((t=>t.id===e)).words)).reduce(((e,t)=>[...e,...t]));this.store.commit("wordSet",o(c).sampleSize(e,this.count)),this.$router.push("/play")}}})})),r.register("27JcQ",(function(e,t){e.exports=JSON.parse('[{"id":"broadcast","title":"방송","words":[{"word":"트위치","hint":"보라색 방송 플랫폼"},{"word":"초성퀴즈","hint":"이 게임의 이름"},{"word":"트윕","hint":"한국 스트리머가 가장 많이 쓰는 시스템 중 하나"},{"word":"투네이션","hint":"한국 스트리머가 가장 많이 쓰는 시스템 중 하나"}]},{"id":"game","title":"게임","words":[{"word":"마인크래프트","hint":"2011년에 출시한 3D 게임"}]}]')})),r.register("8iQ3r",(function(e,o){t(e.exports,"render",(()=>h));var n=r("ecd4d");const d={class:"px-8"},a={class:"container mx-auto mt-4"},i=n.createElementVNode("div",{class:"text-4xl font-bold"},"추천 단어 설정",-1),s={class:"mt-2"},l=n.createElementVNode("div",{class:"text-3xl"},"주제 선택",-1),c={class:"flex gap-8 flex-wrap"},u=["onChange"],p={class:"flex gap-4"},f=n.createElementVNode("span",null,"개수",-1),g=["max"],m={class:"mt-2"};function h(e,t){const o=n.resolveComponent("Header");return n.openBlock(),n.createElementBlock("div",null,[n.createVNode(o),n.createElementVNode("div",d,[n.createElementVNode("div",a,[i,n.createElementVNode("div",s,[l,n.createElementVNode("div",c,[(n.openBlock(!0),n.createElementBlock(n.Fragment,null,n.renderList(e.suggested,(t=>(n.openBlock(),n.createElementBlock("label",{key:t.id},[n.createElementVNode("input",{type:"checkbox",onChange:o=>e.onUpdated(t)},null,40,u),n.createTextVNode(" "+n.toDisplayString(t.title),1)])))),128))]),n.createElementVNode("div",p,[f,n.withDirectives(n.createElementVNode("input",{class:"flex-grow","onUpdate:modelValue":t[0]||(t[0]=t=>e.count=t),type:"range",min:0,max:e.maxCount},null,8,g),[[n.vModelText,e.count]]),n.createTextVNode(" "+n.toDisplayString(e.count)+" / "+n.toDisplayString(e.maxCount),1)])]),n.createElementVNode("div",m,[n.createElementVNode("div",{onClick:t[1]||(t[1]=(...t)=>e.start&&e.start(...t)),class:"p-2 border-2 text-center rounded-md border-green-400 cursor-pointer"}," 시작 ")])])])])}})),r.register("6LGnB",(function(e,o){t(e.exports,"default",(()=>r));var r=e=>{}}));
//# sourceMappingURL=SuggestedWordSelection.c7df216a.js.map
