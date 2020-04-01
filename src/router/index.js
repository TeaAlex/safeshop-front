import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import ListShop from "../views/ListShop.vue";
import Register from "../views/Register.vue";
import ResetPass from "../views/ResetPass.vue";
import Editshop from "../views/EditShop";
import ShopShow from "../views/ShopShow";



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
        path: "/inscription",
        name: "Register",
        component: Register
    },
    {
        path: "/resetPassword",
        name: "ResetPass",
        component: ResetPass
    },
    {
        path: "/reservation",
        name: "ListShop",
        component: ListShop
    },
    {
        path: "/editShop",
        name: "EditShop",
        component: Editshop
    },

    {
        path: "/creneaux",
        name: "ShopShow",
        component: ShopShow
    }
];


const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;