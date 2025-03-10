"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const SplineBackground = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Load Spline script dynamically
    const script = document.createElement("script")
    script.src = "https://unpkg.com/@splinetool/viewer@0.9.369/build/spline-viewer.js"
    script.type = "module"
    script.onload = () => setIsLoaded(true)
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div className="spline-container">
      {isLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{ width: "100%", height: "100%" }}
        >
          <spline-viewer
            url="https://prod.spline.design/OU9cEZYuMYsRMKFy/scene.splinecode"
            loading-anim-type="spinner-large"
            style={{ width: "100%", height: "100%" }}
          ></spline-viewer>
        </motion.div>
      )}
    </div>
  )
}

export default SplineBackground

