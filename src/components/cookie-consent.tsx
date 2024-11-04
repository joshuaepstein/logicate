"use client"

import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import useCookieConsent from "./cookie-consent-hook"

export default function CookieConsent() {
  const [cookieConsent, setCookieConsent] = useCookieConsent()

  const handleAcceptAll = () => {
    setCookieConsent({
      optional: true,
      prompted: true,
      required: true,
    })
    fetch("/api/auth/cookie-consent", {
      method: "POST",
      body: JSON.stringify({
        cookieConsent: {
          optional: true,
          prompted: true,
          required: true,
        },
      }),
    })
      .then((response) => {
        if (response.ok) {
          setCookieConsent({
            optional: true,
            prompted: true,
            required: true,
            databaseSuccess: true,
          })
        } else {
          setCookieConsent({
            optional: true,
            prompted: true,
            required: true,
            databaseSuccess: false,
          })
        }
      })
      .catch((error) => {
        setCookieConsent({
          optional: true,
          prompted: true,
          required: true,
          databaseSuccess: false,
        })
        console.error(error)
      })
  }

  const handleAcceptRequired = () => {
    setCookieConsent({
      optional: false,
      prompted: true,
      required: true,
    })
    fetch("/api/auth/cookie-consent", {
      method: "POST",
      body: JSON.stringify({
        cookieConsent: {
          optional: false,
          prompted: true,
          required: true,
        },
      }),
    })
      .then((response) => {
        if (response.ok) {
          setCookieConsent({
            optional: false,
            prompted: true,
            required: true,
            databaseSuccess: true,
          })
        } else {
          setCookieConsent({
            optional: false,
            prompted: true,
            required: true,
            databaseSuccess: false,
          })
        }
      })
      .catch((error) => {
        setCookieConsent({
          optional: false,
          prompted: true,
          required: true,
          databaseSuccess: false,
        })
        console.error(error)
      })
  }

  return (
    <AnimatePresence mode="wait">
      {!cookieConsent.prompted && (
        <motion.div
          initial={{
            y: 100,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 0.9,
          }}
          className="shadow-hard-md bg-neutralgrey-100 fixed bottom-5 left-5 flex min-h-[143px] max-w-[600px] origin-bottom-left flex-col items-start justify-start gap-2.5 rounded px-[22px] py-5"
        >
          <div className="">
            <div className="font-semibold text-black">We value your privacy</div>
            <div className="text-sm text-black">
              By clicking “Accept all cookies”, you agree that Logicate can store cookies on your device. You can read more about our use of
              cookies in our{" "}
              <Link href="/legal/privacy" className="underline">
                Privacy Policy
              </Link>
            </div>
          </div>
          <div className="flex items-start justify-start gap-2.5">
            <button
              onClick={handleAcceptAll}
              className="bg-neutralgrey-1300 flex items-center justify-center gap-2.5 rounded-md px-2.5 py-1.5 text-white"
            >
              Accept all cookies
            </button>
            <button
              onClick={handleAcceptRequired}
              className="bg-neutralgrey-1000 flex items-center justify-center gap-2.5 rounded-md px-2.5 py-1.5 text-white"
            >
              Necessary cookies only
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
