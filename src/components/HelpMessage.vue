<template>
  <div
          class="px-4 py-4 rounded"
          :class="classes[type]"
  >
    <div class="flex">
      <div v-if="type === 'info'">
        <svg class="fill-current h-6 w-6 text-orange-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/>
        </svg>
      </div>
      <div v-else-if="type === 'success'">
        <svg class="fill-current h-6 w-6 text-green-800 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g data-name="Layer 2"><g data-name="checkmark-circle-2"><rect width="24" height="24" opacity="0"/><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/><path d="M14.7 8.39l-3.78 5-1.63-2.11a1 1 0 0 0-1.58 1.23l2.43 3.11a1 1 0 0 0 .79.38 1 1 0 0 0 .79-.39l4.57-6a1 1 0 1 0-1.6-1.22z"/></g></g>
        </svg>
      </div>
      <div v-else-if="type === 'error'">
        <svg class="fill-current h-6 w-6 text-red-700 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g data-name="Layer 2"><g data-name="alert-triangle"><rect width="24" height="24" transform="rotate(90 12 12)" opacity="0"/><path d="M22.56 16.3L14.89 3.58a3.43 3.43 0 0 0-5.78 0L1.44 16.3a3 3 0 0 0-.05 3A3.37 3.37 0 0 0 4.33 21h15.34a3.37 3.37 0 0 0 2.94-1.66 3 3 0 0 0-.05-3.04zm-1.7 2.05a1.31 1.31 0 0 1-1.19.65H4.33a1.31 1.31 0 0 1-1.19-.65 1 1 0 0 1 0-1l7.68-12.73a1.48 1.48 0 0 1 2.36 0l7.67 12.72a1 1 0 0 1 .01 1.01z"/><circle cx="12" cy="16" r="1"/><path d="M12 8a1 1 0 0 0-1 1v4a1 1 0 0 0 2 0V9a1 1 0 0 0-1-1z"/></g></g>
        </svg>
      </div>
      <div>
        <p class="text-base"><slot></slot></p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HelpMessage",
    props: {
      type: {
        type: String,
        required: true,
        validator(value) {
          return ['success', 'info', 'error'].indexOf(value) !== -1
        }
      }
    },
    data(){
      return {
        classes: {
          info: 'text-orange-500 bg-orange-200',
          success: 'text-green-800 bg-green-200',
          error: 'text-red-700 bg-red-200'
        }
      }
    }
  }
</script>

<style scoped>

</style>
