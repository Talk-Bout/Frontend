import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://13.209.12.149',
  // headers: {'authorization': localStorage.getItem('token')}
});

export default instance;
