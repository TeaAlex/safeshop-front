<template>

        <div class="flex flex-col w-2/3 items-stretch m-auto my-4">
            <div class="flex flex-wrap -mx-3 mb-6  justify-end  sm:justify-end md:justify-between lg:justify-between xl:justify-between ">
                <div class="sm:w-1/4 md:w-1/4  px-2 md:mb-2 -mr-1 items-right  ">
                    <label class="font-semibold text-gray-700 block mb-2 sm:text-sm align-middle">{{label}}</label>
                </div>

            <input
                    :key="field1"
                    :type="type"
                    :name="field1"
                    :value="value1"
                    class="block text-sm appearance-none  bg-white border border-grey-light text-left hover:border-grey py-2 px-2 sm:w-1/4 md:w-1/4  items-left rounded shadow"
                    @change="handleInput($event)"
            />

            <input
                    :key="field2"
                    :type="type"
                    :name="field2"
                    :value="value2"
                    class="block text-sm appearance-none bg-white border border-grey-light text-left hover:border-grey px-2 py-2 sm:w-1/4 md:w-1/4 ml-2 sm:ml-1 items-left rounded shadow "
                    @change="handleInput($event)"
            />

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
