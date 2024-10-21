'use client'

import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'
import { Container } from '@/components/ui/not-done-yet/container'
import CodeUnlocker from './code-unlocker'

export default function UnlockAccountPage({ searchParams: { code } }: { searchParams: { code?: string } }) {
  return (
    <Container className="flex min-h-[70dvh] flex-col items-start justify-start">
      <h1 className="text-3xl font-semibold">Unlock Account</h1>
      <p className="text-neutralgrey-700 text-sm">Enter the code sent to your email to unlock your account.</p>

      <CodeUnlocker code={code} />
    </Container>
  )
}
