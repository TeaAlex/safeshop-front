<template>
    <div class="w-full xl:w-2/3 mx-auto">
        <div class="w-full mx-auto lg:">
            <div class="mx-auto flex justify-center mt-8">
                <ShopItem>
                </ShopItem>
            </div>
            <h1 class="text-left font-bold text-2xl pl-40 py-3">
                Créneaux disponibles
            </h1>
            <div class="w-full xl:w-2/3 mx-auto bg-orange-200 border-t-4 border-orange-200 rounded-b text-orange-500 px-4 py-3 mb-2 shadow-md "
                role="alert">
                <div class="flex">
                    <div><svg class="fill-current h-6 w-6 text-orange-500 mr-4" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20">
                            <path
                                d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                        </svg></div>
                    <div>
                        <p class="text-sm">1 seule réservation possible par jour </p>
                    </div>
                </div>

            </div>
            <div class=" dropdown w-full xl:w-2/3 mx-auto px-4 mt-10 py-3 bg-white shadow-md ">

                <button @click="isOpen = !isOpen" type="button"
                    class=" w-full text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
                    <span class="mr-1">Lundi 1 mars</span>
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /> </svg>
                </button>
                <ul v-if="isOpen" class="dropdown-menu absolute  text-gray-700 pt-1">
                    <li class=""><a
                            class="dropdown w-full  px-4  py-3 bg-white shadow-md block hover:bg-gray-300 whitespace-no-wrap"
                            href="#">Mardi 2 mars</a></li>
                    <li class=""><a
                            class="dropdown w-full  px-4  py-3 bg-white shadow-md block hover:bg-gray-300 whitespace-no-wrap"
                            href="#">Mercredi 3 mars</a></li>
                    <li class=""><a
                            class="dropdown w-full  px-4  py-3 bg-white shadow-md block hover:bg-gray-300 whitespace-no-wrap"
                            href="#">Jeudi 4 mars</a></li>
                </ul>
            </div>



            <div class="mt-4 ">
                <div class="mx-auto flex justify-center w-full pr-40 pl-20 mt-4">
                    <div class="flex items-center justify-center  sm:w-20">

                    </div>
                    <div class="flex-grow bg-white -mx-2 sm:rounded p-4  mt-12 sm:p-6 sm:w-3/4 lg:w-2/3">
                        <div class="text-base">

                            <div class="grid grid-cols-3 text-gray-800  h-auto flex justify-around items-center">
                                <span class="w-12 mx-10 bg-gray-200 cursor-pointer text-center mt-4 hover:bg-teal-600" v-for="(Hour, index) in Hours" :key="index">{{ Hour }}</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import ShopItem from "../components/ShopItem";

    export default {
        components: {
            ShopItem
        },
        data() {
            return {
                isOpen: false,
                Hours: ["9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
                    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
                ],

            };
        }
    };
</script>

<style scoped>


</style>