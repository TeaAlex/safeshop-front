<template>
  <div class="bg-white sm:rounded p-3 w-full sm:p-6 sm:w-128 shadow">
    <div class="flex-col">
      <div class="flex items-center">
        <div class="rounded bg-gray-400 h-12 w-12  sm:w-20 sm:h-20">
          <!--  IMAGE PLACEHOLDER      -->
        </div>
        <div class="ml-4 text-left">
          <p class="font-semibold text-teal-500 tracking-wide sm:text-2xl">{{shop.label}}</p>
          <p class="text-sm sm:text-base text-gray-700">{{shop.address}}</p>
          <p class="text-xs sm:text-sm text-gray-600">{{shop.city}} ({{shop.zip_code}})</p>
        </div>
      </div>
      <div class="mt-4">
        <div class="flex">
          <div class="flex-grow">
            <div class="text-base">
              <div class="bg-gray-200 font-semibold text-teal-500 h-10 w-full rounded flex justify-around items-center">
                <span v-for="day in days" :key="day">{{ day }}</span>
              </div>
              <div class="text-gray-800 h-10 w-full flex justify-around items-center">
                <span v-for="(openHour, index) in openHours" :key="index">{{ openHour }}</span>
              </div>
              <div class="text-gray-800 h-10 w-full flex justify-around items-center">
                <span v-for="(closeHour, index) in closeHours" :key="index">{{ closeHour }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShopItem",
  props: ['shop', 'schedules'],
  data() {
    return {
      days: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]
    };
  },
  computed: {
    openHours(){
      return this.schedules.map(schedule => schedule["open_hour"])
    },
    closeHours(){
      return this.schedules.map(schedule => schedule["close_hour"])
    }
  }
};
</script>

<style scoped>

</style>
