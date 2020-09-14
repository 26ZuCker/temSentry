<template>
  <van-cell-group>
    <!-- 标题 -->
    <view class="cus-title">sg1s1 CPU 管理</view>
    <!-- 硬件类别，若进入则改为可选 -->
    <van-cell title="类别">
      <van-dropdown-menu>
        <!-- 注意需要额外增加一条value作为key -->
        <van-dropdown-item :value="activeHarewareVal" :options="hardwareType" />
      </van-dropdown-menu>
    </van-cell>
    <!-- 阈值 -->
    <van-cell title="阈值">
      <van-stepper :value="threshold" @change="changeThreshold" />
    </van-cell>
    <!-- 是否接收通知 -->
    <van-cell title="接收通知">
      <van-switch :checked="isGetNotice" @change="isGetNotice=!isGetNotice" />
    </van-cell>
    <!-- 备注 -->
    <van-field :value="remark" label="备注" placeholder="备注" autosize />
    <!-- 确定和取消按钮 -->
    <view>
      <van-button
        type="primary"
        plain
        hairline
        @tap="submitCus"
        :loading="isSubmit"
        loading-type="spinner"
        size="large"
      >确认</van-button>
      <van-button type="default" plain hairline @tap="toBack" size="large">取消</van-button>
    </view>
  </van-cell-group>
</template>

<script>

export default {
  inheritAttrs: false,
  name: '',
  components: {},
  data: () => ({
    //模拟回退
    fromPath: '',
    activeHarewareVal: '',
    isSubmit: false,
    //可供选择的硬件类别
    hardwareType: [
      { text: 'CPU', value: '101' },
      { text: 'GPU', value: '102' },
      { text: 'SCREEN', value: '103' }
    ],
    activeHarewareVal: '101',
    isGetNotice: true,
    threshold: 0,
    remark: ''
  }),
  props: {
    //通过按钮点击直接传值才需要该hardware，否则解构其取下面的值
    hardware: { type: Object, default: null }
  },
  methods: {
    changeThreshold (e) {
      console.log(e)
    },
    submitCus () {
      console.log('loading ...')
      this.isSubmit = true
      //发送put请求且接收响应正常且完成才回调
      setTimeout(() => {
        this.toBack()
      }, 1000)
    },
    toBack () {
      const url = `../${this.fromPath}/${this.fromPath}`
      this.$Taro.redirectTo({
        url: url,
        fail: function (err) {
          //不能通过redirect回到tabbar页面
          if (err.errMsg === 'redirectTo:fail can not redirectTo a tabbar page') {
            this.$Taro.switchTab({ url: url })
          } else {
            console.log(err)
          }
        }
      })
    }
  },
  computed: {},
  watch: {},
  //获取路由传参
  created () {
    const route = this.$Taro.getCurrentPages()
    const { params, fromPath } = this.$getRouteParams(route)
    this.fromPath = fromPath
    console.log(params)
  }
}
</script>

<style lang='scss' >
@mixin wd($direction: column) {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: $direction;
}
.cus-hardware-btn-container {
  @include wd(row);
  button {
    margin: 2rem;
  }
}
.cus-hardware-btn {
  margin-top: 3rem;
}
.cus-title {
  text-align: center;
}
</style>