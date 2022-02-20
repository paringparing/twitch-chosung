function e(e){Object.defineProperty(e,"__esModule",{value:!0,configurable:!0})}function t(e,t,o,r){Object.defineProperty(e,t,{get:o,set:r,enumerable:!0,configurable:!0})}function o(e){return e&&e.__esModule?e.default:e}var r=("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequired8b0;r.register("1F3W8",(function(o,d){let n;e(o.exports),t(o.exports,"default",(()=>l));n=r("8pAlQ"),n.__esModule&&(n=n.default),n.render=r("f25DB").render,r("bBq9B").default(n),n.__scopeId="data-v-0af462",n.__file="CustomSettings.vue";var l=n})),r.register("8pAlQ",(function(d,n){e(d.exports),t(d.exports,"default",(()=>u));var l=r("1Za3e"),s=r("ecd4d"),i=r("4t2Ub"),a=r("jgDES"),c=r("f1q41");var u=s.defineComponent({components:{Header:l.default},data:()=>({wordSet:localStorage.wordSet?JSON.parse(localStorage.wordSet):[]}),computed:{words(){return this.wordSet[parseInt(this.$route.params.id)].words},item(){const e=this.wordSet[parseInt(this.$route.params.id)];return e||this.$router.push("/custom"),e}},setup:()=>({store:a.useStore()}),created(){s.watch((()=>this.$route.params.id),(e=>{if("CustomList"!==this.$route.name)return;return this.wordSet[parseInt(e)]?void 0:(this.$router.push("/custom"),[])}))},methods:{add(){this.words.push({word:"",hint:""})},remove(e){const t=parseInt(this.$route.params.id);this.wordSet[t].words=this.words.filter((t=>t!==e)),this.$router.push("/custom")},save(){localStorage.wordSet=JSON.stringify(this.wordSet)},play(){this.words.length?this.words.find((e=>!e.word||!e.hint))?i.createToast("불완전한 단어 설정이 존재합니다",{type:"danger"}):(this.store.commit("wordSet",o(c).shuffle(this.words)),this.$router.push("/settings")):i.createToast("최소 1개의 단어가 필요합니다",{type:"danger"})},deleteItem(){const e=parseInt(this.$route.params.id);this.wordSet.splice(e,1),this.save()},download(){!function(e,t){const o=document.createElement("a");o.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(t)),o.setAttribute("download",e),o.style.display="none",document.body.appendChild(o),o.click(),document.body.removeChild(o)}(`${this.item.title}.json`,JSON.stringify(this.item))}}})})),r.register("f25DB",(function(e,o){t(e.exports,"render",(()=>x));var d=r("ecd4d");const n={key:0,class:"px-6"},l={class:"container mx-auto"},s=d.createElementVNode("div",{class:"text-2xl font-bold"},"컬렉션 이름",-1),i={class:"text-2xl font-bold mb-2 flex gap-2 mt-2"},a=d.createTextVNode(" 단어 설정 "),c={class:"grid lg:grid-cols-2 gap-4"},u={class:"flex gap-4"},m={class:"flex flex-grow gap-4"},p=["onUpdate:modelValue"],f=["onUpdate:modelValue"],h=["onClick"],w={class:"flex gap-4"},v={class:"flex gap-4"};function x(e,t){const o=d.resolveComponent("Header"),r=d.resolveComponent("font-awesome-icon");return d.openBlock(),d.createElementBlock("div",null,[d.createVNode(o),e.item?(d.openBlock(),d.createElementBlock("div",n,[d.createElementVNode("div",l,[d.createElementVNode("div",null,[s,d.withDirectives(d.createElementVNode("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=t=>e.item.title=t),class:"px-4 py-2 border rounded-md mt-2 border-2 w-full"},null,512),[[d.vModelText,e.item.title]])]),d.createElementVNode("div",i,[a,d.createElementVNode("div",{onClick:t[1]||(t[1]=(...t)=>e.add&&e.add(...t)),class:"h-8 w-8 border rounded-md flex items-center justify-center cursor-pointer border-2"},[d.createVNode(r,{icon:"plus"})])]),d.createElementVNode("div",c,[(d.openBlock(!0),d.createElementBlock(d.Fragment,null,d.renderList(e.words,(t=>(d.openBlock(),d.createElementBlock("div",u,[d.createElementVNode("div",m,[d.withDirectives(d.createElementVNode("input",{"onUpdate:modelValue":e=>t.word=e,type:"text",class:"border rounded-md flex-grow py-2 px-3 outline-none h-12 border-2",placeholder:"단어"},null,8,p),[[d.vModelText,t.word]]),d.withDirectives(d.createElementVNode("input",{"onUpdate:modelValue":e=>t.hint=e,type:"text",class:"border rounded-md flex-grow py-2 px-3 outline-none h-12 border-2",placeholder:"힌트"},null,8,f),[[d.vModelText,t.hint]])]),d.createElementVNode("div",{class:"border h-12 w-12 rounded-md flex items-center justify-center cursor-pointer border-2",onClick:o=>e.remove(t)},[d.createVNode(r,{icon:"minus"})],8,h)])))),256)),d.createElementVNode("div",w,[d.createElementVNode("div",{onClick:t[2]||(t[2]=(...t)=>e.save&&e.save(...t)),class:"h-12 border rounded-md flex items-center justify-center cursor-pointer flex-grow border-2"}," 저장 "),d.createElementVNode("div",{onClick:t[3]||(t[3]=(...t)=>e.download&&e.download(...t)),class:"h-12 rounded-md flex items-center justify-center cursor-pointer flex-grow border border-2"}," 다운로드 ")]),d.createElementVNode("div",v,[d.createElementVNode("div",{onClick:t[4]||(t[4]=(...t)=>e.deleteItem&&e.deleteItem(...t)),class:"h-12 border rounded-md flex items-center justify-center cursor-pointer flex-grow border-2"}," 삭제 "),d.createElementVNode("div",{onClick:t[5]||(t[5]=(...t)=>e.play&&e.play(...t)),class:"h-12 rounded-md flex items-center justify-center cursor-pointer flex-grow border border-2"}," 게임 시작 ")])])])])):d.createCommentVNode("",!0)])}})),r.register("bBq9B",(function(e,o){t(e.exports,"default",(()=>r));var r=e=>{}}));
//# sourceMappingURL=CustomSettings.e93c3cbe.js.map
