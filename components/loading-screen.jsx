"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const containerRef = useRef(null)
  const nameRef = useRef(null)
  const barFillRef = useRef(null)
  const progressTextRef = useRef(null)
  const gridRef = useRef(null)
  const subtitleRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate grid background
      if (gridRef.current) {
        gsap.fromTo(gridRef.current, 
          { opacity: 0 },
          { opacity: 0.4, duration: 1.5, ease: "power2.out" }
        )
      }

      // Split name into letters and animate
      if (nameRef.current) {
        const name = "ARNAV JOSHI"
        nameRef.current.innerHTML = ""

        name.split("").forEach((char) => {
          const span = document.createElement("span")
          span.textContent = char === " " ? "\u00A0" : char
          span.style.display = "inline-block"
          span.style.willChange = "transform, opacity"
          nameRef.current.appendChild(span)
        })

        const letters = nameRef.current.querySelectorAll("span")

        gsap.from(letters, {
          y: () => gsap.utils.random(-80, 80),
          x: () => gsap.utils.random(-50, 50),
          rotation: () => gsap.utils.random(-45, 45),
          opacity: 0,
          filter: "blur(8px)",
          duration: 1,
          stagger: 0.06,
          ease: "power3.out",
          delay: 0.2,
        })
      }

      // Subtitle fade in
      if (subtitleRef.current) {
        gsap.from(subtitleRef.current, {
          opacity: 0,
          y: 10,
          duration: 0.6,
          delay: 1,
          ease: "power2.out",
        })
      }

      // Animate progress bar
      const progressObj = { val: 0 }
      gsap.to(progressObj, {
        val: 100,
        duration: 2,
        ease: "power4.inOut",
        onUpdate: () => {
          const v = Math.round(progressObj.val)
          setProgress(v)
          if (barFillRef.current) {
            barFillRef.current.style.width = `${v}%`
          }
        },
        onComplete: () => {
          // Wipe away animation
          if (containerRef.current) {
            gsap.to(containerRef.current, {
              clipPath: "inset(0 0 100% 0)",
              duration: 0.7,
              ease: "power3.inOut",
              delay: 0.3,
            })
          }
        },
      })

      // Progress text entrance
      if (progressTextRef.current) {
        gsap.from(progressTextRef.current, {
          opacity: 0,
          y: 10,
          duration: 0.5,
          delay: 0.5,
          ease: "power2.out",
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-[#0a0a0a] flex flex-col items-center justify-center z-50"
      style={{ clipPath: "inset(0 0 0 0)" }}
    >
      {/* Grid background */}
      <div
        ref={gridRef}
        className="absolute inset-0 opacity-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)",
        }}
      />

      {/* Name */}
      <div className="mb-4 relative z-10">
        <h1
          ref={nameRef}
          className="text-5xl md:text-7xl font-bold tracking-[-0.04em] text-white"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          ARNAV JOSHI
        </h1>
      </div>

      {/* Subtitle */}
      <p
        ref={subtitleRef}
        className="text-xs tracking-[0.3em] uppercase text-emerald-400/60 mb-12"
      >
        Software Engineer
      </p>

      {/* Progress bar */}
      <div className="relative z-10 w-64 md:w-80">
        <div className="w-full h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
          <div
            ref={barFillRef}
            className="h-full rounded-full"
            style={{
              width: "0%",
              background: "linear-gradient(90deg, #10b981, #34d399)",
              boxShadow: "0 0 10px rgba(16, 185, 129, 0.3)",
            }}
          />
        </div>

        <p
          ref={progressTextRef}
          className="mt-4 text-xs tracking-[0.25em] uppercase text-white/40 text-center tabular-nums"
          style={{ fontFamily: "'Space Grotesk', monospace" }}
        >
          {progress}%
        </p>
      </div>
    </div>
  )
}
