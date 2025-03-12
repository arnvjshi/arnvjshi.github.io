"use client"

import { useRef } from "react"
import { motion } from "framer-motion"

const techIcons = [
  { name: "JavaScript", icon: "javascript" },
  { name: "React", icon: "react" },
  { name: "Next.js", icon: "nextjs" },
  { name: "Node.js", icon: "nodejs" },
  { name: "MongoDB", icon: "mongodb" },
  { name: "Python", icon: "python" },
  { name: "TensorFlow", icon: "tensorflow" },
  { name: "AWS", icon: "aws" },
  { name: "Firebase", icon: "firebase" },
  { name: "Git", icon: "git" },
]

export default function FloatingIcons() {
  const containerRef = useRef(null)

  // Generate random positions for the icons
  const icons = techIcons.map((icon, index) => ({
    ...icon,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * (60 - 30) + 30, // Random size between 30px and 60px
    duration: Math.random() * (25 - 15) + 15, // Random animation duration between 15s and 25s
    delay: Math.random() * 5, // Random delay between 0s and 5s
    opacity: 0.3 + Math.random() * 0.3, // Random opacity between 0.3 and 0.6
  }))

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
      {icons.map((icon, index) => (
        <motion.div
          key={index}
          className="absolute"
          initial={{
            x: `${icon.x}vw`,
            y: `${icon.y}vh`,
            opacity: 0,
            rotate: Math.random() * 360,
          }}
          animate={{
            x: [`${icon.x}vw`, `${(icon.x + 20) % 100}vw`, `${(icon.x - 10 + 100) % 100}vw`, `${icon.x}vw`],
            y: [`${icon.y}vh`, `${(icon.y - 15 + 100) % 100}vh`, `${(icon.y + 10) % 100}vh`, `${icon.y}vh`],
            opacity: [0, icon.opacity, icon.opacity, 0],
            rotate: [0, 45, -45, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: icon.duration,
            delay: icon.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{ width: icon.size, height: icon.size }}
        >
          <div className="w-full h-full flex items-center justify-center text-gray-800 dark:text-gray-200 glassmorphic-icon">
            {renderIcon(icon.icon, icon.size)}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function renderIcon(iconName, size) {
  // This is a simplified version - in a real app, you'd use actual SVG icons
  // For this example, we'll use text representations
  const iconMap = {
    javascript: "JS",
    react: "⚛️",
    nextjs: "N",
    nodejs: "Node",
    mongodb: "DB",
    python: "Py",
    tensorflow: "TF",
    aws: "AWS",
    firebase: "🔥",
    git: "Git",
  }

  return (
    <div className="font-bold" style={{ fontSize: size * 0.5 }}>
      {iconMap[iconName]}
    </div>
  )
}

