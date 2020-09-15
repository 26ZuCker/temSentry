<template>
  <view class="index-container">
    <!-- 下拉刷新loading -->
    <view v-show="isTop">loading...</view>
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
        :server_groups_data="server_groups_data"
        :server_id="server.server_id"
        :server_group_id="server_group_id"
        @onChooseServer="chooseServer"
      ></left-bar>
    </van-popup>
    <!-- 顶部服务器名称和左侧按钮 -->
    <van-cell>
      <slot-view name="title">
        <van-icon :name="imgMore" size="1.5rem" @tap="showLeftBar" />
      </slot-view>
      <view class="index-server-title">{{server.server_name}}</view>
    </van-cell>
    <!-- 服务器状态点击拓展栏 -->
    <van-collapse :value="isShowDetail" @change="showDetail">
      <van-collapse-item name="1" title="实验室状态">
        <slot-view name="value">
          <van-icon :name="imgExclamation" v-show="isRoomAlarm" />
        </slot-view>
        <!-- 展示当前服务器所属实验室即局域的整体信息，采用tag或进度条方式展示 -->
        <van-cell-group v-for="data in computer_room_dataArr" :key="data.id">
          <van-cell>
            <van-progress
              :pivot-text="roomText(data.name,data.status)"
              :color="stateColor(data.status)"
              custom-class="progress-position"
              :percentage="data.status"
            />
          </van-cell>
        </van-cell-group>
      </van-collapse-item>
    </van-collapse>
    <!-- 当前服务器硬件主体，由于直接计算是否出问题，所以需要传递所属父的id以方便传入vuex -->
    <view v-for="hardware in hardwareArr" :key="hardware.id">
      <hardware :hardware="hardware"></hardware>
    </view>
    <!-- 触底加载更多loading -->
    <view v-show="isBottom">loading...</view>
  </view>
</template>

<script>
//taro加载本地静态资源
import imgExclamation from '../../images/exclamation.png'
import imgMore from '../../images/more.png'
//获取定时任务配置
import scheduleConfig from '../../utils/schedule.js'
//获取api
import allApis from '../../apis/initApi.js'

//由于左侧边栏载入数据量过大则采用taro的预渲染该组件
import LeftBar from '../../components/LeftBar'

export default {
  components: {
    hardware: () => import('../../components/hardware'),
    LeftBar
  },
  data: () => ({
    //组件显示项
    isShowDetail: false,
    isShowLeftBar: false,
    //是否展示下拉和触底的loading图标
    isBottom: false,
    isTop: false,
    //taro载入的静态资源
    imgMore: imgMore,
    imgExclamation: imgExclamation,
    //数据项
    //从api中获取的服务器组整体，后续存入vuex
    server_groups_data: [],
    //当前选中显示的服务器所属的服务器组id
    server_group_id: '',
    //当前选中显示的服务器，信息包括id，name，温度，阈值，remark
    server: {},
    //当前多个服务器组的整体信息
    computer_room_data: {},
    //首屏渲染
    isMounted: false
    //当前页面用到的api

  }),
  methods: {
    onClose () {
      this.isShowLeftBar = false
      this.$Taro.showTabBar({ animation: true })
    },
    async refresh () {
      //初始化直接获取所有服务器组的信息，注意此时只包括id
      try {
        const all_data = (await allApis.get_all_data()).data
        if (all_data) {
          //注意server_groups_data为数组
          this.server_groups_data = all_data.server_groups_data
          //默认将当前服务器组内第一组的第一个服务器作为初始选择
          this.server_group_id = this.server_groups_data[0]?.server_group_id
          this.server = this.server_groups_data[0]?.server_groups[0]
          //当前服务器信息
          this.computer_room_data = all_data.computer_room_data
        } else {
          console.log('http fail')
        }
      } catch (error) {
        console.log(error)
      }
    },
    showLeftBar () {
      this.isShowLeftBar = !this.isShowLeftBar
      this.$Taro.hideTabBar({ animation: true })
    },
    showDetail (e) {
      this.isShowDetail = e.detail
    },
    //建议同时传组id和服务器id以减少遍历，或通过规律定制名称，然后在前端解析
    chooseServer ({ server_id, server_group_id }) {
      this.server = this.server_groups_data
        .find(v => v.server_group_id === server_group_id).server_groups
        .find(v => v.server_id === server_id)
    },
  },
  computed: {
    //进度条颜色
    stateColor () {
      return function (status, threshold = 100) {
        const percent = ((status / threshold) * 100) | 0
        return percent < 70 ? '#07c160' : (percent < 100 ? '#ff976a' : '#ee0a24')
      }
    },
    //转换json格式的实验室整体信息为数组
    computer_room_dataArr () {
      const res = []
      //注意此处只保存地址所以理论上占用空间小
      const data = this.computer_room_data
      Object.keys(data).forEach((v, i) => {
        res.push(
          { id: i, name: v, status: data[v] }
        )
      })
      return res
    },
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
    roomText () {
      return function (name, status) {
        return `${name}-${status}`
      }
    },
    //整个实验室的信息是否出现问题
    isRoomAlarm () {
      return this.computer_room_dataArr.some(v => v.status > 100)
    }
  },
  /**
   * taro的vue使用以下生命周期即可
   * @method onReady 首次渲染完毕后执行，在vue内用mounted代替
   * @method onLoad(options) 页面创建后执行
   * @method created 
   * @method mounted
   * @method beforeUpdate
   * @method updated @param prevProps @param prevState
   * @method beforeDestroy 页面卸载时触发，如 redirectTo 或 navigateBack 到其他页面时
   * @method onShow
   * @method onHide
   * 以下为监听事件
   * @method onPullDownRefresh
   * @method onReachBottom
   * @method onPageScroll(object)
   */
  async created () {
    this.refresh()
    console.log(this.computer_room_data)
  },
  mounted () {
    this.$Taro.nextTick(() => {
      this.isMounted = false
    })
  },
  //定时获取当前服务器所有硬件信息
  /*   beforeMount () {
      setInterval(async () => {
        await this.refreshHardware()
      }, scheduleConfig.period)
    }, */
  //监听下拉刷新
  async onPullDownRefresh () {
    //手动实现下拉刷新
    //Taro.startPullDownRefresh()
    //获取完数据后停止下拉事件
    console.log('refresh now ...')
    this.isTop = true
    await this.refresh()
    Taro.stopPullDownRefresh()
    this.isTop = false
  },
  //监听下拉触底事件，获取更多数据
  /*   onReachBottom () {
      this.isBottom = true
      console.log('get more')
      await this.showMoreHardware()
      this.isBottom = false
    }, */
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