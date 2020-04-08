import Vue from "vue";
import Vuex from "vuex";
import users from "./modules/users";
import VuexPersistence from "vuex-persist";
import api from '../api/api';

Vue.use(Vuex);

const vuexPersistence = new VuexPersistence({
  reducer: state => {
    const {isLogged, user} = state.users;
    return {
      users: {
        isLogged,
        user
      }
    }
  }
});

export default new Vuex.Store({
  state: {
    shops: [],
    userLocation: null,
    loading: false
  },
  mutations: {
    SET_SHOPS(state, shops) {
      state.shops = shops
    },
    SET_USER_LOCATION(state, coordinates) {
      state.userLocation = coordinates
    },
    SET_LOADING(state, bool) {
      state.loading = bool
    }
  },
  getters: {
    shopCount(state){
      return state.shops.length
    },
    resultText(state, {shopCount}){
      return shopCount > 1 ? `${shopCount} Résultats` : `${shopCount} Résultat`;
    },
  },
  actions: {
    async setShop({commit}, { lat, lng, query }) {
      const response = await api.get(`/shop/all?query=${query}&lat=${lat}&lng=${lng}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` }
      });
      const {shops} = response.data;
      commit('SET_LOADING', false);
      commit('SET_SHOPS', shops);
    },
  },
  modules: {
    users
  },
  plugins: [vuexPersistence.plugin]
});
