<template>
  <view class="index-container">
    <!-- 下拉刷新loading -->
    <view v-if="isTop"></view>
    <!-- 左侧边栏 -->
    <van-popup
      :show="isShowLeftBar"
      closeable
      close-icon="close"
      position="left"
      custom-style="height: 100%;width:40%"
      @close="onClose"
    >
      <!-- 
      处于性能考虑，此处建议在index统一遍历一趟数据后再传入新数组侧边栏
      传入server_id和server_group_id用于初始化选中 
      -->
      <left-bar
        :server_id="server.server_id"
        :server_list="all_data"
        @onChooseServer="chooseServer"
      ></left-bar>
    </van-popup>
    <!-- 顶部服务器名称和左侧按钮，原生固定顶部的粘性组件 -->
    <van-sticky>
      <van-cell>
        <slot-view name="title">
          <van-icon :name="imgMore" size="1.5rem" @tap="showLeftBar" />
        </slot-view>
        <view class="index-server-title">{{ server.server_name }}</view>
      </van-cell>
    </van-sticky>
    <!-- 当前服务器硬件主体，由于直接计算是否出问题，所以需要传递所属父的id以方便传入vuex
    注意此处传入应当为可视区内的数组然后只在父组件内刷新传入子组件内的props-->
    <view v-for="hardware in hardwareArr" :key="hardware.id">
      <hardware
        :hardware="hardware"
        @tap="toCusHardW(hardware.id)"
        :server_id="server.server_id"
      ></hardware>
    </view>
    <!-- 触底加载更多loading -->
    <view v-if="isBottom">loading...</view>
  </view>
</template>

<script>
//taro加载本地静态资源
//import imgExclamation from '../../images/exclamation.png'
import imgMore from '../../images/more.png'
//获取定时任务配置
import scheduleConfig from '../../utils/schedule.js'
//获取api
import {
  get_all_data, get_computer_room_data, get_hardware_data,
  get_server_data,
  //
  get_all_server_data,
} from '@api/server.js'

//由于左侧边栏载入数据量过大则采用taro的预渲染该组件
import LeftBar from '../../components/LeftBar'

export default {
  components: {
    hardware: () => import('@com/hardware'),
    LeftBar: LeftBar,
    Progress: () => import('@com/Progress')
  },
  data: () => ({
    //组件显示项
    isShowDetail: false,
    isShowLeftBar: false,
    isBottom: false,
    isTop: false,
    imgMore: imgMore,
    all_data: [],
    server: {},
    //首屏渲染
    isMounted: false,
    //定时任务
    timer: null
  }),
  methods: {
    onClose () {
      this.isShowLeftBar = false
      this.$taro.showTabBar({ animation: true })
    },
    /**
     * 初始化直接获取所有服务器组的信息，注意此时只包括id
     */
    async get_all_data () {
      try {
        const all_data = (await get_all_server_data).data
        if (all_data) {
          this.all_data = all_data
          this.server = all_data[0]
        } else {
          console.log('http fail')
        }
      } catch (error) {
        console.log(error)
      }
    },
    showLeftBar () {
      this.isShowLeftBar = !this.isShowLeftBar
      this.$taro.hideTabBar({ animation: true })
    },
    showDetail (e) {
      this.isShowDetail = e.detail
    },
    chooseServer (server_id) {
      this.server = this.all_data.find(v => v.server_id === server_id)
    },
  },
  computed: {
    //整合目前后端传回的数据格式为cpu_list和gpu_list分开为一个数组
    //后续需要在hardware内并且改变组件的格式这样不用重复在遍历整个server数组
    hardwareArr () {
      const hardwares = this.server.hardwares
      const res = []
      //注意第一层遍历为list
      for (let key in hardwares) {
        res.push(...hardwares[key])
      }
      return res
    },
  },
  async created () {
    //注意此处由于get_all_data内部已经是await所以此处即created不能在来一层await否则会提前传空值给子组件
    await this.get_all_data()
  },
  //定时获取当前服务器所有硬件信息
  async mounted () {
    //为了自定义取消该定时任务所以注入data
    this.timer = setInterval(async () => {
      await this.refresh()
    }, scheduleConfig.period)
    //beforeDestroy时即destroy前消除定时器
    this.$once('hook:beforeDestroy', () => {
      clearInterval(this.timer)
    })
    /* this.$taro.nextTick(() => {
      this.isMounted = false
    }) */
  },
}
</script>
<style lang="scss">
.index-server-title {
  font-weight: 500;
}
.progress-position {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>