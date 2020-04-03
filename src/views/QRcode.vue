<template>
    <div  class="w-full xl:w-2/3 mx-auto">
        <h1 class="text-left font-bold text-2xl text-center py-12">
            Générer votre QR Code </h1>
        <div id="printMe" class="w-full xl:w-2/3 mx-auto flex justify-center">
            <qrcode-vue :value="value" :size="size" level="H"></qrcode-vue>
             <ShopItem>
        </ShopItem>
        </div>
                 <button class="bg-gray-800 hover:bg-blue-dark text-xl w-1/2 text-white font-bold py-2 px-4 rounded mt-8 flex justify-center mx-auto" v-print="'#printMe'">Imprimez votre QR Code commerçant </button>
    </div>
</template>

<script>
    import Vue from 'vue';
    import QrcodeVue from 'qrcode.vue';
    import Print from 'vue-print-nb'
    import ShopItem from "../components/ShopItem";


    Vue.use(Print);

    export default {
        name: "QRcode",
        data() {
            return {
                value: 'https://safeshop.fr',
                size: 300,
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


