"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SubmitButton } from "@/components/ui/submit-button"
import { redirect } from "next/navigation"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"
import { registerAction } from "./action"

export function RegisterForm() {
  const [state, formAction] = useActionState(registerAction, undefined)

  useEffect(() => {
    if (state && state.success) {
      toast.success(state.value)
      redirect("/login")
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
