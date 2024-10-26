import AppScreenshot from "@/components/marketing/app-screenshot"
import Educators from "@/components/marketing/sections/educators"
import FeaturesLearn from "@/components/marketing/sections/features/learn"
import FeatureQuestions from "@/components/marketing/sections/features/questions"
import FeatureSimulate from "@/components/marketing/sections/features/simulate"
import GetStarted from "@/components/marketing/sections/get-started"
import LogicateDescription from "@/components/marketing/sections/logicate-description"

export default function Page() {
  return (
    <>
      <div
        className="bg-neutralgrey-300 relative flex min-h-[50dvh] w-full flex-col items-center justify-center md:min-h-[70dvh]"
        style={{
          backgroundImage: "url(/_static/landing-bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-neutralgrey-1200 xs:p-0 xs:text-3xl -mt-36 px-4 text-center text-2xl font-semibold leading-tight md:text-5xl lg:text-6xl lg:leading-tight">
          <span className="motion-preset-focus-lg motion-duration-1000 motion-delay-300">Build</span>
          <span className="motion-preset-focus-lg motion-duration-1000 motion-delay-500">, Simulate</span>
          <span className="motion-preset-focus-lg motion-duration-1000 motion-delay-700">, Test</span>
          <br />
          <span className="motion-preset-focus-lg motion-duration-1000 motion-delay-1000 bg-gradient-to-b from-blue-700 to-indigo-600 bg-clip-text font-semibold text-transparent">
            Logic Gates
          </span>
        </h1>

        <AppScreenshot className="absolute top-1/2" />
      </div>

      <div id="mt" data-empty-placeholder className="lg:min-h-[25dvh]" />

      <LogicateDescription />

      <Educators />

      <FeatureSimulate />
      <FeatureQuestions />
      <FeaturesLearn />

      <GetStarted />
    </>
  )
}
