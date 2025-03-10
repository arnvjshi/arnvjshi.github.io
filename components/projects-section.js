"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ExternalLink, Github, ChevronRight } from "lucide-react"
import Image from "next/image"

const projects = [
  {
    title: "Smart Shopping System",
    description:
      "A seamless online-to-offline shopping experience where customers can browse, scan, and checkout with ease, while staff manage inventory through an admin dashboard.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["Next.js", "MongoDB", "AWS Lambda"],
    link: "#",
    github: "#",
  },
  {
    title: "Top-Down Retro Game",
    description:
      "A pixel-art-based retro game featuring 64x64 tiles and smooth gameplay mechanics, all built in vanilla JavaScript.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["JavaScript", "Tiled", "PNG Assets"],
    link: "#",
    github: "#",
  },
  {
    title: "Blockchain-Based Transaction System",
    description:
      "Enhanced a blockchain codebase to include a secure transaction system, ensuring validation and storage of transactions in blocks.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["Blockchain", "JavaScript", "Cryptography"],
    link: "#",
    github: "#",
  },
  {
    title: "Software Engineering Lab Assignments",
    description:
      "Contributed detailed technical reports and research on various software process models, ensuring structured documentation and clarity.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["Documentation", "Research", "Software Engineering"],
    link: "#",
    github: "#",
  },
]

const ProjectsSection = () => {
  const [hoveredProject, setHoveredProject] = useState(null)
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })

  return (
    <section id="projects" ref={ref} className="py-20 md:py-32 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            My <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))] mx-auto mb-6 rounded-full"></div>
          <p className="section-subtitle">
            Here are some of the projects I've worked on, showcasing my skills in web development, game design,
            blockchain, and more.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card overflow-hidden rounded-lg"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="relative overflow-hidden group h-56">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(var(--surface),0.9)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 w-full">
                    <div className="flex justify-between items-center">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-[rgb(var(--primary))] transition-colors"
                      >
                        <ExternalLink size={20} />
                      </a>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-[rgb(var(--primary))] transition-colors"
                      >
                        <Github size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-[rgb(var(--text-secondary))] mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tech-pill">
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  className="inline-flex items-center text-[rgb(var(--primary))] hover:text-white transition-colors"
                >
                  View Project <ChevronRight size={16} className="ml-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection

