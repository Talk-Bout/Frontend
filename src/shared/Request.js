import axios from 'axios';
import { getCookie } from '../shared/cookie';

const provider = getCookie('provider');
const accessToken = getCookie('accessToken');
const idToken = getCookie('idToken');

const instance = axios.create({
  baseURL: 'http://13.209.12.149',
});

if (provider === 'kakao') {
  instance.defaults.headers.common['authorization'] = `Bearer ${accessToken}`;
} else if (provider === 'google') {
  instance.defaults.headers.common['authorization'] = `Bearer ${idToken}`;
}


export default instance;
