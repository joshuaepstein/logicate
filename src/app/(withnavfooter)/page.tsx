import React from 'react'
import Image from 'next/image'

import AndGate from '@/components/marketing/and-gate'
import OrGate from '@/components/marketing/or-gate'
import Features from '@/components/marketing/sections/features'
import landingDemo from '~/landing_demo.png'
import landingGradient from '~/beams-home@95.jpeg'
import XorGate from '@/components/marketing/xor-gate'

export default function Page() {
  return (
    <>
      <Image src={landingGradient} alt="Landing Gradient" priority className="absolute top-20 -z-50 w-3/4" />

      <div className="container">
        <div className="relative flex flex-col items-center justify-center py-36">
          <AndGate />
          <OrGate />
          <XorGate />
          <h1 className="text-neutralgrey-1200 text-center text-5xl font-semibold leading-tight">
            Build, Simulate, Test
            <br />
            <span className="bg-gradient-to-b from-blue-700 to-indigo-600 bg-clip-text font-semibold text-transparent">Logic Gates</span>
          </h1>

          <div
            className="shadow-hard-xs mt-12 aspect-video w-2/3 rounded-md bg-neutral-500"
            style={{
              backgroundImage: `url(${landingDemo.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          <Features />
        </div>
      </div>
    </>
  )
}
