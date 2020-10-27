<template>
  <view class="user-container">
    <!-- 顶部头像和用户名 -->
    <view class="user-title-container">
      <image
        src="https://img.yzcdn.cn/vant/cat.jpeg"
        mode="aspectFill"
        :lazy-load="true"
        class="user-title-avatar"
      />username
    </view>

    <view class="user-bottom-btn-container">
      <!-- 默认进入小程序即要获取信息和登录，所以不存在登出逻辑 -->
      <button type="primary" v-if="!isLogin" @tap="login">登陆</button>
      <template v-else @tap="toRecord">
        <van-icon name="todo-list-o" size="2rem" color="green" />
        <view style="color: green">访问记录</view>
        <button type="warning" @tap="log">登出</button>
      </template>
    </view>
  </view>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
export default {
  inheritAttrs: false,
  name: '',
  data: () => ({
    //toolList: [],
    defaultSrc: '../../images/user-active.png',
    username: ''
  }),
  props: {},
  methods: {
    toRecord () {
      this.$taro.navigateTo({ url: '../record/record' })
    },
    ...mapActions({
      login: 'user/login',
      logout: 'user/logout',
    })
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo
    }),
    ...mapGetters({
      isLogin: 'user/isLogin'
    })
  },
  watch: {},
  async created () {
    //后续改用mapActions内的统一管理
    //this.userInfo = {}
    /*   this.toolList = [
        { id: 1, icon: 'orders-o', text: '填报申请', route: 'register' },
        { id: 2, icon: 'todo-list-o', text: '访问记录', route: 'record' },
      ] */
  }
}
</script>

<style lang='scss' >
@mixin wd($direction: column) {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: $direction;
}
page {
  height: 100%;
}
.user-container {
  @include wd();
  height: 100%;
}
.user-main {
  @include wd();
}
.user-title-container {
  @include wd();
}
.user-bottom-btn-container {
  @include wd();
  margin: 1rem 1rem 1rem 1rem;
}
.user-tool-grid-container {
  width: 100%;
}
.user-title-avatar {
  border-radius: 50%;
  width: 10rem;
  height: 10rem;
}
</style>