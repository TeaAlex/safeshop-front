<template>
  <div></div>
</template>

<script>
export default {
  name: "Logout",
  mounted() {
    localStorage.removeItem("userToken");
    this.$store.commit('users/setIsLogged', false);
    this.$store.commit('users/setUser', {});
    this.$router.push('/')
  },
}
</script>
