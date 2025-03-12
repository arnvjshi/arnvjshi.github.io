"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

export default function Skills() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })
  const [hoveredSkill, setHoveredSkill] = useState(null)

  const skillCategories = [
    {
      title: "Languages",
      skills: [
        { name: "JavaScript", level: 90 },
        { name: "Python", level: 85 },
        { name: "C", level: 75 },
        { name: "Java", level: 80 },
      ],
    },
    {
      title: "Frameworks & Libraries",
      skills: [
        { name: "Next.js", level: 95 },
        { name: "React", level: 92 },
        { name: "Express", level: 88 },
        { name: "Node.js", level: 85 },
        { name: "Flask", level: 78 },
      ],
    },
    {
      title: "Databases",
      skills: [
        { name: "MongoDB", level: 87 },
        { name: "SQL", level: 82 },
        { name: "Firebase", level: 90 },
      ],
    },
    {
      title: "AI & Cloud",
      skills: [
        { name: "TensorFlow", level: 80 },
        { name: "Hugging Face", level: 75 },
        { name: "OpenCV", level: 82 },
        { name: "AWS Lambda", level: 85 },
      ],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="skills" ref={sectionRef} className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400"
        >
          Skills & Expertise
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glassmorphic-card-advanced p-6 rounded-xl"
              whileHover={{
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <motion.h3
                className="text-xl font-semibold mb-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {category.title}
              </motion.h3>
              <ul className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <motion.li
                    key={skillIndex}
                    className="skill-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.3 + skillIndex * 0.1,
                    }}
                    onMouseEnter={() => setHoveredSkill(`${category.title}-${skill.name}`)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-xs font-semibold">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-gray-500 to-gray-700 dark:from-gray-400 dark:to-gray-200"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{
                          duration: 1.5,
                          delay: 0.5 + skillIndex * 0.1,
                          ease: "easeOut",
                        }}
                        style={{
                          boxShadow:
                            hoveredSkill === `${category.title}-${skill.name}`
                              ? "0 0 10px rgba(255, 255, 255, 0.5)"
                              : "none",
                        }}
                      />
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

