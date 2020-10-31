<template functional>
  <van-collapse :value="data.isShowDetail" @change="$options.showDetail">
    <van-collapse-item name="1" title="实验室状态">
      <!--       <slot-view name="value" v-if="$options.isComputerAlarm">
        <van-icon :name="imgExclamation" />
      </slot-view> -->
      <!-- 展示当前服务器所属实验室即局域的整体信息，采用tag或进度条方式展示 -->
      <van-cell-group
        v-for="data in props.computer_room_dataArr"
        :key="data.name"
      >
        <van-cell>
          <van-progress
            :pivot-text="$options.roomText(data.name, data.value)"
            :color="$options.stateColor(data.value, data.warning_value)"
            custom-class="progress-position"
            :percentage="$options.percent(data.value, data.warning_value)"
          />
        </van-cell>
      </van-cell-group>
    </van-collapse-item>
  </van-collapse>
</template>

<script>
export default {
  inheritAttrs: false,
  name: '',
  components: {},
  data: () => ({
    isShowDetail: false
  }),
  props: {
    computer_room_dataArr: { type: Array, required: true }
  },
  //进度条颜色
  stateColor (status, threshold) {
    const percent = ((status / threshold) * 100) | 0
    return percent < 70 ? '#07c160' : (percent < 100 ? '#ff976a' : '#ee0a24')
  },
  percent: (status, threshold) => ((status / threshold) * 100) | 0,
  roomText: (name, status) => `${name}-${status}`,
  showDetail: (e) => {
    this.isShowDetail = e.detail
  },
}
</script>

<style lang='scss' >
.progress-position {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>