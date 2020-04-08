<template>
    <div>
        <div class="flex flex-col w-2/3 m-auto my-4">
            <div class="flex w-full mx-auto items-center justify-between">
                <h1 class="label-forms mb-5 mt-10 mb:text-4xl text-center ">
                    Editer mon profil
                </h1>

                <a href="/profil"  class="bg-gray-800 hover:bg-blue-dark text-xl w-1/8 text-white font-bold py-2 px-4 rounded flex-col" type="button">
                    Retour</a>
            </div>
        </div>
        <Formik @onSubmit="editUser">
            <FormGroup v-for="field in fields"
                       :key="field.name"
                       :type="field.type"
                       :name="field.name"
                       :value="field.value"
                       :label="field.label"
                       :required="field.required"
                       class="w-2/3"
            >
            </FormGroup>

        </Formik>


    </div>
</template>

<script>
    import Formik from "../components/Formik/Formik";
    import FormGroup from "../components/Formik/FormGroup";
    import api from "../api/api";
    export default {
        name: "UserProfile",
        components: {Formik, FormGroup},
        beforeMount(){
            api.get('/user/current-user', {
                headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` }
            })
                .then(response => { this.user = response.data.user;
                    this.setFieldsValue(this.user)});
        },
        data: function () {
            return {
                user:{},
                fields: [
                    {
                        label:"Nom",
                        name:"lastname",
                        type:"text",
                        value: ""
                    },
                    {
                        label:"Prenom",
                        name:"firstname",
                        type:"text",
                        value: ""
                    },

                ],
            }
        },
        methods: {
            setFieldsValue(user) {
                this.fields[0]["value"] = user.lastname; // nom du user
                this.fields[1]["value"] = user.firstname;
            },
            editUser: function(e) {
                this.$store.dispatch('users/editUser',{user:e,vm: this})
                this.$router.push({name: "UserAccess"})
            }
        }
    }
</script>

<style scoped>
</style>
