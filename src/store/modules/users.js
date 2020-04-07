import usersApi from "../../api/users";
// import api from '../../api/api'
import axios from 'axios'

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
    async login({ commit }, payload ){
      let response = await usersApi.login(payload.user);
      const {token} = response.data;
      commit('isSuccessfullyLogged', {token});
      localStorage.setItem('userToken', token);
      const url = process.env.VUE_APP_BASE_URL;
      response = await axios.get(`${url}/user/current-user`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const {user} = response.data;
      commit('setUser', user);
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
    },
    registered(state, payload) {
      state.registed = payload;
    },
    validateMail(state, payload) {
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
      state.emailSended = payload.emailSended.email
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
      state.editUser = payload.user;
    },
  }
};
