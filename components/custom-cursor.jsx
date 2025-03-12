"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener("mousemove", mouseMove)

    // Add event listeners for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]')

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => setCursorVariant("hover"))
      el.addEventListener("mouseleave", () => setCursorVariant("default"))
    })

    return () => {
      window.removeEventListener("mousemove", mouseMove)

      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", () => setCursorVariant("hover"))
        el.removeEventListener("mouseleave", () => setCursorVariant("default"))
      })
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
    },
    hover: {
      x: mousePosition.x - 30,
      y: mousePosition.y - 30,
      height: 60,
      width: 60,
    },
  }

  return (
    <>
      <motion.div
        className="cursor-dot hidden md:block fixed top-0 left-0 z-50 rounded-full bg-black dark:bg-white mix-blend-difference pointer-events-none"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      <style jsx global>{`
        body {
          cursor: none;
        }
        
        @media (max-width: 768px) {
          body {
            cursor: auto;
          }
        }
      `}</style>
    </>
  )
}

