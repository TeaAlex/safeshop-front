<template>

  <div class="flex-col w-2/3 m-auto my-4">
    <label class="font-semibold text-gray-700 text-left block mb-2">{{ label }}</label>
    <Field :key="name"
           :type="type"
           :name="name"
           :value="value"
           class="bg-grey px-3"
    >
      <slot></slot>
    </Field>
  </div>


</template>

<script>
  import Field from './Field'
  export default {
    name: "FormGroup2",
    components: {
      Field
    },
    props: ['type', 'label', 'name', 'value'],
  }
</script>

<style scoped>

</style>
