"use client";

import { Toaster } from "@logicate/ui/sonner";
import { TooltipProvider } from "@logicate/ui/tooltip";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <TooltipProvider>{children}</TooltipProvider>
      <Toaster />
    </>
  );
}
