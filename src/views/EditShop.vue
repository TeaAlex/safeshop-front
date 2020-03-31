<template>
    <v-component>
    <div class="flex flex-col w-56 m-auto my-4">
        <h1 class="label-forms mb-5 mt-10 ">
            Editer mon enseigne
        </h1>
    </div>
    <Formik>
        <FormGroup v-for="field in fields"
                   :key="field.name"
                   :type="field.type"
                   :name="field.name"
                   :value="field.value"
                   :label="field.label"
        >
        </FormGroup>

        <Date v-for="date in dates"
                   :key="date.name"
                   :type="date.type"
                   :name="date.name"
                   :value="date.value"
                   :label="date.label"
        >
        </Date>

    </Formik>
    </v-component>

</template>

<script>
    import Formik from "../components/Formik/Formik";
    import FormGroup from "../components/Formik/FormGroup";
    import Date from "../components/Date";
    export default {
        name: "Editshop",
        components: {Formik, FormGroup, Date},
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

                ]
            }
        }
    }
</script>

<style scoped>

</style>