"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"

// eslint-disable-next-line react/prop-types
export default function MagneticButton({ children, className = "", onClick, strength = 0.3, as: Component = "button", ...props }) {
  const btnRef = useRef(null)
  const innerRef = useRef(null)

  useEffect(() => {
    if (!btnRef.current || typeof window === "undefined") return
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches
    if (isTouchDevice) return

    const btn = btnRef.current
    const inner = innerRef.current

    const handleMouseMove = (e) => {
      const rect = btn.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      gsap.to(btn, {
        x: x * strength,
        y: y * strength,
        duration: 0.4,
        ease: "power2.out",
      })

      if (inner) {
        gsap.to(inner, {
          x: x * strength * 0.5,
          y: y * strength * 0.5,
          duration: 0.4,
          ease: "power2.out",
        })
      }
    }

    const handleMouseLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.3)",
      })

      if (inner) {
        gsap.to(inner, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.3)",
        })
      }
    }

    btn.addEventListener("mousemove", handleMouseMove)
    btn.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      btn.removeEventListener("mousemove", handleMouseMove)
      btn.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [strength])

  return (
    <Component
      ref={btnRef}
      onClick={onClick}
      className={`relative ${className}`}
      style={{ willChange: "transform" }}
      {...props}
    >
      <span ref={innerRef} className="block w-full h-full" style={{ willChange: "transform" }}>
        {children}
      </span>
    </Component>
  )
}
