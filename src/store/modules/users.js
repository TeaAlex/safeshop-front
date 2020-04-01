import usersApi from "../../api/users";

export default {
  namespaced: true,
  state: {
    shopData: {}
  },

  actions: {
    getShopData({ commit }, payload) {
      usersApi.getShopData(payload.siret.siret).then(response => {
        commit("setShopData", {
          shopData: response.data
        });
      });
    }
  },
  mutations: {
    setShopData(state, payload) {
      state.shopData = payload.shopData.etablissement;  
    }
  }
};
