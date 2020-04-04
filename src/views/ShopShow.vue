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

          <div class="mb-4">
            <HelpMessage type="info">1 seule reservation par jour</HelpMessage>
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

          <div class="mt-4">
            <HelpMessage type="error" v-if="errorMessage">{{errorMessage}}</HelpMessage>
          </div>

          <div
            v-if="selectedDate"
            class="bg-white rounded p-4  mt-4 flex flex-col flex-wrap items-center border"
            style="max-height: 25rem; min-height: 20rem;"
          >
            <div
              @click="createBook($event, hour.id)"
              v-for="hour in hours"
              :key="hour.id"
              class="cursor-pointer px-2 py-1 w-16 bg-gray-200 text-gray-800 rounded text-center my-4 relative"
              :class="{ 'bg-teal-300 text-teal-800': hour.hasBooked }"
            >
              <div class="flex h-6 items-center justify-center rounded-full w-6 text-xs absolute counter"
                   :class="{ 'bg-green-200 text-green-800': hour.status === 'good', 'bg-orange-200 text-orange-800': hour.status === 'average', 'bg-red-200 text-red-800': hour.status === 'low' }"
                   style="right: -10px; top: -10px">
                {{ hour.number_max }}
              </div>
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
import HelpMessage from "../components/HelpMessage";


export default {
  name: 'ShopShow',
  components: {
    ShopItem,
    HelpMessage
  },
  mounted() {
    api.get(`/shop/${this.$route.params.id}/show`)
    .then((response) => {
      const {shop, slots, days} = response.data;
      this.shop = shop;
      this.schedules = shop.schedules;
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
      return this.slots[this.selectedDate].map(({formattedHour, id, bookings, number_max, day}) => {
        const max = this.schedules[day - 1].number_max;
        let status = "";
        const low = max / 3;
        const good = max / 2;
        if (number_max >= good) {
          status = "good"
        } else if (number_max < good && number_max > low) {
          status = "average"
        } else {
          status = "low"
        }
        return {
          id,
          formattedHour,
          hasBooked: bookings.length > 0,
          number_max,
          status
        }
      })
    }
  },
  methods: {
    createBook(event, id) {
      api.post(`/booking/${id}/create`)
      .then(() => {
        const target = event.target;
        target.classList.remove('bg-gray-200', 'text-gray-800');
        target.classList.add('bg-teal-300', 'text-gray-800');
        const counter = target.querySelector('.counter');
        counter.innerText = parseInt(counter.innerText) - 1;
      })
      .catch((e) => {
        this.errorMessage = e.response.data.error;
        setTimeout(() => {
          this.errorMessage = null;
        }, 2000)
      })
    }
  }
};
</script>

<style scoped></style>
