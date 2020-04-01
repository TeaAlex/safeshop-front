import usersApi from '../../api/users'
import router from '../../router'

export default {
  namespaced: true,
    state: {
      shopData : {}
    },

    actions: {
      getShopData({ commit }, payload ){
          usersApi.getShopData(payload.siret.siret)
          .then((response) => {
            commit('setShopData' , {
             shopData:response.data
            })
            router.push({ name: 'CreateShop'})
          }, (error) => {
           console.log(error);
          });
      }
    },
    mutations: {
      setShopData(state,payload){
        state.shopData = payload.shopData.etablissement;
        console.log(payload.shopData.etablissement);    
      }
    }
}