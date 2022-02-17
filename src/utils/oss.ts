import { message } from 'antd';
import moment from 'moment';
import OSS from 'ali-oss';
import get from 'lodash/get';
import { getOssTokenService, getSignUrlService } from '@/services/oss';
import { ossStorage } from './storage';

// 生成随机数
const getRandom = (len: any) => {
  len = len || 32;
  const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  const maxPos = chars.length;
  let pwd = '';
  for (let i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
};

const uploadPath = (fileType: any, path: any) => {
  // fileType是文件类型 png,jpg,mp3等
  const dataTime = moment(Date.now()).format('YYYYMMDDHHmmss');
  const ran = getRandom(12);
  return `${path}/${dataTime}${ran}.${fileType}`;
};

// oss客户端初始化
const client = (ossData: any) => new OSS({
  accessKeyId: ossData.accessKeyId,
  accessKeySecret: ossData.accessKeySecret,
  stsToken: ossData.stsToken,
  bucket: ossData.bucket,
  endpoint: ossData.endpoint,
});

const getBlobBydataURI = (dataURI: any, type: any) => {
  const binary = atob(dataURI.split(',')[1]);
  const array = [];
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], { type });
};

const uploadFileToOss = (
  ossData: any,
  path: any,
  file: any,
  fileType: any,
  callback: any,
) => {
  const url = uploadPath(fileType, path);
  client(ossData)
    .multipartUpload(url, getBlobBydataURI(file, fileType), {})
    .then(async (data) => {
      const unSignUrl = get(data, 'name', '');
      try {
        const signUrlData = await getSignUrlService(unSignUrl);
        if (signUrlData.code !== 200) {
          throw new Error(signUrlData.msg);
        }
        const urlPath = get(signUrlData, 'data.sign_url', '');
        callback(urlPath);
      } catch (error) {
        console.log(error);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const saveImageToOss = async (base64Data, callback) => {
  try {
    let oss_token = JSON.parse(ossStorage.getItem('oss_token') || 'null');
    if (!oss_token || new Date().getTime() > oss_token.expire_time) {
      const { code, data: ossToken } = await getOssTokenService('imgshot');
      if (code === 200) {
        oss_token = ossToken;
        ossStorage.setItem('oss_token', JSON.stringify(ossToken));
      }
    }
    if (oss_token && new Date().getTime() < oss_token.expire_time) {
      uploadFileToOss(oss_token, oss_token.path, base64Data, 'png', (res: any) => {
        callback(res);
      });
    } else {
      message.warning('oss token失效');
    }
  } catch (error) {
    console.log(error);
  }
};

export default {};
