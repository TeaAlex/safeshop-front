<template>
  <div class="flex justify-center mt-10">
    <div class="bg-white shadow-md rounded text-center px-8 w-1/4 pt-6 pb-8 mb-4 flex flex-col">
      <h1 class="block titre mb-3">
        SAFE<span class="text-teal-600 fredoka">SHOP</span>
      </h1>
      <h3 class="block label-forms mb-5">Email envoyé ! </h3>
      <p> Nous vous avons envoyé un lien qui vous permettra de choisir un nouveau mot de passe à l'adresse {{ email }} </p>
        <router-link to="/" class="inline-block align-baseline mt-4 font-bold text-sm text-blue hover:text-blue-darker"
        href="#"
      >Retour a l'accueil</router-link>
    </div>
  </div>
</template>

<script>


export default {
  name: "mailSend",
  data: function() {
    return {
        email:this.$store.state.users.emailSended
    };
  }
};
</script>