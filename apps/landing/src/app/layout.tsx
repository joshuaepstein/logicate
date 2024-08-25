import "tailwindcss/tailwind.css";
import "@/styles/global.css";
import "@logicate/ui/styles";

import { cn } from "@logicate/ui";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Providers from "./providers";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className={cn(GeistSans.variable, GeistMono.variable)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
