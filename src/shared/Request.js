import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://3.36.53.121',
});

const token = localStorage.getItem('token');
instance.defaults.headers.common['Authorization'] = token;

export default instance;
