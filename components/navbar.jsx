"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Sun, Moon, Menu, X } from "lucide-react"
import { gsap } from "gsap"

// eslint-disable-next-line react/prop-types
export default function Navbar({ activeSection = "home", onNavigate = () => {}, scrolled = false }) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const navRef = useRef(null)
  const brandRef = useRef(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // GSAP stagger entrance for nav items
  useEffect(() => {
    if (!navRef.current || !mounted) return

    const ctx = gsap.context(() => {
      const items = navRef.current.querySelectorAll(".nav-item")
      gsap.from(items, {
        y: -30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "power3.out",
        delay: 0.2,
      })

      // Brand entrance
      if (brandRef.current) {
        gsap.from(brandRef.current, {
          x: -20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        })
      }
    }, navRef)

    return () => ctx.revert()
  }, [mounted])

  // Magnetic effect on brand name
  useEffect(() => {
    if (!brandRef.current || typeof window === "undefined") return

    const el = brandRef.current
    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) * 0.15
      const y = (e.clientY - rect.top - rect.height / 2) * 0.15
      gsap.to(el, { x, y, duration: 0.4, ease: "power2.out" })
    }
    const handleMouseLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" })
    }

    el.addEventListener("mousemove", handleMouseMove)
    el.addEventListener("mouseleave", handleMouseLeave)
    return () => {
      el.removeEventListener("mousemove", handleMouseMove)
      el.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [mounted])

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Experience", id: "experience" },
    { name: "Certifications", id: "certifications" },
    { name: "Contact", id: "contact" },
  ]

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 px-4 py-4 md:py-5 transition-all duration-500 ${
        scrolled ? "glassmorphic-nav-scrolled" : "glassmorphic-nav"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <motion.button
          ref={brandRef}
          type="button"
          onClick={() => onNavigate(0)}
          className="relative group"
          whileTap={{ scale: 0.95 }}
        >
          <span
            className="text-xl font-bold tracking-[-0.03em] text-white"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            arnav
            <span className="text-emerald-400">.</span>
          </span>
        </motion.button>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="neumorphic-btn-3d p-2 rounded-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </motion.button>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <motion.button
              type="button"
              key={item.id}
              onClick={() => onNavigate(navItems.findIndex((navItem) => navItem.id === item.id))}
              className={`nav-item relative text-xs font-medium tracking-[0.05em] uppercase nav-link transition-colors duration-300 ${
                activeSection === item.id ? "text-emerald-400 active-nav-link" : "text-white/50 hover:text-white/80"
              }`}
              whileTap={{ scale: 0.95 }}
            >
              {item.name}
              {activeSection === item.id && (
                <motion.span
                  className="absolute -bottom-1 left-0 w-full h-[2px]"
                  style={{ background: "#10b981" }}
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
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="nav-item neumorphic-btn-3d p-2 rounded-full ml-4 hidden md:block"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
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
          <div className="flex flex-col space-y-3 px-4">
            {navItems.map((item) => (
                <motion.button
                  type="button"
                  key={item.id}
                  className={`text-center py-2 text-sm tracking-[0.05em] uppercase transition-colors duration-300 ${
                    activeSection === item.id ? "text-emerald-400 font-bold" : "text-white/50"
                  }`}
                  onClick={() => {
                    onNavigate(navItems.findIndex((navItem) => navItem.id === item.id))
                    setIsOpen(false)
                  }}
                  whileHover={{
                    backgroundColor: "rgba(16, 185, 129, 0.05)",
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
                className="neumorphic-btn-3d py-2 rounded-lg flex justify-center items-center text-sm"
                whileHover={{ backgroundColor: "rgba(16, 185, 129, 0.05)" }}
                whileTap={{ scale: 0.98 }}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <>
                    <Sun size={18} className="mr-2" /> Light Mode
                  </>
                ) : (
                  <>
                    <Moon size={18} className="mr-2" /> Dark Mode
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
