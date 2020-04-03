<template>
  <header class="lg:px-16 px-6 bg-white flex flex-wrap items-center py-4">
    <div class="flex-1 flex justify-between items-center">
      <a href="/" class="block titre">SAFE<span class="text-teal-600 fredoka">SHOP</span></a>
    </div>

    <label for="menu-toggle" class="pointer-cursor lg:hidden block"><svg class="fill-current text-gray-900" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><title>menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path></svg></label>
    <input class="hidden" type="checkbox" id="menu-toggle" @click="isOpen = !isOpen"/>

    <div class="absolute right-0 top-0 w-56 bg-white h-full p-4 border-l z-10" v-if="isOpen">
      <div class="h-10 w-10 ml-auto" @click="isOpen = !isOpen">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="close"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/><path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"/></g></g></svg>
      </div>
      <nav class="text-right" v-if="isLogged">
        <ul class="lg:flex items-center justify-between text-base text-gray-700 pt-4 lg:pt-0">
          <router-link class="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-teal-600"
                       :to="url.link"
                       v-for="url in authUrls"
                       :key="url.name"
          >{{url.name}}
          </router-link>
        </ul>
      </nav>
      <nav v-else class="text-right">
        <router-link class="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-teal-600"
                     :to="url.link"
                     v-for="url in unAuthUrls"
                     :key="url.name"
        >{{url.name}}
        </router-link>
      </nav>
    </div>

    <div class="hidden lg:flex lg:items-center lg:w-auto w-full" id="menu">
      <nav class="flex items-center" v-if="isLogged">
        <router-link class="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-teal-600"
                     :to="url.link"
                     v-for="url in authUrls"
                     :key="url.name"
        >{{url.name}}
        </router-link>
      </nav>
      <nav v-else class="flex items-center">
        <router-link class="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-teal-600"
                     :to="url.link"
                     v-for="url in unAuthUrls"
                     :key="url.name"
        >{{url.name}}
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script>
  import {mapState} from "vuex";

  export default {
    name: 'Navbar',
    data() {
      return {
        isOpen: false,
        urls: [
          {name: 'Deconnexion', link: '/logout', requiredLogin: true},
          {name: 'Mes reservations', link: '/planning', requiredLogin: true},
          {name: 'Inscription', link: '/inscription', requiredLogin: false},
          {name: 'Connexion', link: '/connexion', requiredLogin: false},
          {name: 'Liste des commerces', link: '/commerce', alwaysShow: true},
        ]
      }
    },
    watch: {
      $route() {
        this.isOpen = false;
      }
    },
    computed: {
      authUrls() {
        return this.urls.filter(({requiredLogin, alwaysShow}) => requiredLogin || alwaysShow)
      },
      unAuthUrls() {
        return this.urls.filter(({requiredLogin, alwaysShow}) => !requiredLogin || alwaysShow)
      },
      ...mapState({
        isLogged: state => state.users.isLogged
      })
    }

  }
</script>
