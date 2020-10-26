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
    <view class="user-tool-grid-container">
      <van-grid square column-num="2">
        <van-grid-item
          :icon="i.icon"
          :text="i.text"
          v-for="i in toolList"
          :key="i.id"
          :url="`/pages/${i.route}/${i.route}`"
        ></van-grid-item>
      </van-grid>
    </view>

    <view class="user-bottom-btn-container">
      <van-icon name="setting-o" size="2rem" color="green" />
    </view>
  </view>
</template>

<script>

export default {
  inheritAttrs: false,
  name: '',
  components: {

  },
  data: () => ({
    toolList: [],
    defaultSrc: '../../images/user-active.png',
    userInfo: null,
    username: ''
  }),
  props: {},
  methods: {
  },
  computed: {},
  watch: {},
  async created () {
    //后续改用mapActions内的统一管理
    //this.userInfo = {}
    this.toolList = [
      { id: 1, icon: 'orders-o', text: '填报申请', route: 'register' },
      { id: 2, icon: 'todo-list-o', text: '访问记录', route: 'record' },
    ]
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