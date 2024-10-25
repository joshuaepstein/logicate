"use client"

import { Input } from "@/components/ui/input/index"
import { Label } from "@/components/ui/label"
import { SubmitButton } from "@/components/ui/submit-button"
import { signIn } from "next-auth/react"
import { redirect } from "next/navigation"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"
import { registerAction } from "./action"

export function RegisterForm() {
  const [state, formAction] = useActionState(registerAction, undefined)

  useEffect(() => {
    if (state && state.success) {
      try {
        const login = signIn("credentials", {
          email: state.data.email,
          password: state.data.password,
          redirect: false,
        })
          .then((response) => {
            if (response) {
              // wait 5 seconds
              setTimeout(() => {
                redirect("/?newLogin=true")
              }, 5000)
            } else {
              toast.error("An error occurred while logging in", {
                description: "You've been registered successfully, but we couldn't log you in. Please try again or go to the login page.",
              })
            }
          })
          .catch((error) => {
            console.error(error)
            toast.error("An error occurred while logging in", {
              description: "You've been registered successfully, but we couldn't log you in. Please try again or go to the login page.",
            })
          })
      } catch (error) {
        console.error(error)
        toast.error("An error occurred while logging in", {
          description: "You've been registered successfully, but we couldn't log you in. Please try again or go to the login page.",
        })
      }
      toast.success(state.value)
      redirect("/welcome")
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
          className="w-full invalid:placeholder-shown:border-neutralgrey-500"
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
          className="w-full invalid:placeholder-shown:border-neutralgrey-500"
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
          className="w-full invalid:placeholder-shown:border-neutralgrey-500"
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
          className="w-full invalid:placeholder-shown:border-neutralgrey-500"
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
