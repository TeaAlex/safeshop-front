import usersApi from "../../api/users";

export default {
  namespaced: true,
  state: {
    shopData: {},
    registed: {},
    token: {}
  },

  actions: {
    getShopData({ commit }, payload) {
      return new Promise((resolve) => {
        usersApi.getShopData(payload.siret.siret).then(response => {
          commit("setShopData", {
            shopData: response.data
          });
          resolve()
        })
      });
    },
    register({commit},payload){
      usersApi.register(payload.user)
      .then(response => {
        commit("registered", {
          registed: response.data
        });
      });
    },
    login({ commit }, payload ){
      usersApi.login(payload.user)
      .then((response) => {
        commit('isSuccessfullyLogged' , {
          token: response.data.token
        })

      });
  }
  },
  mutations: {
    setShopData(state, payload) {
      state.shopData = payload.shopData.etablissement;
      console.log(state.shopData);
    },
    registered(state, payload) {
      state.registed = payload;
    },
    isSuccessfullyLogged( state,payload ){
      state.token = payload;
      localStorage.userToken = state.token.token;
    }
  }
};