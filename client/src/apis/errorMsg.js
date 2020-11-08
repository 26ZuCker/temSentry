import Taro from '@tarojs/taro';
import apiConfig from './apiConfig.js';

const { BASE_API, promisifyHttp } = apiConfig;

const errorMsgApiMap = {
  get_error_msg: { method: 'POST', url: 'get_error_msg' },
};
/**
 * 返回错误信息
 */
const get_error_msg = promisifyHttp(Taro, BASE_API, errorMsgApiMap['get_error_msg']);
const errorCodeMap = {};
/**
 * 校验传入的自定义状态码
 * @param {number} code
 * @returns {boolean}
 */
const validateCode = (code) => Object.keys(errorCodeMap).includes(code);

export { get_error_msg, validateCode };
