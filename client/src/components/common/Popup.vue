<template>
  <van-popup
    :show="isShowPopup"
    closeable
    round
    close-icon="close"
    position="bottom"
    custom-style="height: 20%"
    @close="closePopup"
  >
    <slot></slot>
  </van-popup>
</template>

<script>
export default {
  inheritAttrs: false,
  name: '',
  components: {},
  data: () => ({
    isShowPopup: ''
  }),
  props: {},
  methods: { closePopup () { this.$emit('onClosePopup') } },
  computed: {},
  watch: {},
}
</script>

<style lang='scss' scoped>
</style>