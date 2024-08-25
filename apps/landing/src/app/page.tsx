import Image from "next/image";

import Navbar from "@/components/navbar";
import landingGradient from "~/landing_gradient.png";

export default function Page() {
  return (
    <>
      <Image src={landingGradient} alt="Landing Gradient" className="absolute left-0 top-0 w-3/4" />
      <div className="container">
        <Navbar />
      </div>
    </>
  );
}
