import Taro from '@tarojs/taro';
import apiMap from './apiMap.js';
import promisifyHttp from './promisifyHttp.js';

const BASE_API = 'http://192.168.43.224:8000';

//const get_all_data = http(Taro, BASE_API, apiMap.get_all_data);

const allApis = {};

for (let key in apiMap) {
  allApis[key] = promisifyHttp(Taro, BASE_API, apiMap[key]);
}
/**
 * 有待解决：
 * 1.是否export都会缓存一遍？是则后续应该不设置入口文件而改为逐个模块export
 * 2.是否需要在created内import().then({a, b})再注入data？这样对页面性能是否会有影响
 */
export default allApis;
