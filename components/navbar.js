"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useAnimation } from "./animation-provider"
import { motion } from "framer-motion"

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/#about" },
  { name: "Skills", path: "/#skills" },
  { name: "Projects", path: "/#projects" },
  { name: "Experience", path: "/#experience" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/#contact" },
]

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isLoaded } = useAnimation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (path) => {
    if (path === "/") return pathname === "/"
    return pathname.startsWith(path) || pathname.includes(path.substring(1))
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-[rgba(var(--background-start-rgb),0.8)] backdrop-blur-md py-3" : "bg-transparent py-5"
      }`}
      style={{
        transform: isLoaded ? "translateY(0)" : "translateY(-100%)",
        opacity: isLoaded ? 1 : 0,
        transition: "transform 0.5s ease, opacity 0.5s ease, background-color 0.3s ease, padding 0.3s ease",
      }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/" className="text-2xl font-bold">
            <span className="gradient-text">AJ</span>
            <span className="text-[rgb(var(--text-primary))]">.</span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 + 0.3 }}
            >
              <Link
                href={link.path}
                className={`nav-link text-sm font-medium transition-colors hover:text-[rgb(var(--text-primary))] ${
                  isActive(link.path)
                    ? "text-[rgb(var(--text-primary))] active-nav"
                    : "text-[rgb(var(--text-secondary))]"
                }`}
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="md:hidden text-[rgb(var(--text-primary))] hover-cursor"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: mobileMenuOpen ? 0 : "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="md:hidden fixed inset-0 bg-[rgba(var(--background-start-rgb),0.95)] backdrop-blur-md z-50"
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: mobileMenuOpen ? 1 : 0, y: mobileMenuOpen ? 0 : 20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link
                href={link.path}
                className={`text-xl font-medium transition-colors hover:text-[rgb(var(--text-primary))] ${
                  isActive(link.path) ? "text-[rgb(var(--text-primary))]" : "text-[rgb(var(--text-secondary))]"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: mobileMenuOpen ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="absolute top-6 right-6 text-[rgb(var(--text-primary))]"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </motion.button>
        </div>
      </motion.div>
    </header>
  )
}

export default Navbar

