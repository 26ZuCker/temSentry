import { validateCode } from './errorMsg.js';
/**
 * 封装Taro请求为promise
 */
const promisifyHttp = (Taro, BASE_API, { url, method }) => (data = {}) =>
  new Promise((resolve, reject) => {
    Taro.request({
      url: `${BASE_API}/${url}`,
      method: method,
      data: data,
      success: function (res) {
        resolve(res);
      },
      fail: function (error) {
        reject(error);
      },
    });
  });
/**
 * 响应拦截器
 * @param {Function} reqFn http请求
 * @param {Function} cb 回调
 */
const resInterceptor = async (reqFn, cb) => {
  try {
    const { code, data } = await reqFn();
    if (validateCode(code)) {
      cb(data);
      return Promise.resolve(data);
    }
    return Promise.reject();
  } catch (error) {
    return Promise.reject(error);
  }
};
/**
 * 基地址
 */
const BASE_API = 'http://192.168.43.75:5000';

export default {
  BASE_API,
  promisifyHttp,
  resInterceptor,
};
