"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Sun, Moon, Menu, X } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)

    // Add scroll event listener to track active section and navbar background
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]")
      const scrollPosition = window.scrollY + 100

      // Change navbar background on scroll
      if (scrollPosition > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight
        const sectionId = section.getAttribute("id")

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ]

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 px-4 py-4 md:py-6 transition-all duration-300 ${
        scrolled ? "glassmorphic-nav-scrolled backdrop-blur-lg" : "glassmorphic-nav"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <motion.a href="#home" className="relative group" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <span className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
            AJ
          </span>
          <motion.span
            className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-400 to-gray-600 dark:from-gray-400 dark:to-gray-200 group-hover:w-full transition-all duration-300"
            whileHover={{ width: "100%" }}
          />
        </motion.a>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="neumorphic-btn-3d p-2 rounded-lg"
            whileHover={{ scale: 1.1, backgroundColor: "rgba(200, 200, 200, 0.2)" }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              className={`relative text-sm font-medium nav-link ${
                activeSection === item.href.substring(1) ? "active-nav-link" : ""
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.name}
              {activeSection === item.href.substring(1) && (
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-gray-400 to-gray-600 dark:from-gray-400 dark:to-gray-200"
                  layoutId="activeSection"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.a>
          ))}
        </div>

        {/* Theme toggle */}
        {mounted && (
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "rgba(200, 200, 200, 0.2)" }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="neumorphic-btn-3d p-2 rounded-full ml-4 hidden md:block"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
        )}
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden glassmorphic-dropdown-advanced mt-2 py-4 rounded-lg"
        >
          <div className="flex flex-col space-y-4 px-4">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className={`text-center py-2 ${activeSection === item.href.substring(1) ? "font-bold" : ""}`}
                onClick={() => setIsOpen(false)}
                whileHover={{
                  backgroundColor: "rgba(200, 200, 200, 0.1)",
                  scale: 1.02,
                }}
                transition={{ duration: 0.2 }}
              >
                {item.name}
              </motion.a>
            ))}
            {mounted && (
              <motion.button
                onClick={toggleTheme}
                className="neumorphic-btn-3d py-2 rounded-lg flex justify-center items-center"
                whileHover={{ backgroundColor: "rgba(200, 200, 200, 0.1)" }}
                whileTap={{ scale: 0.98 }}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <>
                    <Sun size={20} className="mr-2" /> Light Mode
                  </>
                ) : (
                  <>
                    <Moon size={20} className="mr-2" /> Dark Mode
                  </>
                )}
              </motion.button>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

