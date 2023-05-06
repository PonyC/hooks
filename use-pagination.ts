import { ref } from 'vue';

export interface IParams {
  page?:number;
  pageTotal?:number;
  perPage?:number;
  pageSizeChangeCb?:(params:any | undefined) => void;
  pageChangeCb?:(params:any | undefined) => void
}

const defaultParams = {
  page:1,
  pageTotal:1,
  perPage:20,
  pageSizeChangeCb:()=>{},
  pageChangeCb:()=>{}
}

export const usePagination = (params:IParams = defaultParams) => {
  const formatP= Object.assign(defaultParams,params)
  const pageTotal = ref(formatP.pageTotal)
  const perPage = ref(formatP.perPage)
  const page = ref(formatP.page)
  const pageSizeChange = (pageSize:number)=>{
    perPage.value = pageSize
    formatP?.pageSizeChangeCb()
  }
  const pageChange = (pageNum:number)=>{
    page.value = pageNum
    formatP?.pageChangeCb()
  }
  
  return {
    pageTotal,
    perPage,
    page,
    pageSizeChange,
    pageChange    
  };
}