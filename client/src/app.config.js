export default {
  pages: ['pages/index/index', 'pages/user/user', 'pages/visitor/visitor'],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    //后续实现自定义顶部nav
  },
  cloud: true,
  //后续需要为所有分包页面增加骨架屏
  subpackages: [
    {
      root: 'pages/cusHardw',
      pages: ['cusHardw'],
    },
    {
      root: 'pages/record',
      pages: ['record'],
    },
  ],
  //后续实现自定义底部tabbar
  tabBar: {
    list: [
      {
        pagePath: 'pages/index/index',
        text: 'server',
        iconPath: './images/server.png',
        selectedIconPath: './images/server-active.png',
      },
      {
        pagePath: 'pages/user/user',
        text: 'user',
        iconPath: './images/user.png',
        selectedIconPath: './images/user-active.png',
      },
    ],
    color: '#000',
    selectedColor: '#56abe4',
    backgroundColor: '#fff',
    borderStyle: 'white',
  },
  /*   usingComponents: {
    'van-button': './components/vant-weapp/dist/button/index',
    'van-tag': './components/vant-weapp/dist/tag/index',
    'van-cell': './components/vant-weapp/dist/cell/index',
  }, */
};
