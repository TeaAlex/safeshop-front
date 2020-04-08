<template>
  <div class="w-full xl:w-2/3 mx-auto">
    <h1 class="text-left font-bold text-2xl text-center py-12 px-2">Retrouvez vos commerces de proximité</h1>
    <div class="flex items-center justify-center mb-8">
      <input
              v-on:keyup="autoComplete"
              v-model="search"
              class="w-5/6 sm:w-3/4 lg:w-2/3 block p-4 border rounded focus:outline-none focus:shadow-outline text-base shadow-lg"
              type="search"
              placeholder="Rechercher votre commerce..."
      />
      <div @click="geolocate" class="ml-2 h-6 w-6 text-teal-500 cursor-pointer flex items-center">
        <svg fill="currentColor" viewBox="0 0 24 24" class="w-full h-full"><title>icons_crossplateformes</title><path d="M12 7.64A4.36 4.36 0 1016.36 12 4.36 4.36 0 0012 7.64zm9.75 3.27a9.8 9.8 0 00-8.66-8.66V1.09a1.09 1.09 0 10-2.18 0v1.16a9.8 9.8 0 00-8.66 8.66H1.09a1.09 1.09 0 000 2.18h1.16a9.8 9.8 0 008.66 8.66v1.16a1.09 1.09 0 002.18 0v-1.16a9.8 9.8 0 008.66-8.66h1.16a1.09 1.09 0 000-2.18zM12 19.64A7.64 7.64 0 1119.64 12 7.64 7.64 0 0112 19.64z"></path></svg>
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
    <div class="flex justify-center">
      <ClipLoader v-if="loading" color="#38b2ac" size="50" class="text-center"></ClipLoader>
    </div>
    <div class="flex flex-col lg:flex-row justify-center ">
      <div class="lg:mr-4">
        <router-link class="mx-auto flex justify-center mb-4"
                     :to="{ name: 'ShopShow', params: { id: shop.id } }"
                     v-for="shop in shops" :key="shop.id">
          <ShopItem :shop="shop" :schedules="shop.schedules" :id="`shop-${shop.id}`"></ShopItem>
        </router-link>
      </div>
      <div class="w-96 h-192 rounded hidden lg:block" v-if="userLocation !== null && shopCount > 0">
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
import {ClipLoader} from '@saeris/vue-spinners';

export default {
  name: "ListShop",
  components: {
    ShopItem,
    Map,
    ClipLoader
  },
  data() {
    return {
      search: "",
      results: [],
      isSearched:false,
      noResult:false,
    };
  },
  computed: {
    ...mapState(['shops', 'userLocation', 'loading']),
    ...mapGetters(['shopCount', 'resultText']),
  },
  methods: {
    ...mapActions(['setShop']),
    ...mapMutations(['SET_USER_LOCATION', 'SET_LOADING']),
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
      this.SET_LOADING(true);
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
      this.search = name;
      this.SET_USER_LOCATION(coordinates);
      this.SET_LOADING(true);
      this.setShop(coordinates);
      this.isSearched = false;
    }
  }
};
</script>
