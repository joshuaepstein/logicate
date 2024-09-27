'use client'

import AndBody from '@/app/ui/canvas/node/gates/and/body'
import { motion } from 'framer-motion'

export default function AndGate() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.4, rotate: '-20deg' }}
      animate={{ opacity: 1, scale: 1, rotate: '-12deg' }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      key="and-gate-animatable"
      className="absolute left-8 top-36"
      style={{
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
      <AndBody className="scale-150" />
    </motion.div>
  )
}
