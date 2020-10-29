<template>
  <van-cell-group>
    <!-- 点击提交后的顶部通知 -->
    <van-notify id="van-notify" />
    <!-- 标题 -->
    <view class="cus-title">{{ hardware.inform }}</view>
    <!-- 硬件类别，若进入则改为可选 -->
    <!-- <van-cell title="类别">
      <van-dropdown-menu>
        注意需要额外增加一条value作为key
        <van-dropdown-item :value="activeHarewareVal" :options="hardwareType" />
      </van-dropdown-menu>
    </van-cell>-->
    <!-- 阈值 -->
    <van-cell title="阈值">
      <van-stepper :value="hardware.warning_temp" @change="changeThreshold" />
    </van-cell>
    <!-- 是否接收通知 -->
    <van-cell title="接收通知">
      <van-switch :checked="isGetNotice" @change="isGetNotice = !isGetNotice" />
    </van-cell>
    <!-- 备注 -->
    <van-field :value="remarks" label="备注" placeholder="备注" autosize />
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
        >确认</van-button
      >
      <van-button type="default" plain hairline @tap="toBack" size="large"
        >取消</van-button
      >
    </view>
  </van-cell-group>
</template>

<script>
import Notify from '../../components/vant-weapp/dist/notify/notify.js'
import { get_hardware_data, save_hardware_data } from '../../apis/server.js'

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
    //真正需要改变的数据
    warning_temp: -26,
    remarks: '',
    //根据页面传参的三个id再在该页面发送http请求获取需要改变的数据如阈值和备注
    hardware: {},
  }),
  props: {
    //通过按钮点击直接传值才需要该hardware，否则解构其取下面的值
  },
  methods: {
    changeThreshold (e) {
      this.warning_temp = e.detail
    },
    notifyMsg (msg, type = 'success') {
      Notify({
        message: msg,
        type: type,
        //此处相当于请求的限时即超过该时间仍无响应则默认发送失败
        duration: 5000
      })
    },
    async submitCus () {
      this.notifyMsg('数据提交中', 'warning')
      this.isSubmit = true
      const params = {
        server_id: this.server_id,
        hardware_id: this.hardware.id,
        remarks: this.remarks,
        warning_temp: this.warning_temp
      }
      try {
        const res = await (save_hardware_data(params))
        this.isSubmit = false
        if (res.data.code === '1') {
          this.notifyMsg('数据提交完成')
          //发送put请求且接收响应正常且完成才回调
          const timer = setTimeout(() => {
            this.toBack()
          }, 1000)
          this.$once('hook:destroy', () => {
            clearTimeout(timer)
          })
        } else if (res.data.code === '-1') {
          this.notifyMsg('数据提交失败', 'danger')
        }

        //如果正确响应则关闭顶部提示
        if (res.data.code === '1') {

        }
      } catch (error) {
        console.log(error)
      }
    },
    toBack () {
      const url = `../${this.fromPath}/${this.fromPath}`
      this.$taro.switchTab({
        url: url
      })
    }
  },
  computed: {},
  watch: {},
  //taro可以在onload生命周期内解构参数options或通过getCurrentPages获取页面传参，推荐在onLoad内即可因为接近原生
  async onLoad (options) {
    this.server_id = options.server_id
    const hardware_id = options.hardware_id
    try {
      this.hardware = (await get_hardware_data({
        server_id: this.server_id,
        hardware_id: hardware_id
      })).data
      this.warning_temp = this.hardware.warning_temp
    } catch (error) {
      console.log(error)
    }
  },
  created () {
    this.fromPath = this.$Taro.getCurrentPages()[0].route.split('/')[1];
  },
}
</script>

<style lang='scss' >
.cus-hardware-btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  button {
    margin: 2rem;
  }
}
.cus-title {
  text-align: center;
}
</style>