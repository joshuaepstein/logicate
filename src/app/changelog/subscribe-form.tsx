'use client'

import { Button } from '@/components/ui/button'
import { TextInput } from '@/components/ui/input'
import { useFormState, useFormStatus } from 'react-dom'
import { addToResend } from './actions'
import { capitalise } from '@/lib'

export default function SubscribeForm() {
  const [error, submit] = useFormState(addToResend, undefined)

  return (
    <div className="mt-8 flex flex-col items-center">
      <form method="post" className="mt-6 flex justify-center" action={submit}>
        <h2 className="sr-only">Subscribe via email</h2>
        <div className="relative w-64 shrink">
          <label htmlFor="subscribe-email" className="sr-only">
            Email address
          </label>
          <TextInput
            placeholder="Subscribe via email"
            id="subscribe-email"
            name="email_address"
            type="email"
            required
            className="block w-full min-w-0 max-w-none pl-12 pr-3 sm:leading-6"
            displayError={false}
          />
          <svg
            className="stroke-neutralgrey-600 pointer-events-none absolute left-3 top-2 h-6 w-6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 7.92C5 6.86 5.865 6 6.931 6h10.138C18.135 6 19 6.86 19 7.92v8.16c0 1.06-.865 1.92-1.931 1.92H6.931A1.926 1.926 0 0 1 5 16.08V7.92Z"></path>
            <path d="m6 7 6 5 6-5"></path>
          </svg>
        </div>
        <SubButton />
      </form>
      {(error && error !== 'Subscribed successfully' && <p className="mt-2 text-red-600">{error}</p>) ||
        (error && <p className="mt-2 text-sm font-medium text-green-600">{error}</p>)}
    </div>
  )
}

function SubButton() {
  const { pending } = useFormStatus()

  return (
    <Button variant="dark" className="ml-4" disabled={pending} type="submit">
      {pending ? 'Subscribing...' : 'Subscribe'}
    </Button>
  )
}
