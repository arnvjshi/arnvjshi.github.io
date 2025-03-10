"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Code, Database, Server, Cpu, Globe, Layers } from "lucide-react"

const skills = [
  {
    category: "Programming Languages",
    icon: Code,
    items: [
      { name: "JavaScript", level: 90 },
      { name: "Python", level: 85 },
      { name: "C", level: 75 },
      { name: "Java", level: 70 },
    ],
  },
  {
    category: "Web Development",
    icon: Globe,
    items: [
      { name: "HTML/CSS", level: 95 },
      { name: "React/Next.js", level: 90 },
      { name: "Node.js/Express", level: 85 },
      { name: "Flask", level: 75 },
    ],
  },
  {
    category: "Database",
    icon: Database,
    items: [
      { name: "MongoDB", level: 85 },
      { name: "SQL", level: 80 },
      { name: "Firebase", level: 85 },
    ],
  },
  {
    category: "Machine Learning & AI",
    icon: Cpu,
    items: [
      { name: "TensorFlow", level: 75 },
      { name: "Hugging Face", level: 70 },
      { name: "OpenCV", level: 80 },
    ],
  },
  {
    category: "Cloud & DevOps",
    icon: Server,
    items: [
      { name: "AWS Lambda", level: 75 },
      { name: "Git/GitHub", level: 90 },
    ],
  },
  {
    category: "Other Tools",
    icon: Layers,
    items: [
      { name: "Tiled", level: 85 },
      { name: "Blockchain", level: 70 },
    ],
  },
]

const SkillsSection = () => {
  const [animateSkills, setAnimateSkills] = useState(false)
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })

  useEffect(() => {
    if (inView) {
      setAnimateSkills(true)
    } else {
      setAnimateSkills(false)
    }
  }, [inView])

  return (
    <section
      id="skills"
      ref={ref}
      className="py-20 md:py-32 px-4 bg-[rgba(var(--surface),0.3)] relative overflow-hidden backdrop-blur-sm"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            My <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))] mx-auto mb-6 rounded-full"></div>
          <p className="section-subtitle">
            I've developed a diverse skill set across various technologies and domains, allowing me to tackle complex
            problems and build innovative solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skillGroup, index) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card p-6 hover:shadow-lg"
            >
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-lg bg-[rgba(var(--primary),0.1)] flex items-center justify-center mr-3">
                  <skillGroup.icon className="w-5 h-5 text-[rgb(var(--primary))]" />
                </div>
                <h3 className="text-xl font-bold">{skillGroup.category}</h3>
              </div>
              <div className="space-y-4">
                {skillGroup.items.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm text-[rgb(var(--text-secondary))]">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-[rgba(var(--surface-light),0.3)] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: animateSkills ? `${skill.level}%` : 0 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        className="h-full rounded-full bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))]"
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SkillsSection

