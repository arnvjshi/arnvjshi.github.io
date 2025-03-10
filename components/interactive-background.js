"use client"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

const InteractiveBackground = () => {
  const canvasRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const particlesRef = useRef([])
  const animationRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)

  const getComputedRGB = (cssVar) => {
    if (typeof window === "undefined") return "0, 0, 0";
    return getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim() || "0, 0, 0";
  }

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current
        const width = window.innerWidth
        const height = window.innerHeight
        canvas.width = width
        canvas.height = height
        setDimensions({ width, height })

        const particleCount = Math.floor((width * height) / 15000)
        const particles = []

        for (let i = 0; i < particleCount; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 3 + 1,
            speedX: Math.random() * 0.5 - 0.25,
            speedY: Math.random() * 0.5 - 0.25,
            color: getComputedRGB("--primary"),
            opacity: Math.random() * 0.5 + 0.1,
            pulse: Math.random() * 0.02 + 0.01,
            pulseDirection: Math.random() > 0.5 ? 1 : -1,
          })
        }
        particlesRef.current = particles
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY })
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    if (!canvasRef.current || particlesRef.current.length === 0) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const primaryRGB = getComputedRGB("--primary")

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      particlesRef.current.forEach((particle) => {
        particle.x += particle.speedX
        particle.y += particle.speedY
        if (particle.x < 0) particle.x = dimensions.width
        if (particle.x > dimensions.width) particle.x = 0
        if (particle.y < 0) particle.y = dimensions.height
        if (particle.y > dimensions.height) particle.y = 0

        particle.size += particle.pulse * particle.pulseDirection
        if (particle.size > 4 || particle.size < 1) particle.pulseDirection *= -1

        const dx = mousePosition.x - particle.x
        const dy = mousePosition.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const mouseRadius = 150

        if (distance < mouseRadius) {
          const force = (mouseRadius - distance) / mouseRadius
          particle.x -= Math.cos(Math.atan2(dy, dx)) * force * 2
          particle.y -= Math.sin(Math.atan2(dy, dx)) * force * 2
          particle.currentOpacity = particle.opacity + 0.3 * force
        } else {
          particle.currentOpacity = particle.opacity
        }

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${particle.color}, ${particle.currentOpacity})`
        ctx.fill()
      })

      ctx.lineWidth = 0.5
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i]
          const p2 = particlesRef.current[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y)
            gradient.addColorStop(0, `rgba(${primaryRGB}, ${0.1 * (1 - distance / 100)})`)
            gradient.addColorStop(1, `rgba(${primaryRGB}, ${0.1 * (1 - distance / 100)})`)
            ctx.strokeStyle = gradient
            ctx.stroke()
          }
        }
      }
      animationRef.current = requestAnimationFrame(animate)
    }
    animate()
    setIsLoaded(true)
    return () => cancelAnimationFrame(animationRef.current)
  }, [dimensions, mousePosition])

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 0.6 : 0 }}
      transition={{ duration: 1 }}
      className="interactive-bg"
    />
  )
}

export default InteractiveBackground
