'use client'

import { cn } from '@/lib'
import { ClassValue } from 'clsx'
import landingDemo from '~/_static/landing_demo.png'
import { BlurImage } from '../ui/blur-image'

export default function AppScreenshot({ className }: { className?: ClassValue }) {
  return (
    // <div
    //   className={cn('shadow-hard-xs bg-neutralgrey-700 mt-12 aspect-video w-2/3 max-w-[900px] rounded-md', className)}
    //   style={{
    //     backgroundImage: `url(${landingDemo.src})`,
    //     backgroundSize: 'cover',
    //     backgroundPosition: 'center',
    //   }}
    // />

    <div className={cn('shadow-hard-xs mt-12 aspect-video w-2/3 max-w-[900px] rounded-md bg-white/20 p-2 backdrop-blur-md', className)}>
      <BlurImage
        src={landingDemo}
        alt="Logicate Demo Screenshot - Homepage"
        className={cn('rounded-[4px] bg-white transition-[filter] duration-200')}
      />
    </div>
  )
}
