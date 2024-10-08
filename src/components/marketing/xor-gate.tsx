'use client'

import XorBody from '@/app/ui/canvas/node/gates/xor/body'
import { motion } from 'framer-motion'

export default function XorGate() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.4, rotate: '-17deg' }}
      animate={{ opacity: 1, scale: 1, rotate: '7deg' }}
      transition={{ delay: 0.4 + 1, type: 'spring', stiffness: 450, damping: 8 }}
      key="xor-gate-animatable"
      className="absolute left-4 top-[30rem] hidden md:block"
      style={{
        rotate: '-17deg',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
      }}
      drag
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      dragElastic={0.5}
      dragMomentum={false}
      dragTransition={{ bounceStiffness: 100, bounceDamping: 10 }}
    >
      <XorBody className="scale-150" />
    </motion.div>
  )
}
