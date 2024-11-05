"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SubmitButton } from "@/components/ui/submit-button"
import { cn } from "@/lib"
import { Check01Icon, X02Icon } from "@jfstech/icons-react/24/outline"
import { max } from "lodash"
import { redirect } from "next/navigation"
import { useActionState, useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { registerAction } from "./action"

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

const passwordErrors = {
  length: "8+ characters",
  uppercase: "One uppercase letter",
  lowercase: "One lowercase letter",
  number: "One number",
  special: "One special character",
}

const passwordRegexChecks = {
  length: (password: string) => password.length >= 8,
  uppercase: (password: string) => /[A-Z]/.test(password),
  lowercase: (password: string) => /[a-z]/.test(password),
  number: (password: string) => /\d/.test(password),
  special: (password: string) => /[@$!%*?&]/.test(password),
}

export function RegisterForm() {
  const [state, formAction] = useActionState(registerAction, undefined)
  const [password, setPassword] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const passwordRef = useRef<HTMLInputElement>(null)
  const passwordCheckerRef = useRef<HTMLDivElement>(null)

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
      <div className="relative flex w-full flex-col gap-2">
        <Label>Password</Label>
        {/* TODO: Add view password button */}
        <Input
          placeholder="********"
          className="invalid:placeholder-shown:border-neutralgrey-500 w-full"
          type="password"
          autoComplete="new-password"
          name="password"
          id="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <div
          className={cn(
            "shadow-hard-2xs absolute bottom-0 flex h-max min-h-32 w-max min-w-52 translate-y-1/2 flex-col gap-2 rounded-md bg-white p-4 pr-8 opacity-0",
            {
              "opacity-100": isFocused,
            }
          )}
          style={{
            left: `-${max([passwordRef.current?.clientWidth, passwordCheckerRef.current?.clientWidth]) ?? 240}px`,
          }}
        >
          <p className="text-neutralgrey-1200 text-sm font-medium">Password must contain:</p>
          <ul className="flex flex-col gap-px">
            {Object.entries(passwordRegexChecks).map(([key, check]) => (
              <li
                key={key}
                className={cn("text-neutralgrey-900 flex flex-row items-center gap-px", {
                  "text-green-500": check(password),
                })}
              >
                {check(password) ? <Check01Icon className="size-4" /> : <X02Icon className="size-4" />}
                {passwordErrors[key as keyof typeof passwordErrors]}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <SubmitButton variant="dark" className="w-full">
        Signup
      </SubmitButton>

      {state && !state.success && <p className="text-red-700">{state.error}</p>}

      {/* {password &&
        Object.entries(passwordRegexChecks).map(([key, check]) => (
          <p key={key} className="text-red-700">
            {!check(password) ? passwordErrors[key as keyof typeof passwordErrors] : ""}
          </p>
        ))} */}
    </form>
  )
}
