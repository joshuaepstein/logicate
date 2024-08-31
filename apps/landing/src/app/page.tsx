import Image from "next/image";

import landingGradient from "~/landing_gradient.png";
import landingDemo from "~/landing_demo.png";
import Features from "@/components/sections/features";
import AndGate from "@/components/and-gate";
import OrGate from "@/components/or-gate";

export default function Page() {
  return (
    <>
      <Image
        src={landingGradient}
        alt="Landing Gradient"
        className="absolute xl:-left-56 lg:-left-40 md:-left-20 top-0 w-3/4 -z-50"
      />

      <div className="container">
        <div className="flex flex-col items-center relative justify-center py-36">
          <AndGate />
          <OrGate />
          <h1 className="text-5xl font-regular leading-tight text-center text-neutralgrey-1100/80">
            Build, Simulate, Test
            <br />
            <span className="bg-gradient-to-b from-blue-700 to-indigo-600 text-transparent bg-clip-text font-medium">
              Logic Gates
            </span>
          </h1>

          <div
            className="w-2/3 mt-12 aspect-video bg-neutral-500 rounded-md shadow-hard-xs"
            style={{
              backgroundImage: `url(${landingDemo.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <Features />
        </div>
      </div>
    </>
  );
}
