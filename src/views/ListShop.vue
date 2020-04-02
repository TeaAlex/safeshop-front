<template>
  <div class="w-full xl:w-2/3 mx-auto">
    <h1 class="text-left font-bold text-2xl text-center py-12">
      Enseignes à proximité
    </h1>
    <input v-model="search" class="w-5/6 sm:w-3/4 lg:w-2/3 mx-auto block p-4 border rounded mb-8 focus:outline-none focus:shadow-outline text-base shadow-lg "
      type="search"
      placeholder="Rechercher votre commerce..."
    />
    <div class="w-full mx-auto lg:">
      <div class="mx-auto flex justify-center mb-4" v-for="shop in filteredList" :key="shop.id">
        <ShopItem :shop="shop" :schedules="shop.schedules">
        </ShopItem>
      </div>
    </div>
  </div>
</template>

<script>
import ShopItem from "../components/ShopItem";
import api from '../api/api'

export default {
  name: 'ListShop',
  components: {
    ShopItem
  },
  mounted() {
    api.get('/shop/all')
      .then(response => this.shops = response.data.shops)
  },
  data(){
    return {
      shops: [],
      search: '',
    }
  },
  computed: {
    filteredList() {
      return this.shops.filter(shops => {
        return shops.label.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  }
};
</script>
