"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Briefcase, Cloud, Code, Monitor } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Experience() {
  const sectionRef = useRef(null)
  const timelineRef = useRef(null)

  const experiences = [
    {
      title: "Software Developer Intern",
      company: "AILifeBot",
      location: "Remote",
      period: "Feb – May 2026",
      icon: <Code className="w-5 h-5" />,
      bullets: [
        "Built and deployed REST APIs for enterprise applications supporting real-time data workflows",
        "Designed low-latency workflows for real-time data processing",
        "Worked across full SDLC including development, testing, and debugging",
        "Improved system reliability through monitoring and performance optimization",
      ],
      gradient: "from-emerald-500 to-teal-400"
    },
    {
      title: "Full Stack Developer Intern",
      company: "Youniformwala",
      location: "Remote",
      period: "May – Aug 2025",
      icon: <Monitor className="w-5 h-5" />,
      bullets: [
        "Engineered a scalable Next.js + FastAPI + SQLAlchemy + PostgreSQL e-Commerce platform",
        "Implemented JWT authentication, OAuth2.0, and RBAC to strengthen API security",
        "Enhanced database query performance and API efficiency, reducing latency by 25%",
        "Deployed automated CI/CD pipelines using GitHub Actions and Docker for AWS EC2",
      ],
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      title: "Cloud Virtual Intern",
      company: "EduSkills (AICTE – AWS Academy)",
      location: "Remote",
      period: "Jul – Sep 2025",
      icon: <Cloud className="w-5 h-5" />,
      bullets: [
        "Completed a 10-week cloud internship based on AWS Academy curriculum",
        "Studied cloud fundamentals including compute, storage, networking, and security",
      ],
      gradient: "from-blue-400 to-indigo-500"
    },
    {
      title: "Tech Intern",
      company: "CompEx 2025",
      location: "Nagpur",
      period: "Dec 2024 – Jan 2025",
      icon: <Briefcase className="w-5 h-5" />,
      bullets: [
        "Developed a real-time scoreboard system using React + Firebase for 100+ live participants",
        "Systematized data synchronization via Firebase Cloud Functions, cutting manual delay by 35%",
        "Devised role-based dashboards and analytics tools for efficient event operations",
      ],
      gradient: "from-teal-400 to-emerald-500"
    },
  ]

  useEffect(() => {
    if (!timelineRef.current) return

    const ctx = gsap.context(() => {
      // Timeline line draws in
      const line = timelineRef.current.querySelector(".timeline-line")
      if (line) {
        gsap.fromTo(line, 
          { scaleY: 0 },
          { 
            scaleY: 1, 
            duration: 2, 
            ease: "power3.inOut", 
            transformOrigin: "top",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 75%",
            }
          }
        )
      }

      // Cards slide in
      const cards = timelineRef.current.querySelectorAll(".exp-card")
      cards.forEach((card, i) => {
        gsap.from(card, {
          x: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          }
        })
      })

      // Dots animate in
      const dots = timelineRef.current.querySelectorAll(".timeline-dot")
      dots.forEach((dot) => {
        gsap.from(dot, {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: dot,
            start: "top 80%",
          }
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="w-full py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.4 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.3em] uppercase text-emerald-400/60 mb-3"
          >
            Career
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Experience
          </motion.h2>
          <div className="w-12 h-[2px] bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto" />
        </div>

        <div ref={timelineRef} className="relative pl-12 md:pl-16">
          <div className="timeline-line absolute left-4 md:left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-emerald-500/50 via-cyan-500/50 to-transparent" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={exp.company} className="relative group/timeline">
                {/* Timeline Dot */}
                <div 
                  className="timeline-dot absolute left-4 md:left-6 -translate-x-1/2 w-4 h-4 rounded-full bg-[#0a0a0a] border-2 z-10 transition-colors duration-300"
                  style={{ top: "2rem", borderColor: index % 2 === 0 ? "#10b981" : "#06b6d4" }}
                >
                  <div className={`absolute inset-1 rounded-full bg-gradient-to-r ${exp.gradient} opacity-0 group-hover/timeline:opacity-100 transition-opacity duration-300`} />
                </div>

                {/* Connecting horizontal line */}
                <div className="absolute left-4 md:left-6 top-[2.4rem] w-8 md:w-10 h-[1px] bg-gradient-to-r from-white/10 to-transparent" />

                <div className="exp-card relative ml-8 md:ml-12 group/card">
                  {/* Hover glow */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${exp.gradient} rounded-2xl blur opacity-0 group-hover/card:opacity-20 transition duration-500`} />
                  
                  <div className="glassmorphic-card-advanced p-6 md:p-8 rounded-2xl relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-5 gap-3">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${exp.gradient} bg-opacity-10 text-white shadow-lg`}>
                          {exp.icon}
                        </div>
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            {exp.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r ${exp.gradient}`}>
                              {exp.company}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/60 shadow-inner">
                          {exp.period}
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-3 mt-4 relative">
                      {/* Vertical connector inside card */}
                      <div className="absolute left-[5px] top-2 bottom-2 w-[1px] bg-white/[0.05]" />
                      
                      {exp.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-4 text-sm text-white/60 leading-relaxed group/bullet hover:text-white/80 transition-colors">
                          <span className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-gradient-to-r ${exp.gradient} opacity-50 group-hover/bullet:opacity-100 group-hover/bullet:scale-125 transition-all`} />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
