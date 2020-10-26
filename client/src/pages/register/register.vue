<template>
  <view class="register-container">
    <van-field
      :value="username"
      required
      clearable
      label="用户名"
      placeholder="请输入用户名"
    />
    <van-field
      :value="username"
      required
      clearable
      label="用户名"
      placeholder="请输入用户名"
    />
    <van-field
      :value="username"
      required
      clearable
      label="用户名"
      placeholder="请输入用户名"
    />
    <van-field
      :value="username"
      required
      clearable
      label="用户名"
      placeholder="请输入用户名"
    />
    <van-field
      :value="username"
      required
      clearable
      label="用户名"
      placeholder="请输入用户名"
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
  components: {

  },
  data: () => ({
    username: ''
  }),
  props: {},
  methods: {
    submitRegister () {
      if (this.isLogin) {
        //已填报则重新填写
      } else {
        //未填报则直接提交
      }
    }
  },
  computed: {
    submitText () {
      return this.isLogin ? '你已填写过信息，需要重新填写？' : '提交信息'
    },
    ...mapGetters({
      isLogin: 'user/isLogin'
    })
  },
  watch: {},
  //检测该openid是否已提交过
  async created () {

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