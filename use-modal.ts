import { ref } from 'vue';

export interface IParams {
  title?:string,
  visible:boolean,
}

const defaultParams = {
  title:'标题',
  visible:false
}

export const useModal = (params:IParams = defaultParams) => {
  const modelTitle = ref(params.title)
  const modelVisible = ref(params.visible);
  const modelData = ref<any>({})

  const setModalVisible = (value: boolean) => {
    modelVisible.value = value;
  };

  const setModalTitle = (value:string)=>{
    modelTitle.value = value
  };

  const setModalData = (value:any)=>{
    modelData.value = value
  }

  return {
    modelTitle,
    modelVisible,
    modelData,
    setModalTitle,
    setModalVisible,
    setModalData
  };
}