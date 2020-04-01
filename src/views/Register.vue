<template>
  <div class="flex justify-center mt-10">
    <div class="bg-white shadow-md rounded text-center px-8 w-1/4 pt-6 pb-8 mb-4 flex flex-col">
      <h1 class="block titre mb-3">
        SAFE<span class="text-teal-600 fredoka">SHOP</span>
      </h1>
      <h3 class="block label-forms mb-5">INSCRIPTION</h3>
      <div class="flex items-stretch w-full m-auto my-4">
        <button
          @click.prevent="choosePeople"
          :class="style"
          type="button"
        >Particulier</button>
        <button
          @click.prevent="chooseShop"
          :class="style2"
          type="button"
        >Professionnel</button>
      </div>
        <div v-if="madeChoice">
        <Formik @onSubmit="handleSubmit" v-if="isShop">
        <FormGroup
          v-for="field in fields"
          :key="field.name"
          :type="field.type"
          :name="field.name"
          :value="field.value"
          :label="field.label"
        ></FormGroup>
      </Formik>
      <Formik @onSubmit="createAccount" v-else>
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
      <router-link
        to="/connexion"
        class="inline-block align-baseline mt-4 font-bold text-sm text-blue hover:text-blue-darker"
        href="#"
      >Déjà un compte? Connectez vous.</router-link>
    </div>
  </div>
</template>

<script>
import Formik from "../components/Formik/Formik";
import FormGroup from "../components/Formik/FormGroup";
export default {
  name: "Register",
  components: { Formik, FormGroup },
  data: function() {
    return {
      fields: [],
      isShop: true,
      madeChoice:false,
      style:'bg-gray-800 buttonStyle text-xl w-1/2 text-white font-bold py-2 px-4 mr-3 rounded',
      style2:'bg-gray-800 buttonStyle text-xl w-1/2 text-white font-bold py-2 px-4 mr-3 rounded'
    };
  },
  methods: {
    shopFields() {
      if (this.isShop) {
        return (this.fields = [
          {
            label: "Siret",
            name: "siret",
            type: "email"
          }
        ]);
      } else {
        return (this.fields = [
          {
            label: "Email",
            name: "email",
            type: "email"
          },
          {
            label: "Prénom",
            name: "prenom",
            type: "text"
          },
          {
            label: "Nom",
            name: "nom",
            type: "text"
          },
          {
            label: "Mot de passe",
            name: "password",
            type: "password"
          },
          {
            label: "Confirmer le mot de passe",
            name: "resetpassword",
            type: "password"
          }
        ]);
      }
    },
    chooseShop() {
        this.madeChoice = true;
        this.isShop = true;
        this.style = 'bg-gray-800 buttonStyle text-xl w-1/2 text-white font-bold py-2 px-4 mr-3 rounded';
        this.style2 = "bg-white buttonStyle text-xl w-1/2 text-bg-gray-800 font-bold py-2 px-4 mr-3 rounded border border-solid border-gray-800";
        this.shopFields();
    },
    choosePeople() {
        this.madeChoice = true;
        this.isShop = false;
        this.style2 = 'bg-gray-800 buttonStyle text-xl w-1/2 text-white font-bold py-2 px-4 mr-3 rounded';
        this.style = 'bg-white buttonStyle text-xl w-1/2 text-bg-gray-800 font-bold py-2 px-4 mr-3 rounded border border-solid border-gray-800';
        this.shopFields();
    },
    handleSubmit: function(e) {
      this.$store.dispatch('users/getShopData',{siret:e,vm:this})
      this.$router.push({name: "CreateShop"})
    },
    createAccount: function(e) {
      this.$store.dispatch('users/register',{user:e,vm: this})
      this.$router.push({name: "Login"})
	}
  }
};
</script>
<style scoped>
 .buttonStyle:hover {
     background-color: white;
     border:1px solid #2d3748;
     color:#2d3748;
 }
</style>
