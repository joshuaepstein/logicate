"use client";

import { AppContext } from "@/app/providers";
import Kbd from "@logicate/ui/kbd";
import { useContext } from "react";
import { useHotkeys } from "react-hotkeys-hook";

export default function Navbar() {
  const { setShowCMDK } = useContext(AppContext);
  useHotkeys("l", () => {
    window.location.href = "https://app.logicate.io/login";
    // TODO: ^^ Fix the above as its not the correct URL
  });

  return (
    <>
      <nav className="container h-16 border-b border-b-neutral-500 flex justify-between items-center">
        <p className="font-medium">Logicate</p>
        <div className="flex items-center gap-4">
          {/* <Link href="/#features" className="mr-4 active:text-teal-700 hover:text-teal-800 transition">
                        Features
                    </Link> */}
          <div className="flex items-stretch justify-end gap-4">
            <div
              className="w-36 rounded-md px-2 bg-neutralgrey-200 cursor-pointer select-none flex items-center justify-between"
              onClick={() => {
                setShowCMDK(true);
              }}
            >
              <p className="text-sm text-neutralgrey-1000">Search</p>
              <div className="flex items-center gap-1">
                <Kbd variant="ghost" className="bg-neutralgrey-100">
                  ⌘
                </Kbd>
                <Kbd variant="ghost" className="bg-neutralgrey-100">
                  K
                </Kbd>
              </div>
            </div>
            <button
              onClick={() => {
                window.location.href = "https://app.logicate.io/login";
                // TODO: ^^ Fix the above as its not the correct URL
              }}
              className="flex items-center gap-2 justify-center px-2 py-1 rounded-md bg-neutralgrey-200 group transition"
            >
              <span className="text-sm text-neutralgrey-1000 group-hover:text-neutralgrey-1200 transition">
                Log in
              </span>{" "}
              <Kbd variant="ghost" className="bg-neutralgrey-100">
                L
              </Kbd>
            </button>
            <button
              onClick={() => {
                window.location.href = "https://app.logicate.io/register";
                // TODO: ^^ Fix the above as its not the correct URL
              }}
              className="flex items-center gap-2 justify-center px-2 py-1 rounded-md bg-neutralgrey-1100 hover:bg-neutralgrey-1300 group transition"
            >
              <span className="text-sm text-neutralgrey-100 transition">
                Sign up
              </span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
