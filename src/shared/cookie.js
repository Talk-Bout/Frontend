const getCookie = (name) => {
  let value = '; ' + document.cookie;
  let parts = value.split('; ' + name + '=');
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
};

const setCookie = (name, value) => {
  document.cookie = `${name}=${value};path=/;secure;`;  
};

const deleteCookie = (name) => {
  document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
};

export { getCookie, setCookie, deleteCookie };
