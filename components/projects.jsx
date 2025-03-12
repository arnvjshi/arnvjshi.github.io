"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react"

export default function Projects() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })
  const [activeProject, setActiveProject] = useState(0)

  const projects = [
    {
      title: "Smart Shopping System",
      description: "An intelligent e-commerce platform with personalized recommendations and inventory management.",
      technologies: ["Next.js", "MongoDB", "AWS Lambda"],
      image: "/placeholder.svg?height=400&width=600",
      github: "#",
      demo: "#",
    },
    {
      title: "Top-Down Retro Game",
      description: "A nostalgic 2D game with pixel art graphics and classic gameplay mechanics.",
      technologies: ["JavaScript", "Tiled", "PNG Assets"],
      image: "/placeholder.svg?height=400&width=600",
      github: "#",
      demo: "#",
    },
    {
      title: "Blockchain-Based Transaction System",
      description: "A secure and transparent platform for managing digital transactions using blockchain technology.",
      technologies: ["React", "Solidity", "Web3.js"],
      image: "/placeholder.svg?height=400&width=600",
      github: "#",
      demo: "#",
    },
    {
      title: "Software Engineering Lab Assignments",
      description:
        'A collection of academic projects showcasing various software engineering principles and patterns "A collection of academic projects showcasing various software engineering principles and patterns.',
      technologies: ["Java", "Python", "Design Patterns"],
      image: "/placeholder.svg?height=400&width=600",
      github: "#",
      demo: "#",
    },
  ]

  const nextProject = () => {
    setActiveProject((prev) => (prev === projects.length - 1 ? 0 : prev + 1))
  }

  const prevProject = () => {
    setActiveProject((prev) => (prev === 0 ? projects.length - 1 : prev - 1))
  }

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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <section id="projects" ref={sectionRef} className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400"
        >
          Featured Projects
        </motion.h2>

        {/* Mobile Project Carousel */}
        <div className="md:hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="glassmorphic-card-advanced rounded-xl overflow-hidden"
            >
              <div className="relative overflow-hidden h-48">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 flex items-end">
                  <h3 className="text-white text-xl font-bold p-4">{projects[activeProject].title}</h3>
                </div>
                <img
                  src={projects[activeProject].image || "/placeholder.svg"}
                  alt={projects[activeProject].title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <p className="mb-4">{projects[activeProject].description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {projects[activeProject].technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="text-xs px-2 py-1 rounded-full neumorphic-pill">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between mt-4">
                  <motion.a
                    href={projects[activeProject].github}
                    className="neumorphic-btn-3d p-2 rounded-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="View GitHub repository"
                  >
                    <Github size={20} />
                  </motion.a>

                  <motion.a
                    href={projects[activeProject].demo}
                    className="neumorphic-btn-3d p-2 rounded-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="View live demo"
                  >
                    <ExternalLink size={20} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-4">
            <motion.button
              onClick={prevProject}
              className="neumorphic-btn-3d p-2 rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={20} />
            </motion.button>

            <div className="flex space-x-2">
              {projects.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveProject(index)}
                  className={`w-2 h-2 rounded-full ${
                    index === activeProject ? "bg-gray-800 dark:bg-gray-200" : "bg-gray-300 dark:bg-gray-700"
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>

            <motion.button
              onClick={nextProject}
              className="neumorphic-btn-3d p-2 rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </div>

        {/* Desktop Project Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="hidden md:grid md:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glassmorphic-card-advanced rounded-xl overflow-hidden transform-gpu"
              whileHover={{
                y: -10,
                scale: 1.02,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="relative overflow-hidden h-48 md:h-64"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 z-10 flex items-end">
                  <motion.h3
                    className="text-white text-xl font-bold p-4"
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {project.title}
                  </motion.h3>
                </motion.div>
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{
                    scale: 1.1,
                    filter: "brightness(0.8)",
                  }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={techIndex}
                      className="text-xs px-2 py-1 rounded-full neumorphic-pill"
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: "rgba(200, 200, 200, 0.2)",
                      }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.1 * techIndex,
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                <div className="flex justify-between mt-4">
                  <motion.a
                    href={project.github}
                    className="neumorphic-btn-3d p-2 rounded-lg"
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "rgba(200, 200, 200, 0.2)",
                    }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="View GitHub repository"
                  >
                    <Github size={20} />
                  </motion.a>

                  <motion.a
                    href={project.demo}
                    className="neumorphic-btn-3d p-2 rounded-lg"
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "rgba(200, 200, 200, 0.2)",
                    }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="View live demo"
                  >
                    <ExternalLink size={20} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

