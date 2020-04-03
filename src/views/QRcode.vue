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
    import jsPDF from "jspdf";
    import Vue from 'vue';
    import html2canvas from "html2canvas"
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
            downloadWithCSS() {
                const doc = new jsPDF();
                /** WITH CSS */
                var canvasElement = document.createElement('canvas');
                html2canvas(this.$refs.content, {
                    canvas: canvasElement
                }).then(function (canvas) {
                    const img = canvas.toDataURL("image/jpeg", 0.8);
                    doc.addImage(img, 'JPEG', 50, 50);
                    doc.save("sample.pdf");
                });
            },
            download() {
                const doc = new jsPDF();
                /** WITHOUT CSS */
                const contentHtml = this.$refs.content.innerHTML;
                doc.fromHTML(contentHtml, 100, 100, {
                    width: 1700
                });
                doc.save("sample.pdf");
            },
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


