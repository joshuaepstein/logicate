import Image from 'next/image'
import LogicGates from '~/logic_gates_login.png'
import LoginForm from './form'
import { Suspense } from 'react'
import LoadingCircle from '@/components/ui/icons/loading-circle'

export default async function LoginPage() {
  return (
    <div className="flex h-dvh w-dvw p-5">
      <div className="bg-base-white shadow-hard-xs flex w-full flex-row rounded-md p-5">
        <div className="flex w-1/2 flex-col items-start justify-between">
          <div className="h-max text-2xl font-medium">Logicate</div>
          <Suspense fallback={<LoadingCircle />}>
            <LoginForm />
          </Suspense>
        </div>
        <div className="flex w-1/2 items-center justify-center">
          <Image src={LogicGates} alt="Logic Gates" className="w-full" />
        </div>
      </div>
    </div>
  )
}
