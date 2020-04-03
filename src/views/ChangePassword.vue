<template>
  <div class="flex justify-center mt-10">
    <div class="bg-white shadow-md rounded text-center px-8 pt-6 pb-8 mb-4 flex flex-col lg:w-1/4">
      <h1 class="block titre mb-3">
        SAFE<span class="text-teal-600 fredoka">SHOP</span>
      </h1>
      <h3 class="block label-forms mb-5">Rénitialiser votre mot de passe</h3>
      <Formik @onSubmit="changePassword">
        <FormGroup
          v-for="field in fields"
          :key="field.name"
          :type="field.type"
          :name="field.name"
          :value="field.value"
          :label="field.label"
        ></FormGroup>
      </Formik>
    </div>
  </div>
</template>

<script>
import Formik from "../components/Formik/Formik";
import FormGroup from "../components/Formik/FormGroup";
export default {
  name: "ChangePassword",
  components: { Formik,FormGroup},
  data: function() {
    return {
      fields: [
        {
          label: "Nouveau mot de passe",
          name: "new_password",
          type: "password"
        },
        {
          label: "Confirmer nouveau mot de passe",
          name: "confirm_password",
          type: "password"
        }
      ]
    };
  },
   methods: {
    changePassword: function(e) {
      this.$store.dispatch('users/changePassword',{user:e,vm: this})
      this.$router.push({name: "Login"})
    }
	},
  created(){
    localStorage.setItem("changePass", this.$route.params.id);
  }
};
</script>
