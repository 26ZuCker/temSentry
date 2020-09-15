<template>
  <!-- 后续改为函数式组件 -->
  <view class="hardware-container">
    <!-- 主体 -->
    <view v-if="isLoading" class="hardware-loading">
      <van-loading type="spinner" color="#07c160" />
    </view>
    <van-cell @tap="toCusHardW(hardware.id)" v-else>
      <slot-view name="title" class="hardware-title">
        <view class="van-cell-text">{{hardware.inform}}</view>
        <van-tag
          mark
          :color="thresholdColor(hardware.temp,hardware.warning_temp)"
          size="medium"
          class="hardware-title-tag"
        >{{hardware.temp}}/{{hardware.warning_temp}}</van-tag>
      </slot-view>
      <slot-view name="label">{{hardware.remark}}</slot-view>
      <van-circle
        stroke-width="6"
        :value="percent(hardware.temp,hardware.warning_temp)"
        layer-color="#eeeeee"
        :color="thresholdColor(hardware.temp,hardware.warning_temp)"
      >{{percent(hardware.temp,hardware.warning_temp)}} %</van-circle>
    </van-cell>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'

export default {
  inheritAttrs: false,
  components: {},
  data: () => ({
    //由于此处是必定需要计算是否超过阈值的组件所以只在此通过hash保存出现问题的硬件及其所属的服务器，服务器组即可以全局只进行一次计算
    //保存格式：{group:'sg1',server:'sg1s1',hardware:'sg1s1h1'}
    isLoading: false
  }),
  props: {
    hardware: { type: Object, required: true },
  },
  methods: {
    toCusHardW (id) {
      //this.isLoading = true
      const that = this
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
      //由于后端传回的数据已经包括了is_alarm所以此处不需要再额外传入具体硬件的id
      return function (temp, warning_temp = 100) {
        const percent = ((temp / warning_temp) * 100) | 0
        return percent < 70 ? 'green' : (percent < 100 ? 'orange' : 'red')
      }
    },
    percent () {
      return function (temp, warning_temp) {
        return ((temp / warning_temp) * 100) | 0
      }
    }
  },
  watch: {},
}
</script>

<style lang='scss' >
/* .van-swipe-cell__right {
  display: inline-block;
  width: 40px;
  height: 90px;
  font-size: 15px;
  line-height: 44px;
  color: #fff;
  text-align: center;
  background-color: $green;
} */
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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>