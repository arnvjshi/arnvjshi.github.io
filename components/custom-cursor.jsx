"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const dotRef = useRef(null)
  const posRef = useRef({ x: 0, y: 0 })
  const isVisible = useRef(false)
  const isHovering = useRef(false)
  const isClicked = useRef(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    
    // Don't show custom cursor on touch devices
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches
    if (isTouchDevice) return

    const cursor = cursorRef.current
    const dot = dotRef.current
    if (!cursor || !dot) return

    const onMouseMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      
      if (!isVisible.current) {
        isVisible.current = true
        gsap.set([cursor, dot], { opacity: 1 })
      }

      gsap.to(dot, {
        x: e.clientX - 4,
        y: e.clientY - 4,
        duration: 0.1,
        ease: "power2.out",
      })

      gsap.to(cursor, {
        x: e.clientX - 20,
        y: e.clientY - 20,
        duration: 0.35,
        ease: "power2.out",
      })
    }

    const onMouseLeave = () => {
      isVisible.current = false
      gsap.to([cursor, dot], { opacity: 0, duration: 0.2 })
    }

    const onMouseEnter = () => {
      isVisible.current = true
      gsap.to([cursor, dot], { opacity: 1, duration: 0.2 })
    }

    const onMouseDown = () => {
      isClicked.current = true
      gsap.to(cursor, { scale: 0.8, duration: 0.15 })
      gsap.to(dot, { scale: 1.5, duration: 0.15 })
    }

    const onMouseUp = () => {
      isClicked.current = false
      gsap.to(cursor, { scale: isHovering.current ? 1.5 : 1, duration: 0.15 })
      gsap.to(dot, { scale: 1, duration: 0.15 })
    }

    // Attach hover listeners using delegation (handles dynamic elements)
    const onHoverStart = (e) => {
      const target = e.target.closest('a, button, [role="button"], input, textarea, select, label[for]')
      if (target) {
        isHovering.current = true
        gsap.to(cursor, { scale: 1.5, borderColor: "rgba(16, 185, 129, 0.5)", duration: 0.3 })
        gsap.to(dot, { scale: 0.5, backgroundColor: "#10b981", duration: 0.3 })
      }
    }

    const onHoverEnd = (e) => {
      const target = e.target.closest('a, button, [role="button"], input, textarea, select, label[for]')
      if (target) {
        isHovering.current = false
        gsap.to(cursor, { scale: 1, borderColor: "rgba(255, 255, 255, 0.5)", duration: 0.3 })
        gsap.to(dot, { scale: 1, backgroundColor: "#ffffff", duration: 0.3 })
      }
    }

    document.addEventListener("mousemove", onMouseMove, { passive: true })
    document.addEventListener("mouseenter", onMouseEnter)
    document.addEventListener("mouseleave", onMouseLeave)
    document.addEventListener("mousedown", onMouseDown)
    document.addEventListener("mouseup", onMouseUp)
    document.addEventListener("mouseover", onHoverStart, { passive: true })
    document.addEventListener("mouseout", onHoverEnd, { passive: true })

    return () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseenter", onMouseEnter)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mouseup", onMouseUp)
      document.removeEventListener("mouseover", onHoverStart)
      document.removeEventListener("mouseout", onHoverEnd)
    }
  }, [])

  return (
    <>
      {/* Outer ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9999] opacity-0"
        style={{
          border: "1.5px solid rgba(255, 255, 255, 0.5)",
          mixBlendMode: "difference",
          willChange: "transform",
        }}
      />
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] opacity-0"
        style={{
          backgroundColor: "#ffffff",
          willChange: "transform",
        }}
      />
    </>
  )
}
