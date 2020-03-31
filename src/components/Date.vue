<template>

        <div class="flex flex-col w-56 m-auto my-4">
            <div class="flex flex-wrap -mx-3 mb-6 ">
                <div class="w-full md:w-1/6 px-3 px:w-1/3 md:mb-0 ">
                    <label class="font-semibold text-gray-700 block mb-2 align-middle">{{label}}</label>
                </div>
                <div class="w-full md:w-1/6 px-0 px:w-1/3 md:mb-0 ">
                </div>
                <div class="w-full md:w-2/6 px-1 px:w-1/3  md:mb-0">
            <input
                    :key="field1"
                    :type="type"
                    :name="field1"
                    :value="value"
                    class="block text-sm appearance-none w-full bg-white border border-grey-light text-left hover:border-grey py-2 px-1 rounded shadow"
                    @change="handleInput($event)"
            />
                </div>
                <div class="w-full md:w-2/6 px-1 px:w-1/3">
            <input
                    :key="field2"
                    :type="type"
                    :name="field2"
                    :value="value"
                    class="block text-sm appearance-none w-full bg-white border border-grey-light text-left hover:border-grey px-1 py-2 rounded shadow "
                    @change="handleInput($event)"
            />
                </div>
            </div>
        </div>

</template>

<script>
    export default {
        name: "Date",
        props: ["label","type", "field1","field2", "value", "checked"],
        inject: ["setValue"],
        methods: {
            handleInput: function (event) {
                this.setValue({
                    type: this.type,
                    key: this.name,
                    value: event.target.value,
                    isChecked: event.target.checked
                });
            }
        }
    }
</script>

<style scoped>

</style>
