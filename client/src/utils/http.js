const promisifyPost = (BASE_API, Taro, url) => (data) =>
  new Promise((resolve, reject) => {
    Taro.request({
      url: BASE_API + url,
      method: 'POST',
      data: data,
      success: function(res) {
        resolve(res.data);
      },
      fail: function(error) {
        reject(error.errMsg);
      },
    });
  });
const promisifyGet = (BASE_API, Taro, url) => (data) =>
  new Promise((resolve, reject) => {
    Taro.request({
      url: `${BASE_API + url}/${params}`,
      method: 'GET',
      data: data,
      success: function(res) {
        resolve(res.data);
      },
      fail: function(error) {
        reject(error.errMsg);
      },
    });
  });
export { promisifyGet, promisifyPost };
