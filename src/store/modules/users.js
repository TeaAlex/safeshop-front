import usersApi from '../../api/users'

export default {
  namespaced: true,
    state: {
      isLogged: false
    },

    actions: {
      getShopData({ commit }, payload ){
          usersApi.getShopData(payload.siret.siret)
          .then((response) => {
           console.log(response.data)
          }, (error) => {
            commit('hasFailed' , {
              status: error.response.status,
              vm: payload.vm,
              error: error.response.data
            })
          });
      },
    //   login({ commit }, payload ){
    //     usersApi.login(payload.user)
    //     .then((response) => {
    //       commit('isSuccessfullyLogged' , {
    //         bearer: response.data.bearer,
    //         access_level: response.data.access_level,
    //         uuid: response.data.uuid,
    //         vm: payload.vm
    //       })
    //     }, (error) => {
    //       commit('hasFailed' , {
    //         status: error.response.status,
    //         vm: payload.vm,
    //         error: error.response.data
    //       })
    //     });
    // },
    //   register({ commit }, payload){
    //     usersApi.register(payload.user)
    //     .then(() => {
    //       commit('isSuccessfullyRegister' , payload.vm)
    //     }, (error) => {
    //       commit('hasFailed' , { status: error.response.status, vm: payload.vm, error: error.response.data.msg })
    //     });
    //   },
    //   getusers({commit}, payload) {
    //     usersApi.getusers()
    //     .then((response) => {
    //       commit('userList' , {
    //         result: response,
    //         vm: payload.vm
    //       })
    //     }, (error) => {
    //       commit('hasFailed' , { status: error.response.status, vm: payload.vm, error: error.response.data.msg })
    //     });
    //   },
    //   getuser({commit}, payload) {
    //     usersApi.getuser(payload.uuid)
    //     .then((response) => {
    //       commit('user' , {
    //         result: response,
    //         vm: payload.vm
    //       })
    //     }, (error) => {
    //       commit('hasFailed' , { status: error.response.status, vm: payload.vm, error: error.response.data.msg })
    //     });
    //   },
    //   deleteuser({commit}, payload) {
    //     usersApi.deleteUser(payload.uuid)
    //     .then((response) => {
    //       commit('deleteuser' , {
    //         result: response,
    //         vm: payload.vm
    //       })
    //     }, (error) => {
    //       commit('hasFailed' , { status: error.response.status, vm: payload.vm, error: error.response.data.msg })
    //     });
    //   },
    //   updateuser({commit}, payload) {
    //     usersApi.updateUser(payload.user,payload.uuid)
    //     .then((response) =>  {
    //       commit('userUpdate',{
    //         first_name: response.data.first_name,				
    //         last_name: response.data.last_name,
    //         email: response.data.email,
    //         uuid: payload.uuid,
    //         vm: payload.vm
    //       })
    //     }, (error) => {
    //       commit('hasFailed' , { status: error.response.status, vm: payload.vm, error: error.response.data.msg })
    //     });
    //   }
    },
    // mutations: {
    //   isSuccessfullyLogged( state, payload ){
    //     state.isLogged = true;
    //     localStorage.userToken = payload.bearer
    //     localStorage.accessLevel = payload.access_level
    //     localStorage.uuid = payload.uuid
    //     payload.vm.$notify({
    //         group: 'foo',
    //         title: 'Bienvenue',
    //         type: 'success',
    //         duration:1000,
    //         text: 'Vous êtes connecté!'
    //     });
    //     setTimeout(function(){
    //       window.location.href = "/";
    //     }, 1000);
    //   },
    //   hasFailed(state, payload){
    //     state.isLogged = false;
    //     switch (payload.status) {
    //       case 401:
    //         payload.vm.$notify({
    //           group: 'foo',
    //           title: 'Erreur',
    //           type: 'error',
    //           duration:5000,
    //           text: "Unauthorized"
    //         });
    //         break;
    //       case 403:
    //         payload.vm.$notify({
    //           group: 'foo',
    //           title: 'Erreur',
    //           type: 'error',
    //           duration:5000,
    //           text: "Forbidden"
    //         });
    //         break;
    //       case 404:
    //         payload.vm.$notify({
    //           group: 'foo',
    //           title: 'Erreur',
    //           type: 'error',
    //           duration:5000,
    //           text: "User not found"
    //         });
    //         break;
    //       case 400:
    //         payload.vm.$notify({
    //           group: 'foo',
    //           title: 'Erreur',
    //           type: 'error',
    //           duration:5000,
    //           text: payload.error
    //         });
    //         break;
    //     }
    //   },
    //   isSuccessfullyRegister( state, vm){
    //     vm.$emit('registred', 'true')
    //     vm.$notify({
    //         group: 'foo',
    //         title: 'Felicitation',
    //         type: 'success',
    //         duration:5000,
    //         text: 'Vous êtes inscrit!'
    //     });
    //   },
    //   user(state, payload) {
    //     payload.vm.user = payload.result.data;
    //   },
    //   userList(state, payload) {
    //     payload.vm.users = payload.result.data;
    //   },
    //   userUpdate(state, payload) {
    //     payload.vm.$notify({
    //       group: 'foo',
    //       title: 'Succès',
    //       type: 'success',
    //       duration:5000,
    //       text: 'Vous venez de modifier votre profil!'
    //     });
    //     payload.vm.$router.push({ name: 'ProfilUser', params: { UUID: payload.uuid }})
    //   },
    //   deleteuser(state, payload) {
    //     payload.vm.$notify({
    //       group: 'foo',
    //       title: 'Succès',
    //       type: 'success',
    //       duration:5000,
    //       text: 'Vous venez de supprimer un profil!'
    //     });
    //     payload.vm.$router.push({ name: 'AllUsers' })
    //   }
    // }
}