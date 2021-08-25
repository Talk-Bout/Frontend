import axios from 'axios';
import { getCookie } from '../shared/cookie';

const provider = getCookie('provider');
const accessToken = getCookie('accessToken');
const idToken = getCookie('idToken');

const instance = axios.create({
  baseURL: 'https://talkbout.camp/api',
  // baseURL 변경되면 api.js의 baseUrl도 같이 변경해주기!
});

if (provider === 'kakao') {
  instance.defaults.headers.common['authorization'] = `Bearer ${accessToken}`;
} else if (provider === 'google') {
  instance.defaults.headers.common['authorization'] = `Bearer ${idToken}`;
}


export default instance;
