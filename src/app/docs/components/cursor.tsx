import { cn } from "@/lib"
import { motion, SVGMotionProps } from "framer-motion"
import { forwardRef, Ref } from "react"

interface CursorProps extends SVGMotionProps<SVGSVGElement> {
  position: {
    x: number
    y: number
  }
}

const Cursor = forwardRef(({ position: { x, y }, style, className, transition, ...props }: CursorProps, ref: Ref<SVGSVGElement>) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      ref={ref}
      className={cn("", className)}
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        ...style,
      }}
      initial={{ x, y }}
      animate={{ x, y }}
      transition={{
        type: "spring",
        damping: 30,
        mass: 0.8,
        stiffness: 350,
        ...transition,
      }}
      {...props}
    >
      <motion.path
        fill="#fff"
        d="M13.923 16.03c.175.42.007 2.015-.923 2.384-.93.37-2.118 0-2.118 0l-2.156-4.312L5 17.828V1l11.414 11.414h-4.253c.21.4 1.54 3.08 1.762 3.616Z"
      />
      <motion.path
        fill="#0A090B"
        fillRule="evenodd"
        d="M6 3.414v12l3-3 2.5 5s.676.216 1 0c.324-.216.646-.65.5-1-.688-1.65-2.5-5-2.5-5H14l-8-8Z"
        clipRule="evenodd"
      />
    </motion.svg>
  )
})

export default Cursor
