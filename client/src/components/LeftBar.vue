<template>
  <!-- 目前左侧边栏不考虑转换为函数式组件因为整体数据过于庞大不适合每次都根据prop传值来更改状态，其中的每一项可以采用函数式组件 -->
  <view class="left-bar-container" v-if="server_id">
    <!-- 左侧边栏顶部头像 -->
    <view class="left-bar-title-container">
      <image
        src="https://img.yzcdn.cn/vant/cat.jpeg"
        mode="aspectFill"
        :lazy-load="true"
        class="left-bar-title-avatar"
      />username
      <van-search :value="searchInput" placeholder="服务器名称" shape="round" />
    </view>
    <view class="server-item">
      <view
        v-for="server in server_group.server_groups"
        :key="server.server_id"
        :class="activeClass(server.server_id)"
      >
        <text
          class="left-bar-item-title"
          @tap="chooseServer(server.server_id, server_group.server_group_id)"
          >{{ server.server_name }}</text
        >
        <van-icon
          :name="imgExclamation"
          color="orange"
          v-if="toBool(server.is_alarm)"
        />
      </view>

      <van-icon
        :name="imgExclamation"
        color="orange"
        size="1.5rem"
        v-if="toBool(server_group.is_alarm)"
      />
    </view>

    <!-- 底部额外增加需要监控的服务器 -->
    <!--     <view class="left-bar-btn-container">
      <van-icon name="add-o" size="2rem" color="green" @tap="toCus" />
    </view>-->
  </view>
</template>

<script>
import imgExclamation from '../images/exclamation.png'
export default {
  inheritAttrs: false,
  components: {},
  data: () => ({
    //当前选中的服务器和服务器组id
    current_server_id: '',
    current_server_group_id: [],
    searchInput: '',
    //额外维护一个需要预警的服务器id数组而无需总是使用computed
    hasProblem: [],
    imgExclamation: imgExclamation
  }),
  props: {
    //后续需要优化不需要传递完整的服务器组
    server_groups_data: { type: Array, default: null },
    server_group_id: { type: String, default: null },
    server_id: { type: String, default: null },
  },
  computed: {
    activeClass () {
      return function (server_id) {
        return this.current_server_id === server_id ? 'btn-container btn-active' : 'btn-container btn-unvisited'
      }
    },
    toBool () {
      return function (strBool) {
        return strBool === 'true'
      }
    },
  },
  //由于父组件异步获取数据所以只能监听prop来改变子组件内的data
  watch: {
    server_id: {
      handler (n, o) {
        this.current_server_id = n
      }, immediate: true
    },
    server_group_id: {
      handler (n, o) {
        this.current_server_group_id.push(n)
      }
    }
  },
  methods: {
    changeServerGroupId (e) {
      this.current_server_group_id = e.detail
    },
    //通知父组件更改显示
    chooseServer (server_id, server_group_id) {
      this.current_server_id = server_id
      const res = { server_id, server_group_id }
      this.$emit('onChooseServer', res)
    },
    /* toCus () {
      this.$taro.navigateTo({ url: '../cusHardw/cusHardw' })
    }, */
  },
  //由于初始化即刚进入程序时index页面也是默认显示第一个组的第一个服务器
  created () {

  }
}
</script>

<style lang='scss' >
@mixin wd($direction: column, $justify-content: center) {
  display: flex;
  flex-direction: $direction;
  justify-content: $justify-content;
  align-items: center;
}
.van-collapse-item__content {
  padding: 0px !important;
}
.btn-container {
  @include wd(row, space-around);
  color: #000000;
  padding-top: 0.5rem;
  padding-left: 0.5rem;
  padding-bottom: 0.5rem;
  font-size: 1rem;
}
.btn-active {
  border-left: #07c160 0.5rem solid;
  background-color: #dededebb;
}
.btn-unvisited {
  border-left: #ffffff 0.5rem solid;
  padding-left: 0.5rem;
}
.left-bar-title-container {
  @include wd();
}
.left-bar-title-avatar {
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
}
.left-bar-item-title {
  width: 100%;
}
.server-item {
  @include wd(row, flex-start);
}
</style>