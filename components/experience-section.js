"use client"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Award, Users, BookOpen } from "lucide-react"

const experiences = [
  {
    title: "Competition Enthusiast",
    description:
      "Actively participates in coding competitions and hackathons, always pushing the limits of creativity and problem-solving.",
    icon: Award,
    items: [
      "Participated in multiple hackathons and coding competitions",
      "Developed innovative solutions under time constraints",
      "Collaborated with diverse teams to solve complex problems",
    ],
  },
  {
    title: "Event Organizer & Volunteer",
    description:
      "Organized gaming events and technical workshops, enhancing community engagement and leadership skills.",
    icon: Users,
    items: [
      "Rotaract Club & CompEx: Organized gaming events and technical workshops",
      "Colosseum 15.0 IT Event: Played a key role in managing the IT department",
      "Developed strong leadership and organizational skills",
    ],
  },
  {
    title: "Teaching Assistant (TA) & Mentor",
    description:
      "Helped peers with technical concepts and practical implementations, making complex topics accessible and fun.",
    icon: BookOpen,
    items: [
      "Assisted students in understanding complex programming concepts",
      "Created learning materials and conducted review sessions",
      "Provided one-on-one mentoring to struggling students",
    ],
  },
]

const ExperienceSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })

  return (
    <section id="experience" ref={ref} className="py-20 md:py-32 px-4 bg-dark-light relative overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Beyond coding, I've gained valuable experience through competitions, event organization, and mentoring
            others in the tech community.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="gradient-border p-6 rounded-lg hover-effect"
            >
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <experience.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{experience.title}</h3>
              </div>
              <p className="text-gray-300 mb-6 text-center">{experience.description}</p>
              <ul className="space-y-3">
                {experience.items.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background grid */}
      <div className="absolute inset-0 retro-grid -z-10"></div>
    </section>
  )
}

export default ExperienceSection

