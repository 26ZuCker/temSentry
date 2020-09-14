<template>
  <view class="hardware-container">
    <!-- 主体 -->
    <view v-if="isLoading" class="hardware-loading">
      <van-loading type="spinner" color="#07c160" />
    </view>
    <view v-else>
      <van-cell v-for="i in hardwareList" :key="i.id" @tap="toCusHardW(i.id)">
        <slot-view name="title" class="hardware-title">
          <view class="van-cell-text">{{i.name}}</view>
          <van-tag
            mark
            :color="thresholdColor(i.status,i.threshold,i.id)"
            size="medium"
            class="hardware-title-tag"
          >{{i.status}}/{{i.threshold}}</van-tag>
        </slot-view>
        <slot-view name="label">{{i.remark}}</slot-view>
        <van-circle
          stroke-width="6"
          :value="i.status"
          layer-color="#eeeeee"
          :color="thresholdColor(i.status,i.threshold)"
        >{{percent(i.status,i.threshold)}} %</van-circle>
      </van-cell>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'

export default {
  inheritAttrs: false,
  name: '',
  components: {},
  data: () => ({
    //由于此处是必定需要计算是否超过阈值的组件所以只在此通过hash保存出现问题的硬件及其所属的服务器，服务器组即可以全局只进行一次计算
    //保存格式：{group:'sg1',server:'sg1s1',hardware:'sg1s1h1'}
    problemList: [],
    isLoading: false
  }),
  props: {
    hardwareList: { type: Array, required: true },
    serverId: { type: String, required: true },
    serverGroupId: { type: String, required: true },
  },
  methods: {
    toCusHardW (id) {
      //this.isLoading = true
      const that = this
      console.log('toCusHardW')
      this.$Taro.navigateTo({
        url: `../cusHardw/cusHardw?`,
        events: {
          // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
          acceptDataFromOpenedPage: function (data) {
            console.log(data)
          },
        },
        success: function (res) {
          // 通过eventChannel向被打开页面传送大量如json的数据
          res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
          //that.isLoading = false
        }
      })
    },
  },
  computed: {
    thresholdColor () {
      return function (status, threshold, id) {
        const percent = ((status / threshold) * 100) | 0
        const res = {
          serverId: this.serverId,
          serverGroupId: this.serverGroupId,
          hardwareId: id
        }
        if (percent > 70) {
          this.$emit('onWarn', res)
        }
        return percent < 70 ? 'green' : (percent < 100 ? 'orange' : 'red')
      }
    },
    percent () {
      return function (status, threshold) {
        return ((status / threshold) * 100) | 0
      }
    }
  },
  watch: {},
  updated () {
    //每次发生数据变更即在updated内进行新的错误硬件信息传输
    this.$emit('hardwareUpdated', this.problemList)
  },
  mounted () {
    console.log(this.isLoading)
  },
}
</script>

<style lang='scss' >
$green: #07c160;
@mixin wd($direction: column) {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: $direction;
}
.van-swipe-cell__right {
  display: inline-block;
  width: 40px;
  height: 90px;
  font-size: 15px;
  line-height: 44px;
  color: #fff;
  text-align: center;
  background-color: $green;
}
.hardware-title {
  display: flex;
  flex-direction: row;
  &-tag {
    margin-left: 1rem;
  }
}
page {
  height: 100%;
}
.hardware-loading {
  @include wd();
}
</style>