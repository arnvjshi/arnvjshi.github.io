"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import TiltCard from "@/components/tilt-card"

gsap.registerPlugin(ScrollTrigger)

export default function Skills() {
  const sectionRef = useRef(null)
  const barsRef = useRef(null)
  const [hoveredSkill, setHoveredSkill] = useState(null)

  const skillCategories = [
    {
      title: "Languages",
      gradient: "from-emerald-400 to-emerald-600",
      skills: [
        { name: "JavaScript", level: 90 },
        { name: "TypeScript", level: 85 },
        { name: "Python", level: 88 },
        { name: "Java", level: 80 },
        { name: "C", level: 75 },
        { name: "SQL", level: 82 },
      ],
    },
    {
      title: "Backend",
      gradient: "from-cyan-400 to-blue-600",
      skills: [
        { name: "Node.js", level: 88 },
        { name: "Express", level: 85 },
        { name: "Flask", level: 80 },
        { name: "REST APIs", level: 92 },
        { name: "FastAPI", level: 82 },
        { name: "JWT / OAuth2", level: 85 },
      ],
    },
    {
      title: "Frontend",
      gradient: "from-teal-400 to-emerald-600",
      skills: [
        { name: "React", level: 92 },
        { name: "Next.js", level: 95 },
        { name: "Tailwind CSS", level: 90 },
      ],
    },
    {
      title: "Databases",
      gradient: "from-emerald-500 to-cyan-500",
      skills: [
        { name: "PostgreSQL", level: 85 },
        { name: "MongoDB", level: 87 },
        { name: "Firebase", level: 88 },
        { name: "Elasticsearch", level: 78 },
      ],
    },
    {
      title: "Cloud & DevOps",
      gradient: "from-blue-400 to-cyan-600",
      skills: [
        { name: "AWS (EC2, Lambda, S3)", level: 85 },
        { name: "Azure", level: 72 },
        { name: "Docker", level: 82 },
        { name: "CI/CD", level: 85 },
      ],
    },
    {
      title: "AI / ML",
      gradient: "from-cyan-400 to-teal-500",
      skills: [
        { name: "TensorFlow", level: 80 },
        { name: "PyTorch", level: 75 },
        { name: "OpenCV", level: 82 },
        { name: "NLP", level: 78 },
      ],
    },
  ]

  useEffect(() => {
    if (!barsRef.current) return

    const ctx = gsap.context(() => {
      // Cards entrance
      const cards = barsRef.current.querySelectorAll(".skill-category-card")
      gsap.from(cards, {
        y: 60,
        opacity: 0,
        scale: 0.95,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: barsRef.current,
          start: "top 85%",
        }
      })

      // Animate skill bars
      const bars = barsRef.current.querySelectorAll(".skill-fill")
      gsap.from(bars, {
        width: 0,
        duration: 1.5,
        stagger: 0.05,
        ease: "power4.out",
        scrollTrigger: {
          trigger: barsRef.current,
          start: "top 75%",
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="w-full py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.4 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.3em] uppercase text-emerald-400/60 mb-3"
          >
            Technologies
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Skills & Expertise
          </motion.h2>
          <div className="w-12 h-[2px] bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto" />
        </div>

        <div ref={barsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category) => (
            <TiltCard key={category.title} className="skill-category-card h-full" glowColor={category.gradient.includes('cyan') ? '6, 182, 212' : '16, 185, 129'}>
              <div className="glassmorphic-card-advanced p-6 md:p-8 rounded-2xl h-full relative overflow-hidden group">
                {/* Background ambient glow */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${category.gradient} rounded-full blur-[50px] opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-2 h-6 rounded-full bg-gradient-to-b ${category.gradient}`} />
                    <h3
                      className="text-lg font-bold tracking-wide"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {category.title}
                    </h3>
                  </div>

                  <ul className="space-y-5">
                    {category.skills.map((skill) => (
                      <li
                        key={skill.name}
                        className="skill-item"
                        onMouseEnter={() => setHoveredSkill(`${category.title}-${skill.name}`)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <div className="flex justify-between mb-2">
                          <span className={`text-sm font-medium transition-colors duration-300 ${hoveredSkill === `${category.title}-${skill.name}` ? 'text-white' : 'text-white/70'}`}>
                            {skill.name}
                          </span>
                          <span className={`text-xs font-semibold tabular-nums transition-colors duration-300 ${hoveredSkill === `${category.title}-${skill.name}` ? 'text-emerald-400' : 'text-white/30'}`}>
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-[4px] bg-white/[0.04] rounded-full overflow-hidden shadow-inner">
                          <div
                            className={`skill-fill h-full rounded-full transition-shadow duration-300 bg-gradient-to-r ${category.gradient}`}
                            style={{
                              width: `${skill.level}%`,
                              boxShadow:
                                hoveredSkill === `${category.title}-${skill.name}`
                                  ? "0 0 15px rgba(16, 185, 129, 0.5)"
                                  : "none",
                            }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </div>
  )
}
