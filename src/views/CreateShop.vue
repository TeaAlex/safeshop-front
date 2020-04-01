<template>
  <div class="flex justify-center mt-10">
    <div class="bg-white shadow-md rounded text-center px-8 w-1/4 pt-6 pb-8 mb-4 flex flex-col">
      <h1 class="block titre mb-3">
        SAFE<span class="text-teal-600 fredoka">SHOP</span>
      </h1>
      <h3 class="block label-forms mb-5">Inscription commerçant</h3>
      <Formik>
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
import { mapState } from 'vuex'
export default {
  name: "CreateShop",
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
          label: "Nom du commerce",
          name: "shopName",
          type: "text"
        },
        {
          label: "Adresse",
          name: "adress",
          type: "text"
        },
        {
          label: "Code postal",
          name: "zipCode",
          type: "text"
        },
        {
          label: "Ville",
          name: "city",
          type: "text",
        },
        {
          label: "Numéro",
          name: "number",
          type: "text"
        },
        {
          label: "Siret",
          name: "siret",
          type: "text"
        },
        {
          label: "Siren",
          name: "siren",
          type: "text",
          value:this.shopData.siren
        }
      ]
    };
  },
  computed: mapState({
  shopData: state => state.users.shopData
  })
};
</script>