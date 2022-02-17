function e(e){Object.defineProperty(e,"__esModule",{value:!0,configurable:!0})}function o(e,o,t,r){Object.defineProperty(e,o,{get:t,set:r,enumerable:!0,configurable:!0})}function t(e){return e&&e.__esModule?e.default:e}var r=("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequired8b0;r.register("k4ERn",(function(t,d){let n;e(t.exports),o(t.exports,"default",(()=>l));n=r("bQZGk"),n.__esModule&&(n=n.default),n.render=r("h0oxi").render,r("nlOzw").default(n),n.__scopeId="data-v-516c1e",n.__file="CustomSettings.vue";var l=n})),r.register("bQZGk",(function(d,n){e(d.exports),o(d.exports,"default",(()=>u));var l=r("1Za3e"),s=r("ecd4d"),a=r("4t2Ub"),i=r("jgDES"),c=r("f1q41"),u=s.defineComponent({components:{Header:l.default},data:()=>({words:localStorage.custom_words?JSON.parse(localStorage.custom_words):[]}),setup:()=>({store:i.useStore()}),methods:{add(){this.words.push({word:"",hint:""})},remove(e){this.words=this.words.filter((o=>o!==e))},save(){localStorage.custom_words=JSON.stringify(this.words)},play(){this.words.length?this.words.find((e=>!e.word||!e.hint))?a.createToast("불완전한 단어 설정이 존재합니다",{type:"danger"}):(this.store.commit("wordSet",t(c).shuffle(this.words)),this.$router.push("/play")):a.createToast("최소 1개의 단어가 필요합니다",{type:"danger"})}}})})),r.register("h0oxi",(function(e,t){o(e.exports,"render",(()=>m));var d=r("ecd4d");const n={class:"px-6"},l={class:"container mx-auto"},s={class:"flex flex-col gap-4"},a={class:"flex gap-4"},i={class:"flex flex-grow gap-4"},c=["onUpdate:modelValue"],u=["onUpdate:modelValue"],f=["onClick"],p={class:"flex gap-4"};function m(e,o){const t=d.resolveComponent("Header"),r=d.resolveComponent("font-awesome-icon");return d.openBlock(),d.createElementBlock("div",null,[d.createVNode(t),d.createElementVNode("div",n,[d.createElementVNode("div",l,[d.createElementVNode("div",s,[(d.openBlock(!0),d.createElementBlock(d.Fragment,null,d.renderList(e.words,(o=>(d.openBlock(),d.createElementBlock("div",a,[d.createElementVNode("div",i,[d.withDirectives(d.createElementVNode("input",{"onUpdate:modelValue":e=>o.word=e,type:"text",class:"border rounded-md flex-grow py-2 px-3 outline-none h-12 border-2",placeholder:"단어"},null,8,c),[[d.vModelText,o.word]]),d.withDirectives(d.createElementVNode("input",{"onUpdate:modelValue":e=>o.hint=e,type:"text",class:"border rounded-md flex-grow py-2 px-3 outline-none h-12 border-2",placeholder:"힌트"},null,8,u),[[d.vModelText,o.hint]])]),d.createElementVNode("div",{class:"border h-12 w-12 rounded-md flex items-center justify-center cursor-pointer border-2",onClick:t=>e.remove(o)},[d.createVNode(r,{icon:"minus"})],8,f)])))),256)),d.createElementVNode("div",p,[d.createElementVNode("div",{onClick:o[0]||(o[0]=(...o)=>e.save&&e.save(...o)),class:"h-12 border rounded-md flex items-center justify-center cursor-pointer flex-grow border-2"}," 저장 "),d.createElementVNode("div",{onClick:o[1]||(o[1]=(...o)=>e.play&&e.play(...o)),class:"h-12 rounded-md flex items-center justify-center cursor-pointer flex-grow border border-2"}," 시작 "),d.createElementVNode("div",{onClick:o[2]||(o[2]=(...o)=>e.add&&e.add(...o)),class:"h-12 w-12 border rounded-md flex items-center justify-center cursor-pointer border-2"},[d.createVNode(r,{icon:"plus"})])])])])])])}})),r.register("nlOzw",(function(e,t){o(e.exports,"default",(()=>r));var r=e=>{}}));
//# sourceMappingURL=CustomSettings.46fb4b63.js.map
