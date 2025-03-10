"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"

const ScrollIndicator = ({ targetId }) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      // Hide indicator after scrolling down a bit
      if (window.scrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTarget = () => {
    const target = document.getElementById(targetId)
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 20,
      }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 cursor-pointer"
      onClick={scrollToTarget}
    >
      <div className="relative flex flex-col items-center">
        <span className="text-sm text-[rgb(var(--text-secondary))] mb-2">Scroll Down</span>
        <div className="w-8 h-12 border-2 border-[rgba(var(--primary),0.5)] rounded-full flex justify-center">
          <motion.div
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.5,
              ease: "easeInOut",
            }}
            className="w-2 h-2 bg-[rgb(var(--primary))] rounded-full mt-2"
          />
        </div>
        <motion.div
          animate={{
            y: [0, 5, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 1.5,
            ease: "easeInOut",
            delay: 0.2,
          }}
          className="mt-2"
        >
          <ArrowDown className="text-[rgb(var(--primary))]" size={20} />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ScrollIndicator

