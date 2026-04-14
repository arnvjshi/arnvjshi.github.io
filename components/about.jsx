"use client"

import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// eslint-disable-next-line react/prop-types
export default function About({ isTouch = false, onContactClick = () => {} }) {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })

  useEffect(() => {
    if (textRef.current) {
      const textElement = textRef.current

      gsap.fromTo(
        textElement.querySelectorAll("p"),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          scrollTrigger: {
            trigger: textElement,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div ref={sectionRef} className="w-full py-1 px-0">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="glassmorphic-card-advanced p-6 md:p-10 rounded-2xl overflow-hidden"
          drag={!isTouch}
          dragElastic={0.12}
          dragMomentum
          whileDrag={{ scale: 1.004, rotate: -0.25 }}
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100"
            drag={!isTouch}
            dragElastic={0.08}
            dragMomentum
            whileDrag={{ rotate: -1, scale: 1.02 }}
          >
            About Me
          </motion.h2>

          <div ref={textRef} className="space-y-6 relative">
            <motion.p className="text-lg leading-relaxed" drag={!isTouch} dragElastic={0.08} dragMomentum whileDrag={{ rotate: -0.35, scale: 1.01 }}>
              I'm <span className="font-semibold">Arnav Joshi</span>, a passionate full-stack developer with a deep
              interest in creating innovative solutions that combine cutting-edge technology with elegant design. My
              journey in software development began with a curiosity about how digital experiences are crafted, and has
              evolved into a professional pursuit of excellence in web development, AI integration, and user experience
              design.
            </motion.p>

            <motion.p className="text-lg leading-relaxed" drag={!isTouch} dragElastic={0.08} dragMomentum whileDrag={{ rotate: 0.35, scale: 1.01 }}>
              With expertise in <span className="font-semibold">JavaScript, Python</span>, and various modern frameworks
              like <span className="font-semibold">Next.js and React</span>, I build applications that are not only
              functional but also intuitive and engaging. I believe that great software should be both powerful and
              accessible, solving real problems while providing a seamless user experience.
            </motion.p>

            <motion.p className="text-lg leading-relaxed" drag={!isTouch} dragElastic={0.08} dragMomentum whileDrag={{ rotate: -0.2, scale: 1.01 }}>
              When I'm not coding, you can find me participating in hackathons, contributing to open-source projects, or
              exploring new technologies that push the boundaries of what's possible in software development.
            </motion.p>
          </div>

          <motion.div variants={itemVariants} className="flex justify-center mt-8">
            <motion.button
              type="button"
              onClick={onContactClick}
              className="neumorphic-btn-3d px-6 py-3 rounded-lg font-medium inline-block"
              drag={!isTouch}
              dragElastic={0.14}
              dragMomentum
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(200, 200, 200, 0.2)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

