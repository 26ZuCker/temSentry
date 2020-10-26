import Taro from '@tarojs/taro';
import apiConfig from './apiConfig.js';

const { BASE_API, promisifyHttp } = apiConfig;

const registerApiMap = {
  post_register: { method: 'POST', url: 'post_register' },
};

const post_register = promisifyHttp(Taro, BASE_API, registerApiMap['post_register']);

export { post_register };
