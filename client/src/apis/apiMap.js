const apiMap = {
  get_all_data: { method: 'POST', url: 'get_all_data' },
};
/**
 * 统一管理全局api，默认方法为post
 * 后续还需要分模块引入再在入口文件统一柯里化
 */
export default apiMap;
