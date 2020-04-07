<template>
  <div id="app">
    <Navbar />
    <div class="mt-4">
      <HelpMessage type="error" v-if="errorMessage">{{errorMessage}}</HelpMessage>
    </div>
    <div class="mx-auto bg-gray-100 h-full pb-32 min-h-screen">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import HelpMessage from "./components/HelpMessage";
export default {
  name: "app",
  components: {
    Navbar,
    HelpMessage
  },
  computed: {
    errorMessage(){
      return this.$store.state.users.error
    }
  },
};
</script>
