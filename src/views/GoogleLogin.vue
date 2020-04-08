<template>
  <div> </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "GoogleLogin",
  components: { },
  data: function() {
    return {
    };
  },
  created(){
    localStorage.setItem("userToken", this.$route.params.id);
    this.$store.commit('users/setIsLogged', true);
    const url = process.env.VUE_APP_BASE_URL;
    new Promise((resolve,reject) => {
      axios.get(`${url}/user/current-user`, {
        headers: {
          Authorization: `Bearer ${this.$route.params.id}`
        }
      })
      .then((res)=>{
        const {user} = res.data;
        this.$store.state.users.user = user;
        resolve();
      })
      .catch((error) => {
        reject(error);
      })
    })
    this.$router.push('/')
  }
};
</script>
