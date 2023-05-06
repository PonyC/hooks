import { ref, type Ref } from "vue";
import { formatDate } from "@/libs/utils";

type TApiFun = (params: any) => Promise<any> | void;

// 入参格式
export interface IOptions {
  minMonthCount?: number;
  maxMonthCount?: number;
  formatPlaceholderDate?: string;
  [key: string]: any;
}

// 返回数据格式
export interface IResultObj {
  minDate: Date;
  maxDate: Date;
  currentDate: Ref<Date[] | null>;
  placeholderDate: Ref<string>;
  customDate: Ref<string>;
  calendarShow: Ref<boolean>;
  onConfirm: (e: any, fn?: TApiFun, params?: any[]) => Promise<any> | void;
  onCancel: (e: any, fn?: TApiFun, params?: any[]) => Promise<any> | void;
  setDefaultDate: (defaultDate: string) => void;
}

/**
 * 日期区间选择
 * @param {number} [minMonthCount = -3] - 以当前月份为锚点，传入值需 小于等于0
 * @param {number} [maxMonthCount = 3] - 以当前月份为锚点，传入值需 大于等于0
 * @param {string} [formatPlaceholderDate = 'y-m-d'] - 自定义展示日期样式
 * @returns {Object} minDate = 最小日期 maxDate = 最大日期,currentDate = 当前选中日期数组,placeholderDate = 当前展示日期文案,showDatePicker = 是否打开Picker,onConfirm = 确定函数 ,onCancel = 取消函数
 */
export const useCalendar = ({
  minMonthCount = -3,
  maxMonthCount = 3,
  formatPlaceholderDate = "y-m-d",
}: IOptions = {}): IResultObj => {
  if (minMonthCount > 0) {
    throw new Error("minDateCount must >= 0");
  }
  if (maxMonthCount < 0) {
    throw new Error("minDateCount must <= 0");
  }
  // 月份数量过多会导致渲染问题，这里默认最大区间不可超过6
  if (maxMonthCount - Math.abs(minMonthCount) > 6) {
    throw new Error("月份数量过多会导致渲染问题，日期参数请保持在总共6个月内");
  }
  const setMonth = (count: number) => {
    const curDate = new Date(); // 当前日期
    return curDate.setMonth(curDate.getMonth() + Number(count));
  };
  const minDate = new Date(setMonth(minMonthCount)); // 最小月份为:3个月前
  const maxDate = new Date(setMonth(maxMonthCount)); // 3个月后
  const calendarShow = ref(false); // 日期组件显示状态
  const placeholderDate = ref(""); // 展示的日期
  const customDate = ref(""); // formatPlaceholderDate参数传入的格式
  const currentDate = ref<Date[] | null>(null); // 组件的日期格式

  currentDate.value = [new Date(), new Date()];

  const setDefaultDate = (defaultDate: string) => {
    const arr = defaultDate.split("~");
    placeholderDate.value = defaultDate;
    customDate.value = `${formatDate(
      arr[0],
      formatPlaceholderDate
    )}~${formatDate(arr[1], formatPlaceholderDate)}`;
    const start = new Date(arr[0]);
    const end = new Date(arr[1]);
    currentDate.value = [start, end];
  };

  const onConfirm = (e: any, fun?: TApiFun, params?: any) => {
    const [start, end] = e;
    currentDate.value = e;
    calendarShow.value = false;
    placeholderDate.value = `${formatDate(start, "y-m-d")}~${formatDate(
      end,
      "y-m-d"
    )}`;
    customDate.value = `${formatDate(
      start,
      formatPlaceholderDate
    )}~${formatDate(end, formatPlaceholderDate)}`;
    fun && fun(params);
  };

  const onCancel = (e: any, fun?: TApiFun, params?: any) => {
    calendarShow.value = false;
    placeholderDate.value = "";
    customDate.value = "";
    currentDate.value = [new Date(), new Date()];
    fun && fun(params);
  };

  return {
    minDate,
    maxDate,
    currentDate,
    placeholderDate,
    customDate,
    calendarShow,
    onConfirm,
    onCancel,
    setDefaultDate,
  };
};
