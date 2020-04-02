import usersApi from "../../api/users";

export default {
  namespaced: true,
  state: {
    shopData: {},
    registed: {},
    token: {},
    isLogged: false
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
      },(error) => {
        commit('hasFailed' , { status: error.response.status, vm: payload.vm, error: error.response.data })
      });
    },
    register_shop({commit},payload){
      usersApi.register_shop(payload.user)
      .then(response => {
        commit("registered", {
          registed: response.data
        });
      },(error) => {
        commit('hasFailed' , { status: error.response.status, vm: payload.vm, error: error.response.data })
      });
    },
    login({ commit }, payload ){
      usersApi.login(payload.user)
      .then((response) => {
        commit('isSuccessfullyLogged' , {
          token: response.data.token
        })
      },(error) => {
        commit('hasFailed' , { status: error.response.status, vm: payload.vm, error: error.response.data })

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
    hasFailed(state, payload){
      state.isLogged = false;
      switch (payload.status) {
        case 401:
          alert("Erreur 401 : " + payload.error[0].message);
          break;
        case 403:
          alert("Erreur 403 : " + payload.error[0].message);
          break;
        case 404:
          alert("Erreur 404 : " + payload.error[0].message);
          break;
        case 400:
          alert("Erreur 400 : " + payload.error[0].message);
          break;
      }
    },
    isSuccessfullyLogged( state,payload ){
      state.token = payload;
      state.isLogged = true;
      localStorage.userToken = state.token.token; 

    }
  }
};
