"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function FloatingName() {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: false,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const nameVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  }

  const floatingAnimation = {
    y: [0, -10, 0],
    rotateZ: [0, 1, 0],
    transition: {
      duration: 4,
      ease: "easeInOut",
      times: [0, 0.5, 1],
      repeat: Number.POSITIVE_INFINITY,
    },
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div ref={ref} initial="hidden" animate={controls} variants={nameVariants} className="relative">
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-3d"
          animate={floatingAnimation}
        >
          ARNAV JOSHI
        </motion.h1>
      </motion.div>
    </div>
  )
}

