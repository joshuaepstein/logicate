'use client'

import OrBody from '@/app/ui/canvas/node/gates/or/body'
import { motion } from 'framer-motion'

export default function AndGate() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, rotate: '-20deg' }}
      animate={{ opacity: 1, scale: 1, rotate: '12deg' }}
      transition={{ delay: 0.2 + 1, type: 'spring', stiffness: 450, damping: 15 }}
      key="or-gate-animatable"
      className="absolute right-20 top-64 hidden md:block"
      style={{
        rotate: '12deg',
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
      <OrBody className="scale-[2]" />
    </motion.div>
  )
}
