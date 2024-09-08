'use client';

import { AppContext } from '@/app/providers';
import Kbd from '@logicate/ui/kbd';
import { useContext } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

export default function Navbar() {
  const { setShowCMDK } = useContext(AppContext);
  useHotkeys('l', () => {
    window.location.href = 'https://app.logicate.io/login';
    // TODO: ^^ Fix the above as its not the correct URL
  });

  return (
    <>
      <nav className="container flex h-16 items-center justify-between border-b border-b-neutral-500">
        <p className="font-medium">Logicate</p>
        <div className="flex items-center gap-4">
          {/* <Link href="/#features" className="mr-4 active:text-teal-700 hover:text-teal-800 transition">
                        Features
                    </Link> */}
          <div className="flex items-stretch justify-end gap-4">
            <div
              className="bg-neutralgrey-200 flex w-36 cursor-pointer select-none items-center justify-between rounded-md px-2"
              onClick={() => {
                setShowCMDK(true);
              }}
            >
              <p className="text-neutralgrey-1000 text-sm">Search</p>
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
                window.location.href = 'https://app.logicate.io/login';
                // TODO: ^^ Fix the above as its not the correct URL
              }}
              className="bg-neutralgrey-200 group flex items-center justify-center gap-2 rounded-md px-2 py-1 transition"
            >
              <span className="text-neutralgrey-1000 group-hover:text-neutralgrey-1200 text-sm transition">Log in</span>{' '}
              <Kbd variant="ghost" className="bg-neutralgrey-100">
                L
              </Kbd>
            </button>
            <button
              onClick={() => {
                window.location.href = 'https://app.logicate.io/register';
                // TODO: ^^ Fix the above as its not the correct URL
              }}
              className="bg-neutralgrey-1100 hover:bg-neutralgrey-1300 group flex items-center justify-center gap-2 rounded-md px-2 py-1 transition"
            >
              <span className="text-neutralgrey-100 text-sm transition">Sign up</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
