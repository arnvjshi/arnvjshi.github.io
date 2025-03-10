"use client"
import { useRef, useEffect } from "react"

const InteractiveButton = ({
  children,
  href,
  className = "",
  variant = "primary",
  magnetic = true,
  glow = false,
  onClick,
  ...props
}) => {
  const buttonRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    if (!magnetic || !buttonRef.current) return

    const button = buttonRef.current
    const text = textRef.current

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      // Calculate distance from center
      const distance = Math.sqrt(x * x + y * y)
      const maxDistance = Math.sqrt(rect.width * rect.width + rect.height * rect.height) / 2
      const strength = 0.5 // Adjust magnetic strength

      // Only apply effect if mouse is close enough
      if (distance < maxDistance) {
        const moveX = (x / maxDistance) * strength * 20 // Max 20px movement
        const moveY = (y / maxDistance) * strength * 20

        button.style.transform = `translate(${moveX}px, ${moveY}px)`

        if (text) {
          // Move text in opposite direction for parallax effect
          text.style.transform = `translate(${-moveX * 0.2}px, ${-moveY * 0.2}px)`
        }
      }
    }

    const handleMouseLeave = () => {
      button.style.transform = "translate(0, 0)"
      if (text) {
        text.style.transform = "translate(0, 0)"
      }
    }

    const handleClick = () => {
      // Add click animation
      button.classList.add("scale-95")
      setTimeout(() => {
        button.classList.remove("scale-95")
      }, 100)
    }

    button.addEventListener("mousemove", handleMouseMove)
    button.addEventListener("mouseleave", handleMouseLeave)
    button.addEventListener("click", handleClick)

    return () => {
      button.removeEventListener("mousemove", handleMouseMove)
      button.removeEventListener("mouseleave", handleMouseLeave)
      button.removeEventListener("click", handleClick)
    }
  }, [magnetic])

  // Determine button classes based on variant
  const baseClasses = "relative overflow-hidden rounded-lg px-6 py-3 font-medium transition-all duration-300"
  const variantClasses = {
    primary: "bg-[rgba(var(--primary),0.1)] border border-[rgba(var(--primary),0.3)] text-[rgb(var(--text-primary))]",
    secondary: "bg-transparent border border-[rgba(var(--text-secondary),0.3)] text-[rgb(var(--text-primary))]",
    accent: "bg-[rgba(var(--accent),0.1)] border border-[rgba(var(--accent),0.3)] text-[rgb(var(--text-primary))]",
  }

  const glowClasses = glow ? "glow" : ""
  const allClasses = `${baseClasses} ${variantClasses[variant]} ${glowClasses} ${className}`

  // Create button or link based on href
  const ButtonOrLink = href ? "a" : "button"
  const linkProps = href ? { href } : {}

  return (
    <ButtonOrLink ref={buttonRef} className={allClasses} onClick={onClick} {...linkProps} {...props}>
      {/* Shine effect overlay */}
      <span className="absolute inset-0 overflow-hidden">
        <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-out"></span>
      </span>

      {/* Button text with potential parallax effect */}
      <span ref={textRef} className="relative z-10 transition-transform duration-200">
        {children}
      </span>
    </ButtonOrLink>
  )
}

export default InteractiveButton

