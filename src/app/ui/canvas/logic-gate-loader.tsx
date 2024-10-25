"use client"

import LogoIcon from "@/components/Logo"
import LoadingCircle from "@/components/ui/icons/loading-circle"
import { motion } from "framer-motion"

export default function LogicGateLoader() {
  return (
    <motion.div
      initial={{
        opacity: 1,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        delay: 0.3,
        duration: 1,
        ease: "easeInOut",
      }}
      className="pointer-events-auto absolute inset-0 z-[12345678] flex cursor-none flex-col items-center justify-center gap-2"
      style={{
        backgroundImage: `url(/_static/grid.png)`,
        backgroundRepeat: "repeat",
        backgroundSize: "50px 50px",
        backgroundPosition: "center",
      }}
    >
      <LogoIcon className="mb-8 h-12" />
      <LoadingCircle className="size-5 text-neutralgrey-1200" />
      <div className="flex flex-col items-center justify-center">
        <p className="text-sm font-medium text-neutralgrey-1100">Loading...</p>
        <p className="text-xs text-neutralgrey-1000/50">We are loading your data so you can use this canvas.</p>
      </div>
    </motion.div>
  )
}
