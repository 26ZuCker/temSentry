import Taro from '@tarojs/taro';
import { promisifyGet, promisifyPost } from '../utils/http';
const BASE_API = 'http://localhost:3000';

/**
 * 上传改变的某个服务器硬件信息，需要传递服务器id
 */
const postHardware = promisifyPost(BASE_API, Taro, '/postHardware');
/**
 * 用于初始化获取所有服务器组即所有服务器及其硬件信息
 */
const postServerGroup = promisifyPost(BASE_API, Taro, '/postHardware');
export { postHardware, postServerGroup };
