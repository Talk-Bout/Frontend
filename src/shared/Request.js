import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://15.165.76.96'
});

// instance.defaults.headers.common['Authorization'] = USER_TOKEN;

export default instance;