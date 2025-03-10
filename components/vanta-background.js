"use client"
import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

const VantaBackground = () => {
  const [vantaEffect, setVantaEffect] = useState(null)
  const vantaRef = useRef(null)

  useEffect(() => {
    if (!vantaEffect && typeof window !== "undefined") {
      // Dynamically import Vanta.js
      import("vanta/dist/vanta.net.min").then((VANTA) => {
        const effect = VANTA.default({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x8250ff, // Primary color
          backgroundColor: 0x000000,
          points: 12,
          maxDistance: 25.0,
          spacing: 16.0,
          showDots: false,
        })
        setVantaEffect(effect)
      })
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])

  return <div ref={vantaRef} className="vanta-canvas" />
}

export default VantaBackground

