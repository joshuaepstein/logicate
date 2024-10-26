import { COOKIE_CONSENT_DEFAULT, COOKIE_CONSENT_KEY } from "@/components/cookie-consent-hook"
import { useCookie } from "react-use"
import { useLocalStorage } from "usehooks-ts"
import { getCookie, getLocalStorage } from "../cookies"

export default function useStorage() {
  const [{ optional }] = useLocalStorage(COOKIE_CONSENT_KEY, COOKIE_CONSENT_DEFAULT)

  // if optional is true then use cookies, if false use local storage
  if (optional) {
    return useCookie
  } else {
    return useLocalStorage
  }
}

export const getStorage = () => {
  const localStorage = JSON.parse(getLocalStorage(COOKIE_CONSENT_KEY) || "{}")
  if (localStorage?.optional === true) {
    return getCookie
  } else {
    return getLocalStorage
  }
}
