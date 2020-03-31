<template>
<div class="flex justify-center mt-10">

  <div class="bg-white shadow-md rounded px-8 w-1/4 pt-6 pb-8 mb-4 flex flex-col">
    <h1 class="block titre mb-3">SAFE<span class="text-teal-600">SHOP</span></h1>
    <h3 class="block label-forms mb-5">INSCRIPTION</h3>
          <Formik v-if="shopFields">
            <FormGroup v-for="field in fields"
                       :key="field.name"
                       :type="field.type"
                       :name="field.name"
                       :value="field.value"
                       :label="field.label"
            >
            </FormGroup>
          </Formik>
          <Formik v-else>
            <FormGroup v-for="field in fields"
                       :key="field.name"
                       :type="field.type"
                       :name="field.name"
                       :value="field.value"
                       :label="field.label"
            >
            </FormGroup>
          </Formik>
                <router-link to="/connexion" class="inline-block align-baseline mt-4 font-bold text-sm text-blue hover:text-blue-darker" href="#">
        Déjà un compte? Connectez vous.</router-link>
</div>
</div>
</template>

<script>
  import Formik from "../components/Formik/Formik";
  import FormGroup from "../components/Formik/FormGroup";
  export default {
    name: 'Navbar',
    components: { Formik,FormGroup},
    data: function () {
      return {
        fields: [
          {
            label: 'Email',
            name: 'email',
            type: 'email',
          },          {
            label: 'Prénom',
            name: 'prenom',
            type: 'text',
          },          {
            label: 'Nom',
            name: 'nom',
            type: 'text',
          },
          {
            label: 'Mot de passe',
            name: 'password',
            type: 'password',
          },
          {
            label: 'Confirmer le mot de passe',
            name: 'resetpassword',
            type: 'password',
          }
        ],
        isShop: true
      }
    },
    computed: {
        shopFields() {
        return this.fields = [
          {
            label: 'Email',
            name: 'email',
            type: 'email',
          },          {
            label: 'Prénom',
            name: 'prenom',
            type: 'text',
          },          {
            label: 'Nom',
            name: 'nom',
            type: 'text',
          },
          {
            label: 'Mot de passe',
            name: 'password',
            type: 'password',
          },
          {
            label: 'Confirmer le mot de passe',
            name: 'resetpassword',
            type: 'password',
          }
        ];
        }
    }
  }
</script>