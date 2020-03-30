<template>
  <form action="" @submit="emitSubmit">
    <slot></slot>
    <button @click.prevent="emitSubmit" class="bg-green-600 font-semibold px-3 py-2 rounded-sm text-blue-100">
      Valider
    </button>
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
