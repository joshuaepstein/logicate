import Image from "next/image";
import LogicGates from "~/logic_gates_login.png";
import { RegisterForm } from "./form";

export default async function LoginPage() {
  return (
    <div className="flex h-dvh w-dvw p-5">
      <div className="flex-row w-full bg-base-white rounded-md flex shadow-hard-xs p-5">
        <div className="w-1/2 flex items-center justify-center border-r border-neutralgrey-400">
          <Image src={LogicGates} alt="Logic Gates" className="w-full" />
        </div>
        <div className="w-1/2 flex flex-col justify-center items-center pl-5">
          <div className="flex flex-col justify-start items-start max-w-md">
            <h2 className="font-medium text-2xl">Teacher Signup</h2>
            <p className="text-sm text-neutralgrey-800">
              As a teacher, you can create classrooms, invite students, and
              track their progress.
            </p>
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
