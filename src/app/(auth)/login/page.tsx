import Image from 'next/image'
import CanvasDemo from '~/canvas.demo.png'
import LoginForm from './form'
import { Suspense } from 'react'
import LoadingCircle from '@/components/ui/icons/loading-circle'
import LogoIcon from '@/components/Logo'
import SlideImage from './slide-image'

export default async function LoginPage() {
  return (
    <div className="flex h-dvh w-dvw p-5">
      <div className="bg-base-white flex w-full flex-col items-center justify-center rounded-md p-5 md:flex-row">
        <div className="flex h-full flex-col items-start justify-between md:w-1/2">
          <Suspense fallback={<LoadingCircle />}>
            <LoginForm />
          </Suspense>
        </div>
        <SlideImage />
      </div>
    </div>
  )
}
