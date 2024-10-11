import Image from 'next/image'
import LogicGates from '~/logic_gates_login.png'
import LoginForm from './form'
import { Suspense } from 'react'
import LoadingCircle from '@/components/ui/icons/loading-circle'
import LogoIcon from '@/components/Logo'

export default async function LoginPage() {
  return (
    <div className="flex h-dvh w-dvw p-5">
      <div className="bg-base-white flex w-full flex-col items-center justify-center rounded-md p-5 md:flex-row">
        <div className="flex h-full flex-col items-start justify-between md:w-1/2">
          <Suspense fallback={<LoadingCircle />}>
            <LoginForm />
          </Suspense>
        </div>
        <div className="hidden items-center justify-center md:flex md:w-1/2">
          <Image src={LogicGates} alt="Logic Gates" className="w-full" />
        </div>
      </div>
    </div>
  )
}
