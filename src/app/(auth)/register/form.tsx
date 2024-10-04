'use client'

import { Input } from '@/components/ui/input/index'
import { Label } from '@/components/ui/label'
import { SubmitButton } from '@/components/ui/submit-button'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { toast } from 'sonner'
import { registerAction } from './action'
import { signIn } from 'next-auth/react'

export function RegisterForm() {
  const [state, formAction] = useFormState(registerAction, undefined)

  useEffect(() => {
    if (state && state.success) {
      try {
        const login = signIn('credentials', {
          email: state.data.email,
          password: state.data.password,
          redirect: false,
        }).then((response) => {
          if (response) {
            // wait 5 seconds
            setTimeout(() => {
              redirect('/?newLogin=true')
            }, 5000)
          }
        })
      } catch (error) {
        console.error(error)
        toast.error('An error occurred while logging in', {
          description: "You've been registered successfully, but we couldn't log you in. Please try again or go to the login page.",
        })
      }
      toast.success(state.value)
      redirect('/welcome')
    }
    if (state && !state.success) {
      toast.error(state.error)
    }
  }, [state])

  return (
    <form className="mt-4 flex w-full flex-col gap-4" action={formAction}>
      <div className="flex w-full flex-col gap-2">
        <Label>Name</Label>
        <Input
          placeholder="John Smith"
          className="invalid:placeholder-shown:border-neutralgrey-500 w-full"
          type="text"
          autoComplete="name"
          name="name"
          required
          id="name"
        />
      </div>
      <div className="flex w-full flex-col gap-2">
        <Label>Email</Label>
        <Input
          placeholder="john@smith.com"
          className="invalid:placeholder-shown:border-neutralgrey-500 w-full"
          type="email"
          name="email"
          id="email"
          required
        />
      </div>
      <div className="flex w-full flex-col gap-2">
        <Label>Username</Label>
        <Input
          placeholder="johnsmith"
          className="invalid:placeholder-shown:border-neutralgrey-500 w-full"
          type="text"
          autoComplete="username"
          name="username"
          id="username"
          required
        />
      </div>
      <div className="flex w-full flex-col gap-2">
        <Label>Password</Label>
        <Input
          placeholder="********"
          className="invalid:placeholder-shown:border-neutralgrey-500 w-full"
          type="password"
          autoComplete="new-password"
          name="password"
          id="password"
          required
        />
      </div>

      <SubmitButton variant="dark" className="w-full">
        Signup
      </SubmitButton>

      {state && !state.success && <p className="text-red-700">{state.error}</p>}
    </form>
  )
}
