"use client"

import { motion } from "framer-motion"

export default function BrushStrokes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Top left brush stroke */}
      <motion.div
        className="absolute top-[10%] left-[5%] w-64 h-64 opacity-5 dark:opacity-5"
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        animate={{ opacity: [0, 0.05, 0.03], scale: [0.8, 1.1, 1], rotate: [-10, 0, -5] }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="currentColor"
            d="M42.8,-62.2C54.9,-54.3,63.7,-41.1,69.2,-26.8C74.8,-12.4,77.2,3.2,73.2,17.1C69.3,31,59,43.3,46.5,52.7C34,62.1,19.3,68.6,3.1,66.1C-13,63.6,-26.1,52.1,-38.7,41.1C-51.3,30.1,-63.5,19.6,-68.8,5.6C-74.1,-8.4,-72.5,-25.9,-63.3,-37.5C-54.1,-49.1,-37.3,-54.8,-22.8,-61.5C-8.3,-68.2,4,-75.9,17.5,-75.1C31,-74.3,45.8,-65,42.8,-62.2Z"
            transform="translate(100 100)"
          />
        </svg>
      </motion.div>

      {/* Bottom right brush stroke */}
      <motion.div
        className="absolute bottom-[15%] right-[10%] w-80 h-80 opacity-5 dark:opacity-5"
        initial={{ opacity: 0, scale: 0.8, rotate: 20 }}
        animate={{ opacity: [0, 0.05, 0.03], scale: [0.8, 1.1, 1], rotate: [20, 0, 10] }}
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 1 }}
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="currentColor"
            d="M48.2,-64.8C62.7,-55.5,74.8,-41.8,79.3,-25.9C83.8,-10,80.6,8.1,73.1,23.1C65.6,38.1,53.8,50,40.1,58.4C26.4,66.8,10.7,71.7,-4.3,77.1C-19.3,82.5,-33.6,88.4,-45.5,83.5C-57.4,78.6,-66.9,63,-71.8,46.6C-76.7,30.2,-77,13.1,-74.1,-2.9C-71.2,-18.9,-65.1,-33.8,-54.8,-44.2C-44.5,-54.6,-30,-60.5,-15.2,-69.1C-0.4,-77.7,14.7,-89,30.1,-85.5C45.5,-82,62.2,-63.7,48.2,-64.8Z"
            transform="translate(100 100)"
          />
        </svg>
      </motion.div>

      {/* Middle brush stroke */}
      <motion.div
        className="absolute top-[40%] left-[60%] w-48 h-48 opacity-5 dark:opacity-5"
        initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
        animate={{ opacity: [0, 0.05, 0.03], scale: [0.8, 1, 0.9], rotate: [-15, 5, -5] }}
        transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 2 }}
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="currentColor"
            d="M54.6,-67.1C69.4,-55.7,79.5,-37.6,83.5,-18.1C87.5,1.4,85.4,22.3,75.8,38.5C66.1,54.7,48.9,66.2,30.4,72.1C11.9,78,-7.9,78.3,-25.4,71.9C-42.9,65.5,-58.1,52.4,-67.7,35.8C-77.3,19.2,-81.3,-0.9,-76.9,-18.8C-72.5,-36.7,-59.7,-52.3,-44.5,-63.7C-29.3,-75.1,-11.6,-82.3,4.4,-87.7C20.4,-93.1,40.8,-96.7,54.6,-67.1Z"
            transform="translate(100 100)"
          />
        </svg>
      </motion.div>
    </div>
  )
}

