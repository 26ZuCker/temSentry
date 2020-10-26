<template>
  <!-- 后续拆分组件 -->
  <view>
    <!-- 点击展示 -->
    <van-cell
      :title="recordTitle"
      value="0"
      link
      @tap="isShowPopup = true"
      is-link
      arrow-direction="down"
      :clickable="true"
    >
      <van-icon name="calendar-o" slot="right-icon" class="custom-icon" />
    </van-cell>
    <van-popup
      content-class="van-popup__content"
      :show="isShowPopup"
      round
      position="bottom"
      custom-style="height: 30%"
      @close="isShowPopup = false"
    >
      <!-- 由于直接渲染多个日历组件的性能过差所以选择底部抽屉展示三杆滑动选择器 -->
      <van-datetime-picker
        type="date"
        :value="current_date"
        @input="inputDate"
        :min-date="minDate"
        :formatter="formatter"
    /></van-popup>
    <!-- 顶部栏展示姓名班别，后续建议逐个预加载而非一下子完全获取后再冻结 -->
    <van-collapse
      :value="activeNames"
      bind:change="onChange"
      v-if="current_record.length === 0"
    >
      <van-collapse-item
        :title="i.user_name"
        :name="i.id"
        :value="i.time"
        icon="shop-o"
        :key="i.id"
        v-for="i in current_record"
      >
        <van-cell title="来访原因" :value="i.reason"></van-cell>
      </van-collapse-item>
    </van-collapse>
    <view v-else>今日没有访客</view>
  </view>
</template>

<script>
//api
import { get_day_record, get_first_date_record } from '@/apis/record.js'
//类型判断
import { isArray } from '@/utils/judgeType'
//防抖
import { debounce } from '@/utils/HO'

const today_date = new Date().getDate()

export default {
  inheritAttrs: false,
  name: 'record',
  data: () => ({
    current_date: null,
    minDate: null,
    activeNames: ['1'],
    isShowPopup: false,
    //hash缓存以避免重复请求
    all_get_record: null,
    current_record: []
  }),
  methods: {
    //更改当前选择日期的时间戳，查看源码是否已做防抖的优化
    inputDate: debounce(function (event) {
      this.current_date = event.detail
      this.getDayRecord()
    }),
    //已访问则缓存在hash，否则才发送http请求
    async getDayRecord () {
      if (this.all_get_record.has(this.current_date)) {
        this.current_record = this.all_get_record.get(this.current_date)
      } else {
        try {
          const { code, data } = (await get_day_record()).data
          if (code !== -1) {
            const res = Object.freeze(data)
            this.current_record = res
            this.all_get_record.set(this.current_date, res)
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
  },
  computed: {
    recordTitle () {
      return this.current_date === today_date ? '今天' : this.current_date
    },
    //返回选择日期当天总访问量
    current_record_num () {
      return isArray(this.current_record) ? this.current_record.length : 0
    },
    //格式化选择时间
    formatter (type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
  },
  //初始化获取最早记录，今日时间戳和今日访问记录
  async created () {
    try {
      this.current_date = new Date().getTime()
      //获取时间
      const { code, data } = (await get_first_date_record()).data
      if (code !== -1) {
        this.minDate = data.min_date
      }
      this.all_get_record = new Map()
      this.all_get_record.set(this.current_date, [])
      await this.getDayRecord()
    } catch (error) {
      console.log(error)
      //建议弹出提示框
      this.$taro.navigateTo({ url: '../user/user' })
    }
  }
}
</script>

<style lang='scss' scoped>
.van-popup__content {
  border-top-left-radius: 25% !important;
  border-top-right-radius: 25% !important;
}
</style>