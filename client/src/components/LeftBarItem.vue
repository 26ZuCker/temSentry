<template functional>
  <van-collapse-item
    :title="server_group.server_group_name"
    :name="server_group.server_group_id"
    content-class="van-collapse-item__content"
  >
    <view
      v-for="server in server_group.server_groups"
      :key="server.server_id"
      :class="activeClass(server.server_id)"
    >
      <text
        @tap="chooseServer(server.server_id, server_group.server_group_id)"
        >{{ server.server_name }}</text
      >
      <!--  <van-icon :name="imgExclamation" color="orange" v-if="toBool(server.is_alarm)" /> -->
    </view>
    <!--     <slot-view name="value">
      <van-icon
        :name="imgExclamation"
        color="orange"
        size="1.5rem"
        v-if="toBool(server_group.is_alarm)"
      />
    </slot-view> -->
  </van-collapse-item>
</template>

<script>
export default {
  inheritAttrs: false,
  data: () => ({
  }),
  props: {
    server_group: { type: Object, required: true },
    server_id: { type: String, required: true }
  },
  activeClass: (server_id) => this.server_id === server_id ? 'btn-container btn-active' : 'btn-container',
  chooseServer (server_id, server_group_id) { },
  toBool: (strBool) => strBool === 'true'
}
</script>

<style lang='scss' >
.van-collapse-item__content {
  padding: 0px !important;
}
.btn-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  color: #000000;
  padding-top: 0.5rem;
  padding-left: 0.5rem;
  padding-bottom: 0.5rem;
  font-size: 1rem;
}
.btn-active {
  border-left: #07c160 0.5rem solid;
  background-color: #dededebb;
}
</style>