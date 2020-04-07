<template>

  <div class="w-full h-full">
    <l-map
            ref="myMap"
            v-if="showMap && center !== null"
            :zoom="zoom"
            :center="center"
            :options="mapOptions"
            style="height: 80%"
            @update:center="centerUpdate"
            @update:zoom="zoomUpdate"
            @update:bounds="updateBounds"
    >
      <l-tile-layer
              :url="url"
              :attribution="attribution"
      />
      <l-circle
              :lat-lng="center"
              :radius="radius"
              :color="color"
      />

      <l-marker :lat-lng="{lat: shop.lat, lng: shop.lng}" v-for="shop in shops" :key="shop.id">
        <l-popup>
          <div @click="innerClick(shop.id)">
            {{ shop.label }}
            <p v-show="showParagraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi.
              Donec finibus semper metus id malesuada.
            </p>
          </div>
        </l-popup>
      </l-marker>
    </l-map>

  </div>
</template>

<script>
  // import { latLng } from "leaflet";
  import { LMap, LTileLayer, LMarker, LPopup, LCircle } from "vue2-leaflet";
  import {mapState} from "vuex";

  export default {
    name: "Map",
    components: {
      LMap,
      LTileLayer,
      LMarker,
      LPopup,
      LCircle
    },
    data() {
      return {
        radius: 2000,
        color: 'green',
        zoom: 13,
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        bounds: null,
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        currentZoom: 13,
        currentCenter: null,
        showParagraph: false,
        mapOptions: {
          zoomSnap: 0.5
        },
        showMap: true
      };
    },
    computed: {
      ...mapState({
        center: state => state.userLocation,
        shops: state => state.shops
      })
    },
    methods: {
      zoomUpdate(zoom) {
        this.currentZoom = zoom;
      },
      centerUpdate(center) {
        this.currentCenter = center;
      },
      showLongText() {
        this.showParagraph = !this.showParagraph;
      },
      innerClick(shopId) {
        const el = document.querySelector(`#shop-${shopId}`);
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center'
        });
      },
      updateBounds(bounds) {
        this.bounds = bounds
      }
    }
  };
</script>
