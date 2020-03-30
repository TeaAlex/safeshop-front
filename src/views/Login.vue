<template>
<div class="flex justify-center mt-10">

  <div class="bg-white shadow-md rounded px-8 w-1/4 pt-6 pb-8 mb-4 flex flex-col">
    <h1 class="block titre mb-3">SAFE<span class="text-teal-600">SHOP</span></h1>
    <h3 class="block label-forms mb-5">CONNEXION</h3>
 <Formik>
            <FormGroup v-for="field in fields"
                       :key="field.name"
                       :type="field.type"
                       :name="field.name"
                       :value="field.value"
                       :label="field.label"
            >
            </FormGroup>
          </Formik>
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
          },
          {
            label: 'Mot de passe',
            name: 'password',
            type: 'password',
          }
        ],
      }
    }
  }
</script>