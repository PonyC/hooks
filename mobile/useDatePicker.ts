import { ref, type Ref } from "vue";
import { formatDate } from "@/libs/utils";

type TApiFun = (params: any) => Promise<any>;

// 入参格式
export interface IOptions {
  minYearCount?: number;
  maxYearCount?: number;
  formatPlaceholderDate?: string;
}

// 返回数据格式
export interface ResultObj {
  minDate: Date;
  maxDate: Date;
  currentDate: Ref<string[]>;
  placeholderDate: Ref<string>;
  showDatePicker: Ref<boolean>;
  onConfirm: (e: any, fn?: TApiFun, params?: any[]) => Promise<any> | void;
  onCancel: (e: any, fn?: TApiFun, params?: any[]) => Promise<any> | void;
  setDefaultDate: (defaultDate: Date) => void;
}

/**
 * 日期筛选Picker
 * @param {number} [minYearCount = 1] - 以当前年份为锚点，传入值需 小于等于0
 * @param {number} [maxYearCount = 1] - 以当前年份为锚点，传入值需 大于等于0
 * @param {string} [formatPlaceholderDate = 'y-m-d'] - 自定义展示日期样式
 * @returns {Object} minDate = 最小日期 maxDate = 最大日期,currentDate = 当前选中日期数组,placeholderDate = 当前展示日期文案,showDatePicker = 是否打开Picker,onConfirm = 确定函数 ,onCancel = 取消函数
 */
export const useDatePicker = ({
  minYearCount = 1,
  maxYearCount = 1,
  formatPlaceholderDate = "y-m-d",
}: IOptions = {}): ResultObj => {
  const today = formatDate(new Date(), "y-m-d").split("-"); // 当前日期
  const thisYear = today[0]; // 当前年
  const thisMonth = today[1]; // 当前年
  const thisDay = today[2]; // 当前日
  const minDate = new Date(Number(thisYear) - minYearCount, 0, 1); // 最小年份为:1年前
  const maxDate = new Date(Number(thisYear) + maxYearCount, 11, 31); // 最大年份为：1年后
  const showDatePicker = ref(false);
  const placeholderDate = ref("");
  const currentDate = ref([thisYear, thisMonth, thisDay]);

  const setDefaultDate = (defaultDate: Date) => {
    const today = formatDate(defaultDate, "y-m-d").split("-");
    const thisYear = today[0]; // 当前年
    const thisMonth = today[1]; // 当前年
    const thisDay = today[2]; // 当前日
    placeholderDate.value = formatDate(defaultDate, formatPlaceholderDate);
    currentDate.value = [thisYear, thisMonth, thisDay];
  };

  const onConfirm = (e: any, callbackFn?: TApiFun, params?: any) => {
    console.log("【useDatePicker】onConfirm", e);
    showDatePicker.value = false;
    placeholderDate.value = formatDate(
      currentDate.value.join("-"),
      formatPlaceholderDate
    );
    callbackFn && callbackFn(params);
  };
  const onCancel = (e: any, callbackFn?: TApiFun, params?: any) => {
    console.log("【useDatePicker】onCancel", e);
    showDatePicker.value = false;
    placeholderDate.value = "";
    callbackFn && callbackFn(params);
  };

  return {
    minDate,
    maxDate,
    currentDate,
    placeholderDate,
    showDatePicker,
    onConfirm,
    onCancel,
    setDefaultDate,
  };
};
