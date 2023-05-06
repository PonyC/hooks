import { ref, type Ref } from "vue";
import { areaList } from "@vant/area-data";
import { findKey } from "@/libs/utils";

type TApiFun = (params: any) => Promise<any>;

export interface IArea {
  province: string;
  city: string;
  district: string;
  [key: string]: string;
}

export const useAreaPicker = () => {
  const showAreaPicker = ref(false);
  const placeholderArea = ref("");
  const areaValue = ref("");
  const areaObj = ref<IArea>({
    province: "",
    city: "",
    district: "",
  });

  const setDefaultArea = (value: IArea) => {
    placeholderArea.value = `${value.province}/${value.city}/${value.district}`;
    areaObj.value = {
      province: value.province,
      city: value.city,
      district: value.district,
    };
    const dist = findKey(areaList.county_list, value.district);
    areaValue.value = dist || "";
  };

  const onConfirm = (e: any, callbackFn?: TApiFun, params?: any) => {
    console.log("【useAreaPicker】onConfirm", e);
    const obj = e.selectedOptions;
    placeholderArea.value = `${obj[0].text}/${obj[1].text}/${obj[2].text}`;
    areaObj.value = {
      province: obj[0].text,
      city: obj[1].text,
      district: obj[2].text,
    };
    showAreaPicker.value = false;
    callbackFn && callbackFn(params);
  };

  const onCancel = (e: any, callbackFn?: TApiFun, params?: any) => {
    console.log("【useAreaPicker】onCancel", e);
    showAreaPicker.value = false;
    callbackFn && callbackFn(params);
  };

  return {
    showAreaPicker,
    placeholderArea,
    areaObj,
    areaValue,
    areaList,
    setDefaultArea,
    onConfirm,
    onCancel,
  };
};
