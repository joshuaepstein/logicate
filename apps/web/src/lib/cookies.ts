import Cookies from 'js-cookie';

export function setCookie(key: string, value: string) {
  Cookies.set(key, value);
}

export function popCookie(key: string) {
  const value = Cookies.get(key);
  Cookies.remove(key);
  return value;
}

export function getCookie(key: string) {
  return Cookies.get(key);
}
