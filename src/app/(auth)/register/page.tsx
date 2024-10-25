import { get } from "@vercel/edge-config"
import Image from "next/image"
import LogicGates from "~/_static/logic_gates_login.png"
import { RegisterForm } from "./form"

export default async function LoginPage() {
  const disabledRegistration = await get("disabledRegistration")
  return (
    <div className="flex h-dvh w-dvw p-5">
      <div className="flex w-full flex-row rounded-md bg-base-white p-5 shadow-hard-xs">
        <div className="flex w-1/2 items-center justify-center border-r border-neutralgrey-400">
          <Image src={LogicGates} alt="Logic Gates" className="w-full" />
        </div>
        <div className="flex w-1/2 flex-col items-center justify-center pl-5">
          {!disabledRegistration ? (
            <div className="flex max-w-md flex-col items-start justify-start">
              <h2 className="text-2xl font-medium">Teacher Signup</h2>
              <p className="text-sm text-neutralgrey-800">
                As a teacher, you can create classrooms, invite students, and track their progress.
              </p>
              <RegisterForm />
            </div>
          ) : (
            <div className="flex max-w-md flex-col items-start justify-start">
              <h2 className="text-2xl font-medium">Registration is disabled</h2>
              <p className="text-sm text-neutralgrey-800">Registration is currently disabled. Please check back later.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
