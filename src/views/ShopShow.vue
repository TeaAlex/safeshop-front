<template>
  <div class="w-full xl:w-6/12 mx-auto">
    <div class="w-full mx-auto lg:">
      <h1 class="pt-20 text-3xl text-gray-800 font-bold text-center tracking-wider">
        Réserver un créneau
      </h1>
      <div class="flex flex-col justify-center mt-8 mx-auto sm:w-128">
        <ShopItem
          :shop="shop"
          :schedules="schedules"
        >
        </ShopItem>
        <div class="mx-4 mt-4 sm:mx-0">
          <h1 class="text-left font-bold text-1xl mb-4 text-xl">
            Créneaux disponibles
          </h1>
          <div
            class="bg-orange-200 mb-4 px-4 py-4 rounded text-orange-500"
          >
            <div class="flex">
              <div>
                <svg
                  class="fill-current h-6 w-6 text-orange-500 mr-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
                  />
                </svg>
              </div>
              <div>
                <p class="text-base">1 seule réservation possible par jour</p>
              </div>
            </div>
          </div>

          <div class="relative mt-4 ">
            <select
              @change="selectedDate = $event.target.value"
              class="block appearance-none w-full bg-white px-4 py-4 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline text-gray-800 font-semibold border"
            >
              <option value="" disabled selected>Sélectionner votre jour</option>
              <option :value="date" v-for="(name, date) in days" :key="date"
                >{{ name }}
              </option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
            >
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>

          <div class="flex items-center p-4 py-4 bg-red-200 text-red-700 rounded mt-4" v-if="errorMessage">
            <svg class="fill-current h-6 w-6 text-red-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="alert-triangle"><rect width="24" height="24" transform="rotate(90 12 12)" opacity="0"/><path d="M22.56 16.3L14.89 3.58a3.43 3.43 0 0 0-5.78 0L1.44 16.3a3 3 0 0 0-.05 3A3.37 3.37 0 0 0 4.33 21h15.34a3.37 3.37 0 0 0 2.94-1.66 3 3 0 0 0-.05-3.04zm-1.7 2.05a1.31 1.31 0 0 1-1.19.65H4.33a1.31 1.31 0 0 1-1.19-.65 1 1 0 0 1 0-1l7.68-12.73a1.48 1.48 0 0 1 2.36 0l7.67 12.72a1 1 0 0 1 .01 1.01z"/><circle cx="12" cy="16" r="1"/><path d="M12 8a1 1 0 0 0-1 1v4a1 1 0 0 0 2 0V9a1 1 0 0 0-1-1z"/></g></g></svg>
            <p class="ml-4">{{errorMessage}}</p>
          </div>

          <div
            v-if="selectedDate"
            class="bg-white rounded p-4  mt-4 flex flex-col flex-wrap items-center border"
            style="max-height: 25rem; min-height: 20rem;"
          >
            <div
              @click="createBook(hour.id)"
              v-for="hour in hours"
              :key="hour.id"
              class="cursor-pointer px-2 py-1 w-16 bg-gray-200 text-gray-800 rounded text-center my-4"
            >
              {{ hour.formattedHour }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ShopItem from "../components/ShopItem";
import api from '../api/api';


export default {
  name: 'ShopShow',
  components: {
    ShopItem
  },
  mounted() {
    api.get(`/shop/${this.$route.params.id}/show`)
    .then((response) => {
      const {shop, schedules, slots, days} = response.data;
      this.shop = shop;
      this.schedules = schedules;
      this.slots = slots;
      this.days = days;
    })
  },
  data() {
    return {
      days: {},
      selectedDate: null,
      shop: {},
      schedules: [],
      slots: {},
      errorMessage: null
    };
  },
  computed: {
    hours(){
      if (this.selectedDate === null) {
        return [];
      }
      return this.slots[this.selectedDate].map(({formattedHour, id}) => ({id, formattedHour}) )
    }
  },
  methods: {
    createBook(id) {
      api.post(`/booking/${id}/create`)
      .then(() => console.log('ok'))
      .catch((e) => {
        this.errorMessage = e.response.data.error
        setTimeout(() => {
          this.errorMessage = null;
        }, 2000)
      })
    }
  }
};
</script>

<style scoped></style>
