//上报错误
function submitError(data) {
  wx.request({
    url: config.api + 'wisdom/common/error/message.do',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    data,
  });
}
export default submitError;
