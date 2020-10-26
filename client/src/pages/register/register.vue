<template>
  <view class="register-container">
    <van-field
      :value="name"
      required
      clearable
      label="姓名"
      placeholder="请输入姓名"
    />
    <van-field
      :value="student_id"
      required
      clearable
      label="学号"
      placeholder="请输入学号"
    />
    <van-field
      :value="gender"
      required
      clearable
      label="性别"
      placeholder="请输入性别"
    />
    <van-field
      :value="reason"
      required
      clearable
      label="来访原因"
      placeholder="请输入来访原因"
    />
    <!--  -->
    <button @tap="submitRegister" class="my-round">{{ submitText }}</button>
  </view>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  inheritAttrs: false,
  name: '',
  data: () => ({
    name: '',
    student_id: '',
    gender: '',
    reason: ''
  }),
  props: {},
  methods: {
    submitRegister () {

    }
  },
  computed: {
    submitText () {
      return this.isLogin ? '你已填写过信息，重新提交' : '提交信息'
    },
    ...mapGetters({
      isLogin: 'user/isLogin'
    })
  },
}
</script>

<style lang='scss' >
@mixin wd($direction: column) {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: $direction;
}
page {
  height: 100%;
}
.register-container {
  @include wd();
}
.my-round {
  border-radius: 28%;
  width: 5rem;
  height: 3rem;
  background-color: #07c160;
  color: white;
}
</style>