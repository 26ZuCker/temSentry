<template functional>
  <van-collapse-item :title="server_group.server_group_name" :name="server_group.server_group_id">
    <view
      v-for="server in server_group.server_groups"
      :key="server.server_id"
      class="user-server-hover"
    >
      <van-button
        custom-style="width:85%;"
        :type="activeClass(server.server_id)"
        @tap="chooseServer(server.server_id,server_group.server_group_id)"
      >{{server.server_name}}</van-button>
      <van-icon :name="imgExclamation" color="orange" v-if="toBool(server.is_alarm)" />
    </view>
    <slot-view name="value">
      <van-icon
        :name="imgExclamation"
        color="orange"
        size="1.5rem"
        v-if="toBool(server_group.is_alarm)"
      />
    </slot-view>
  </van-collapse-item>
</template>

<script>
export default {
  inheritAttrs: false,
  data: () => ({

  }),
  props: {

  },
}
</script>

<style lang='scss' >
</style>