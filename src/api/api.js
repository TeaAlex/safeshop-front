import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL
});

// let token = localStorage.getItem('userToken');
// if (token) {
//   instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// }

export default instance


