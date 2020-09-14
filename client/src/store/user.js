const state = {
  token: '',
  userInfo: {
    nickname: '',
    age: '',
  },
};
const mutations = {
  setToken(state, token = '') {
    state.token = token;
  },
  setRole(state, role = 'oUser') {
    state.role = role;
  },
};
const actions = {};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
