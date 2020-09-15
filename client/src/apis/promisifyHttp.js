/**
 * 统一promise封装请求
 */
const promisifyHttp = (Taro, BASE_API, { url, method }) => (data = {}) =>
  new Promise((resolve, reject) => {
    Taro.request({
      url: `${BASE_API}/${url}`,
      method: method,
      data: data,
      success: function(res) {
        resolve(res);
      },
      fail: function(error) {
        reject(error);
      },
    });
  });

export default promisifyHttp;
