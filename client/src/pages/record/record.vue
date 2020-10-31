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
      :show="isShowPopup"
      round
      position="bottom"
      closeable
      close-icon="close"
      custom-style="height: 30%"
      @close="isShowPopup = false"
    >
      <!-- 由于直接渲染多个日历组件的性能过差所以选择底部抽屉展示三杆滑动选择器 -->
      <van-datetime-picker
        type="date"
        :value="choose_date"
        @confirm="confirmDate"
        @cancel="isShowPopup = false"
        @input="inputDate"
        :min-date="minDate"
        :max-date="today_date"
      ></van-datetime-picker>
    </van-popup>

    <!-- 顶部栏展示姓名班别，后续建议逐个预加载而非一下子完全获取后再冻结 -->
    <view class="item-container">
      <van-collapse
        :value="activeNames"
        @change="onChange"
        v-if="current_record.length !== 0"
      >
        <van-collapse-item
          :title="i.name"
          :name="i.id"
          :value="formatTime(i.time_stamp, false)"
          icon="shop-o"
          :key="i.id"
          v-for="i in current_record"
        >
          <van-cell title="学院" :value="i.college"></van-cell>
          <van-cell title="专业" :value="i.profession"></van-cell>
          <van-cell title="班级" :value="i.class"></van-cell>
          <van-cell title="事由" :value="i.reason"></van-cell>
          <van-cell title="学号或工号" :value="i.person_id"></van-cell>
        </van-collapse-item>
      </van-collapse>
      <view v-else class="font-main">今日没有访客</view>
    </view>
  </view>
</template>

<script>

//api
import { get_day_record, get_first_date_record } from '@/apis/record.js'
//类型判断
import { isArray } from '@/utils/judgeType'
//防抖
import { debounce } from '@/utils/HO'
//格式化时间戳
import formatTime from '@/utils/formatTime'

const today_date = new Date()

/**
 * 非响应式数据则不必存在于data内，以yyyy-mm-dd格式保存，其中的time才以具体时间戳保存
 * yyyy-mm-dd : obj
 */
const all_get_record = new Map()

export default {
  inheritAttrs: false,
  name: 'record',
  data: () => ({
    //yyyy-mm-dd
    current_date: null,
    //时间戳
    choose_date: null,
    minDate: null,
    activeNames: ['1'],
    isShowPopup: false,
    //hash缓存以避免重复请求
    //all_get_record: null,
    current_record: [],
    /*     formatter (type, value) {
          if (type === 'year') {
            return `${value}年`;
          } else if (type === 'month') {
            return `${value}月`;
          }
          return value;
        } */
  }),
  wacth: {
    current_date (n) { console.log(n) }
  },
  methods: {
    //更改当前选择日期的时间戳，查看源码是否已做防抖的优化
    //此处由于vant的限制不能使用防抖节流以避免setData
    inputDate (e) {
      this.choose_date = e.detail
    },
    confirmDate () {
      this.current_date = new Date(this.choose_date)
      this.isShowPopup = false
      this.getDayRecord()
    },
    //已访问则缓存在hash，否则才发送http请求，后续建议维护LRU
    async getDayRecord () {
      const ymd = this.formatTime(this.current_date)
      if (all_get_record.has(ymd)) {
        this.current_record = all_get_record.get(ymd)
      } else {
        try {
          const { code, data } = (await get_day_record({ timeStamp: ymd })).data
          if (code !== -1) {
            const res = Object.freeze(data)
            this.current_record = res
            all_get_record.set(ymd, res)
          }
        } catch (error) {
          console.log(error)
        }
      }
    },
    onChange (e) {
      this.activeNames = e.detail
    },
  },
  computed: {
    recordTitle () {
      return this.formatTime(this.current_date) === this.formatTime(today_date) ? '今天' : this.formatTime(this.current_date)
    },
    today_date () {
      return today_date
    },
    //返回选择日期当天总访问量
    current_record_num () {
      return isArray(this.current_record) ? this.current_record.length : 0
    },
    //格式化时间戳格式为yyyy-mm-dd
    formatTime: formatTime
  },
  //初始化获取最早记录，今日时间戳和今日访问记录
  async created () {
    const now = new Date()
    this.current_date = now
    this.choose_date = now
    //缓存已请求的某天的记录
    this.all_get_record = (new Map())
    all_get_record.set(this.formatTime(this.current_date), [])

    const a = {
      id: '1', name: '小曾',
      time_stamp: '1603931995', college: '管理',
      profession: '信管', class: '4', reason: '想来', person_id: '1'
    }
    const b = {
      id: '2', name: '小岚', time_stamp: '1604018395',
      college: '经院', profession: '国贸', class: '1',
      reason: '也想来', person_id: '2'
    }
    all_get_record.set('2020-10-29', [a])
    all_get_record.set('2020-10-30', [b])

    try {
      //获取时间下限
      const { code, data } = (await get_first_date_record()).data
      if (code !== -1) {
        this.minDate = new Date('1603781466')
      }
      await this.getDayRecord()
    } catch (error) {
      console.log(error)
      //建议弹出提示框
      this.$taro.navigateTo({ url: '../user/user' })
    }
  }
}
</script>

<style lang='scss'>
.font-main {
  font-size: 2rem;
  font-weight: 300;
}
page {
  height: 100%;
}
.item-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>