import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://3.36.53.121',
  // headers: {'authorization': localStorage.getItem('token')}
});

export default instance;
