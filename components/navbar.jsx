"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Sun, Moon, Menu, X } from "lucide-react"

// eslint-disable-next-line react/prop-types
export default function Navbar({ activeSection = "home", onNavigate = () => {}, scrolled = false }) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Experience", id: "experience" },
    { name: "Contact", id: "contact" },
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
        <motion.button
          type="button"
          onClick={() => onNavigate(0)}
          className="relative group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
            ArnavJ
          </span>
          <motion.span
            className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-400 to-gray-600 dark:from-gray-400 dark:to-gray-200 group-hover:w-full transition-all duration-300"
            whileHover={{ width: "100%" }}
          />
        </motion.button>

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
            <motion.button
              type="button"
              key={item.id}
              onClick={() => onNavigate(navItems.findIndex((navItem) => navItem.id === item.id))}
              className={`relative text-sm font-medium nav-link ${
                activeSection === item.id ? "active-nav-link" : ""
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.name}
              {activeSection === item.id && (
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-gray-400 to-gray-600 dark:from-gray-400 dark:to-gray-200"
                  layoutId="activeSection"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
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
                <motion.button
                  type="button"
                  key={item.id}
                  className={`text-center py-2 ${activeSection === item.id ? "font-bold" : ""}`}
                  onClick={() => {
                    onNavigate(navItems.findIndex((navItem) => navItem.id === item.id))
                    setIsOpen(false)
                  }}
                  whileHover={{
                    backgroundColor: "rgba(200, 200, 200, 0.1)",
                    scale: 1.02,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {item.name}
                </motion.button>
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

