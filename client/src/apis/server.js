import Taro from '@tarojs/taro';
import apiConfig from './apiConfig.js';

const { BASE_API, promisifyHttp } = apiConfig;

const serverApiMap = {
  add_server_data: { method: 'POST', url: 'add_server_data' },
  get_all_server_data: { method: 'POST', url: 'get_all_server_data' },
  set_warning_temperature: { method: 'POST', url: 'set_warning_temperature' },
};
/**
 * 添加服务器数据
 */
const add_server_data = promisifyHttp(Taro, BASE_API, serverApiMap['add_server_data']);
/**
 * 获得所有服务器数据，因为数量较少
 */
const get_all_server_data = promisifyHttp(Taro, BASE_API, serverApiMap['get_all_server_data']);
/**
 * 设置警戒温度
 */
const set_warning_temperature = promisifyHttp(
  Taro,
  BASE_API,
  serverApiMap['set_warning_temperature']
);

export { add_server_data, get_all_server_data, set_warning_temperature };
