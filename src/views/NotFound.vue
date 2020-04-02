<template>
  <div id="app">
   <div class="m-auto text-center text-2xl mt-20 pt-20"> {{ msg }}</div>
  </div>
</template>

<script>

export default {
  name: 'NotFound',
  data:() => ({
		msg: "Oups, cette page n'existe pas..."
	}),
}
</script>

<style>
</style>
