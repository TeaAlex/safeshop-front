<template>
    <v-container>
    <div class="flex flex-col w-56 m-auto my-4">
        <h1 class="label-forms mb-5 mt-10 mb:text-4xl ">
            Editer mon enseigne
        </h1>
    </div>
    <Formik >

        <FormGroup2 v-for="field in fields"
                   :key="field.name"
                   :type="field.type"
                   :name="field.name"
                   :value="field.value"
                   :label="field.label"
                   class="w-2/3"
        >
        </FormGroup2>
        <div class="flex flex-col w-2/3 m-auto my-2 items-stretch invisible sm:invisible md:visible lg:visible xl:visible">
            <div class="flex flex-wrap -mx-3 mb-6 justify-between ">
                <div class="w-full md:w-1/4 px-3 md:mb-0 ">
                    <label class="font-semibold text-gray-700 block mb-2 align-middle">Jour</label>
                </div>
                <div class="w-full md:w-1/4 px-3 md:mb-0 ">
                    <label class="font-semibold text-gray-700 block mb-2 align-middle">Ouverture</label>
                </div>
                <div class="w-full md:w-1/4 px-3 md:mb-0 ">
                    <label class="font-semibold text-gray-700 block mb-2 align-middle">Fermeture</label>
                </div>
            </div>
        </div>

        <Date v-for="date in dates"
              :key="date.name"
              :type="date.type"
              :name="date.name"
              :value="date.value"
              :label="date.label"
              class="justify-center"
        >
        </Date>

    </Formik>

    </v-container>
</template>

<script>
    import Formik from "../components/Formik/Formik";
    import FormGroup2 from "../components/Formik/FormGroup2";
    import Date from "../components/Date";
    export default {
        name: "Editshop",
        components: {Formik, FormGroup2, Date},
        data: function () {
            return {
                fields: [
                    {
                        label: 'Nom',
                        name: 'name',
                        type: 'text',
                    },
                    {
                        label: 'Adresse',
                        name: 'address',
                        type: 'text',
                    },
                    {
                        label: 'Code',
                        name: 'postal',
                        type: 'number',
                    },
                    {
                        label: 'Ville',
                        name: 'city',
                        type: 'text',
                    },
                    {
                        label: 'Intervalle des créneaux (minutes)',
                        name: 'interval',
                        type: 'number',
                    },
                    {
                        label: 'Nombre de personnes par créneau',
                        name: 'number_max',
                        type: 'number',
                    },
                ],
                dates: [
                    {
                        label: 'lundi',
                        field1: 'begin_lun',
                        field2: 'end_lun',
                        type: 'time',
                    },
                    {
                        label: 'Mardi',
                        field1: 'begin_mar',
                        field2: 'end_mar',
                        type: 'time',
                    },
                    {
                        label: 'Mercredi',
                        field1: 'begin_mer',
                        field2: 'end_mer',
                        type: 'time',
                    },
                    {
                        label: 'Jeudi',
                        field1: 'begin_jeu',
                        field2: 'end_jeu',
                        type: 'time',
                    },
                    {
                        label: 'Vendredi',
                        field1: 'begin_ven',
                        field2: 'end_ven',
                        type: 'time',
                    },
                    {
                        label: 'Samedi',
                        field1: 'begin_sam',
                        field2: 'end_sam',
                        type: 'time',
                    },
                    {
                        label: 'Dimanche',
                        field1: 'begin_dim',
                        field2: 'end_dim',
                        type: 'time',
                    },

                ],


            }
        }
    }
</script>

<style scoped>

</style>