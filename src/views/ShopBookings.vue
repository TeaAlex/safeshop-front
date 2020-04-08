<template>
  <div class="w-full xl:w-2/3 mx-auto">
    <div>
      <h1 class="text-2xl text-gray-800 font-bold mb-4 pt-4">Réservations</h1>
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
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          </svg>
        </div>
      </div>

      <div
        v-if="selectedDate"
        class="flex justify-between flex-wrap"
      >
        <div
          v-for="hour in hours"
          :key="hour.id"
          @click="showNames($event)"
        >
          <div class="cursor-pointer px-2 py-1 w-80 bg-gray-200 text-gray-800 rounded text-center my-4 relative">
            <span class="font-semibold">{{ hour.formattedHour }}</span>
            <span class="text-gray-600"> ({{ hour.users.length }}/{{ hour.number_max }})</span>
          </div>
          <ul class="bg-white p-2 rounded hidden" v-if="hour.users.length > 0">
            <li v-for="(name, index) in hour.users" :key="index" class="p-2 text-gray-800 names">
              {{ name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../api/api';
  export default {
    name: "ShopBookings",
    mounted() {
      api.get(`/slot/shop/show`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` }
      })
      .then(response => {
        const { groupedSlots, days } = response.data;
        this.groupedSlots = groupedSlots;
        this.days = days
      })
    },
    data() {
      return {
        days: {},
        groupedSlots: {},
        selectedDate: null,
      }
    },
    computed: {
      hours(){
        if (this.selectedDate === null) {
          return [];
        }
        return this.groupedSlots[this.selectedDate].map(({formattedHour, id, number_max, users}) => {
          users = users.map(user => `${user.firstname} ${user.lastname}`);
          return {
            id,
            formattedHour,
            number_max,
            users
          }
        })
      }
    },
    methods: {
      showNames(event) {
        const target = event.target;
        const names = target.nextElementSibling;
        if (names) {
          if (names.classList.contains('hidden')) {
            names.classList.remove('hidden')
          } else {
            names.classList.add('hidden')
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
