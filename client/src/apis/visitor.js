import Taro from '@tarojs/taro';
import apiConfig from './apiConfig.js';

const { BASE_API, promisifyHttp } = apiConfig;

const errorMsgApiMap = {
  add_record: { method: 'POST', url: 'add_record' },
  confirm_record: { method: 'POST', url: 'confirm_record' },
  get_record_form: { method: 'POST', url: 'get_record_form' },
};
/**
 * 来访即添加来访记录
 */
const add_record = promisifyHttp(Taro, BASE_API, errorMsgApiMap['add_record']);
/**
 * 离开即确认来访记录
 */
const confirm_record = promisifyHttp(Taro, BASE_API, errorMsgApiMap['confirm_record']);
/**
 * 获取当前状态或填写表单
 */
const get_record_form = promisifyHttp(Taro, BASE_API, errorMsgApiMap['get_record_form']);
/**
 * 返回需要填写的模板
 */
const get_userInfo_template = () => {
  return {
    name: { title: '姓名', value: '' },
    college: { title: '学院', value: '' },
    class: { title: '班级', value: '' },
    reason: { title: '来访事由', value: '' },
    person_id: { title: '学号或工号', value: '' },
  };
};

export { add_record, confirm_record, get_userInfo_template, get_record_form };
