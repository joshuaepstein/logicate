"use client";

import useCMDK from "@/components/cmdk";
import { Analytics } from "@vercel/analytics/react";
import { Dispatch, ReactNode, SetStateAction, createContext } from "react";
import { Toaster } from "sonner";

export const AppContext = createContext<{
  setShowCMDK: Dispatch<SetStateAction<boolean>>;
}>({
  setShowCMDK: () => {},
});

export default function Providers({ children }: { children: ReactNode }) {
  const { CMDK, setShowCMDK } = useCMDK();

  return (
    <AppContext.Provider
      value={{
        setShowCMDK,
      }}
    >
      <CMDK />
      <Toaster closeButton />
      {children}
      <Analytics />
    </AppContext.Provider>
  );
}
