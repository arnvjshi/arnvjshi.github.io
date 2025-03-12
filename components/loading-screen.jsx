"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    initial: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  }

  const logoVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      exit="exit"
      className="fixed inset-0 bg-white dark:bg-black flex flex-col items-center justify-center z-50"
    >
      <motion.div variants={logoVariants} initial="initial" animate="animate" className="mb-8">
        <h1 className="text-4xl md:text-6xl font-bold">AJ</h1>
      </motion.div>

      <div className="w-64 h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-black dark:bg-white"
        />
      </div>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-4 text-sm">
        {progress}% Loading...
      </motion.p>
    </motion.div>
  )
}

