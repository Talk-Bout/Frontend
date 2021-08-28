import axios from 'axios';
import { getCookie } from '../shared/cookie';

const provider = getCookie('provider');
const accessToken = getCookie('accessToken');
const idToken = getCookie('idToken');

const instance = axios.create({
  baseURL: 'http://fw3efsadfcv.shop/api',
});

if (provider === 'kakao') {
  instance.defaults.headers.common['authorization'] = `Bearer ${accessToken}`;
  instance.defaults.headers.common['withCredentials'] = true;
} else if (provider === 'google') {
  instance.defaults.headers.common['authorization'] = `Bearer ${idToken}`;
  instance.defaults.headers.common['withCredentials'] = true;
}


export default instance;
