<template>
  <view class></view>
</template>

<script>
export default {
  inheritAttrs: false,
  name: '',
  components: {},
  data: () => ({

  }),
  props: {},
  methods: {},
  computed: {},
  watch: {},
  middleware () { },
  validate () { },
  async asyncData () { },
  async fetch () { },
  //渲染该组件的对应路由被confirm前调用，不能访问this
  async beforeCreate () { },
  //组件复用
  beforeUpdate () { },
  //可以访问当前this实例
  async created () { },
  //可以访问DOM元素
  mounted () { },
  updated () { },
  destroyed () { },
  //如果页面有keep-alive缓存功能才会触发
  activated () { },
}
</script>

<style lang='scss' scoped>
</style>