"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import Name3D from "./name-3d"

// eslint-disable-next-line react/prop-types
export default function ProfileSection({ isTouch = false }) {
  const bioRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Profile image entrance
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          scale: 0.8,
          opacity: 0,
          rotation: -5,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.6,
        })
      }

      // Bio text line-by-line reveal
      if (bioRef.current) {
        gsap.from(bioRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 1.2,
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <motion.div
      className="flex flex-col items-center justify-center"
      drag={!isTouch}
      dragElastic={0.08}
      dragMomentum
      whileDrag={{ scale: 1.01 }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="flex flex-col items-center gap-6 max-w-4xl mx-auto mt-8"
      >
        {/* Profile Image */}
        <div ref={imageRef}>
          <motion.div
            className="relative w-36 h-36 md:w-44 md:h-44 overflow-hidden rounded-full neumorphic-profile shadow-2xl"
            drag={!isTouch}
            dragElastic={0.18}
            dragMomentum
            whileHover={{ scale: 1.03 }}
            whileDrag={{ rotate: -2, scale: 1.04 }}
          >
            <img
              src="/arnav.png?height=200&width=200"
              alt="Arnav Joshi"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-emerald-500/10" />
            {/* Ring accent */}
            <div className="absolute inset-0 rounded-full border-2 border-emerald-500/20" />
          </motion.div>
        </div>

        {/* Name */}
        <div className="flex flex-col items-center">
          <motion.div
            drag={!isTouch}
            dragElastic={0.08}
            dragMomentum
            whileDrag={{ rotate: 1, scale: 1.02 }}
          >
            <Name3D />
          </motion.div>

          {/* Subtitle badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-3 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs md:text-sm tracking-[0.15em] uppercase"
          >
            Software Engineer
          </motion.div>

          {/* Bio */}
          <motion.div
            ref={bioRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-5"
            drag={!isTouch}
            dragElastic={0.1}
            dragMomentum
            whileDrag={{ rotate: -0.4, scale: 1.01 }}
          >
            <p className="text-sm md:text-base max-w-xl text-center text-white/70 dark:text-white/70 leading-relaxed">
              Software engineer focused on building scalable backend systems, low-latency APIs, 
              and secure applications. Experienced with cloud platforms, CI/CD automation, 
              and distributed systems using AWS and Azure.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
