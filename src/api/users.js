import axios from 'axios';
import api from './api'

export default {
    getShopData(siret) {
        // then return the promise of the axios instance
        return axios.get('https://api.insee.fr/entreprises/sirene/V3/siret/'+siret,{
            headers:  {Authorization: `Bearer ${process.env.VUE_APP_INSEE_TOKEN}`}}).catch();
    },
    login({email, password}) {
        // then return the promise of the axios instance
        return api.post('/login', {
            "uid": email,
            password
        })
    },
    register(user){
        return api.post('/register',{
            "firstname": user.prenom,
            "lastname": user.nom,
            "email":user.email,
            "password": user.password,
            "password_confirmation": user.resetpassword
        }).catch();
    },
    register_shop(user){
        return api.post('/register_shop',{
            "firstname": "Societé",
            "lastname": user.shopName,
            "label": user.shopName,
            "email":user.email,
            "password": user.password,
            "password_confirmation": user.resetpassword,
            "address":user.address,
            "zip_code": user.zipCode,
            "city": user.city,
            "phone_number":user.number,
            "siret": user.siret,
	        "siren": user.siren
        }).catch();
    },
    // getuser(uuid){
    //     return axios.get('http://localhost:8011/users/'+uuid,{
    //         headers:  {Authorization: "Bearer "+localStorage.getItem("userToken")}
    //     }).catch();
    // },
    // getusers(){
    //     return axios.get('http://localhost:8011/users/',{
    //         headers:  {Authorization: "Bearer "+localStorage.getItem("userToken")}
    //     }).catch();
    // },
    // updateUser(user,uuid){
    //     return axios.put('http://localhost:8011/users/'+uuid,{
    //         first_name: user.nom,
    //         last_name: user.prenom,
    //         email: user.email,
    //     },{
    //         headers:  {Authorization: "Bearer "+localStorage.getItem("userToken")}
    //     }).catch();
    // },
    // deleteUser(uuid){
    //     return axios.delete('http://localhost:8011/users/'+uuid,{
    //         headers:  {Authorization: "Bearer "+localStorage.getItem("userToken")}
    //     }).catch();
    // }
};
