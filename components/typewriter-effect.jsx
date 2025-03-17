"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function TypewriterEffect({ words, speed = 100, delay = 1500 }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(speed)

  useEffect(() => {
    const timer = setTimeout(() => {
      // Current word being processed
      const currentWord = words[currentWordIndex]

      // If deleting, remove the last character
      if (isDeleting) {
        setCurrentText(currentWord.substring(0, currentText.length - 1))
        setTypingSpeed(speed / 2) // Faster when deleting
      } else {
        // If typing, add the next character
        setCurrentText(currentWord.substring(0, currentText.length + 1))
        setTypingSpeed(speed)
      }

      // If word is complete and not deleting yet, start deleting after delay
      if (!isDeleting && currentText === currentWord) {
        setTimeout(() => setIsDeleting(true), delay)
      }
      // If word is deleted, move to next word
      else if (isDeleting && currentText === "") {
        setIsDeleting(false)
        setCurrentWordIndex((currentWordIndex + 1) % words.length)
      }
    }, typingSpeed)

    return () => clearTimeout(timer)
  }, [currentText, currentWordIndex, isDeleting, words, speed, delay, typingSpeed])

  return (
    <div className="inline-flex">
      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-lg md:text-xl">
        {currentText}
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8 }}
          className="ml-1 inline-block w-1 h-5 bg-black dark:bg-white"
        />
      </motion.span>
    </div>
  )
}

