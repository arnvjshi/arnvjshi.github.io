"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function MarvelIntro({ onComplete }) {
  const [showIntro, setShowIntro] = useState(true)
  const [stage, setStage] = useState(0)

  useEffect(() => {
    // Stage 0: Initial zoom in
    // Stage 1: Flash effect
    // Stage 2: Fade out
    const timers = [
      setTimeout(() => setStage(1), 2000),
      setTimeout(() => setStage(2), 3000),
      setTimeout(() => {
        setShowIntro(false)
        if (onComplete) onComplete()
      }, 4000),
    ]

    return () => timers.forEach((timer) => clearTimeout(timer))
  }, [onComplete])

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 bg-white dark:bg-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: stage === 2 ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="relative"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{
              scale: stage === 0 ? [0.5, 1.2] : 1,
              opacity: stage === 0 ? [0, 1] : 1,
            }}
            transition={{
              duration: stage === 0 ? 2 : 0.5,
              ease: "easeOut",
            }}
          >
            <motion.h1
              className="text-6xl md:text-8xl font-extrabold tracking-tighter"
              animate={{
                color: stage === 1 ? ["#000", "#fff", "#000", "#fff", "#000"] : "#000",
                textShadow:
                  stage === 1
                    ? ["0 0 0px rgba(255,255,255,0)", "0 0 20px rgba(255,255,255,0.8)", "0 0 0px rgba(255,255,255,0)"]
                    : "none",
              }}
              transition={{
                duration: stage === 1 ? 1 : 0.5,
                times: stage === 1 ? [0, 0.2, 0.4, 0.6, 1] : [0, 1],
              }}
            >
              ARNAV JOSHI
            </motion.h1>

            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500"
              style={{ mixBlendMode: "overlay" }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: stage === 1 ? [0, 0.7, 0] : 0,
              }}
              transition={{
                duration: stage === 1 ? 1 : 0.5,
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

