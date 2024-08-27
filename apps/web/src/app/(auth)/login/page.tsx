import Image from "next/image";
import LogicGates from "~/logic_gates_login.png";
import LoginForm from "./form";

export default async function LoginPage() {
  return (
    <div className="flex h-dvh w-dvw p-5">
      <div className="flex-row w-full bg-base-white rounded-md flex shadow-hard-xs p-5">
        <div className="w-1/2 flex flex-col justify-between items-start">
          <div className="font-medium text-2xl h-max">Logicate</div>
          <LoginForm />
        </div>
        <div className="w-1/2 flex items-center justify-center">
          <Image src={LogicGates} alt="Logic Gates" className="w-full" />
        </div>
      </div>
    </div>
  );
}
