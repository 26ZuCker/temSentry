import Vue from 'vue';
import Taro from '@tarojs/taro';

import store from './store/index';

import VirtualList from '@tarojs/components/virtual-list';
Vue.use(VirtualList);

import getRouteParams from './utils/getRouteParams';
import promisify from './utils/promisify';
Vue.prototype.$Taro = Taro;
Vue.prototype.$promisify = promisify;
Vue.prototype.$getRouteParams = getRouteParams;

//import './app.scss';

const App = new Vue({
  store,
  mounted() {
    if (process.env.TARO_ENV === 'weapp') {
      Taro.cloud.init();
    }
  },
  onShow(options) {},
  render(h) {
    // this.$slots.default 是将要会渲染的页面
    return h('block', this.$slots.default);
  },
});

export default App;
