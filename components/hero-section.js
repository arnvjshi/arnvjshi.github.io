"use client"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { ArrowDown, ExternalLink } from "lucide-react"
import { useAnimation } from "./animation-provider"
import * as THREE from "three"

// Tech icons data with proper images
const techIcons = [
  { name: "Next.js", icon: "/nextjs.svg?height=60&width=60", color: "#000000" },
  { name: "React", icon: "/react.svg?height=60&width=60", color: "#61DAFB" },
  { name: "Firebase", icon: "/firebase.svg?height=60&width=60", color: "#FFCA28" },
  { name: "AWS", icon: "/aws.svg?height=60&width=60", color: "#FF9900" },
  { name: "MongoDB", icon: "/mongodb.svg?height=60&width=60", color: "#47A248" },
  { name: "Node.js", icon: "/nodejs.svg?height=60&width=60", color: "#339933" },
  { name: "JavaScript", icon: "/javascript.svg?height=60&width=60", color: "#F7DF1E" },
  { name: "Python", icon: "/python.svg?height=60&width=60", color: "#3776AB" },
]

const HeroSection = () => {
  const { isLoaded } = useAnimation()
  const heroRef = useRef(null)
  const nameRef = useRef(null)
  const textRef = useRef(null)
  const orbitRef = useRef(null)
  const [activeIcon, setActiveIcon] = useState(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const animationRef = useRef(null)
  const iconsRef = useRef([])
  const [magneticButtons, setMagneticButtons] = useState([])

  useEffect(() => {
    if (isLoaded && heroRef.current) {
      // Typing effect
      const roles = ["Web Developer", "ML Enthusiast", "Blockchain Developer", "Problem Solver"]
      let currentRole = 0
      let currentChar = 0
      let isDeleting = false
      let typingSpeed = 100

      const typeWriter = () => {
        const role = roles[currentRole]

        if (isDeleting) {
          textRef.current.textContent = role.substring(0, currentChar - 1)
          currentChar--
          typingSpeed = 50
        } else {
          textRef.current.textContent = role.substring(0, currentChar + 1)
          currentChar++
          typingSpeed = 100
        }

        if (!isDeleting && currentChar === role.length) {
          isDeleting = true
          typingSpeed = 1000 // Pause at the end
        } else if (isDeleting && currentChar === 0) {
          isDeleting = false
          currentRole = (currentRole + 1) % roles.length
          typingSpeed = 500 // Pause before typing next role
        }

        setTimeout(typeWriter, typingSpeed)
      }

      setTimeout(typeWriter, 1000)

      // Initialize magnetic buttons
      const buttons = document.querySelectorAll(".magnetic-btn")
      setMagneticButtons(Array.from(buttons))
    }
  }, [isLoaded])

  // 3D text effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!nameRef.current) return

      const { clientX, clientY } = e
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight

      // Calculate mouse position relative to the center of the screen
      const mouseX = (clientX / windowWidth) * 2 - 1
      const mouseY = (clientY / windowHeight) * 2 - 1

      setMousePosition({ x: mouseX, y: mouseY })

      // Apply 3D rotation effect to the name with enhanced movement
      nameRef.current.style.transform = `perspective(1000px) rotateY(${mouseX * 10}deg) rotateX(${-mouseY * 10}deg) translateZ(10px)`

      // Apply magnetic effect to buttons
      magneticButtons.forEach((btn) => {
        const rect = btn.getBoundingClientRect()
        const btnX = rect.left + rect.width / 2
        const btnY = rect.top + rect.height / 2

        const distanceX = clientX - btnX
        const distanceY = clientY - btnY
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

        if (distance < 100) {
          const magneticPull = 40 * (1 - distance / 100)
          const moveX = (distanceX / distance) * magneticPull
          const moveY = (distanceY / distance) * magneticPull
          btn.style.transform = `translate(${moveX}px, ${moveY}px)`
        } else {
          btn.style.transform = "translate(0px, 0px)"
        }
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [magneticButtons])

  // Setup 3D orbital system for tech icons
  useEffect(() => {
    if (!orbitRef.current || !isLoaded) return

    // Create orbital paths for icons
    const createOrbitalSystem = () => {
      const container = orbitRef.current
      const containerRect = container.getBoundingClientRect()

      // Clear previous icons
      while (container.firstChild) {
        container.removeChild(container.firstChild)
      }

      // Create new icon elements
      const iconElements = []

      techIcons.forEach((tech, index) => {
        const iconElement = document.createElement("div")
        iconElement.className = "tech-icon"
        iconElement.dataset.name = tech.name

        // Create image element
        const img = document.createElement("img")
        img.src = tech.icon
        img.alt = tech.name
        img.width = 40
        img.height = 40
        img.className = "rounded-full"

        iconElement.appendChild(img)
        container.appendChild(iconElement)

        // Store reference to the element
        iconElements.push({
          element: iconElement,
          angle: (index / techIcons.length) * Math.PI * 2,
          radius: 150, // Base radius
          speed: 0.0005 + index * 0.0001, // Slightly different speeds
          verticalOffset: Math.sin(index) * 30, // Vertical variation
          originalAngle: (index / techIcons.length) * Math.PI * 2, // Store original angle for reset
        })

        // Add event listeners
        iconElement.addEventListener("mouseenter", () => {
          setActiveIcon(tech.name)
          iconElement.style.zIndex = "10"

          // Pause all other icons
          iconElements.forEach((icon) => {
            if (icon.element !== iconElement) {
              icon.pausedSpeed = icon.speed
              icon.speed = 0
            }
          })
        })

        iconElement.addEventListener("mouseleave", () => {
          setActiveIcon(null)
          iconElement.style.zIndex = "1"

          // Resume all icons
          iconElements.forEach((icon) => {
            if (icon.pausedSpeed !== undefined) {
              icon.speed = icon.pausedSpeed
              delete icon.pausedSpeed
            }
          })
        })

        // Add click event for more interactivity
        iconElement.addEventListener("click", () => {
          // Create a ripple effect
          const ripple = document.createElement("div")
          ripple.className = "absolute w-full h-full rounded-full bg-[rgba(var(--primary),0.3)] z-0"
          ripple.style.transform = "scale(0)"
          iconElement.appendChild(ripple)

          // Animate ripple
          setTimeout(() => {
            ripple.style.transform = "scale(3)"
            ripple.style.opacity = "0"
            ripple.style.transition = "transform 0.6s ease-out, opacity 0.6s ease-out"

            // Remove ripple after animation
            setTimeout(() => {
              iconElement.removeChild(ripple)
            }, 600)
          }, 10)

          // Temporarily increase speed dramatically
          const originalSpeed = icon.speed
          icon.speed = originalSpeed * 10

          setTimeout(() => {
            icon.speed = originalSpeed
          }, 1000)
        })
      })

      iconsRef.current = iconElements
    }

    createOrbitalSystem()

    // Animation loop for orbital movement
    const animate = () => {
      iconsRef.current.forEach((icon) => {
        // Update angle based on speed
        icon.angle += icon.speed

        // Calculate 3D position
        const x = Math.cos(icon.angle) * icon.radius
        const z = Math.sin(icon.angle) * icon.radius
        const y = icon.verticalOffset

        // Apply mouse influence for interactive effect
        const mouseInfluenceX = mousePosition.x * 30
        const mouseInfluenceY = mousePosition.y * 30

        // Apply 3D transform
        icon.element.style.transform = `translate3d(${x + mouseInfluenceX}px, ${y + mouseInfluenceY}px, ${z}px)`

        // Scale based on z position for perspective effect
        const scale = THREE.MathUtils.mapLinear(z, -icon.radius, icon.radius, 0.8, 1.2)
        icon.element.style.scale = scale

        // Opacity based on z position
        const opacity = THREE.MathUtils.mapLinear(z, -icon.radius, icon.radius, 0.6, 1)
        icon.element.style.opacity = opacity
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      createOrbitalSystem()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", handleResize)
    }
  }, [isLoaded, mousePosition])

  // Scroll to next section
  const scrollToNext = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden"
      style={{
        opacity: isLoaded ? 1 : 0,
        transition: "opacity 1s ease",
      }}
    >
      <div className="max-w-4xl mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <h1
            ref={nameRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-3d"
            style={{ transformStyle: "preserve-3d" }}
          >
            Hi, I'm <span className="gradient-text">Arnav Joshi</span>
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-6">
            I'm a <span ref={textRef} className="gradient-text"></span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col md:flex-row justify-center gap-4 mt-8"
        >
          <a href="#projects" className="btn-primary magnetic-btn glow">
            View My Work
          </a>
          <a href="#contact" className="btn-secondary magnetic-btn">
            Get In Touch
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8"
        >
          <a
            href="https://github.com/arnvjshi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors animated-underline"
          >
            <span className="mr-2">Check out my GitHub</span>
            <ExternalLink size={16} />
          </a>
        </motion.div>
      </div>

      {/* 3D Orbital Tech Icons */}
      <div
        ref={orbitRef}
        className="tech-orbit-container"
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          transformStyle: "preserve-3d",
          perspective: "1000px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Icons will be dynamically added here */}
      </div>

      {/* Active icon tooltip */}
      {activeIcon && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          className="absolute bg-[rgba(var(--surface),0.8)] px-3 py-2 rounded text-sm whitespace-nowrap z-50 backdrop-blur-sm border border-[rgba(var(--primary),0.3)]"
          style={{
            top: "60%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {activeIcon}
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="scroll-indicator"
        onClick={scrollToNext}
      >
        <ArrowDown className="text-[rgb(var(--primary))]" />
      </motion.div>
    </section>
  )
}

export default HeroSection

