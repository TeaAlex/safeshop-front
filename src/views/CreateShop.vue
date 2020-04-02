<template>
  <div class="flex justify-center mt-10">
    <div class="bg-white shadow-md rounded text-center px-8 w-1/4 pt-6 pb-8 mb-4 flex flex-col">
      <h1 class="block titre mb-3">
        SAFE<span class="text-teal-600 fredoka">SHOP</span>
      </h1>
      <h3 class="block label-forms mb-5">Inscription commerçant</h3>
      <Formik @onSubmit="createShop">
        <FormGroup
          v-for="field in fields"
          :key="field.name"
          :type="field.type"
          :name="field.name"
          :value="field.value"
          :label="field.label"
          :required="field.required"
          :disabled="field.disabled"
        ></FormGroup>
      </Formik>
    </div>
  </div>
</template>

<script>
import Formik from "../components/Formik/Formik";
import FormGroup from "../components/Formik/FormGroup";
import {mapState} from "vuex";

export default {
  name: "CreateShop",
  components: { Formik, FormGroup },
  beforeMount() {
    this.setFieldsValue()
  },
  data: function() {
    return {
      fields: [
        {
          label: "Email",
          name: "email",
          type: "email",
          value: ""
        },
        {
          label: "Nom du commerce",
          name: "shopName",
          type: "text",
          value: ""
        },
        {
          label: "Adresse",
          name: "address",
          type: "text",
          value: ""
        },
        {
          label: "Code postal",
          name: "zipCode",
          type: "text",
          value: ""
        },
        {
          label: "Ville",
          name: "city",
          type: "text",
          value: ""
        },
        {
          label: "Numéro",
          name: "number",
          type: "text",
          value: ""
        },
        {
          label: "Siret",
          name: "siret",
          type: "text",
          value: ""
        },
        {
          label: "Siren",
          name: "siren",
          type: "text",
          value: ""
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
      ]
    };
  },
  computed: mapState({
    shopData: state => state.users.shopData
  }),
  methods: {
    setFieldsValue() {
      this.fields[1]["value"] = this.shopData.uniteLegale.denominationUniteLegale; // nom du commerce
      this.fields[2]["value"] = this.shopData.adresseEtablissement.numeroVoieEtablissement + " " + this.shopData.adresseEtablissement.typeVoieEtablissement + " " + this.shopData.adresseEtablissement.libelleVoieEtablissement;
      this.fields[3]["value"] = this.shopData.adresseEtablissement.codePostalEtablissement;
      this.fields[4]["value"] = this.shopData.adresseEtablissement.libelleCommuneEtablissement;
      this.fields[6]["value"] = this.shopData.siret;
      this.fields[7]["value"] = this.shopData.siren;
    },
    createShop: function(values) {
      this.$store.dispatch('users/register_shop',{user: values});
      this.$router.push({name: "Login"})
	  }
  }
};
</script>
