"use client"

import { useEffect, useState, useRef } from "react"
import NET from "vanta/dist/vanta.net.min"
import * as THREE from "three"

export default function VantaBackground({ children }) {
  const [vantaEffect, setVantaEffect] = useState(null)
  const vantaRef = useRef(null)

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x3f3f3f,
          backgroundColor: 0x0,
          points: 10,
          maxDistance: 25.0,
          spacing: 15.0,
        }),
      )
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])

  return (
    <div className="absolute inset-0 w-full h-full">
      <div ref={vantaRef} className="absolute inset-0 w-full h-full z-[-100] opacity-50" />
      {children}
    </div>
  )
}

