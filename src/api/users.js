import axios from 'axios';

export default {
    getShopData(siret) {
        // then return the promise of the axios instance
        return axios.get('https://api.insee.fr/entreprises/sirene/V3/siret/'+siret,{
            headers:  {Authorization: "Bearer 57f090d1-d9ba-35c4-9213-121047156782"}}).catch();
    },
    login(user) {
        // then return the promise of the axios instance
        return axios.post('http://localhost:3333/login/',{
                "uid": user.email,
                "password": user.password
            }).catch();
    },
    register(user){
        console.log(user);
        return axios.post('http://localhost:3333/register/',{
            "firstname": user.prenom,
            "lastname": user.nom,
            "email":user.email,
            "password": user.password,
            "password_confirmation": user.resetpassword,
            "role_id":1
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