"use client"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Link from "next/link"
import { Mail, Linkedin, Github, ArrowUp } from "lucide-react"

const Footer = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer ref={ref} className="py-12 px-4 bg-black relative overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center"
        >
          <div className="mb-8 md:mb-0">
            <Link href="/" className="text-2xl font-bold gradient-text">
              Arnav<span className="text-white">.</span>
            </Link>
            <p className="text-gray-400 mt-2 max-w-md">
              A passionate developer and tech enthusiast specializing in web development, machine learning, cloud
              computing, and blockchain.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              <a
                href="mailto:arnavjoshi0512@gmail.com"
                className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-white hover:bg-primary/40 transition-colors"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
              <a
                href="https://linkedin.com/in/arnav-joshi-aj05"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-white hover:bg-primary/40 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://github.com/arnvjshi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-white hover:bg-primary/40 transition-colors"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
            </div>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-white hover:bg-primary/40 transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border-t border-gray-800 mt-8 pt-8 text-center"
        >
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Arnav Joshi. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer

