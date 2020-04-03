<template>
  <div>

  </div>
</template>

<script>
export default {
  name: "ValidateEmail",
  components: { },
  data: function() {
    return {
    };
  },
  computed: {
    status() {
      return this.$store.state.users.validated;
    }
  },
  created(){
    this.$store.dispatch('users/validate_mail',{user:{token:this.$route.params.id}})
    console.log(this.$store.state.users.validated);
  }
};
</script>
