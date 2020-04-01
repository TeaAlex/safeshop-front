<template>
  <div class="flex justify-center mt-10">
    <div class="bg-white shadow-md rounded text-center px-8 w-1/4 pt-6 pb-8 mb-4 flex flex-col">
      <h1 class="block titre mb-3">
        SAFE<span class="text-teal-600 fredoka">SHOP</span>
      </h1>
      <h3 class="block label-forms mb-5">CONNEXION</h3>
      <Formik @onSubmit="login">
        <FormGroup
          v-for="field in fields"
          :key="field.name"
          :type="field.type"
          :name="field.name"
          :value="field.value"
          :label="field.label"
        ></FormGroup>
      </Formik>
            <router-link to="/inscription" class="inline-block align-baseline mt-4 font-bold text-sm text-blue hover:text-blue-darker"
        href="#"
      >Vous n'avez pas de compte ? Inscrivez vous.</router-link>
      <router-link to="/resetPassword" class="inline-block align-baseline mt-4 font-bold text-sm text-blue hover:text-blue-darker"
        href="#"
      >Mot de passe oublié?</router-link>
    </div>
  </div>
</template>

<script>
import Formik from "../components/Formik/Formik";
import FormGroup from "../components/Formik/FormGroup";
export default {
  name: "Login",
  components: { Formik, FormGroup },
  data: function() {
    return {
      fields: [
        {
          label: "Email",
          name: "email",
          type: "email"
        },
        {
          label: "Mot de passe",
          name: "password",
          type: "password"
        }
      ]
    };
  },
  methods: {
    login: function(e) {
      this.$store.dispatch('users/login',{user:e,vm: this})
      this.$router.push({name: "Home"})
	}
  }
};
</script>