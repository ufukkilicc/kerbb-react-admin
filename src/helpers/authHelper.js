import cookie from "js-cookie";

// Set Cookie

export const setCookie = (key, value) => {
  if (window) {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

// remove from cOOkie

export const removeCookie = (key) => {
  if (window) {
    cookie.remove(key);
  }
};

// get from cookie such as stored token

export const getCookie = (key) => {
  if (window) {
    return cookie.get(key);
  }
};

// set in localstorage

export const setLocalStorage = (key, value) => {
  if (window) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// remove from localstorage

export const removeLocalStorage = (key) => {
  if (window) {
    localStorage.removeItem(key);
  }
};

// authenticate user by passing data to cookie and localstorage during signin

export const authenticate = (response, next) => {
  setCookie("k_t", response.data.token);
  next();
};
export const unauthenticate = (next) => {
  removeCookie("k_t");
  next();
};

// access user info from localstorage

export const isAuth = () => {
  if (window) {
    const cookieCheck = getCookie("k_t");
    if (!cookieCheck) {
      return false;
    }
    return true;
  }
};
