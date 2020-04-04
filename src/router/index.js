import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import GoogleLogin from "../views/GoogleLogin.vue";
import Register from "../views/Register.vue";
import ResetPass from "../views/ResetPass.vue";
import ListShop from "../views/ListShop.vue";
import Editshop from "../views/EditShop";
import CreateShop from "../views/CreateShop";
import ShopShow from "../views/ShopShow";
import QRcode from "../views/QRcode";
import NotFound from "../views/NotFound";
import ShopBookings from "../views/ShopBookings";
import Logout from "../views/Logout";
import UserAccess from "../views/UserAccess";
import UserProfile from "../views/UserProfile";
import MailSend from "../views/MailSend";
import ChangePassword from "../views/ChangePassword";
import ValidateEmail from "../views/ValidateEmail";


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
        path: "/reset_password/:id",
        name: "googleLogin",
        component: ChangePassword
    },
    {
        path: "/validate_email/:id",
        name: "validateEmail",
        component: ValidateEmail
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
        path: "/mailsend",
        name: "mailSend",
        component: MailSend,
        beforeEnter: (to, from, next) => {
            if (from.name === "ResetPass") {
                next();
            } else {
                next('/resetPassword')
            }
        }
    },
    {
        path: "/commerce",
        name: "ListShop",
        component: ListShop
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
        path: "/qrcode",
        name: "QRcode",
        component: QRcode
    },
    {
        path: "/deconnexion",
        name: "Logout",
        component: Logout
    },
    {
        path: "/edituser",
        name: "UserProfile",
        component: UserProfile,
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem("userToken") == null) {
                next('/connexion')
            } else next()
        }
    },
    {
        path: "/profil",
        name: "UserAccess",
        component: UserAccess,
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem("userToken") == null) {
                next('/connexion')
            } else next()
        }
    },
    { path: '/404', component: NotFound },
    { path: '*', redirect: '/404' }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;