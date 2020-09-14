<template>
  <view class="index-container">
    <!-- 左侧边栏 -->
    <van-popup
      :show="isShowLeftBar"
      closeable
      close-icon="close"
      position="left"
      custom-style="height: 100%;width:40%"
      @close="onClose"
    >
      <left-bar :serverGroupList="serverGroupList" @onChooseServer="chooseServer"></left-bar>
    </van-popup>
    <!-- 顶部服务器名称和左侧按钮 -->
    <van-cell>
      <slot-view name="title">
        <van-icon :name="imgMore" size="1.5rem" @tap="showLeftBar" />
      </slot-view>
      <view class="index-server-title">{{server.name}}</view>
    </van-cell>
    <!-- 服务器状态点击拓展栏 -->
    <van-collapse :value="isShowDetail" @change="showDetail">
      <van-collapse-item name="1" title="工作室状态">
        <slot-view name="value">
          <van-icon :name="imgExclamation" />
        </slot-view>
        <!-- 展示当前服务器所属实验室即局域的整体信息，采用tag或进度条方式展示 -->
        <van-cell-group>
          <van-cell>
            <van-progress
              pivot-text="温度25"
              color="#07c160"
              custom-class="progress-position"
              percentage="25"
            />
          </van-cell>
          <van-cell>
            <van-progress
              pivot-text="湿度75"
              color="#ff976a"
              custom-class="progress-position"
              percentage="75"
            />
          </van-cell>
          <van-cell>
            <van-progress
              pivot-text="气压95"
              color="#ee0a24"
              custom-class="progress-position"
              percentage="95"
            />
          </van-cell>
        </van-cell-group>
      </van-collapse-item>
    </van-collapse>
    <!-- 当前服务器硬件主体，由于直接计算是否出问题，所以需要传递所属父的id以方便传入vuex -->
    <hardware
      @onWarn="getWarn"
      :hardwareList="server.hardwareList"
      :serverId="server.id"
      :serverGroupId="serverGroupId"
    ></hardware>
  </view>
</template>

<script>
//taro加载本地静态资源
import imgExclamation from '../../images/exclamation.png'
import imgMore from '../../images/more.png'
import Taro from '@tarojs/taro'
//获取定时任务配置
import scheduleConfig from '../../utils/schedule.js'
//获取api
import { serverGroupList, serverGroupInfo } from '../../apis/serverGroupList.js'
export default {
  components: {
    hardware: () => import('../../components/hardware'),
    LeftBar: () => import('../../components/LeftBar'),
  },
  data: () => ({
    //是否点击
    isShowDetail: false,
    isShowLeftBar: false,
    //taro载入的静态资源
    imgMore: imgMore,
    imgExclamation: imgExclamation,
    //从api中获取的服务器组整体，后续存入vuex
    serverGroupList: [],
    //当前选中显示的服务器所属的服务器组id
    serverGroupId: '',
    //当前选中显示的服务器，信息包括id，name，温度，阈值，remark
    server: {},
    //当前服务器组整体信息
    serverGroupInfo: {},
    //由hardware组件计算得出的出现问题的硬件及其所属的服务器和服务器组
    problemHardwareList: [],
  }),
  //监听下拉刷新
  onPullDownRefresh () {
    //手动实现下拉刷新
    //Taro.startPullDownRefresh()
    //获取完数据后停止下拉事件
    console.log('refresh now ...')
    Taro.request({
      url: ``,
      method: "POST",
      data,
      success: function (res) {
        this.hardwareList.push(res)
        Taro.stopPullDownRefresh()
      }
    })
  },
  //监听下拉触底事件，获取更多数据
  onReachBottom () {
    this.showMoreHardware()
    console.log('get more')
  },
  methods: {
    getWarn ({ serverId, serverGroupId, hardwareId }) {
      console.log(serverId + serverGroupId + hardwareId)
    },
    toCus () {
      this.$Taro.navigateTo({ url: '../cusHardw/cusHardw' })
    },
    onClose () {
      this.isShowLeftBar = false
      this.$Taro.showTabBar({ animation: true })
    },
    showLeftBar () {
      console.log('aa')
      this.isShowLeftBar = !this.isShowLeftBar
      this.$Taro.hideTabBar({ animation: true })
    },
    showDetail (e) {
      this.isShowDetail = e.detail
    },
    //建议同时传组id和服务器id以减少遍历，或通过规律定制名称，然后在前端解析
    chooseServer ({ serverId, groupId }) {
      this.server = this.serverGroupList
        .find(v => v.id === groupId).serverList
        .find(v => v.id === serverId)
    },
  },
  computed: {
    serverGroupInfoKeys () {
      return Object.keys(this.serverGroupInfo)
    }
  },
  async created () {
    const serverGroupList = []
    //初始化直接获取所有服务器组的信息，注意此时只包括id
    try {
      serverGroupList = await serverGroupList()
      if (serverGroupList.length) {
        //默认将当前服务器组内第一组的第一个服务器作为初始选择
        this.server = serverGroupList[0]['serverList'][0]
        this.hardwareList = this.server.hardwareList
        this.serverGroupId = serverGroupList[0].id
        this.serverGroupList = Object.freeze(serverGroupList)
        //当前服务器信息
        this.serverGroupInfo = serverGroupInfo
      }
    } catch (error) {
      console.log(error)
    }

  },
  //定时获取当前服务器所有硬件信息
  beforeMount () {
    setInterval(() => { })
  },
}
</script>
<style lang="scss">
@mixin wd() {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.index-server-title {
  font-weight: 500;
}
.index-server-allstatus {
  text-align: center;
  display: flex;
  justify-content: center;
}
.progress-position {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.index-btn-container {
  @include wd();
}
</style>