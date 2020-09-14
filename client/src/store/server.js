const state = {
  serverGroups: [],
  //保存所有存在问题的硬件，格式如下{serverGroupId,serverId,hardwareId}
  problemList: [],
};
const mutations = {
  setServerGroups(state, serverGroups) {},
  addProblemList(state, problem) {},
};
const actions = {};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
