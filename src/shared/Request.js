import axios from 'axios';

const provider = sessionStorage.getItem('provider');
const accessToken = sessionStorage.getItem('accessToken');
const idToken = sessionStorage.getItem('idToken');
const instance = axios.create({
  baseURL: 'http://13.209.12.149',
});

if (provider === 'kakao') {
  instance.defaults.headers.common['authorization'] = `Bearer ${accessToken}`;
} else if (provider === 'google') {
  instance.defaults.headers.common['authorization'] = `Bearer ${idToken}`;
}


export default instance;
