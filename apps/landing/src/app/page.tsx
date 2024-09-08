import Image from 'next/image';

import AndGate from '@/components/and-gate';
import OrGate from '@/components/or-gate';
import Features from '@/components/sections/features';
import landingDemo from '~/landing_demo.png';
import landingGradient from '~/landing_gradient.png';

export default function Page() {
  return (
    <>
      <Image src={landingGradient} alt="Landing Gradient" className="absolute top-0 -z-50 w-3/4 md:-left-20 lg:-left-40 xl:-left-56" />

      <div className="container">
        <div className="relative flex flex-col items-center justify-center py-36">
          <AndGate />
          <OrGate />
          <h1 className="font-regular text-neutralgrey-1100/80 text-center text-5xl leading-tight">
            Build, Simulate, Test
            <br />
            <span className="bg-gradient-to-b from-blue-700 to-indigo-600 bg-clip-text font-medium text-transparent">Logic Gates</span>
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
  );
}
