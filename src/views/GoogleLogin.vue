<template>
  <div> </div>
</template>

<script>
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
    this.$router.push('/')
  }
};
</script>
