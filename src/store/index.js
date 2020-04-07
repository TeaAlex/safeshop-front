import Vue from "vue";
import Vuex from "vuex";
import users from "./modules/users";
import VuexPersistence from "vuex-persist";
import api from '../api/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    shops: [],
    userLocation: null
  },
  mutations: {
    SET_SHOPS(state, shops) {
      state.shops = shops
    },
    SET_USER_LOCATION(state, coordinates) {
      state.userLocation = coordinates
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
      console.log(lat, lng);
      const response = await api.get(`/shop/all?query=${query}&lat=${lat}&lng=${lng}`);
      const {shops} = response.data;
      commit('SET_SHOPS', shops);
    },
  },
  modules: {
    users
  },
  plugins: [new VuexPersistence().plugin]
});
