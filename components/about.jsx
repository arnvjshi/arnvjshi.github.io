"use client"

import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function About() {
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
    <section id="about" ref={sectionRef} className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="glassmorphic-card-advanced p-8 md:p-12 rounded-2xl"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400"
          >
            About Me
          </motion.h2>

          <div ref={textRef} className="space-y-6">
            <p className="text-lg leading-relaxed">
              I'm <span className="font-semibold">Arnav Joshi</span>, a passionate full-stack developer with a deep
              interest in creating innovative solutions that combine cutting-edge technology with elegant design. My
              journey in software development began with a curiosity about how digital experiences are crafted, and has
              evolved into a professional pursuit of excellence in web development, AI integration, and user experience
              design.
            </p>

            <p className="text-lg leading-relaxed">
              With expertise in <span className="font-semibold">JavaScript, Python</span>, and various modern frameworks
              like <span className="font-semibold">Next.js and React</span>, I build applications that are not only
              functional but also intuitive and engaging. I believe that great software should be both powerful and
              accessible, solving real problems while providing a seamless user experience.
            </p>

            <p className="text-lg leading-relaxed">
              When I'm not coding, you can find me participating in hackathons, contributing to open-source projects, or
              exploring new technologies that push the boundaries of what's possible in software development.
            </p>
          </div>

          <motion.div variants={itemVariants} className="flex justify-center mt-8">
            <motion.a
              href="#contact"
              className="neumorphic-btn-3d px-6 py-3 rounded-lg font-medium inline-block"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(200, 200, 200, 0.2)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

