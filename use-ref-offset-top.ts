import { ref } from 'vue';

export const  useRefOffsetTop = ({isTab = false} = {}) => {
  const el = ref<any|null>(null)
  const elContentClientRectTop = ref('100%')
  watch(el,()=>{
    let top = 0
    if(el?.value.length){
      top = el?.value[0].getBoundingClientRect().top
    } else {
      top = el?.value.getBoundingClientRect().top
    }
    const paddingBottom = 16
    let paginationHeight = 32 * 2
    if(isTab){
      // 这个56是 tab标签 的高度，不知道为什么，获取 tab-pane 的top时，tab标签的高度是不算在内的。
      paginationHeight = 32 * 2 + 40
    }
    elContentClientRectTop.value =  `calc(100vh - ${top + paginationHeight + paddingBottom}px)`
  })
 
  return {
    el,
    elContentClientRectTop
  };
}