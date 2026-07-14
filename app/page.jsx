"use client"

import { useEffect, useState, useRef } from "react"
import dynamic from "next/dynamic"
import { motion, useScroll, useSpring } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import CustomCursor from "@/components/custom-cursor"
import Navbar from "@/components/navbar"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Experience from "@/components/experience"
import Certifications from "@/components/certifications"
import Contact from "@/components/contact"
import LoadingScreen from "@/components/loading-screen"
import TypewriterEffect from "@/components/typewriter-effect"
import Chatbot from "@/components/chatbot"
import MarqueeText from "@/components/marquee-text"
import MagneticButton from "@/components/magnetic-button"

// Dynamic import Three.js hero (SSR-unsafe)
const ThreeHero = dynamic(() => import("@/components/three-hero"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#0a0a0a]" />,
})

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState("home")
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const mainRef = useRef(null)

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const sceneSections = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "certifications", label: "Certifications" },
    { id: "contact", label: "Contact" },
  ]

  const scrollToSection = (index) => {
    const section = document.getElementById(sceneSections[index].id)
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth"
      })
      setActiveSection(sceneSections[index].id)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2800)
    return () => clearTimeout(timer)
  }, [])

  // GSAP cinematic animations
  useEffect(() => {
    if (loading || !mainRef.current) return

    const ctx = gsap.context(() => {
      // Hero parallax depth
      gsap.to(".hero-parallax", {
        yPercent: 40,
        ease: "none",
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      })

      // Hero content fade + scale on scroll
      gsap.to(".hero-content", {
        opacity: 0,
        scale: 0.95,
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: "#home",
          start: "30% top",
          end: "bottom top",
          scrub: true,
        }
      })

      // Reveal each section with a clip-path wipe
      const sections = mainRef.current.querySelectorAll(".reveal-section")
      sections.forEach((section) => {
        gsap.from(section, {
          clipPath: "inset(10% 0% 10% 0%)",
          opacity: 0.3,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "top 40%",
            scrub: 1,
          }
        })
      })

      // Floating ambient orbs parallax
      const orbs = document.querySelectorAll(".ambient-orb")
      orbs.forEach((orb, i) => {
        gsap.to(orb, {
          y: (i % 2 === 0 ? -120 : 120),
          ease: "none",
          scrollTrigger: {
            trigger: orb.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        })
      })
    }, mainRef)

    return () => ctx.revert()
  }, [loading])

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = sceneSections.map(s => document.getElementById(s.id))
      const scrollPosition = window.scrollY + window.innerHeight / 3

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          if (activeSection !== sceneSections[i].id) {
            setActiveSection(sceneSections[i].id)
          }
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [activeSection])

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white noise-overlay">
      <CustomCursor />
      
      <Navbar 
        activeSection={activeSection} 
        onNavigate={scrollToSection} 
        scrolled={scrolled} 
      />

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-50"
        style={{
          scaleX,
          transformOrigin: "0%",
          background: "linear-gradient(90deg, #10b981, #34d399, #06b6d4)",
        }}
      />

      <main ref={mainRef} className="relative z-10 w-full overflow-x-hidden">
        
        {/* ═══════════════════════════════════════
            HERO SECTION
            ═══════════════════════════════════════ */}
        <section id="home" className="relative min-h-[100dvh] flex items-center justify-center pt-32 pb-10">
          {/* 3D Background */}
          <div className="absolute inset-0 z-0 hero-parallax">
            <ThreeHero />
          </div>
          
          {/* Grid overlay */}
          <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none z-[1]" />

          {/* Gradient vignette */}
          <div className="absolute inset-0 z-[2] pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, transparent 0%, rgba(10,10,10,0.4) 70%, rgba(10,10,10,0.9) 100%)"
            }}
          />

          {/* Hero content */}
          <div className="hero-content relative z-10 w-full px-4 md:px-12 flex flex-col items-center justify-center min-h-[100dvh]">
            
            {/* Profile photo with glow ring */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-20 mb-8 mt-12 md:mt-0"
            >
              <div className="relative">
                {/* Glow ring */}
                <div className="absolute -inset-1 rounded-full opacity-40 blur-md"
                  style={{ background: "linear-gradient(135deg, #10b981, #06b6d4)" }}
                />
                <div className="relative w-24 h-24 md:w-32 md:h-32 overflow-hidden rounded-full border-2 border-white/10 shadow-2xl">
                  <img
                    src="/arnav.png?height=200&width=200"
                    alt="Arnav Joshi"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-emerald-900/20" />
                </div>
              </div>
            </motion.div>

            {/* Name — massive typography */}
            <motion.div 
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="w-full text-center relative z-10 pointer-events-none mb-2"
            >
              <h1 
                className="font-black tracking-tighter leading-[0.85]" 
                style={{ 
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(3rem, 11vw, 10rem)",
                  background: "linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.5) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ARNAV
                <br />
                JOSHI
              </h1>
            </motion.div>

            {/* Subtitle area */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="mt-4 mb-10 flex flex-col items-center"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-emerald-500/50" />
                <div className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs md:text-sm tracking-[0.2em] uppercase shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                  Software Engineer
                </div>
                <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-emerald-500/50" />
              </div>
              <div className="h-8 md:h-10 text-lg md:text-2xl font-medium tracking-wide text-white/60">
                <TypewriterEffect
                  words={[
                    "Backend Developer",
                    "Full-Stack Builder",
                    "Cloud & DevOps",
                    "AI/ML Practitioner",
                  ]}
                  speed={80}
                  delay={2000}
                />
              </div>
            </motion.div>

            {/* CTA Buttons — magnetic */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-wrap gap-5 justify-center"
            >
              <MagneticButton
                onClick={() => scrollToSection(3)}
                className="btn-accent px-8 py-4 rounded-full font-medium text-sm uppercase tracking-wider"
              >
                View Projects
              </MagneticButton>
              <MagneticButton
                onClick={() => scrollToSection(6)}
                className="glass-btn px-8 py-4 rounded-full font-medium text-sm uppercase tracking-wider"
              >
                Contact Me
              </MagneticButton>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/20">Scroll</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="w-[1px] h-8 bg-gradient-to-b from-white/20 to-transparent"
              />
            </motion.div>
          </div>
        </section>

        {/* ═══ MARQUEE DIVIDER ═══ */}
        <MarqueeText text="DESIGN · DEVELOP · DEPLOY · ITERATE" direction="left" />

        {/* ═══════════════════════════════════════
            ABOUT SECTION
            ═══════════════════════════════════════ */}
        <section id="about" className="relative py-24 md:py-32 min-h-screen flex items-center">
          {/* Ambient orb */}
          <div className="ambient-orb absolute top-20 -left-20 w-[500px] h-[500px] rounded-full opacity-[0.03] pointer-events-none"
            style={{ background: "radial-gradient(circle, #10b981, transparent 70%)" }}
          />
          <div className="w-full relative z-10 reveal-section">
             <About onContactClick={() => scrollToSection(6)} />
          </div>
        </section>

        {/* ═══ MARQUEE DIVIDER ═══ */}
        <MarqueeText text="JAVASCRIPT · PYTHON · REACT · NEXTJS · AWS · DOCKER · TENSORFLOW" direction="right" speed={0.8} />

        {/* ═══════════════════════════════════════
            SKILLS SECTION
            ═══════════════════════════════════════ */}
        <section id="skills" className="relative py-24 md:py-32 min-h-screen flex items-center">
          <div className="ambient-orb absolute -right-20 top-1/2 w-[400px] h-[400px] rounded-full opacity-[0.03] pointer-events-none"
            style={{ background: "radial-gradient(circle, #06b6d4, transparent 70%)" }}
          />
          <div className="w-full reveal-section">
            <Skills />
          </div>
        </section>

        {/* ═══ MARQUEE DIVIDER ═══ */}
        <MarqueeText text="THREATDETECT · EDUBOT · CLIPMIND · MISINFORMATION AGENT" direction="left" speed={1.2} />

        {/* ═══════════════════════════════════════
            PROJECTS SECTION
            ═══════════════════════════════════════ */}
        <section id="projects" className="relative py-24 md:py-32 min-h-screen flex items-center">
          <div className="ambient-orb absolute -left-32 bottom-20 w-[600px] h-[600px] rounded-full opacity-[0.02] pointer-events-none"
            style={{ background: "radial-gradient(circle, #10b981, transparent 70%)" }}
          />
          <div className="w-full reveal-section">
             <Projects />
          </div>
        </section>

        {/* ═══ MARQUEE DIVIDER ═══ */}
        <MarqueeText text="BUILD · SHIP · SCALE · OPTIMIZE · REPEAT" direction="right" />

        {/* ═══════════════════════════════════════
            EXPERIENCE SECTION
            ═══════════════════════════════════════ */}
        <section id="experience" className="relative py-24 md:py-32 min-h-screen flex items-center">
          <div className="ambient-orb absolute right-0 top-32 w-[500px] h-[500px] rounded-full opacity-[0.025] pointer-events-none"
            style={{ background: "radial-gradient(circle, #06b6d4, transparent 70%)" }}
          />
          <div className="w-full reveal-section">
             <Experience />
          </div>
        </section>

        {/* ═══════════════════════════════════════
            CERTIFICATIONS SECTION
            ═══════════════════════════════════════ */}
        <section id="certifications" className="relative py-24 md:py-32 min-h-screen flex items-center">
          <div className="ambient-orb absolute -left-20 bottom-40 w-[400px] h-[400px] rounded-full opacity-[0.03] pointer-events-none"
            style={{ background: "radial-gradient(circle, #10b981, transparent 70%)" }}
          />
          <div className="w-full reveal-section">
             <Certifications />
          </div>
        </section>

        {/* ═══ MARQUEE DIVIDER ═══ */}
        <MarqueeText text="LET'S CONNECT · LET'S BUILD · LET'S CREATE" direction="left" speed={0.6} />

        {/* ═══════════════════════════════════════
            CONTACT SECTION
            ═══════════════════════════════════════ */}
        <section id="contact" className="relative py-24 md:py-32 min-h-screen flex items-center">
          <div className="ambient-orb absolute right-10 top-20 w-[500px] h-[500px] rounded-full opacity-[0.025] pointer-events-none"
            style={{ background: "radial-gradient(circle, #10b981, transparent 70%)" }}
          />
          <div className="w-full reveal-section">
             <Contact />
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer className="relative py-12 border-t border-white/[0.04]">
          <div className="container mx-auto px-4 flex flex-col items-center gap-4">
            <div className="text-2xl font-bold tracking-[-0.03em]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              arnav<span className="text-emerald-400">.</span>
            </div>
            <p className="text-xs text-white/20 tracking-[0.15em] uppercase">
              © {new Date().getFullYear()} Arnav Joshi · Built with Next.js & Three.js
            </p>
          </div>
        </footer>

      </main>
      <Chatbot />
    </div>
  )
}
