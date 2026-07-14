"use client"

import { useState, useEffect, useCallback } from "react"

// eslint-disable-next-line react/prop-types
export default function TypewriterEffect({ words = [], speed = 80, delay = 2000 }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  const typeEffect = useCallback(() => {
    const currentWord = words[currentWordIndex]

    if (!isDeleting) {
      setCurrentText(currentWord.substring(0, currentText.length + 1))

      if (currentText === currentWord) {
        setTimeout(() => setIsDeleting(true), delay)
        return
      }
    } else {
      setCurrentText(currentWord.substring(0, currentText.length - 1))

      if (currentText === "") {
        setIsDeleting(false)
        setCurrentWordIndex((prev) => (prev + 1) % words.length)
        return
      }
    }
  }, [currentText, currentWordIndex, isDeleting, words, delay])

  useEffect(() => {
    const timer = setTimeout(typeEffect, isDeleting ? speed / 2 : speed)
    return () => clearTimeout(timer)
  }, [typeEffect, isDeleting, speed])

  return (
    <span className="text-lg md:text-xl font-medium tracking-tight">
      <span className="text-white/90">{currentText}</span>
      <span className="typewriter-cursor" />
    </span>
  )
}
