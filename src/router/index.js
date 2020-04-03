import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import ListShop from "../views/ListShop.vue";
import GoogleLogin from "../views/GoogleLogin.vue";
import Register from "../views/Register.vue";
import ResetPass from "../views/ResetPass.vue";
import Editshop from "../views/EditShop";
import ShopShow from "../views/ShopShow";
import CreateShop from "../views/CreateShop";
import { NotFound } from "../views/NotFound";
import UserProfile from "../views/UserProfile";
import UserAccess from "../views/UserAccess";
import ShopBookings from "../views/ShopBookings";
import Logout from "../views/Logout";



Vue.use(VueRouter);

const routes = [{
  path: "/",
  name: "Home",
  component: Home
},
  {
    path: "/connexion",
    name: "Login",
    component: Login
},
{
    path: "/token/:id",
    name: "googleLogin",
    component: GoogleLogin
    
},
{
    path: "/inscription",
    name: "Register",
    component: Register
  },
  {
    path: "/inscription/shop",
    name: "CreateShop",
    component: CreateShop,
    beforeEnter: (to, from, next) => {
      if (from.name === "Register") {
        next();
      } else {
        next('/inscription')
      }
    }
  },
  {
    path: "/resetPassword",
    name: "ResetPass",
    component: ResetPass
  },
  {
    path: "/commerce",
    name: "ListShop",
    component: ListShop
},
    {
        path: "/edituser",
        name: "UserProfile",
        component: UserProfile,
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem("userToken") == null) {
                debugger;
                next('/connexion')
            }
            else next()
        }
    },
    {
        path: "/userview",
        name: "UserAccess",
        component: UserAccess,
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem("userToken") == null) {
                debugger;
                next('/connexion')
            }
            else next()
        }
    },
{
    path: "/editShop",
    name: "EditShop",
    component: Editshop,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("userToken") == null) {
        next('/connexion')
      } else next()
    }
  },
  {
    path: "/commerce/:id/reservations",
    name: "ShopBookings",
    component: ShopBookings
  },
  {
    path: "/commerce/:id",
    name: "ShopShow",
    component: ShopShow
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout
  },
  {path: '/404', component: NotFound},
  {path: '*', redirect: '/404'}
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
