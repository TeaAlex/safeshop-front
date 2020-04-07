<template>
    <div class="w-full mx-auto">
        <div class="w-2/3 mx-auto " v-if="user.role_id == 3">
            <div class="flex w-full mx-auto items-center justify-between">
                <h1 class="text-left w-2/3 font-bold text-2xl text-left my-12 flex-col">
                    Mon profil
                </h1>
                <a href="/edituser"  class="bg-gray-800 hover:bg-blue-dark text-xl w-1/8 text-white font-bold py-2 px-4 rounded flex-col" type="button">
                    Editer</a>
            </div>
            <div class="flex w-full rounded	bg-white shadow-md rounded py-3 items-center mb-4">
                <div class="flex-col w-1/3 px-6 ">
                    <label class="font-semibold text-black-700 block mb-2 align-middle">Nom</label>
                </div>
                <div class="flex-col w-1/3">
                    <label class="font-semibold text-gray-700 block mb-2 align-middle">{{user.lastname}}</label>
                </div>
            </div>

            <div class="flex w-full rounded	bg-white shadow-md rounded py-3 items-center mb-4">
                <div class="flex-col w-1/3 px-6 ">
                    <label class="font-semibold text-black-700 block mb-2 align-middle">Prenom</label>
                </div>
                <div class="flex-col w-1/3">
                    <label class="font-semibold text-gray-700 block mb-2 align-middle">{{user.firstname}}</label>
                </div>
            </div>
            <div class="flex w-full rounded	bg-white shadow-md rounded py-3 items-center mb-4">
                <div class="flex-col w-1/3 px-6 ">
                    <label class="font-semibold text-black-700 block mb-2 align-middle">Email</label>
                </div>
                <div class="flex-col w-1/3">
                    <label class="font-semibold text-gray-700 block mb-2 align-middle">{{user.email}}</label>
                </div>
            </div>
        </div>
        <div class="w-2/3 mx-auto" v-if="user.role_id == 2">
            <div class="flex w-full mx-auto items-center justify-between">
                <h1 class="text-left w-2/3 font-bold text-2xl text-left my-12 flex-col">
                    Mon commerce
                </h1>
                <a href="/commerce/edit"  class="bg-gray-800 hover:bg-blue-dark text-xl w-1/8 text-white font-bold py-2 px-4 rounded flex-col " type="button">
                    Editer</a>
                            <router-link :to="{ name: 'QRcode', params: { id: shop.id } }">
                     <div class="bg-gray-800 hover:bg-blue-dark text-xl w-40 ml-2 text-white text-center font-bold py-2 px-4 rounded flex-col " type="button">
                    Mon QR Code</div>
                            </router-link>
            </div>
            <div class="flex w-full rounded	bg-white shadow-md rounded py-3 items-center mb-4">
                <div class="flex-col w-1/3 px-6 ">
                    <label class="font-semibold text-black-700 block mb-2 align-middle">Adresse</label>
                </div>
                <div class="flex-col w-1/3">
                    <label class="font-semibold text-gray-700 block mb-2 align-middle">{{shop.address}}</label>
                </div>
            </div>
            <div class="flex w-full rounded	bg-white shadow-md rounded py-3 items-center mb-4">
                <div class="flex-col w-1/3 px-6 ">
                    <label class="font-semibold text-black-700 block mb-2 align-middle">Ville</label>
                </div>
                <div class="flex-col w-1/3">
                    <label class="font-semibold text-gray-700 block mb-2 align-middle">{{shop.city}}</label>
                </div>
            </div>
            <div class="flex w-full rounded	bg-white shadow-md rounded py-3 items-center mb-4">
                <div class="flex-col w-1/3 px-6 ">
                    <label class="font-semibold text-black-700 block mb-2 align-middle">Code Postal</label>
                </div>
                <div class="flex-col w-1/3">
                    <label class="font-semibold text-gray-700 block mb-2 align-middle">{{shop.zip_code}}</label>
                </div>
            </div>
            <div class="flex w-full rounded	bg-white shadow-md rounded py-3 items-center mb-4">
                <div class="flex-col w-1/3 px-6 ">
                    <label class="font-semibold text-black-700 block mb-2 align-middle">email</label>
                </div>
                <div class="flex-col w-1/3">
                    <label class="font-semibold text-gray-700 block mb-2 align-middle">{{shop.email}}</label>
                </div>
            </div>
            <div class="flex w-full rounded	bg-white shadow-md rounded py-3 items-center mb-4">
                <div class="flex-col w-1/3 px-6 ">
                    <label class="font-semibold text-black-700 block mb-2 align-middle">Siret</label>
                </div>
                <div class="flex-col w-1/3">
                    <label class="font-semibold text-gray-700 block mb-2 align-middle">{{shop.siret}}</label>
                </div>
            </div>
        </div>
    </div>

</template>


<script>
    import api from "../api/api";
    export default {
        name: "UserAccess",
        mounted() {
            api.get('/user/current-user')
                .then(response => {
                    this.user = response.data.user;
                    if(response.data.user.role_id == 2){
                        api.get('/shop/show')
                            .then(response => this.shop = response.data.shop)
                    }});
        },
        data(){
            return {
                user: {},
                shop:{}
            }
        },
    }
</script>

<style scoped>
