/**
 * 过滤taro页面跳转传参options中的__key_
 * 取出传参和前路由的路径如cusHardW以便redirect
 * @param route
 */
const getRouteParams = (route) => {
  //获取来者路径
  const fromPath = route[0].route.split('/')[1];
  //获取来者传参
  const params = route[1].options;
  //保存最终结果
  const res = {};
  //比较性能Object.keys().forEach()
  for (let k in params) {
    k !== '__key_' && (res[k] = params[k]);
  }
  return {
    params: res,
    fromPath,
  };
};
export default getRouteParams;
