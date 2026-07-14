"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"

// eslint-disable-next-line react/prop-types
export default function TiltCard({ children, className = "", glowColor = "16, 185, 129" }) {
  const cardRef = useRef(null)
  const glowRef = useRef(null)

  useEffect(() => {
    if (!cardRef.current || typeof window === "undefined") return
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches
    if (isTouchDevice) return

    const card = cardRef.current

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height

      const tiltX = (y - 0.5) * -8
      const tiltY = (x - 0.5) * 8

      gsap.to(card, {
        rotateX: tiltX,
        rotateY: tiltY,
        duration: 0.4,
        ease: "power2.out",
        transformPerspective: 1000,
      })

      // Move glow to follow cursor
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          left: `${x * 100}%`,
          top: `${y * 100}%`,
          opacity: 1,
          duration: 0.3,
        })
      }
    }

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.5)",
      })

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          opacity: 0,
          duration: 0.4,
        })
      }
    }

    card.addEventListener("mousemove", handleMouseMove)
    card.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      card.removeEventListener("mousemove", handleMouseMove)
      card.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [glowColor])

  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      style={{ willChange: "transform", transformStyle: "preserve-3d" }}
    >
      {/* Cursor-following glow */}
      <div
        ref={glowRef}
        className="absolute w-60 h-60 rounded-full pointer-events-none opacity-0 -translate-x-1/2 -translate-y-1/2 z-0"
        style={{
          background: `radial-gradient(circle, rgba(${glowColor}, 0.12) 0%, transparent 70%)`,
          filter: "blur(30px)",
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
