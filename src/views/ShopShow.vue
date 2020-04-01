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

          <div
            v-if="selectedDate"
            class="bg-white rounded p-4  mt-4 flex flex-col flex-wrap items-center border"
            style="max-height: 25rem; min-height: 20rem;"
          >
            <div
              v-for="(hour, index) in hours"
              :key="index"
              class="cursor-pointer px-2 py-1 w-16 bg-gray-200 text-gray-800 rounded text-center my-4"
            >
              {{ hour }}
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
    };
  },
  computed: {
    hours(){
      if (this.selectedDate === null) {
        return [];
      }
      return this.slots[this.selectedDate].map(slot => slot["formattedHour"])
    }
  }
};
</script>

<style scoped></style>
