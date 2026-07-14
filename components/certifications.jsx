"use client"

import { useRef, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Award, Code, GitBranch, Trophy, Cloud, Shield, Eye, Terminal } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import TiltCard from "@/components/tilt-card"
import MagneticButton from "@/components/magnetic-button"

gsap.registerPlugin(ScrollTrigger)

export default function Certifications() {
  const sectionRef = useRef(null)
  const cardsRef = useRef(null)
  const [isExpanded, setIsExpanded] = useState(false)

  const certifications = [
    {
      title: "Cloud Architecting",
      issuer: "AWS Academy",
      detail: "",
      date: "",
      icon: <Cloud className="w-6 h-6" />,
      gradient: "from-orange-500 to-yellow-500"
    },
    {
      title: "Data Engineering",
      issuer: "AWS Academy",
      detail: "",
      date: "",
      icon: <Terminal className="w-6 h-6" />,
      gradient: "from-orange-500 to-amber-500"
    },
    {
      title: "Computer Vision and Image Processing",
      issuer: "IBM / Coursera",
      detail: "",
      date: "",
      icon: <Eye className="w-6 h-6" />,
      gradient: "from-blue-600 to-cyan-500"
    },
    {
      title: "Cybersecurity Architecture",
      issuer: "IBM / Coursera",
      detail: "",
      date: "",
      icon: <Shield className="w-6 h-6" />,
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      title: "Industrial Cybersecurity",
      issuer: "Cisco Networking Academy",
      detail: "",
      date: "",
      icon: <Shield className="w-6 h-6" />,
      gradient: "from-cyan-500 to-teal-500"
    },
    {
      title: "Networking Devices",
      issuer: "Cisco Networking Academy",
      detail: "",
      date: "",
      icon: <Cloud className="w-6 h-6" />,
      gradient: "from-teal-500 to-emerald-500"
    },
    {
      title: "Network Support and Security",
      issuer: "Cisco Networking Academy",
      detail: "",
      date: "",
      icon: <Shield className="w-6 h-6" />,
      gradient: "from-emerald-500 to-cyan-500"
    },
    {
      title: "Node.js and Express",
      issuer: "IBM / Coursera",
      detail: "",
      date: "",
      icon: <Code className="w-6 h-6" />,
      gradient: "from-green-500 to-emerald-600"
    },
    {
      title: "Python",
      issuer: "Google / Coursera",
      detail: "",
      date: "",
      icon: <Code className="w-6 h-6" />,
      gradient: "from-yellow-400 to-blue-500"
    },
    {
      title: "React Basics",
      issuer: "Meta / Coursera",
      detail: "",
      date: "",
      icon: <Code className="w-6 h-6" />,
      gradient: "from-cyan-400 to-blue-500"
    }
  ]

  const achievements = [
    {
      title: "10+ Professional Certifications",
      description: "Earned industry-recognized certifications from AWS, IBM, Cisco, Google, and Meta.",
      icon: <Award className="w-8 h-8" />,
      color: "emerald"
    },
    {
      title: "400+ DSA Problems",
      description: "Solved across LeetCode and other competitive programming platforms.",
      icon: <Code className="w-8 h-8" />,
      color: "amber"
    },
    {
      title: "200+ Day Streak",
      description: "Continuous coding and contribution streak.",
      icon: <Trophy className="w-8 h-8" />,
      color: "blue"
    },
    {
      title: "Open Source Contributor",
      description: "Contributed to OpenSauced Pizza CLI and AutoMQ.",
      icon: <GitBranch className="w-8 h-8" />,
      color: "purple"
    },
  ]

  useEffect(() => {
    if (!cardsRef.current) return

    const ctx = gsap.context(() => {
      // Cert cards stagger in with 3D rotation
      const certCards = cardsRef.current.querySelectorAll(".cert-card")
      gsap.from(certCards, {
        y: 80,
        opacity: 0,
        rotateX: -10,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
        }
      })

      // Achievement cards slide up
      const achieveCards = cardsRef.current.querySelectorAll(".achieve-card")
      gsap.from(achieveCards, {
        y: 50,
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: cardsRef.current.querySelector(".achieve-grid"),
          start: "top 85%",
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Refresh ScrollTrigger when expanding/collapsing
  useEffect(() => {
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 400)
  }, [isExpanded])

  const visibleCertifications = isExpanded ? certifications : certifications.slice(0, 3)

  return (
    <div ref={sectionRef} className="w-full py-8 px-4 overflow-x-hidden">
      <div ref={cardsRef} className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.4 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.3em] uppercase text-emerald-400/60 mb-3"
          >
            Milestones
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Certifications & Achievements
          </motion.h2>
          <div className="w-12 h-[2px] bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto" />
        </div>

        {/* Certifications Grid */}
        <div className="mb-20">
          <h3 className="text-xl md:text-2xl font-semibold mb-8 tracking-tight text-white/80 text-center md:text-left" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Professional Certifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {visibleCertifications.map((cert, index) => (
                <motion.div
                  key={cert.title}
                  initial={isExpanded && index >= 3 ? { opacity: 0, y: 20 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: index >= 3 ? (index - 3) * 0.1 : 0 }}
                >
                  <TiltCard className="cert-card h-full" glowColor={cert.gradient.includes('cyan') ? '6, 182, 212' : '59, 130, 246'}>
                    <div className="glassmorphic-card-advanced p-6 rounded-2xl h-full relative group overflow-hidden">
                      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${cert.gradient} rounded-full blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
                      
                      <div className="flex flex-col h-full relative z-10">
                        <div className="flex items-start justify-between mb-6">
                          <div className={`p-3 rounded-xl bg-gradient-to-br ${cert.gradient} bg-opacity-10 text-white shadow-lg`}>
                            {cert.icon}
                          </div>
                          <span className="text-[10px] text-white/30 tracking-wider uppercase font-medium">{cert.date}</span>
                        </div>
                        
                        <div className="mt-auto">
                          <h4 className="text-lg font-bold mb-2 tracking-tight">{cert.title}</h4>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-white/50">{cert.issuer}</p>
                            {cert.detail && (
                              <span className={`text-[10px] px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] font-medium tracking-wide`}>
                                {cert.detail}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          <div className="mt-10 flex justify-center">
            <MagneticButton 
              onClick={() => setIsExpanded(!isExpanded)} 
              className="btn-accent px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-emerald-500/20"
            >
              <span className="flex items-center gap-2">
                {isExpanded ? "Show Less" : "View All 10 Certifications"}
              </span>
            </MagneticButton>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="achieve-grid">
          <h3 className="text-xl md:text-2xl font-semibold mb-8 tracking-tight text-white/80" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Key Milestones
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achieve, i) => {
              // Map colors to gradients safely (avoiding purge issues)
              const gradients = {
                emerald: "from-emerald-400 to-teal-500",
                amber: "from-amber-400 to-orange-500",
                blue: "from-blue-400 to-cyan-500",
                purple: "from-teal-400 to-cyan-500" // Substituted purple for teal to maintain non-purple requirement
              }
              const activeGradient = gradients[achieve.color]

              return (
                <div
                  key={achieve.title}
                  className="achieve-card relative group"
                >
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${activeGradient} rounded-2xl blur opacity-0 group-hover:opacity-15 transition duration-500`} />
                  <div className="glassmorphic-card-advanced p-6 md:p-8 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-10">
                    <div className="relative">
                      <div className={`absolute inset-0 bg-gradient-to-br ${activeGradient} blur-xl opacity-30`} />
                      <div className={`relative p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] shadow-xl text-white`}>
                        {achieve.icon}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-xl font-bold mb-2 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {achieve.title}
                      </h4>
                      <p className="text-sm text-white/50 leading-relaxed max-w-sm">
                        {achieve.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
