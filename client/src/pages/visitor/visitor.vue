<template>
  <view>
    <!-- 顶部头像栏和提示栏 -->
    <view></view>
    <!-- 所需填写表单主体 -->
    <van-cell-group>
      <van-field
        :value="i.value"
        @change="onInput(key, $event)"
        required
        clearable
        :label="i.title"
        :placeholder="placeholderTitle(i.title)"
        v-for="(i, key) in form"
        :key="i.title"
      ></van-field>
    </van-cell-group>
    <!-- 提交按钮 -->
    <van-button @tap="submitChange">{{ btnText }}</van-button>
  </view>
</template>

<script>
import { add_record, confirm_record, get_userInfo_template, get_record_form } from '@api/visitor.js'

export default {
  inheritAttrs: false,
  name: 'visitor',
  components: {},
  data: () => ({
    form: null,
    hasSubmit: false
  }),
  props: {},
  methods: {
    /**
     * 响应点击按钮事件
     */
    submitChange () {
      if (this.hasSubmit) {
        this.onOut()
      } else {
        this.onAdd()
      }
    },
    /**
    * 监听表单输入，后期注意防抖
    */
    onInput (key, $event) {
      this.form[key].value = $event.detail
    },
    /**
    * 校验表单输入值合法性：
    * 1.是否填写完毕
    * 2.每一块是否输入有效数值，注意即使输入number也转换为string即可
    */
    validateForm () {
      if (this.form === null) {
        return false
      }
      //目前只校验是否已输入
      for (const i in this.form) {
        if (this.form[i].value.length === 0) {
          return false
        }
      }
      return true
    },
    /**
     * 添加来访记录
     */
    onAdd: async function () {
      if (this.data.isLogin) {
        return;
      }
      const params = { ...this.data.form_template };
      this.setData({ isLoading: true });
      try {
        const { code, msg, data } = (await add_record(params)).data;
        if (code !== ERRORCODE) {
          const newData = { isLogin: true, isLoading: false, hasSubmit: code === 1 };
          this.setData(newData);
          return;
        } else {
          console.log(msg);
          this.setData({ isLoading: false });
        }
      } catch (error) {
        console.log(error);
        this.setData({ isLoading: false });
      }
    },
    /**
     * 离开也记录
     */
    onOut: async function () {
      if (!this.data.isLogin) {
        return;
      }
      this.setData({ isLoading: true });
      try {
        const { code, msg, data } = (await confirm_record(params)).data;
        if (code !== ERRORCODE) {
          const newData = { isLogin: true, isLoading: false, hasSubmit: code === 1 };
          this.setData(newData);
        } else {
          console.log(msg);
          this.setData({ isLoading: false });
        }
      } catch (error) {
        console.log(error);
        this.setData({ isLoading: false });
      }
    },
  },
  computed: {
    /**
     * 表单输入框提示文本
     */
    placeholderTitle () {
      return function (title) {
        return `请输入${title}`
      }
    },
    /**
     * 按钮根据来访者状态提示文本
     */
    btnText () {
      return this.hasSubmit ? '离开实验室' : '进入实验室'
    }
  },
  watch: {},
  async created () {
    this.form = await get_userInfo_template()
  }
}
</script>

<style lang='scss'>
@import url("./visitor.scss");
</style>