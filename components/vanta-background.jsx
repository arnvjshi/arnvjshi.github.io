"use client"

import { useEffect, useState, useRef } from "react"
import WAVES from "vanta/dist/vanta.waves.min"
import * as THREE from "three"

export default function VantaBackground({ children }) {
  const [vantaEffect, setVantaEffect] = useState(null)
  const vantaRef = useRef(null)

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        WAVES({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x10101,
          shininess: 105.0,
          waveHeight: 31.0,
          waveSpeed: 1.05,
          zoom: 0.82,
        }),
      )
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])

  return (
    <div className="relative w-full h-full">
      <div ref={vantaRef} className="absolute inset-0 z-0" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

