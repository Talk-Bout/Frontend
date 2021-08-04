import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://15.165.76.96',
});

const token = localStorage.getItem('token');
instance.defaults.headers.common['Authorization'] = token;

export default instance;