function e(e){Object.defineProperty(e,"__esModule",{value:!0,configurable:!0})}function t(e,t,r,o){Object.defineProperty(e,t,{get:r,set:o,enumerable:!0,configurable:!0})}function r(e){return e&&e.__esModule?e.default:e}var o=("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequired8b0;o.register("2sBxg",(function(r,n){let l;e(r.exports),t(r.exports,"default",(()=>d));l=o("buvCm"),l.__esModule&&(l=l.default),l.render=o("2VEEc").render,o("jguKu").default(l),l.__scopeId="data-v-e8c508",l.__file="Result.vue";var d=l})),o.register("buvCm",(function(n,l){e(n.exports),t(n.exports,"default",(()=>u));var d=o("ecd4d"),a=o("jgDES"),s=o("4t2Ub"),c=o("1Za3e"),i=o("f1q41"),u=d.defineComponent({components:{Header:c.default},setup(){const e=a.useStore();return{history:d.computed((()=>e.state.history)),store:e}},computed:{ranking(){const e=this;let t=0;const o=Array.from(new Set(e.history.filter((e=>e.user)).map((e=>e.user)))).map((t=>({user:t,count:e.history.filter((e=>e.user===t)).length}))).map(((e,r,o)=>r>0&&o[r-1].count===e.count?{...e,rank:t}:{...e,rank:++t}));return r(i).sortBy(o,"count").reverse()}},mounted(){if(!this.history.length)return s.createToast("플레이 데이터가 없습니다",{type:"danger"}),void this.$router.push("/")},methods:{goToHome(){this.store.state.history=[],this.$router.push("/")}}})})),o.register("2VEEc",(function(e,r){t(e.exports,"render",(()=>N));var n=o("ecd4d");const l={class:"px-8"},d={class:"container mx-auto"},a=n.createElementVNode("div",{class:"text-3xl mb-2 font-bold"},"순위",-1),s={class:"table-auto border divide-black divide-opacity-10 divide-y w-full"},c=n.createElementVNode("thead",null,[n.createElementVNode("tr",null,[n.createElementVNode("th",{class:"w-12 h-12 border-r"},"#"),n.createElementVNode("th",{class:"h-12 border-r"},"유저"),n.createElementVNode("th",{class:"h-12 border-r"},"맞춘 개수")])],-1),i={class:"divide-y"},u={class:"h-12 w-12 text-center border-r"},m={class:"h-12 px-4 border-r"},p={class:"h-12 px-4 border-r"},h=n.createElementVNode("div",{class:"text-3xl mb-2 font-bold mt-8"},"기록",-1),b={class:"table-auto border divide-black divide-opacity-10 divide-y w-full"},f=n.createElementVNode("thead",null,[n.createElementVNode("tr",null,[n.createElementVNode("th",{class:"w-12 h-12 border-r"},"#"),n.createElementVNode("th",{class:"h-12 border-r"},"유저"),n.createElementVNode("th",{class:"h-12"},"단어")])],-1),E={class:"divide-y"},g={class:"h-12 w-12 text-center border-r"},y={class:"h-12 px-4 border-r"},v={class:"h-12 px-4"},V={class:"flex justify-end mt-4"};function N(e,t){const r=n.resolveComponent("Header");return n.openBlock(),n.createElementBlock("div",null,[n.createVNode(r),n.createElementVNode("div",l,[n.createElementVNode("div",d,[a,n.createElementVNode("table",s,[c,n.createElementVNode("tbody",i,[(n.openBlock(!0),n.createElementBlock(n.Fragment,null,n.renderList(Object.entries(e.ranking),(([e,t])=>(n.openBlock(),n.createElementBlock("tr",null,[n.createElementVNode("td",u,n.toDisplayString(parseInt(e)+1),1),n.createElementVNode("td",m,n.toDisplayString(t.user),1),n.createElementVNode("td",p,n.toDisplayString(t.count)+"개",1)])))),256))])]),h,n.createElementVNode("table",b,[f,n.createElementVNode("tbody",E,[(n.openBlock(!0),n.createElementBlock(n.Fragment,null,n.renderList(Object.entries(e.history),(([e,t])=>(n.openBlock(),n.createElementBlock("tr",null,[n.createElementVNode("td",g,n.toDisplayString(parseInt(e)+1),1),n.createElementVNode("td",y,n.toDisplayString(t.user??"없음"),1),n.createElementVNode("td",v,n.toDisplayString(t.word),1)])))),256))])]),n.createElementVNode("div",V,[n.createElementVNode("a",{onClick:t[0]||(t[0]=(...t)=>e.goToHome&&e.goToHome(...t)),class:"bg-red-500 text-white py-3 px-6 rounded-md transition-all hover:brightness-90 active:brightness-75 cursor-pointer"}," 홈으로 ")])])])])}})),o.register("jguKu",(function(e,r){t(e.exports,"default",(()=>o));var o=e=>{}}));
//# sourceMappingURL=Result.c6adb6b7.js.map
