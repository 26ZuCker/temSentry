import Taro from '@tarojs/taro';
import apiConfig from './apiConfig.js';

const { BASE_API, promisifyHttp } = apiConfig;

const errorMsgApiMap = {
  get_day_record: { method: 'POST', url: 'get_day_record' },
  get_earliest_record_timestamp: { method: 'POST', url: 'get_earliest_record_timestamp' },
};
/**
 * 获取某天所有来访记录
 */
const get_day_record = promisifyHttp(Taro, BASE_API, errorMsgApiMap['get_day_record']);
/**
 * 获取最早时间戳
 */
const get_earliest_record_timestamp = promisifyHttp(
  Taro,
  BASE_API,
  errorMsgApiMap['get_earliest_record_timestamp']
);

export { get_day_record, get_earliest_record_timestamp };
