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
  async created() {
    if (process.env.TARO_ENV === 'weapp') {
      Taro.cloud.init();
      //进入小程序先获取openid并根据是否已存入数据库判断是否仍需要登录或填写该问卷
      try {
        if (!(await Taro.getStorage('openid'))) {
          await store.dispatch('user/getOpenid');
        }
        await store.dispatch('user/login');
      } catch (error) {
        Taro.onError(() => {
          console.log(error);
        });
      }
    }
  },
  onShow(options) {},
  render(h) {
    // this.$slots.default 是将要会渲染的页面
    return h('block', this.$slots.default);
  },
});

export default App;
