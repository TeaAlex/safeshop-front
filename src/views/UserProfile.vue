<template>
    <v-container>
        <div class="flex flex-col w-56 m-auto my-4">
            <h1 class="label-forms mb-5 mt-10 mb:text-4xl text-center ">
                Editer mon profil
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

        </Formik>

    </v-container>
</template>

<script>
    import Formik from "../components/Formik/Formik";
    import FormGroup2 from "../components/Formik/FormGroup2";

    export default {
        name: "UserProfile",
        components: {Formik, FormGroup2},
        /*mounted() {
            api.get('/user/current-user')
                .then(response => this.user = response.data.user)
        },*/
        data: function () {
            return {
                user:{},
                fields: [
                    {
                       label:"Nom",
                       name:"lastname",
                       type:"text",

                    },
                    {
                        label:"Prenom",
                        name:"firstname",
                        type:"text",

                    },
                    {
                        label:"Email",
                        name:"email",
                        type:"email",

                    },
                ],

            }
        }
    }
</script>

<style scoped>

</style>