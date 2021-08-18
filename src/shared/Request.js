import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://13.209.12.149',
});

instance.defaults.headers.common['authorization'] = `Bearer ${localStorage.getItem('token')}`

export default instance;
