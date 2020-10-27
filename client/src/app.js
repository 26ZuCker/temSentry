import Vue from 'vue';
import Taro from '@tarojs/taro';

import store from './store/index';

//taro自带长列表，建议场景不复杂的情况下采用触底和额外维护一个可视项的数组即可
/* import VirtualList from '@tarojs/components/virtual-list';
Vue.use(VirtualList); */

/* import getRouteParams from './utils/getRouteParams';
Vue.prototype.$getRouteParams = getRouteParams; */

Vue.prototype.$taro = Taro;

//import './app.scss';

const App = new Vue({
  store,
  /**
   * 进入小程序优先获取
   */
  async created() {
    if (process.env.TARO_ENV === 'weapp') {
      Taro.cloud.init();
      /* 
      await Taro.getStorage({
        key: 'openid',
        success: async function(res) {
          await store.dispatch('user/login');
        },
        fail: async function(error) {
          if (error === 'getStorage:fail data not found') {
            const [res1, res2] = await Promise.all([store.dispatch('user/getOpenid'), store.dispatch('user/getUser')]);
            console.log(res1);
            console.log(res2);
          } else {
            console.log(error);
          }
        },
      }); */
    }
  },
  onShow(options) {},
  render(h) {
    // this.$slots.default 是将要会渲染的页面
    return h('block', this.$slots.default);
  },
});

export default App;
