import axios from 'axios';
import { getCookie } from '../shared/cookie';

const provider = getCookie('provider');
const accessToken = getCookie('accessToken');
const idToken = getCookie('idToken');

const instance = axios.create({
  baseURL: 'https://fw3efsadfcv.shop/',
});

if (provider === 'kakao') {
  instance.defaults.headers.common['authorization'] = `Bearer ${accessToken}`;
} else if (provider === 'google') {
  instance.defaults.headers.common['authorization'] = `Bearer ${idToken}`;
}


export default instance;
