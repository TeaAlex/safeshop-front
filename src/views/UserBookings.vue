<template>
  <div class="w-1/2 mx-auto">
    <h1 class="pt-4 text-2xl mb-4 text-gray-800 text-center">Mes réservations</h1>
    <table class="table-auto">
      <thead>
      <tr>
        <th class="px-4 py-2">Date</th>
        <th class="px-4 py-2">Heure</th>
        <th class="px-4 py-2">Commerce</th>
        <th class="px-4 py-2">Adresse</th>
        <th class="px-4 py-2">Ville</th>
      </tr>
      </thead>
      <tbody class="bg-white">
      <tr v-for="(booking, index) in bookings" :key="index">
        <td class="border px-4 py-2">{{ booking.formattedDay }}</td>
        <td class="border px-4 py-2">{{ booking.formattedHour }}</td>
        <td class="border px-4 py-2 text-blue-400"><router-link :to="{name: 'ShopShow', params: {id: booking.shopId}}">{{booking.label}}</router-link></td>
        <td class="border px-4 py-2">{{ booking.address }}</td>
        <td class="border px-4 py-2">{{ booking.city }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import api from '../api/api';
  export default {
    name: "UserBookings",
    async mounted() {
      const response = await api.get('/booking/user/show', {
        headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` }
      });
      const {bookings} = response.data;
      this.bookings = bookings
    },
    data(){
      return {
        bookings: []
      }
    }
  }
</script>

<style scoped>

</style>
