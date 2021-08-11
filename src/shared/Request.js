import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://13.209.12.149',
  // headers: { 
  //   "Accept": "application/json",
  //   "Content-Type":"application/json;charset=UTF-8",
  //   'authorization': `Bearer ${localStorage.getItem('token')}`}
});

instance.defaults.headers.common['authorization'] = `Bearer ${localStorage.getItem('token')}`

export default instance;
