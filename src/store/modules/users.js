import usersApi from "../../api/users";

export default {
  namespaced: true,
  state: {
    shopData: {},
    registed: {},
    token: {},
    isLogged: false,
    emailSended: "",
    validated: ""
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
    },
    changePassword({ commit }, payload ){
      usersApi.changePassword(payload.user)
      .then((response) => {
        commit('passwordChanged' , { 
          data : response.data
        })
      },(error) => {
        commit('hasFailed' , { status: error.response.status, vm: payload.vm, error: error.response.data })
      });
    },
    resetPass({ commit }, payload ){
      usersApi.resetPass(payload.user)
      .then((response) => {
        commit('mailSended' , {
          status: response.data,
          emailSended:payload.user
        })
      },(error) => {
        commit('hasFailed' , { status: error.response.status, vm: payload.vm, error: error.response.data })
      });
  },
    editUser({ commit }, payload ){
      usersApi.editUser(payload.user)
          .then((response) => {
            commit('isSuccessfullyEdited' , {
              edited: response.data
            })
          },(error) => {
            commit('hasFailed' , { status: error.response.status, vm: payload.vm, error: error.response.data })
          });
    },
    validate_mail({ commit }, payload ){
      usersApi.validate_mail(payload.user)
      .then((response) => {
        commit('validateMail' , {
          validated: response.data
        })
      },(error) => {
        commit('hasFailed' , { status: error.response.status, vm: payload.vm, error: error.response.data })
        commit('validateMail' , { 
          validated: error.response.data
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
    validateMail(state, payload) {
      console.log("valideEmail",payload);
      state.validated = payload.validated;
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
    },
    mailSended(state,payload ){
      console.log(payload);
      state.emailSended = payload.emailSended.email
      console.log(state.emailSended);
    },
    setIsLogged(state, bool) {
      if (bool === false){
        state.token = {};
      }
      state.isLogged = bool;
    },
    passwordChanged(state,payload ){
      console.log(payload);
      console.log(state);
    },
    isSuccessfullyEdited( state,payload ){
      console.log(payload);
      state.editUser = payload.user;
      console.log(state.editUser);
    },
  }
};
