"use client"
import { motion } from "framer-motion"

export default function Name3D() {
  return (
    <div className="w-full py-6">
      <motion.h1
        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-3d text-center"
        animate={{
          y: [0, -10, 0],
          rotateZ: [0, 1, 0],
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          times: [0, 0.5, 1],
          repeat: Number.POSITIVE_INFINITY,
        }}
      >
        ARNAV JOSHI
      </motion.h1>
    </div>
  )
}

