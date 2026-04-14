"use client"

import { useEffect, useRef, useState } from "react"
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
import VantaBackground from "@/components/vanta-background"
import TypewriterEffect from "@/components/typewriter-effect"
import Chatbot from "@/components/chatbot"
import BrushStrokes from "@/components/brush-strokes"
import ProfileSection from "@/components/profile-section"

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState("home")
  const [sceneProgress, setSceneProgress] = useState(0)
  const [isTouch, setIsTouch] = useState(false)
  const [teleportPulse, setTeleportPulse] = useState(0)
  const { scrollYProgress } = useScroll()
  const mainRef = useRef(null)
  const sectionTrackRef = useRef(null)
  const sectionShellRef = useRef(null)
  const sectionScrollStartRef = useRef(0)
  const sectionScrollStepRef = useRef(0)
  const scrollRafRef = useRef(null)

  const y = useTransform(scrollYProgress, [0, 0.5], [0, -150])
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  const sceneSections = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ]

  const clampIndex = (index) => Math.min(sceneSections.length - 1, Math.max(0, index))

  const smoothScrollTo = (targetY, duration = 620) => {
    if (globalThis.window === undefined) return

    if (scrollRafRef.current) {
      globalThis.cancelAnimationFrame(scrollRafRef.current)
    }

    const startY = globalThis.scrollY
    const delta = targetY - startY
    const startTime = performance.now()

    const step = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(1, elapsed / duration)
      const eased = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2

      globalThis.scrollTo(0, startY + delta * eased)

      if (progress < 1) {
        scrollRafRef.current = globalThis.requestAnimationFrame(step)
      }
    }

    scrollRafRef.current = globalThis.requestAnimationFrame(step)
  }

  const scrollToSection = (targetIndex) => {
    const sectionIndex = clampIndex(targetIndex)
    const targetSectionId = sceneSections[sectionIndex].id
    const targetSection = document.getElementById(targetSectionId)
    const targetScroll =
      sectionScrollStepRef.current > 0
        ? sectionScrollStartRef.current + sectionIndex * sectionScrollStepRef.current
        : targetSection?.offsetTop || sectionShellRef.current?.offsetTop || 0

    setTeleportPulse((prev) => prev + 1)
    globalThis.setTimeout(() => {
      smoothScrollTo(targetScroll, isTouch ? 470 : 650)
    }, 90)

    setActiveSection(targetSectionId)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (globalThis.window === undefined) return

    const media = globalThis.matchMedia("(pointer: coarse), (max-width: 900px)")
    const updateTouchMode = () => setIsTouch(media.matches)
    updateTouchMode()
    media.addEventListener("change", updateTouchMode)

    return () => media.removeEventListener("change", updateTouchMode)
  }, [])

  useEffect(() => {
    if (loading || !sectionShellRef.current || !sectionTrackRef.current) {
      return
    }

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray(".scene-panel")
      const totalWidth = Math.max(0, sectionTrackRef.current.scrollWidth - globalThis.innerWidth)
      const sectionCount = Math.max(1, panels.length - 1)
      sectionScrollStartRef.current = sectionShellRef.current.getBoundingClientRect().top + globalThis.scrollY
      sectionScrollStepRef.current = sectionCount > 0 ? totalWidth / sectionCount : totalWidth

      const horizontalTween = gsap.to(sectionTrackRef.current, {
        x: () => -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionShellRef.current,
          start: "top top",
          end: () => `+=${totalWidth}`,
          scrub: 1.1,
          pin: true,
          anticipatePin: 2,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
          snap: {
            snapTo: (value) => Math.round(value * sectionCount) / sectionCount,
            duration: { min: 0.2, max: 0.75 },
            delay: 0.03,
            ease: "power2.inOut",
            directional: true,
          },
          onUpdate: (self) => {
            setSceneProgress(self.progress)
            const activeIndex = clampIndex(Math.round(self.progress * sectionCount))
            setActiveSection(sceneSections[activeIndex].id)
          },
        },
      })

      panels.forEach((panel, index) => {
        const signatures = [
          { from: { y: 22, rotate: -0.6, x: 0 }, to: { y: 0, rotate: 0, x: 0 } },
          { from: { y: 10, rotate: 0.4, x: 24 }, to: { y: 0, rotate: 0, x: 0 } },
          { from: { y: 24, rotate: -0.2, x: -20 }, to: { y: 0, rotate: 0, x: 0 } },
          { from: { y: 14, rotate: 0.7, x: 14 }, to: { y: 0, rotate: 0, x: 0 } },
          { from: { y: 26, rotate: -0.8, x: -12 }, to: { y: 0, rotate: 0, x: 0 } },
          { from: { y: 18, rotate: 0.25, x: 18 }, to: { y: 0, rotate: 0, x: 0 } },
        ]
        const signature = signatures[index % signatures.length]

        gsap.fromTo(
          panel,
          { opacity: 0.4, scale: 0.96 },
          {
            opacity: 1,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: horizontalTween,
              start: `left ${84 - Math.min(index * 4, 20)}%`,
              end: "right 20%",
              toggleActions: "play none none reverse",
            },
          },
        )

        const panelCard = panel.querySelector(".scene-card-shell")
        if (panelCard) {
          gsap.fromTo(
            panelCard,
            { ...signature.from, opacity: 0.75, filter: "blur(2px)" },
            {
              ...signature.to,
              opacity: 1,
              filter: "blur(0px)",
              ease: "power2.out",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: horizontalTween,
                start: `left ${88 - Math.min(index * 3, 18)}%`,
                end: "left 50%",
                scrub: 0.7,
              },
            },
          )
        }
      })
    }, sectionShellRef)

    ScrollTrigger.refresh()

    return () => ctx.revert()
  }, [loading])

  const registerFloating = () => undefined

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <ThemeProvider defaultTheme="dark" attribute="class">
      <title>Arnav Joshi</title>
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <div className="scene-shell relative min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-black dark:to-gray-900 text-black dark:text-white overflow-hidden">
        <motion.div
          key={teleportPulse}
          className="scene-teleport-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.22, 0], scale: [1, 1.02, 1] }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
        <CustomCursor />
        <Navbar activeSection={activeSection} onNavigate={scrollToSection} scrolled={sceneProgress > 0.02} />

        {/* Progress bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-500 via-gray-300 to-gray-500 dark:from-gray-700 dark:via-gray-300 dark:to-gray-700 z-50"
          style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
        />

        <main ref={mainRef} className="relative z-10">
          <div ref={sectionShellRef} className="scene-pin">
            <div ref={sectionTrackRef} className="scene-track">
          <section id="home" className="scene-panel relative">
            <VantaBackground>
              <div className="flex items-center justify-center min-h-screen px-4 relative z-10">
                <motion.div
                  className="scene-note scene-floating scene-card-shell text-center w-full max-w-5xl mx-auto bg-black/10 dark:bg-white/5 backdrop-blur-sm p-8 rounded-xl"
                  style={{ y, opacity }}
                  ref={registerFloating}
                  drag={!isTouch}
                  dragElastic={0.08}
                  dragSnapToOrigin
                  dragMomentum
                  dragTransition={{ power: 0.22, timeConstant: 180, bounceStiffness: 170, bounceDamping: 14 }}
                  whileHover={{ scale: 1.01, rotate: -0.4 }}
                  whileTap={{ scale: 0.99 }}
                  whileDrag={{ rotate: 1.2, scale: 1.01 }}
                >
                  <ProfileSection isTouch={isTouch} />

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="flex flex-col items-center justify-center mt-8"
                  >
                    <div className="h-8 mb-4">
                      <TypewriterEffect
                        words={[
                          "I'm a Web Developer",
                          "I'm an ML Enthusiast",
                          "I'm a Full-Stack Engineer",
                          "I'm a UI/UX Designer",
                          "I'm a Problem Solver",
                        ]}
                        speed={80}
                        delay={2000}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.3 }}
                    className="flex flex-wrap gap-4 justify-center mt-8"
                  >
                    <motion.button
                      onClick={() => scrollToSection(2)}
                      className="neumorphic-btn-3d px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer group relative"
                      drag={!isTouch}
                      dragElastic={0.1}
                      dragMomentum
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="inline-flex items-center gap-2">View Projects</span>
                    </motion.button>
                    <motion.button
                      onClick={() => scrollToSection(5)}
                      className="glassmorphic-btn-advanced px-8 py-3 rounded-lg font-medium cursor-pointer group relative"
                      drag={!isTouch}
                      dragElastic={0.1}
                      dragMomentum
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="inline-flex items-center gap-2">Contact Me</span>
                    </motion.button>
                  </motion.div>

                </motion.div>

                <div className="absolute inset-0 pointer-events-none z-0">
                  {["1", "2", "3", "4", "5"].map((orb) => (
                    <motion.div
                      key={orb}
                      className={`scene-orb orb-${orb} pointer-events-auto`}
                      drag={!isTouch}
                      dragElastic={0.12}
                      dragMomentum
                      dragTransition={{ power: 0.24, timeConstant: 180, bounceStiffness: 170, bounceDamping: 14 }}
                      whileHover={{ scale: 1.1 }}
                      whileDrag={{ scale: 1.14 }}
                    />
                  ))}
                </div>
              </div>
            </VantaBackground>
          </section>

          <section id="about" className="scene-panel relative">
            <BrushStrokes />
            <div className="container mx-auto px-4 h-full flex items-start pt-20 pb-4">
              <motion.div className="scene-note scene-floating scene-card-shell w-full p-4 md:p-6" ref={registerFloating} drag={!isTouch} dragSnapToOrigin dragMomentum dragTransition={{ power: 0.24, timeConstant: 180, bounceStiffness: 170, bounceDamping: 14 }} dragElastic={0.12} whileDrag={{ rotate: -0.6, scale: 1.01 }}>
                <About isTouch={isTouch} onContactClick={() => scrollToSection(5)} />
              </motion.div>
            </div>
          </section>

          <section id="skills" className="scene-panel relative">
            <div className="container mx-auto px-4 h-full flex items-start pt-20 pb-4">
              <motion.div className="scene-note scene-floating scene-card-shell w-full p-4 md:p-6" ref={registerFloating} drag={!isTouch} dragSnapToOrigin dragMomentum dragTransition={{ power: 0.24, timeConstant: 180, bounceStiffness: 170, bounceDamping: 14 }} dragElastic={0.1} whileDrag={{ rotate: 0.6, scale: 1.01 }}>
                <Skills />
              </motion.div>
            </div>
          </section>

          <section id="projects" className="scene-panel relative">
            <div className="container mx-auto px-4 h-full flex items-start pt-20 pb-4">
              <motion.div className="scene-note scene-floating scene-card-shell w-full p-4 md:p-6" ref={registerFloating} drag={!isTouch} dragSnapToOrigin dragMomentum dragTransition={{ power: 0.24, timeConstant: 180, bounceStiffness: 170, bounceDamping: 14 }} dragElastic={0.1} whileDrag={{ rotate: -0.6, scale: 1.01 }}>
                <Projects />
              </motion.div>
            </div>
          </section>

          <section id="experience" className="scene-panel relative">
            <div className="container mx-auto px-4 h-full flex items-start pt-20 pb-4">
              <motion.div className="scene-note scene-floating scene-card-shell w-full p-4 md:p-6" ref={registerFloating} drag={!isTouch} dragSnapToOrigin dragMomentum dragTransition={{ power: 0.24, timeConstant: 180, bounceStiffness: 170, bounceDamping: 14 }} dragElastic={0.1} whileDrag={{ rotate: 0.6, scale: 1.01 }}>
                <Experience />
              </motion.div>
            </div>
          </section>

          <section id="contact" className="scene-panel relative">
            <div className="container mx-auto px-4 h-full flex items-start pt-20 pb-4">
              <motion.div className="scene-note scene-floating scene-card-shell w-full p-4 md:p-6" ref={registerFloating} drag={!isTouch} dragSnapToOrigin dragMomentum dragTransition={{ power: 0.24, timeConstant: 180, bounceStiffness: 170, bounceDamping: 14 }} dragElastic={0.1} whileDrag={{ rotate: -0.6, scale: 1.01 }}>
                <Contact />
              </motion.div>
            </div>
          </section>
            </div>
          </div>
        </main>
        <Chatbot />
      </div>
    </ThemeProvider>
  )
}

