import { random } from "@/utils/utils";
import * as qiniu from "qiniu-js";
import { request } from "@/api/request";

let TOKEN = "";

// 获取七牛token
export const getUploadToken = async () => {
  try {
    const { token } = await request({
      method: "get",
      url: "/ext/qn/upload_token/",
    });
    TOKEN = token;
  } catch (error) {
    console.log(error);
  }
};

const uploadQN = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    let url = "";
    try {
      const key = `${import.meta.env.VITE_QINIU_DIR}${random()}.${file.type.split("/")[1]}`;
      const observable = qiniu.upload(file, key, TOKEN);
      observable.subscribe({
        error: () => {
          reject();
        },
        complete: (res: any) => {
          url = `${import.meta.env.VITE_QINIU_URL}${res.key}`;
          resolve(url);
        },
      });
    } catch (error) {
      console.log(error);
    }
  });
};

export const useLoopUpload = async (fileArray: any[]): Promise<any> => {
  if (fileArray.length !== 0) {
    const proAll: any[] = [];

    fileArray.forEach(async (file) => {
      console.log("useLoopUpload=====>", file);
      let urlPro: any = null;
      if (!file.qiniu) {
        urlPro = uploadQN(file).then((url) => {
          file['qiniu'] = url
        });
        proAll.push(urlPro);
      }
    });

    await Promise.all(proAll);
  }

  return fileArray;
};
