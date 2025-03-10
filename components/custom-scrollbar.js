"use client"
import { useEffect, useState } from "react"

const CustomScrollbar = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0)
  const [thumbHeight, setThumbHeight] = useState(30)
  const [isDragging, setIsDragging] = useState(false)
  const [startY, setStartY] = useState(0)
  const [startScrollPercentage, setStartScrollPercentage] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const percentage = (scrollTop / scrollHeight) * 100
      setScrollPercentage(percentage)
    }

    const handleResize = () => {
      const viewportHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const viewportRatio = viewportHeight / documentHeight
      const minThumbHeight = 30
      const calculatedHeight = Math.max(viewportRatio * 150, minThumbHeight)
      setThumbHeight(calculatedHeight)
    }

    handleResize()
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartY(e.clientY)
    setStartScrollPercentage(scrollPercentage)
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return

    const scrollbarHeight = 150
    const deltaY = e.clientY - startY
    const deltaPercentage = (deltaY / scrollbarHeight) * 100
    const newPercentage = Math.min(100, Math.max(0, startScrollPercentage + deltaPercentage))

    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    const newScrollTop = (newPercentage / 100) * scrollHeight

    window.scrollTo({
      top: newScrollTop,
      behavior: "auto",
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    document.removeEventListener("mousemove", handleMouseMove)
    document.removeEventListener("mouseup", handleMouseUp)
  }

  return (
    <div className="custom-scrollbar-container">
      <div
        className="custom-scrollbar-thumb"
        style={{
          height: `${thumbHeight}px`,
          top: `${(scrollPercentage / 100) * (150 - thumbHeight)}px`,
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onMouseDown={handleMouseDown}
      ></div>
    </div>
  )
}

export default CustomScrollbar

