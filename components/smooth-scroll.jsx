"use client"

import { useEffect, useRef } from "react"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null)
  const rafCallbackRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current = lenis

    // Sync GSAP ScrollTrigger with Lenis
    lenis.on("scroll", ScrollTrigger.update)

    // Store the callback ref so we can remove the exact same function
    rafCallbackRef.current = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(rafCallbackRef.current)
    gsap.ticker.lagSmoothing(0)

    return () => {
      if (rafCallbackRef.current) {
        gsap.ticker.remove(rafCallbackRef.current)
      }
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
