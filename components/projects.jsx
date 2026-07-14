"use client"

import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Github, Shield, BookOpen, Search, Video, ExternalLink } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import TiltCard from "@/components/tilt-card"

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const sectionRef = useRef(null)
  const cardsRef = useRef(null)
  const [activeProject, setActiveProject] = useState(0)

  const projects = [
    {
      title: "ThreatDetect Dashboard",
      badge: "",
      description:
        "A real-time multimodal AI surveillance system with 97.4% threat detection accuracy using video, audio, and NLP fusion. Integrated YOLOv8, audio CNNs, and Llama 3.1 for intelligent anomaly detection.",
      technologies: ["Next.js", "FastAPI", "TensorFlow", "YOLOv8n", "NLP"],
      icon: <Shield className="w-5 h-5" />,
      highlight: "97.4% accuracy",
      gradient: "from-emerald-500/20 to-cyan-500/10",
      github: "https://github.com/arnvjshi/ThreatShield",
    },
    {
      title: "EduBot",
      badge: "LIVE",
      description:
        "AI-powered learning platform with dynamic content generation. Generates explanations, flashcards, MCQs, and quizzes using Gemini APIs. User preference handling for personalized learning.",
      technologies: ["Next.js", "Flask", "Gemini", "REST APIs"],
      icon: <BookOpen className="w-5 h-5" />,
      highlight: "AI-Powered Learning",
      gradient: "from-cyan-500/20 to-emerald-500/10",
      github: "https://github.com/arnvjshi/Edubot",
      live: "https://edu-bot-six.vercel.app/",
    },
    {
      title: "AI Misinformation Detection",
      badge: "LIVE",
      description:
        "Multimodal agent integrating text, audio, and image analysis to identify misinformation with 92% accuracy. Elasticsearch for fast semantic retrieval, AWS Lambda for serverless inference.",
      technologies: ["Next.js", "Flask", "Elasticsearch", "HuggingFace", "AWS"],
      icon: <Search className="w-5 h-5" />,
      highlight: "92% accuracy · 40% faster",
      gradient: "from-emerald-500/15 to-teal-500/10",
      github: "https://github.com/arnvjshi/AI-Misinformation-Detection-Agent",
      live: "https://vericrisis.vercel.app/",
    },
    {
      title: "ClipMind AI",
      badge: "",
      description:
        "Lightweight AI agent using Gemini for identifying and generating high-engagement video clips. AI-driven video analysis pipeline for highlight detection and smart clipping.",
      technologies: ["Agentic AI", "Video Processing", "FFmpeg", "Streamlit"],
      icon: <Video className="w-5 h-5" />,
      highlight: "AI Video Clipping",
      gradient: "from-teal-500/20 to-emerald-500/10",
      github: "https://github.com/arnvjshi/YT-Video-Cutter-agent",
    },
  ]

  useEffect(() => {
    if (!cardsRef.current) return

    const ctx = gsap.context(() => {
      const cards = cardsRef.current.querySelectorAll(".project-card")
      cards.forEach((card, i) => {
        gsap.from(card, {
          y: 80,
          opacity: 0,
          rotateX: 5,
          duration: 1,
          delay: i * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          }
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const nextProject = () => setActiveProject((prev) => (prev === projects.length - 1 ? 0 : prev + 1))
  const prevProject = () => setActiveProject((prev) => (prev === 0 ? projects.length - 1 : prev - 1))

  const renderProjectCard = (project, isMobile = false) => (
    <div className={`relative overflow-hidden rounded-2xl ${isMobile ? '' : 'project-card'}`}>
      {/* Gradient top accent */}
      <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r ${project.gradient}`} />

      <div className="glassmorphic-card-advanced rounded-2xl overflow-hidden h-full">
        {/* Header with gradient background */}
        <div className="relative p-6 pb-4">
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-30`} />
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 backdrop-blur-sm border border-emerald-500/10">
                  {project.icon}
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {project.title}
                  </h3>
                  <span className="text-xs text-emerald-400/80 font-medium tracking-wide">{project.highlight}</span>
                </div>
              </div>
              {project.badge && (
                <span className="text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 backdrop-blur-sm">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />
                  {project.badge}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 pt-2">
          <p className="mb-5 text-sm text-white/55 leading-relaxed">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-[11px] px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/50 hover:text-emerald-400 hover:border-emerald-500/20 transition-colors duration-300"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href={project.github}
              className="group flex items-center gap-2 text-xs text-white/40 hover:text-emerald-400 transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={16} />
              <span className="group-hover:underline underline-offset-4">Source Code</span>
            </a>
            {project.live && (
              <a
                href={project.live}
                className="group flex items-center gap-2 text-xs text-white/40 hover:text-emerald-400 transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink size={16} />
                <span className="group-hover:underline underline-offset-4">Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div ref={sectionRef} className="w-full py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.4 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.3em] uppercase text-emerald-400/60 mb-3"
          >
            Portfolio
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Featured Projects
          </motion.h2>
          <div className="w-12 h-[2px] bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto" />
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {renderProjectCard(projects[activeProject], true)}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between items-center mt-5">
            <motion.button onClick={prevProject} className="neumorphic-btn-3d p-2.5 rounded-full" whileTap={{ scale: 0.9 }}>
              <ChevronLeft size={20} />
            </motion.button>
            <div className="flex space-x-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveProject(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${index === activeProject ? "bg-emerald-500 w-8" : "bg-white/15 w-1.5"
                    }`}
                />
              ))}
            </div>
            <motion.button onClick={nextProject} className="neumorphic-btn-3d p-2.5 rounded-full" whileTap={{ scale: 0.9 }}>
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </div>

        {/* Desktop Grid with Tilt */}
        <div ref={cardsRef} className="hidden md:grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <TiltCard key={project.title} className="h-full">
              {renderProjectCard(project)}
            </TiltCard>
          ))}
        </div>
      </div>
    </div>
  )
}
