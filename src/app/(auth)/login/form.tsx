'use client'

import { cn } from '@/lib'
import { Button } from '@/components/ui/button'
import LoadingCircle from '@/components/ui/icons/loading-circle'
import { Input } from '@/components/ui/input/index'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import { toast } from 'sonner'
import LogoIcon from '@/components/Logo'

const errorCodes = {
  'no-credentials': 'Invalid email or password',
  'not-verified': 'Your email has not been verified',
  'invalid-credentials': 'Invalid email or password',
  'exceeded-login-attempts': 'Account has been locked due to too many login attempts. Please contact support to unlock your account.',
  'too-many-login-attempts': 'Too many login attempts. Please try again later.',
}

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams?.get('next')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, login] = useTransition()

  useEffect(() => {
    const error = searchParams?.get('error')
    error && toast.error(error)
    error && setErrorMessage(error)
  }, [searchParams])

  return (
    <form
      className="flex h-full w-full flex-col items-center justify-center"
      onSubmit={async (e) => {
        e.preventDefault()
        login(async () => {
          setErrorMessage('')
          const res = await fetch('/api/auth/account-exists', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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
            const signInRes = await signIn('credentials', {
              email,
              password,
              redirect: false,
              ...(next ? { callbackUrl: next } : {}),
            })
            if (!signInRes) return

            if (!signInRes.ok && signInRes.error) {
              if (errorCodes[signInRes.error as keyof typeof errorCodes]) {
                toast.error(errorCodes[signInRes.error as keyof typeof errorCodes])
                setErrorMessage(errorCodes[signInRes.error as keyof typeof errorCodes])
              } else {
                toast.error(signInRes.error)
                setErrorMessage(signInRes.error)
              }

              return
            }
            toast.success('Logged in successfully', {
              description: `Welcome back, ${email}. Redirecting you to your dashboard...`,
            })
            // redirect to next or / but reload the page as we need to re-render the layout
            window.location.href = next || '/'
          } else {
            toast.error('No account found with that email address.')
            setErrorMessage('No account found with that email address.')
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
            inputSize="sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <SubmitButton className="w-full" variant="dark">
            Login
          </SubmitButton> */}
          <Button disabled={loading} variant="dark" className="relative w-full">
            <span className={cn({ 'opacity-0': loading })}>Login</span>

            {loading && (
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <LoadingCircle className="size-5" />
              </div>
            )}
          </Button>
          {errorMessage && <p className="max-w-xs text-red-700">{errorMessage}</p>}
        </div>
      </div>
    </form>
  )
}
