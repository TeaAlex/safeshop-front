<template>
  <div> </div>
</template>

<script>
export default {
  name: "Login",
  components: { },
  data: function() {
    return {
    };
  },
  created(){
      localStorage.setItem("userToken",this.$route.params.id)
      window.location.href = "http://localhost:8081";
  }
};
</script>