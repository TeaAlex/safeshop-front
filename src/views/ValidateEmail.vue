<template>
  <div class="flex justify-center mt-10">
    <div v-if="status == 'Success'" class="bg-white shadow-md rounded text-center px-8 col-10 pt-6 pb-8 mb-4 flex flex-col">
      <h1 class="block titre mb-3">
        SAFE<span class="text-teal-600 fredoka">SHOP</span>
      </h1>
      <h3 class="block label-forms mb-5">Félicitation vous avez validé votre compte, vous pouvez maintenant vous connecter !</h3>
      <router-link to="/connexion" class="inline-block align-baseline mt-4 font-bold text-sm text-blue hover:text-blue-darker" href="#"
      >Connectez vous à SafeShop</router-link>
    </div>
    <div v-else class="bg-white shadow-md rounded text-center px-8 col-10 pt-6 pb-8 mb-4 flex flex-col">
      <h1 class="block titre mb-3">
        SAFE<span class="text-teal-600 fredoka">SHOP</span>
      </h1>
      <h3 class="block label-forms mb-5">Erreur de validation, le lien à probablement déjà été cliqué</h3>
      <router-link to="/connexion" class="inline-block align-baseline mt-4 font-bold text-sm text-blue hover:text-blue-darker" href="#"
      >Connectez vous à SafeShop</router-link>
    </div>
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
      return this.$store.state.users.validated.status;
    }
  },
  created(){
    this.$store.dispatch('users/validate_mail',{user:{token:this.$route.params.id}})
  }
};
</script>
