"use client"

import { Button } from "@/components/ui/button"
import LoadingCircle from "@/components/ui/icons/loading-circle"
import { Input } from "@/components/ui/input"
import { redirect } from "next/navigation"
import { useEffect, useState, useTransition } from "react"
import { toast } from "sonner"
import { unlockAccount } from "./action"

export default function CodeUnlocker({ code }: { code?: string }) {
  const [unlocking, useUnlock] = useTransition()
  const [otp, setOtp] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (code) {
      setOtp(code)
    }
  }, [code])

  return (
    <>
      <div className="flex w-full max-w-lg flex-row items-center justify-between gap-4">
        <Input value={otp} onChange={(e) => setOtp(e.target.value)} className="mt-4 w-full" placeholder="Enter your code" />

        <Button
          className="mt-4 w-max"
          onClick={() => {
            useUnlock(async () => {
              setError(null)
              const r = await unlockAccount(otp)
              if (r.success) {
                toast.success("Account unlocked")
                redirect("/login")
              } else {
                toast.error(r.error)
                setError(r.error)
              }
            })
          }}
        >
          {(unlocking && <LoadingCircle className="h-4 w-4" />) || "Unlock Account"}
        </Button>
      </div>

      {error && <p className="mt-4 text-red-900">{error}</p>}
    </>
  )
}
