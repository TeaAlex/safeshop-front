<template>
  <div id="app">
    <Navbar />
    <div class="mx-auto bg-gray-100 h-full pb-32 min-h-screen">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
export default {
  name: "app",
  components: {
    Navbar
  }
};
</script>
