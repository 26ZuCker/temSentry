const config = {
  projectName: 'taroFace',
  date: '2020-9-11',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  defineConstants: {},
  //直接复制某些组件库而不经过转换
  copy: {
    patterns: [
      { from: 'src/components/vant-weapp/dist', to: 'dist/components/vant-weapp/dist' },
      //{ from: 'src/components/vant-weapp/dist/wxs', to: 'dist/components/vant-weapp/dist/wxs' },
    ],
    options: {},
  },
  framework: 'vue',
  mini: {
    postcss: {
      pxtransform: {
        enable: true,

        config: {
          //由于taro默认小程序使用单位转换为rpx而vant使用px所以需要禁止转换
          selectorBlackList: [/^.van-.*?$/],
        },
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'));
  }
  return merge({}, config, require('./prod'));
};
