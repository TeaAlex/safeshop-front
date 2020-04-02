import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3333'
});

let token = localStorage.getItem('userToken');
if (token) {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default instance


