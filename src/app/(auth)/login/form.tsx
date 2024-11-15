"use client"

import LogoIcon from "@/components/Logo"
import { Button } from "@/components/ui/button"
import LoadingCircle from "@/components/ui/icons/loading-circle"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib"
import { sendVerificationRequestWithoutCode } from "@/lib/emails"
import { AuthError } from "next-auth"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState, useTransition } from "react"
import { toast } from "sonner"
import { loginAction } from "./action"

const errorCodes = {
  "no-credentials": "Invalid email or password",
  "not-verified": "Your email has not been verified",
  "invalid-credentials": "Invalid email or password",
  "exceeded-login-attempts": "Account has been locked due to too many login attempts. Please contact support to unlock your account.",
  "too-many-login-attempts": "Too many login attempts. Please try again later.",
}

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams?.get("next")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, login] = useTransition()
  const [resendingEmail, resendEmail] = useTransition()
  const [hasResentEmail, setHasResentEmail] = useState(false)

  useEffect(() => {
    const error = searchParams?.get("error")
    error && toast.error(error)
    error && setErrorMessage(error)
  }, [searchParams])

  return (
    <form
      className="flex h-full w-full flex-col items-center justify-center"
      onSubmit={async (e) => {
        e.preventDefault()
        login(async () => {
          setErrorMessage("")
          const res = await fetch("/api/auth/account-exists", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          })

          if (!res.ok) {
            const error = await res.text()
            toast.error(error)
            setErrorMessage(error)
            return
          }

          const { accountExists } = await res.json()
          if (accountExists) {
            try {
              const signInRes = await loginAction(email, password, next)
              if (!signInRes) return
              if (!signInRes.success) {
                if (errorCodes[signInRes.error as keyof typeof errorCodes]) {
                  toast.error(errorCodes[signInRes.error as keyof typeof errorCodes])
                  setErrorMessage(errorCodes[signInRes.error as keyof typeof errorCodes])
                } else {
                  toast.error(signInRes.error || "")
                  setErrorMessage(signInRes.error || "")
                }

                return
              }
              toast.success("Logged in successfully", {
                description: `Welcome back, ${email}. Redirecting you to your dashboard...`,
              })
              // redirect to next or / but reload the page as we need to re-render the layout
              setTimeout(() => {
                window.location.href = next || "/"
              }, 1000)
            } catch (err) {
              if (err instanceof Error || err instanceof AuthError) {
                if (errorCodes[err.message as keyof typeof errorCodes]) {
                  toast.error(errorCodes[err.message as keyof typeof errorCodes])
                  setErrorMessage(errorCodes[err.message as keyof typeof errorCodes])
                } else {
                  toast.error(err.message)
                  setErrorMessage(err.message)
                }
              }
            }
          } else {
            toast.error("No account found with that email address.")
            setErrorMessage("No account found with that email address.")
          }
        })
      }}
    >
      <div className="relative flex flex-col items-start justify-start">
        <LogoIcon className="mb-8 h-8" />
        <h2 className="text-2xl font-medium">Login</h2>
        <p className="text-neutralgrey-800">Enter your details below to login to your account</p>
        <div className="mt-4 flex w-full flex-col items-start justify-start gap-4">
          <Input
            placeholder="john@smith.com"
            required
            className="invalid:placeholder-shown:border-neutralgrey-500 w-full"
            name="email"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="********"
            required
            className="invalid:placeholder-shown:border-neutralgrey-500 w-full"
            name="password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <SubmitButton className="w-full" variant="dark">
            Login
          </SubmitButton> */}
          <Button disabled={loading} variant="dark" className="relative w-full">
            <span className={cn({ "opacity-0": loading })}>Login</span>

            {loading && (
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <LoadingCircle className="size-5" />
              </div>
            )}
          </Button>
          {errorMessage && <p className="max-w-xs text-red-700">{errorMessage}</p>}
          {errorMessage === "Your email has not been verified" && !resendingEmail && !hasResentEmail && (
            <p
              className="max-w-xs cursor-pointer text-red-700"
              onClick={() => {
                resendEmail(async () => {
                  const response = await sendVerificationRequestWithoutCode(email, email)
                  if (!response) {
                    toast.error("Failed to resend verification email")
                    return
                  }
                  toast.success("Verification email resent")
                  setHasResentEmail(true)
                })
              }}
            >
              Resend verification email
            </p>
          )}
          {errorMessage === "Your email has not been verified" && resendingEmail && <LoadingCircle className="size-4" />}
        </div>
      </div>
    </form>
  )
}
