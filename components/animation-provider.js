"use client"
import { createContext, useContext, useEffect, useState } from "react"
import { usePathname } from "next/navigation"

const AnimationContext = createContext({
  isLoaded: false,
  setIsLoaded: () => {},
})

export const useAnimation = () => useContext(AnimationContext)

export const AnimationProvider = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const pathname = usePathname()

  // Reset loaded state on route change
  useEffect(() => {
    setIsLoaded(false)
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [pathname])

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    const handleObserver = () => {
      document.querySelectorAll(".section-fade-in").forEach((el) => {
        observer.observe(el)
      })
    }

    // Initial observation
    if (isLoaded) {
      setTimeout(handleObserver, 100)
    }

    // Re-observe on DOM changes
    const mutationObserver = new MutationObserver(handleObserver)
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [isLoaded])

  return <AnimationContext.Provider value={{ isLoaded, setIsLoaded }}>{children}</AnimationContext.Provider>
}

