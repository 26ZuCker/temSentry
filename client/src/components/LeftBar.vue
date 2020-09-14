<template>
  <view class="left-bar-container">
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
    <!-- 此处的value绑定为数组，其中的值为item的name -->
    <van-collapse
      :value="currentServerGroupIds"
      @change="changeServerGroupId"
      v-for="serverGroup in serverGroupList"
      :key="serverGroup.id"
    >
      <van-collapse-item :title="serverGroup.name" :name="serverGroup.id">
        <view v-for="server in serverGroup.serverList" :key="server.id" class="user-server-hover">
          <van-button
            custom-style="width:85%;"
            :type="activeClass(server.id)"
            @tap="chooseServer(server.id,serverGroup.id)"
          >{{server.name}}</van-button>
          <van-icon :name="imgExclamation" color="orange" />
        </view>
        <slot-view name="value">
          <van-icon :name="imgExclamation" color="orange" size="1.5rem" />
        </slot-view>
      </van-collapse-item>
    </van-collapse>
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
  name: '',
  components: {},
  data: () => ({
    currentServerId: 'sg1s1',
    currentServerGroupIds: ['sg1'],
    searchInput: '',
    //额外维护一个需要预警的服务器id数组而无需总是使用computed
    hasProblem: [],
    imgExclamation: imgExclamation
  }),
  props: {
    //后续需要优化不需要传递完整的服务器组
    serverGroupList: { type: Array, default: [] }
  },
  methods: {
    changeServerGroupId (e) {
      this.currentServerGroupIds = e.detail
    },
    //通知父组件更改显示
    chooseServer (serverId, groupId) {
      this.currentServerId = serverId
      const res = { serverId, groupId }
      this.$emit('onChooseServer', res)
    },
    toCus () {
      this.$Taro.navigateTo({ url: '../cusHardw/cusHardw' })
    },
  },
  computed: {
    /*     hasProblem () {
          return function (server) {
            //可能传递一个服务器数组或只传递一个服务器id
            const isArray =
              Array.isArray ?? (arg => Object.prototype.toString.call(arg) === "[object Array]")
            if (isArray(server)) {
              server.forEach(v => {
    
              })
            } else {
    
            }
            const percent = ((status / threshold) * 100) | 0
            return percent > 70
          }
        }, */
    activeClass () {
      return function (id) {
        return this.currentServerId === id ? 'primary' : 'default'
      }
    }
  },
  created () {
    console.log(this.serverGroupList)
  },
}
</script>

<style lang='scss' >
@mixin wd() {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
$green: #07c160;

.left-bar-title-container {
  @include wd();
}
.left-bar-btn-container {
  @include wd();
}
.left-bar-title-avatar {
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
}
.user-server-active {
  padding-left: 1rem;
  padding-bottom: 0.5rem;
  margin: 0.1rem;
  border-left: 0.3rem $green solid;
  background-color: #dededebb;
  text-align: center;
  align-self: center;
  font-weight: 400;
}
</style>