import api from './api'

export default {
    getShopData(siret) {
        return api.get('/insee/siret/' + siret, {})
    },
    login({ email, password }) {
        // then return the promise of the axios instance
        return api.post('/login', {
            "uid": email,
            password
        })
    },
    changePassword(user) {
        // then return the promise of the axios instance
        return api.post('/update-password-by-token', {
            "token": localStorage.getItem("changePass"),
            "password": user.new_password,
            "password_confirmation": user.confirm_password
        })
    },
    resetPass({ email }) {
        // then return the promise of the axios instance
        return api.post('/forgot-password', {
            "uid": email
        })
    },
    register(user) {
        return api.post('/register', {
            "firstname": user.prenom,
            "lastname": user.nom,
            "email": user.email,
            "password": user.password,
            "password_confirmation": user.resetpassword
        }).catch();
    },
    register_shop(user) {
        return api.post('/register_shop', {
            "firstname": "Societé",
            "lastname": user.shopName,
            "label": user.shopName,
            "email": user.email,
            "password": user.password,
            "password_confirmation": user.resetpassword,
            "address": user.address,
            "zip_code": user.zipCode,
            "city": user.city,
            "phone_number": user.number,
            "siret": user.siret,
        }).catch();
    },
    editUser(user) {
        return api.put('/user/edit', {
            "firstname": user.firstname,
            "lastname": user.lastname
        }).catch();
    },
    validate_mail({ token }) {
        return api.post('/validate_mail', {
            "token": token
        });
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