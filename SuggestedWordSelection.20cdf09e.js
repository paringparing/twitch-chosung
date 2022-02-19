function e(e){Object.defineProperty(e,"__esModule",{value:!0,configurable:!0})}function t(e,t,o,n){Object.defineProperty(e,t,{get:o,set:n,enumerable:!0,configurable:!0})}function o(e){return e&&e.__esModule?e.default:e}var n=("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequired8b0;n.register("bpYbV",(function(o,r){let s;e(o.exports),t(o.exports,"default",(()=>a));s=n("7jU24"),s.__esModule&&(s=s.default),s.render=n("8iQ3r").render,n("6LGnB").default(s),s.__scopeId="data-v-fd5aff",s.__file="SuggestedWordSelection.vue";var a=s})),n.register("7jU24",(function(r,s){e(r.exports),t(r.exports,"default",(()=>u));var a=n("1Za3e"),d=n("ecd4d"),i=n("4t2Ub"),l=n("f1q41"),c=n("jgDES"),u=d.defineComponent({name:"SuggestedWordSelection",components:{Header:a.default},setup(){const e=c.useStore();return{suggested:e.state.suggested,store:e}},computed:{maxCount(){if(!this.categories.length)return 0;return this.categories.map((e=>this.store.state.suggested.find((t=>t.id===e)).words.length)).reduce(((e,t)=>e+t))}},data:()=>({categories:[],count:0}),methods:{onUpdated(e){this.categories.includes(e.id)?this.categories=this.categories.filter((t=>t!==e.id)):this.categories.push(e.id)},start(){if(!this.count)return i.createToast("최소 1개의 단어가 설정되어야 합니다",{type:"danger"});const e=this.categories.map((e=>{const t=this.store.state.suggested.find((t=>t.id===e));return t.words.map((e=>(e.category=t.title,e)))})).reduce(((e,t)=>[...e,...t]));this.store.commit("wordSet",o(l).sampleSize(e,this.count)),this.$router.push("/settings")}}})})),n.register("8iQ3r",(function(e,o){t(e.exports,"render",(()=>x));var r=n("ecd4d");const s={class:"px-8"},a={class:"container mx-auto mt-4"},d=r.createElementVNode("div",{class:"text-4xl font-bold"},"추천 단어 설정",-1),i={class:"mt-2"},l=r.createElementVNode("div",{class:"text-3xl"},"주제 선택",-1),c={class:"flex gap-8 flex-wrap"},u=["onChange"],g={class:"flex gap-4"},p=r.createElementVNode("span",null,"개수",-1),f=["max"],m={class:"mt-2"};function x(e,t){const o=r.resolveComponent("Header");return r.openBlock(),r.createElementBlock("div",null,[r.createVNode(o),r.createElementVNode("div",s,[r.createElementVNode("div",a,[d,r.createElementVNode("div",i,[l,r.createElementVNode("div",c,[(r.openBlock(!0),r.createElementBlock(r.Fragment,null,r.renderList(e.suggested,(t=>(r.openBlock(),r.createElementBlock("label",{key:t.id},[r.createElementVNode("input",{type:"checkbox",onChange:o=>e.onUpdated(t)},null,40,u),r.createTextVNode(" "+r.toDisplayString(t.title),1)])))),128))]),r.createElementVNode("div",g,[p,r.withDirectives(r.createElementVNode("input",{class:"flex-grow","onUpdate:modelValue":t[0]||(t[0]=t=>e.count=t),type:"range",min:0,max:e.maxCount},null,8,f),[[r.vModelText,e.count]]),r.createTextVNode(" "+r.toDisplayString(e.count)+" / "+r.toDisplayString(e.maxCount),1)])]),r.createElementVNode("div",m,[r.createElementVNode("div",{onClick:t[1]||(t[1]=(...t)=>e.start&&e.start(...t)),class:"p-2 border-2 text-center rounded-md border-green-400 cursor-pointer"}," 시작 ")])])])])}})),n.register("6LGnB",(function(e,o){t(e.exports,"default",(()=>n));var n=e=>{}}));
//# sourceMappingURL=SuggestedWordSelection.20cdf09e.js.map
