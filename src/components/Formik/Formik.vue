<template>
  <form action="" @submit="emitSubmit">
    <slot></slot>
     <div class="flex flex-col w-56 m-auto my-4">
    <button @click.prevent="emitSubmit" class="bg-gray-800 hover:bg-blue-dark text-xl w-full text-white font-bold py-2 px-4 rounded" type="button">
      Valider
    </button>
    </div>
  </form>
</template>
<script>
  export default {
    name: "Formik",
    data: function() {
      return {
        values: this.initialValues || {}
      }
    },
    props: ['initialValues'],
    provide: function () {
      return {
        setValue: this.setValue
      }
    },
    methods: {
      emitSubmit: function () {
        this.$emit('onSubmit', this.values);
      },
      setValue: function ({ type, key, value, isChecked }) {
        if (Array.isArray(this.values[key]) && (type === 'checkbox') ) {
          if (!this.values[key].includes(value)) {
            this.values[key] = [...this.values[key], value];
          } else {
            this.values[key] = this.values[key].filter( v => v !== value);
          }
          return;
        }
        if (type === 'checkbox') {
          this.values[key] = isChecked;
          return;
        }
        this.values[key] = value;
      }
    }
  }
</script>

<style scoped>
</style>
