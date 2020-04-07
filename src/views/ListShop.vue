<template>
  <div class="w-full xl:w-2/3 mx-auto">
    <h1 class="text-left font-bold text-2xl text-center py-12">Retrouvez vos commerces de proximité</h1>
    <div class="flex items-center justify-center mb-8">
      <input
              v-on:keyup="autoComplete"
              v-model="search"
              class="w-5/6 sm:w-3/4 lg:w-2/3 block p-4 border rounded focus:outline-none focus:shadow-outline text-base shadow-lg"
              type="search"
              placeholder="Rechercher votre commerce..."
      />
      <div @click="geolocate" class="h-8 w-8 text-teal-500 cursor-pointer">
        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="pin"><rect width="24" height="24" opacity="0"/><path d="M12 2a8 8 0 0 0-8 7.92c0 5.48 7.05 11.58 7.35 11.84a1 1 0 0 0 1.3 0C13 21.5 20 15.4 20 9.92A8 8 0 0 0 12 2zm0 17.65c-1.67-1.59-6-6-6-9.73a6 6 0 0 1 12 0c0 3.7-4.33 8.14-6 9.73z"/><path d="M12 6a3.5 3.5 0 1 0 3.5 3.5A3.5 3.5 0 0 0 12 6zm0 5a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 12 11z"/></g></g></svg>
      </div>
    </div>

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
      <li v-on:click="setValue(result.name, result.coordinates)" v-for="(result, index) in results" :key="index">
        <div class="w-full">
          <div class="flex cursor-pointer my-1 hover:bg-gray-300 list-none rounded">

            <div class="w-full h-10 py-3 px-1">
              <p v-if="noResult" class="hover:text-blue-dark">Aucun résultat</p>
              <p v-else class="hover:text-blue-dark">{{ result.name }}</p>
            </div>
          </div>
        </div>
      </li>
      </div>
    </ul>

    <p class="text-center text-xl mb-4 font-bold text-gray-800">{{ resultText }} </p>
    <div class="flex">
      <div class="ml-auto mr-16">
        <router-link class="mx-auto flex justify-center mb-4"
                     :to="{ name: 'ShopShow', params: { id: shop.id } }"
                     v-for="shop in shops" :key="shop.id">
          <ShopItem :shop="shop" :schedules="shop.schedules" :id="`shop-${shop.id}`"></ShopItem>
        </router-link>
      </div>
      <div class="w-96 h-192" v-if="userLocation !== null">
        <Map :shops="shops"></Map>
      </div>
    </div>




  </div>
</template>

<script>

import ShopItem from "../components/ShopItem";
import axios from "axios";
import Map from "../components/Map"
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";

export default {
  name: "ListShop",
  components: {
    ShopItem,
    Map
  },
  data() {
    return {
      search: "",
      results: [],
      isSearched:false,
      noResult:false
    };
  },
  computed: {
    ...mapState(['shops', 'userLocation']),
    ...mapGetters(['resultText']),
  },
  methods: {
    ...mapActions(['setShop']),
    ...mapMutations(['SET_USER_LOCATION']),
    geolocate() {
      const success = (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        this.SET_USER_LOCATION({lat, lng});
        this.setShop({lat, lng});
      };
      function error() {
        console.log("Unable to retrieve your location");
      }
      navigator.geolocation.getCurrentPosition(success, error)
    },
    autoComplete() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(async () => {
        if (this.search !== "") {
          const response = await axios.get(`https://photon.komoot.de/api/?&q=${this.search}`);
          const {features} = response.data;
          this.isSearched = true;
          if(features.length === 0){
            this.noResult = true;
          } else {
            this.noResult = false;
            const results = features.map(f => {
              const {city, street, postcode, name, state} = f.properties;
              const text = [name, city, street, postcode, state].filter(t => t !== undefined);
              const [lng, lat] = f.geometry.coordinates;
              return {
                name: text.join(' '),
                coordinates: {lat, lng}
              }
            });
            this.results = results;
          }
        } else {
          this.isSearched = false;
        }
      }, 500);
    },
    setValue(name, coordinates){
      console.log(coordinates);
      this.search = name;
      this.SET_USER_LOCATION(coordinates);
      this.setShop(coordinates);
      this.isSearched = false;
    }
  }
};
</script>
