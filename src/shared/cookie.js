const getCookie = (name) => {
  let value = '; ' + document.cookie;
  let parts = value.split('; ' + name + '=');
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
};

const setCookie = (name, value, exp = 2) => {
  let date = new Date();
  date.setTime(date.getTime() + exp * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
};

const deleteCookie = (name) => {
  document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
};

const nickname_c = getCookie('nickname');
const id_c = getCookie('idToken');
const provider_c = getCookie('provider');
const access_c = getCookie('accessToken');
const refresh_c = getCookie('refreshToken');
const profilePic_c = getCookie('profilePic');

export { getCookie, setCookie, deleteCookie, nickname_c, id_c, provider_c, access_c, refresh_c, profilePic_c };
