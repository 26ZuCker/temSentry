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

    <view class="user-bottom-btn-container" @tap="toRecord">
      <!-- 默认进入小程序即要获取信息和登录，所以不存在登出逻辑，此处默认在初始化生命周期内进行登录所以不存在手动登录 -->
      <van-icon name="todo-list-o" size="2rem" color="green" />
      <view style="color: green; margin-bottom: 1.5rem">访问记录</view>
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
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo
    }),
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
@import url("./user.scss");
</style>