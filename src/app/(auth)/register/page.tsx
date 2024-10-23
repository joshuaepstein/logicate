import { get } from '@vercel/edge-config'
import Image from 'next/image'
import LogicGates from '~/logic_gates_login.png'
import { RegisterForm } from './form'

export default async function LoginPage() {
  const disabledRegistration = await get('disabledRegistration')
  return (
    <div className="flex h-dvh w-dvw p-5">
      <div className="bg-base-white shadow-hard-xs flex w-full flex-row rounded-md p-5">
        <div className="border-neutralgrey-400 flex w-1/2 items-center justify-center border-r">
          <Image src={LogicGates} alt="Logic Gates" className="w-full" />
        </div>
        <div className="flex w-1/2 flex-col items-center justify-center pl-5">
          {!disabledRegistration ? (
            <div className="flex max-w-md flex-col items-start justify-start">
              <h2 className="text-2xl font-medium">Teacher Signup</h2>
              <p className="text-neutralgrey-800 text-sm">
                As a teacher, you can create classrooms, invite students, and track their progress.
              </p>
              <RegisterForm />
            </div>
          ) : (
            <div className="flex max-w-md flex-col items-start justify-start">
              <h2 className="text-2xl font-medium">Registration is disabled</h2>
              <p className="text-neutralgrey-800 text-sm">Registration is currently disabled. Please check back later.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
