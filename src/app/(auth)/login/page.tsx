import LoadingCircle from "@/components/ui/icons/loading-circle"
import { Suspense } from "react"
import LoginForm from "./form"
import SlideImage from "./slide-image"

export default async function LoginPage() {
  return (
    <div className="flex h-dvh w-dvw p-5">
      <div className="flex w-full flex-col items-center justify-center rounded-md bg-base-white p-5 md:flex-row">
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
