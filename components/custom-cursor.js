"use client"
import { useEffect, useState } from "react"

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hidden, setHidden] = useState(true)
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [trails, setTrails] = useState([])

  useEffect(() => {
    const addTrail = (x, y) => {
      const trail = { x, y, id: Date.now() }
      setTrails((prevTrails) => [...prevTrails.slice(-15), trail])
    }

    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      addTrail(e.clientX, e.clientY)
      setHidden(false)
    }

    const handleMouseDown = () => setClicked(true)
    const handleMouseUp = () => setClicked(false)

    const handleMouseEnter = () => setHidden(false)
    const handleMouseLeave = () => setHidden(true)

    const handleLinkHoverStart = () => setLinkHovered(true)
    const handleLinkHoverEnd = () => setLinkHovered(false)

    window.addEventListener("mousemove", updatePosition)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("mouseenter", handleMouseEnter)
    window.addEventListener("mouseleave", handleMouseLeave)

    document.querySelectorAll("a, button, .hover-cursor").forEach((el) => {
      el.addEventListener("mouseenter", handleLinkHoverStart)
      el.addEventListener("mouseleave", handleLinkHoverEnd)
    })

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("mouseenter", handleMouseEnter)
      window.removeEventListener("mouseleave", handleMouseLeave)

      document.querySelectorAll("a, button, .hover-cursor").forEach((el) => {
        el.removeEventListener("mouseenter", handleLinkHoverStart)
        el.removeEventListener("mouseleave", handleLinkHoverEnd)
      })
    }
  }, [])

  useEffect(() => {
    // Re-attach event listeners when the DOM changes
    const observer = new MutationObserver(() => {
      document.querySelectorAll("a, button, .hover-cursor").forEach((el) => {
        el.addEventListener("mouseenter", () => setLinkHovered(true))
        el.addEventListener("mouseleave", () => setLinkHovered(false))
      })
    })

    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [])

  // Clean up old trails
  useEffect(() => {
    const interval = setInterval(() => {
      setTrails((prevTrails) => prevTrails.slice(1))
    }, 50)

    return () => clearInterval(interval)
  }, [])

  if (typeof window === "undefined") return null

  return (
    <div className="custom-cursor">
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="cursor-trail"
          style={{
            left: trail.x,
            top: trail.y,
            opacity: index / trails.length,
          }}
        />
      ))}
      <div
        className="cursor-dot"
        style={{
          left: position.x,
          top: position.y,
          opacity: hidden ? 0 : 1,
          width: clicked ? "12px" : "8px",
          height: clicked ? "12px" : "8px",
        }}
      />
      <div
        className="cursor-outline" 
        style={{
          left: position.x,
          top: position.y,
          opacity: hidden ? 0 : 0.5,
          width: linkHovered ? "60px" : "40px",
          height: linkHovered ? "60px" : "40px",
          borderColor: linkHovered ? "rgba(var(--primary), 0.8)" : "rgba(255, 255, 255, 0.5)",
          transition: "width 0.3s, height 0.3s, border-color 0.3s, left 0.1s, top 0.1s",
          transitionTimingFunction: "ease-out",
        }}
      />
    </div>
  )
}

export default CustomCursor

