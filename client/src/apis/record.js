import Taro from '@tarojs/taro';
import apiConfig from './apiConfig.js';

const { BASE_API, promisifyHttp } = apiConfig;

const recordApiMap = {
  get_day_record: { method: 'POST', url: 'get_day_record' },
  get_first_date_record: { method: 'POST', url: 'get_first_date_record' },
};

/**
 * 获取某一天的访问记录
 */
const get_day_record = promisifyHttp(Taro, BASE_API, recordApiMap['get_day_record']);
/**
 * 获取all time最早的访问记录的日期yyyy-mm-dd
 */
const get_first_date_record = promisifyHttp(Taro, BASE_API, recordApiMap['get_first_date_record']);

export { get_day_record, get_first_date_record };
