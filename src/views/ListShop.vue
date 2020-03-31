<template>
  <div class="w-full xl:w-2/3 mx-auto">
    <h1 class="text-left font-bold text-2xl text-center py-12">
      Enseignes à proximité
    </h1>
    <input class="w-5/6 sm:w-3/4 lg:w-2/3 mx-auto block p-4 border rounded mb-8 focus:outline-none focus:shadow-outline text-base shadow-lg "
      type="search"
      placeholder="Rechercher votre commerce..."
    />
    <div class="w-full mx-auto lg:">
      <div class="mx-auto flex justify-center mb-4">
        <ShopItem></ShopItem>
      </div>
    </div>
  </div>
</template>

<script>
import ShopItem from "../components/ShopItem";

export default {
  components: {
    ShopItem
  }
};
</script>
