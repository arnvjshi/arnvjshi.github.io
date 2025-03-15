"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import CustomCursor from "@/components/custom-cursor"
import Navbar from "@/components/navbar"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Experience from "@/components/experience"
import Contact from "@/components/contact"
import LoadingScreen from "@/components/loading-screen"
import { ThemeProvider } from "@/components/theme-provider"
//import FloatingIcons from "@/components/floating-icons"
import VantaBackground from "@/components/vanta-background"
import ParallaxText from "@/components/parallax-text"
//import Typography from "@/components/typography"

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const [loading, setLoading] = useState(true)
  const { scrollYProgress } = useScroll()
  const mainRef = useRef(null)

  // Parallax effect for hero section
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -150])
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  useEffect(() => {
    // Loading screen
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!loading) {
      // GSAP animations for sections
      const sections = document.querySelectorAll("section")

      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          },
        )
      })

      // Animate the progress bar
      gsap.to(".progress-bar", {
        scaleX: 1,
        duration: 1.5,
        ease: "power2.out",
      })
    }
  }, [loading])

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <ThemeProvider defaultTheme="dark" attribute="class">
      <div className="relative min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-black dark:to-gray-900 text-black dark:text-white overflow-hidden">
        <title>Arnav Joshi</title>
        <CustomCursor />
        <Navbar />
  {/* <FloatingIcons /> */}

        {/* Progress bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-500 via-gray-300 to-gray-500 dark:from-gray-700 dark:via-gray-300 dark:to-gray-700 z-50"
          style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
        />

        <main ref={mainRef} className="relative z-10">
          {/* Hero Section */}
          <section id="home" className="min-h-screen relative overflow-hidden">
            <VantaBackground ></VantaBackground>
              <div className="flex items-center justify-center min-h-screen px-4">
                <motion.div className="text-center" style={{ y, opacity }}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <h2 className="text-xl md:text-2xl font-light mb-2 tracking-widest">Hello, I'm</h2>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    <div className="relative mx-auto w-32 h-32 md:w-40 md:h-40 mb-6 overflow-hidden rounded-full neumorphic-profile">
                      <img
                        src="/placeholder.svg?height=160&width=160"
                        alt="Arnav Joshi"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/20 dark:to-white/10"></div>
                    </div>

                    <ParallaxText baseVelocity={-1}>
                      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tighter hero-text">
                        Arnav Joshi
                      </h1>
                    </ParallaxText>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                  >
                    <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
                      Full-stack developer specializing in modern web technologies and AI solutions
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.3 }}
                    className="flex flex-wrap gap-4 justify-center"
                  >
                    <button className="neumorphic-btn-3d px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                      View Projects
                    </button>
                    <button className="glassmorphic-btn-advanced px-6 py-3 rounded-lg font-medium">Contact Me</button>
                  </motion.div>
                </motion.div>
              </div>

              <motion.div
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
              >
                <p className="text-sm mb-2">Scroll Down</p>
                <motion.div
                  className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                >
                  <motion.div
                    className="w-1 h-2 bg-gray-400 dark:bg-gray-600 rounded-full mt-2"
                    animate={{ y: [0, 15, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                  />
                </motion.div>
              </motion.div>
          </section>

          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
      </div>
    </ThemeProvider>
  )
}

