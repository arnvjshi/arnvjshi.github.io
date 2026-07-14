"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// eslint-disable-next-line react/prop-types
export default function MarqueeText({ text = "DESIGN · DEVELOP · DEPLOY", direction = "left", speed = 1 }) {
  const containerRef = useRef(null)
  const track1Ref = useRef(null)
  const track2Ref = useRef(null)

  useEffect(() => {
    if (!containerRef.current || !track1Ref.current || !track2Ref.current) return

    const ctx = gsap.context(() => {
      const xPercent = direction === "left" ? -100 : 100
      const xStart = direction === "left" ? 0 : -100

      gsap.set([track1Ref.current, track2Ref.current], { xPercent: xStart })

      const tl = gsap.timeline({ repeat: -1 })
      tl.to([track1Ref.current, track2Ref.current], {
        xPercent: xPercent,
        duration: 40 / speed,
        ease: "none",
      })

      // Speed up on scroll
      gsap.to(tl, {
        timeScale: 3,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
          onLeave: () => gsap.to(tl, { timeScale: 1, duration: 0.5 }),
          onEnterBack: () => gsap.to(tl, { timeScale: 3, duration: 0.5 }),
          onLeaveBack: () => gsap.to(tl, { timeScale: 1, duration: 0.5 }),
          onEnter: () => gsap.to(tl, { timeScale: 3, duration: 0.5 }),
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [direction, speed])

  const repeatedText = `${text} · `.repeat(6)

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden py-8 md:py-12 select-none"
    >
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      
      <div className="flex whitespace-nowrap">
        <div
          ref={track1Ref}
          className="flex-shrink-0 text-[4rem] md:text-[6rem] lg:text-[8rem] font-black tracking-[-0.04em] leading-none"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            WebkitTextStroke: "1px rgba(255,255,255,0.06)",
            WebkitTextFillColor: "transparent",
          }}
        >
          {repeatedText}
        </div>
        <div
          ref={track2Ref}
          className="flex-shrink-0 text-[4rem] md:text-[6rem] lg:text-[8rem] font-black tracking-[-0.04em] leading-none"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            WebkitTextStroke: "1px rgba(255,255,255,0.06)",
            WebkitTextFillColor: "transparent",
          }}
        >
          {repeatedText}
        </div>
      </div>
    </div>
  )
}
