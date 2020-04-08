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
    this.$store.dispatch('users/autoLogin',{vm: this});
    this.$router.push('/')
  }
};
</script>
