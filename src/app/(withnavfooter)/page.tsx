import React from 'react'
import Image from 'next/image'

import AndGate from '@/components/marketing/and-gate'
import OrGate from '@/components/marketing/or-gate'
import Features from '@/components/marketing/sections/features'
import landingDemo from '~/landing_demo.png'
import landingGradient from '~/beams.a164b634.png'
import XorGate from '@/components/marketing/xor-gate'

export default function Page() {
  return (
    <>
      <Image src={landingGradient} alt="Landing Gradient" priority className="absolute top-20 -z-50 md:w-3/4" />

      <div className="container">
        <div className="relative flex flex-col items-center justify-center py-36">
          <AndGate />
          <OrGate />
          <XorGate />
          <h1 className="text-neutralgrey-1200 text-center text-5xl font-semibold leading-tight">
            <span className="motion-preset-focus-lg motion-delay-300 motion-duration-1000">Build</span>
            <span className="motion-preset-focus-lg motion-delay-500 motion-duration-1000">, Simulate</span>
            <span className="motion-preset-focus-lg motion-delay-700 motion-duration-1000">, Test</span>
            <br />
            <span className="motion-preset-focus-lg motion-delay-1000 motion-duration-1000 bg-gradient-to-b from-blue-700 to-indigo-600 bg-clip-text font-semibold text-transparent">
              Logic Gates
            </span>
          </h1>
          <p className="text-neutralgrey-1000/85 motion-preset-slide-up-lg motion-preset-fade-lg motion-delay-[1200ms] motion-duration-700 mt-6 text-center text-lg">
            A powerful, easy-to-use logic gate simulator for students, hobbyists, and professionals.
          </p>

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
