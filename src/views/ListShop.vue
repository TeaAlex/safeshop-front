<template>
  <div class="w-full xl:w-2/3 mx-auto">
    <h1 class="text-left font-bold text-2xl text-center py-12">Enseignes à proximité</h1>
    <input
      v-on:keyup="autoComplete"
      v-model="search"
      class="w-5/6 sm:w-3/4 lg:w-2/3 mx-auto block p-4 border rounded mb-8 focus:outline-none focus:shadow-outline text-base shadow-lg"
      type="search"
      placeholder="Rechercher votre commerce..."
    />
    <ul v-if="isSearched" class="w-5/6 sm:w-3/4 lg:w-2/3 mx-auto block p-4 border rounded mb-8 m--40 focus:outline-none focus:shadow-outline text-base shadow-lg">
     <div v-if="noResult">
      <li>
        <div class="w-full">
          <div class="flex cursor-pointer my-1  list-none rounded">
            <div class="w-full h-10 py-3 px-1">
              <p class="hover:text-blue-dark">Aucun résultat</p>
            </div>
          </div>
        </div>
      </li>
     </div><div v-else>
      <li v-on:click="setValue(result.properties.label)" v-for="result in results" :key="result.properties.id">
        <div class="w-full">
          <div class="flex cursor-pointer my-1 hover:bg-gray-300 list-none rounded">
           
            <div class="w-full h-10 py-3 px-1">
              <p v-if="noResult" class="hover:text-blue-dark">Aucun résultat</p>
              <p v-else class="hover:text-blue-dark">{{ result.properties.label }}</p>
            </div>
          </div>
        </div>
      </li>
      </div>
    </ul>
    <div class="w-full mx-auto lg:">
      <div class="mx-auto flex justify-center mb-4" v-for="shop in filteredList" :key="shop.id">
        <ShopItem :shop="shop" :schedules="shop.schedules"></ShopItem>
      </div>
    </div>
  </div>
</template>

<script>
import ShopItem from "../components/ShopItem";
import api from "../api/api";
import axios from "axios";

export default {
  name: "ListShop",
  components: {
    ShopItem
  },
  mounted() {
    api.get("/shop/all").then(response => (this.shops = response.data.shops));
  },
  data() {
    return {
      shops: [],
      search: "",
      results: {},
      isSearched:false,
      noResult:false
    };
  },
  computed: {
    filteredList() {
      return this.shops.filter(shops => {
        if(shops.address){
          return shops.label.toLowerCase().includes(this.search.toLowerCase()) || shops.address.toLowerCase().includes(this.search.toLowerCase()) || shops.city.toLowerCase().includes(this.search.toLowerCase());
        } else {
          return shops.label.toLowerCase().includes(this.search.toLowerCase()) || shops.city.toLowerCase().includes(this.search.toLowerCase());
        }
       
      });
    }
  },
  methods: {
    autoComplete() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        if (this.search !== "") {
          return axios
            .get(
              "https://api-adresse.data.gouv.fr/search/?q=" +
                this.search +
                "&autocomplete=0",
              {}
            )
            .then(response => {
              this.results = response.data.features;
              console.log(response.data.features);
              this.isSearched = true;
              if(response.data.features.length === 0){
                this.noResult = true;
              } else {
                this.noResult = false;
              }
            });
        } else {
          this.isSearched = false;
        }
      }, 500);
    },
    setValue(value){
      this.search = value;
      this.isSearched = false;
    }
  }
};
</script>
