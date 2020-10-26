import Taro from '@tarojs/taro';
import apiConfig from './apiConfig.js';

const { BASE_API, promisifyHttp } = apiConfig;

const serverApiMap = {
  get_all_data: { method: 'POST', url: 'get_all_data1' },
  get_server_data: { method: 'POST', url: 'get_server_data' },
  get_hardware_data: { method: 'POST', url: 'get_hardware_data' },
  get_computer_room_data: { method: 'POST', url: 'get_computer_room_data' },
  save_hardware_data: { method: 'POST', url: 'save_hardware_data' },
  //
  add_server_data: { method: 'POST', url: 'add_server_data' },
  get_all_server_data: { method: 'POST', url: 'get_all_server_data' },
  set_warning_temperature: { method: 'POST', url: 'set_warning_temperature' },
};

const get_all_data = promisifyHttp(Taro, BASE_API, serverApiMap['get_all_data']);
const get_server_data = promisifyHttp(Taro, BASE_API, serverApiMap['get_server_data']);
const get_hardware_data = promisifyHttp(Taro, BASE_API, serverApiMap['get_hardware_data']);
const get_computer_room_data = promisifyHttp(Taro, BASE_API, serverApiMap['get_computer_room_data']);
const save_hardware_data = promisifyHttp(Taro, BASE_API, serverApiMap['save_hardware_data']);

//
const add_server_data = promisifyHttp(Taro, BASE_API, serverApiMap['add_server_data']);
const get_all_server_data = promisifyHttp(Taro, BASE_API, serverApiMap['get_all_server_data']);
const set_warning_temperature = promisifyHttp(Taro, BASE_API, serverApiMap['set_warning_temperature']);

export {
  add_server_data,
  get_all_server_data,
  set_warning_temperature,
  //
  get_all_data,
  get_computer_room_data,
  get_hardware_data,
  get_server_data,
  save_hardware_data,
};
