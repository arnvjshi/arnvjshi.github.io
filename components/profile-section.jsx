"use client"

import { motion } from "framer-motion"
import Name3D from "./name-3d"

// eslint-disable-next-line react/prop-types
export default function ProfileSection({ isTouch = false }) {
  return (
    <motion.div className="flex flex-col items-center justify-center" drag={!isTouch} dragElastic={0.08} dragMomentum whileDrag={{ scale: 1.01 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
      </motion.div>
      <br></br>
      <br></br>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="flex flex-col items-center gap-8 max-w-4xl mx-auto"
      >
        <motion.div
          className="relative w-40 h-40 md:w-48 md:h-48 overflow-hidden rounded-full neumorphic-profile shadow-2xl scene-floating"
          drag={!isTouch}
          dragElastic={0.18}
          dragMomentum
          whileHover={{ scale: 1.02 }}
          whileDrag={{ rotate: -2, scale: 1.04 }}
        >
          <img src="/arnav.png?height=200&width=200" alt="Arnav Joshi" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/20 dark:to-white/10"></div>
        </motion.div>

        <div className="flex flex-col items-center">
          <motion.div drag={!isTouch} dragElastic={0.08} dragMomentum whileDrag={{ rotate: 1, scale: 1.02 }}>
            <Name3D />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-4"
            drag={!isTouch}
            dragElastic={0.1}
            dragMomentum
            whileDrag={{ rotate: -0.4, scale: 1.01 }}
          >
            {/*<div className="h-8 mb-4 flex justify-center">
              <span className="text-lg md:text-xl font-medium text-white dark:text-white">
                Full-Stack Developer & ML Enthusiast
              </span>
            </div>*/}
            <p className="text-base md:text-lg max-w-xl text-center text-white dark:text-white">
              I'm a passionate developer with expertise in modern web technologies and AI solutions. I create intuitive,
              responsive applications that solve real-world problems with clean, efficient code and thoughtful design.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

