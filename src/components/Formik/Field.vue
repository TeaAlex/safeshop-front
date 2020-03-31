<template>
  <select v-if="type === 'select'" :name="name" @change="handleInput($event)">
    <slot></slot>
  </select>
  <textarea v-else-if="type === 'textarea'" :name="name" :value="value" @change="handleInput($event)">

  </textarea>
  <input
    v-else
    :type="type"
    :name="name"
    :value="value"
    :checked="checked"
    class="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
    @change="handleInput($event)"
  />
</template>
<script>
export default {
  name: "Field",
  props: ["type", "name", "value", "checked"],
  inject: ["setValue"],
  methods: {
    handleInput: function(event) {
      this.setValue({
        type: this.type,
        key: this.name,
        value: event.target.value,
        isChecked: event.target.checked
      });
    }
  }
};
</script>
<style scoped>
</style>
