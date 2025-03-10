"use client"
import { useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

const AboutSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })

  const parallaxRef = useRef(null)

  return (
    <section id="about" ref={ref} className="py-20 md:py-32 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))] mx-auto mb-6 rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
            ref={parallaxRef}
          >
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src="/profile.jpg?height=500&width=500"
                alt="Arnav Joshi"
                width={500}
                height={500}
                className="w-full h-auto rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[rgba(var(--primary),0.2)] to-transparent mix-blend-overlay"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold font-display">
              Hi, I'm Arnav Joshi, a passionate developer and tech enthusiast
            </h3>
            <p className="text-[rgb(var(--text-secondary))] leading-relaxed">
              Currently pursuing my B.Tech in Information Technology at Ramdeobaba University, my expertise lies in web
              development, machine learning, cloud computing, and blockchain. I love solving complex problems through
              code, participating in competitive coding, and building innovative solutions.
            </p>
            <p className="text-[rgb(var(--text-secondary))] leading-relaxed">
              Beyond academics, I actively contribute to the tech community through event organization, volunteering,
              and mentoring. My work with the Rotaract Club and CompEx has helped me develop strong teamwork and
              leadership skills.
            </p>
            <div className="pt-4">
              <h4 className="text-xl font-semibold mb-3">What Sets Me Apart?</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-[rgb(var(--primary))] mr-2">✓</span>
                  <span>
                    Innovative Mindset – Always exploring new tech and experimenting with cutting-edge solutions.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[rgb(var(--primary))] mr-2">✓</span>
                  <span>
                    Problem Solver – I thrive in competitive coding, constantly improving logic and efficiency.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[rgb(var(--primary))] mr-2">✓</span>
                  <span>
                    Community-Driven – I actively engage in tech communities, helping others grow while learning myself.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[rgb(var(--primary))] mr-2">✓</span>
                  <span>Versatile Developer – Comfortable across web, AI, blockchain, and game development.</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection

