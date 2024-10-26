import { useEffect, useState } from "react"
import { useLocalStorage } from "usehooks-ts"

export default function useCookieConsent(): [CookieConsent, (cookieConsent: CookieConsent) => void] {
  const [ran, setRan] = useState(false)
  const [local_cookieConsent, setLocalCookieConsent] = useState<CookieConsent>({
    required: true,
    optional: true,
    prompted: true,
  })
  const [cookieConsent, setCookieConsent] = useLocalStorage(COOKIE_CONSENT_KEY, COOKIE_CONSENT_DEFAULT)

  useEffect(() => {
    if (cookieConsent !== local_cookieConsent && !ran) {
      setLocalCookieConsent(cookieConsent)
      setRan(true)
    }
  }, [cookieConsent])

  useEffect(() => {
    if (local_cookieConsent !== cookieConsent) {
      setCookieConsent(local_cookieConsent)
    }
  }, [local_cookieConsent])

  return [local_cookieConsent, setLocalCookieConsent]
}

type CookieConsent = {
  required: boolean
  optional: boolean
  prompted: boolean
}

export const COOKIE_CONSENT_KEY = "cookieConsent"
export const COOKIE_CONSENT_DEFAULT: CookieConsent = {
  required: true,
  optional: true,
  prompted: false,
}
