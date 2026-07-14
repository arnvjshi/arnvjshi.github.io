"use client"

import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import MagneticButton from "@/components/magnetic-button"

gsap.registerPlugin(ScrollTrigger)

// eslint-disable-next-line react/prop-types
export default function About({ onContactClick = () => {} }) {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const statsRef = useRef(null)
  const headingRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Heading reveal
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
          }
        })
      }

      // Line-by-line text reveal
      if (textRef.current) {
        const paragraphs = textRef.current.querySelectorAll("p")
        paragraphs.forEach((p, i) => {
          gsap.from(p, {
            y: 40,
            opacity: 0,
            duration: 1,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 85%",
            }
          })
        })
      }

      // Stats count-up
      if (statsRef.current) {
        const statNumbers = statsRef.current.querySelectorAll(".stat-value")
        statNumbers.forEach((el) => {
          const target = parseFloat(el.dataset.target)
          const suffix = el.dataset.suffix || ""
          const obj = { val: 0 }
          gsap.to(obj, {
            val: target,
            duration: 2.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 90%",
            },
            onUpdate: () => {
              el.textContent = (target % 1 !== 0 ? obj.val.toFixed(2) : Math.round(obj.val)) + suffix
            },
          })
        })

        // Cards stagger in
        const cards = statsRef.current.querySelectorAll(".stat-card")
        gsap.from(cards, {
          y: 40,
          opacity: 0,
          scale: 0.95,
          stagger: 0.1,
          duration: 0.8,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
          }
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const stats = [
    { value: 9.18, suffix: "", label: "CGPA" },
    { value: 400, suffix: "+", label: "DSA Problems" },
    { value: 200, suffix: "+", label: "Day Streak" },
    { value: 4, suffix: "+", label: "Internships" },
  ]

  return (
    <div ref={sectionRef} className="w-full py-1 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-emerald-500/20 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
          
          <div className="glassmorphic-card-advanced relative p-8 md:p-12 rounded-[2rem] overflow-hidden">
            {/* Top right subtle glow inside card */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />

            <div className="text-center mb-12">
              <p className="text-xs tracking-[0.3em] uppercase text-emerald-400/60 mb-3">
                Who I am
              </p>
              <h2
                ref={headingRef}
                className="text-4xl md:text-5xl font-bold mb-4"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                About Me
              </h2>
              <div className="w-12 h-[2px] bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto" />
            </div>

            <div ref={textRef} className="space-y-6 relative max-w-3xl mx-auto text-center md:text-left">
              <p className="text-base md:text-lg leading-relaxed text-white/70 font-light">
                I'm <span className="font-medium text-white">Arnav Joshi</span>, a software engineer 
                focused on building scalable backend systems, low-latency APIs, and secure applications. 
                Currently pursuing <span className="font-medium text-emerald-400">B.Tech in Information Technology (Honors)</span> at 
                Shri Ramdeobaba College of Engineering and Management, Nagpur with a <span className="font-medium text-emerald-400">9.18 CGPA</span>.
              </p>

              <p className="text-base md:text-lg leading-relaxed text-white/70 font-light">
                Strong in data structures and problem solving — <span className="font-medium text-white">400+ DSA problems</span> solved 
                across LeetCode and other platforms, with a <span className="font-medium text-white">200+ day coding and contribution streak</span>. 
                I've contributed to open-source projects including <span className="text-cyan-400">Pizza CLI at OpenSauced</span> and <span className="text-cyan-400">AutoMQ</span>.
              </p>

              <p className="text-base md:text-lg leading-relaxed text-white/70 font-light">
                Experienced with cloud platforms (<span className="font-medium text-white">AWS EC2, Lambda, S3, Azure</span>), 
                CI/CD automation (<span className="font-medium text-white">GitHub Actions, Docker</span>), and distributed systems. 
                Certified in Cloud Architecting and Data Engineering from AWS Academy, 
                and Computer Vision from IBM.
              </p>
            </div>

            {/* Stats Counter Row */}
            <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-16 max-w-4xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="stat-card relative group/card overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <span
                      className="stat-value stat-number text-3xl md:text-4xl mb-2 bg-clip-text text-transparent bg-gradient-to-br from-white to-white/70"
                      data-target={stat.value}
                      data-suffix={stat.suffix}
                    >
                      0
                    </span>
                    <p className="stat-label text-[10px] md:text-xs text-white/50 tracking-[0.2em]">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-16 relative z-10">
              <MagneticButton
                onClick={onContactClick}
                className="btn-accent px-10 py-4 rounded-full font-medium inline-block text-sm uppercase tracking-wider"
              >
                Get in Touch
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
