import usersApi from "../../api/users";

export default {
  namespaced: true,
  state: {
    shopData: {},
    registed: {},
    token: {},
    isLogged: false,
    emailSended: "",
    validated: "",
    user: {},
    error: null,
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
      return new Promise((resolve,reject) => {
        usersApi.login(payload.user)
        .then(async response => {
          const {token} = response.data;
          await commit('isSuccessfullyLogged', {token});
          response = await usersApi.getUser();
          const {user} = response.data;
          commit('setUser', user);
          resolve();
        },(error) => {
          commit('hasFailed' , { status: error.response.status, vm: payload.vm, error: error.response.data })
          reject();
        });
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
            commit('isEdited' , {
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
        commit('validateMail' , {
          validated: error.response.data
        })
        commit('hasFailed' , { status: error.response.status, vm: payload.vm, error: error.response.data })
      });
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
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
      state.error = payload.error.message;
      switch (payload.status) {
        case 401:
          alert("Erreur 401 : " + payload.error.message);
          break;
        case 403:
          alert("Erreur 403 : " + payload.error.message);
          break;
        case 404:
          alert("Erreur 404 : " + payload.error.message);
          break;
        case 400:
          alert("Erreur 400 : " + payload.error.message);
          break;
      }
    },
    isSuccessfullyLogged( state,payload ){
      state.error = null;
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
    isEdited( state,payload ){
      console.log(payload);
      state.editUser = payload.user;
      console.log(state.editUser);
    },
  }
};
