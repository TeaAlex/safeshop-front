<template>
    <div class="w-full xl:w-2/3 mx-auto">
        <h1 class="text-left font-bold text-2xl text-center py-12">
            Générer votre QR Code </h1>
        <div id="printMe" class="w-full xl:w-2/3 mx-auto flex justify-center">
            <qrcode-vue :value="value" :size="size" level="H"></qrcode-vue>
            <div class="w-full xl:w-2/3 mx-auto ">
                <ShopItem :shop="shop" :schedules="schedules">
                </ShopItem>
            </div>
        </div>
        <button
            class="bg-gray-800 hover:bg-blue-dark text-xl w-1/2 text-white font-bold py-2 px-4 rounded mt-8 flex justify-center mx-auto"
            v-print="'#printMe'">Imprimez votre QR Code commerçant </button>
    </div>
</template>

<script>
    import Vue from 'vue';
    import QrcodeVue from 'qrcode.vue';
    import Print from 'vue-print-nb'
    import ShopItem from "../components/ShopItem";
    import api from '../api/api';

    Vue.use(Print);

    export default {
        name: "QRcode",
        mounted() {
            api.get(`/shop/${this.$route.params.id}/show`)
                .then((response) => {
                    const {
                        shop,
                        slots,
                        days
                    } = response.data;
                    this.shop = shop;
                    this.schedules = shop.schedules;
                    this.slots = slots;
                    this.days = days;
                })
        },
        data() {
            return {
                value: `${process.env.FRONT_URL}/commerce/${this.$route.params.id}`,
                // value: `${process.env.VUE_APP_BASE_URL}/shop/${this.$routes.params.id}`,
                size: 270,
                shop: {},
                schedules: [],
                slots: {},
                days: {},
            }
        },
        props: {
            msg: String
        },
        components: {
            QrcodeVue,
            ShopItem
        },
        methods: {
            print() {
                const modal = document.getElementById("content")
                const cloned = modal.cloneNode(true)
                let section = document.getElementById("print")

                if (!section) {
                    section = document.createElement("div")
                    section.id = "print"
                    document.body.appendChild(section)
                }

                section.innerHTML = "";
                section.appendChild(cloned);
                window.print();
            }


        }
    };
</script>