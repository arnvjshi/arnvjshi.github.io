"use client"

import { useEffect, useRef } from "react"

export default function VantaBackground({ children }) {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = canvas.parentElement.offsetWidth
    let height = canvas.parentElement.offsetHeight
    canvas.width = width
    canvas.height = height

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = width + "px"
    canvas.style.height = height + "px"
    ctx.scale(dpr, dpr)

    // Particle system
    const particleCount = Math.min(Math.floor((width * height) / 12000), 120)
    const connectionDistance = 150
    const particles = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      })
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: (e.clientX - rect.left) / width,
        y: (e.clientY - rect.top) / height,
      }
    }

    const handleResize = () => {
      width = canvas.parentElement.offsetWidth
      height = canvas.parentElement.offsetHeight
      const newDpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * newDpr
      canvas.height = height * newDpr
      canvas.style.width = width + "px"
      canvas.style.height = height + "px"
      ctx.scale(newDpr, newDpr)
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      const mx = mouseRef.current.x * width
      const my = mouseRef.current.y * height

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Subtle mouse repulsion
        const dx = p.x - mx
        const dy = p.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 200) {
          const force = (200 - dist) / 200 * 0.015
          p.vx += (dx / dist) * force
          p.vy += (dy / dist) * force
        }

        // Damping
        p.vx *= 0.99
        p.vy *= 0.99

        p.x += p.vx
        p.y += p.vy

        // Wrap around
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 0.6})`
        ctx.fill()

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const cdx = p.x - p2.x
          const cdy = p.y - p2.y
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy)

          if (cdist < connectionDistance) {
            const alpha = (1 - cdist / connectionDistance) * 0.15
            
            // Check if connection is near mouse for emerald glow
            const midX = (p.x + p2.x) / 2
            const midY = (p.y + p2.y) / 2
            const mouseDist = Math.sqrt((midX - mx) ** 2 + (midY - my) ** 2)
            
            if (mouseDist < 180) {
              const glowAlpha = (1 - mouseDist / 180) * 0.3
              ctx.strokeStyle = `rgba(16, 185, 129, ${glowAlpha})`
              ctx.lineWidth = 1.2
            } else {
              ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`
              ctx.lineWidth = 0.6
            }
            
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("resize", handleResize, { passive: true })

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-[-100] opacity-60"
        style={{ pointerEvents: "none" }}
      />
      {children}
    </div>
  )
}
