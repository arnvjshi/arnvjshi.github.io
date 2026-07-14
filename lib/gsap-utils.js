import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/**
 * Split text into individual characters/words and animate them in.
 * @param {HTMLElement} element - The element containing text to split
 * @param {object} options - Animation options
 */
export function splitTextAnimation(element, options = {}) {
  if (!element) return null

  const {
    type = "chars", // "chars" | "words"
    duration = 0.8,
    stagger = 0.03,
    ease = "power3.out",
    from = { y: 40, opacity: 0, rotateX: -90 },
    delay = 0,
    scrollTrigger = null,
  } = options

  const text = element.textContent
  element.textContent = ""
  element.style.overflow = "hidden"

  const items = type === "chars" ? text.split("") : text.split(" ")

  items.forEach((item, i) => {
    const span = document.createElement("span")
    span.textContent = type === "chars" ? item : (i < items.length - 1 ? item + "\u00A0" : item)
    span.style.display = "inline-block"
    span.style.willChange = "transform, opacity"
    if (item === " " && type === "chars") {
      span.style.width = "0.3em"
    }
    element.appendChild(span)
  })

  const spans = element.querySelectorAll("span")

  const animConfig = {
    ...from,
    duration,
    stagger,
    ease,
    delay,
  }

  if (scrollTrigger) {
    animConfig.scrollTrigger = scrollTrigger
  }

  return gsap.from(spans, animConfig)
}

/**
 * Magnetic cursor effect — element subtly follows the mouse.
 * @param {HTMLElement} element - The element to apply the effect to
 * @param {number} strength - How strongly the element follows (0-1)
 */
export function magneticEffect(element, strength = 0.3) {
  if (!element || typeof window === "undefined") return null

  const handleMouseMove = (e) => {
    const rect = element.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = (e.clientX - centerX) * strength
    const deltaY = (e.clientY - centerY) * strength

    gsap.to(element, {
      x: deltaX,
      y: deltaY,
      duration: 0.6,
      ease: "power2.out",
    })
  }

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.4)",
    })
  }

  element.addEventListener("mousemove", handleMouseMove)
  element.addEventListener("mouseleave", handleMouseLeave)

  return () => {
    element.removeEventListener("mousemove", handleMouseMove)
    element.removeEventListener("mouseleave", handleMouseLeave)
  }
}

/**
 * Reveal elements on scroll with GSAP ScrollTrigger.
 * @param {string|HTMLElement[]} selector - CSS selector or elements
 * @param {object} options - Animation options
 */
export function revealOnScroll(selector, options = {}) {
  const {
    y = 60,
    opacity = 0,
    duration = 1,
    stagger = 0.12,
    ease = "power3.out",
    start = "top 85%",
    end = "bottom 20%",
    toggleActions = "play none none reverse",
    rotateX = 0,
    scale = 1,
  } = options

  const elements = typeof selector === "string"
    ? gsap.utils.toArray(selector)
    : selector

  if (!elements || elements.length === 0) return null

  return gsap.from(elements, {
    y,
    opacity,
    rotateX,
    scale,
    duration,
    stagger,
    ease,
    scrollTrigger: {
      trigger: elements[0]?.parentElement || elements[0],
      start,
      end,
      toggleActions,
    },
  })
}

/**
 * Parallax effect on scroll.
 * @param {HTMLElement} element - The element to apply parallax to
 * @param {number} speed - Parallax speed multiplier
 */
export function parallaxEffect(element, speed = 0.5) {
  if (!element) return null

  return gsap.to(element, {
    y: () => speed * 100,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  })
}

/**
 * Animate a number counting up from 0 to target.
 * @param {HTMLElement} element - The element to display the number
 * @param {number} target - The target number
 * @param {number} duration - Animation duration in seconds
 * @param {string} suffix - Optional suffix (e.g., "+", "%")
 */
export function countUp(element, target, duration = 2, suffix = "") {
  if (!element) return null

  const obj = { val: 0 }

  return gsap.to(obj, {
    val: target,
    duration,
    ease: "power2.out",
    onUpdate: () => {
      element.textContent = Math.round(obj.val) + suffix
    },
    scrollTrigger: {
      trigger: element,
      start: "top 90%",
      toggleActions: "play none none none",
    },
  })
}

/**
 * Stagger-in children of a container.
 * @param {HTMLElement} container - Parent container
 * @param {string} childSelector - Selector for children
 * @param {object} options - Animation options
 */
export function staggerChildren(container, childSelector, options = {}) {
  if (!container) return null

  const {
    y = 40,
    opacity = 0,
    duration = 0.7,
    stagger = 0.1,
    ease = "power3.out",
    delay = 0,
  } = options

  const children = container.querySelectorAll(childSelector)

  return gsap.from(children, {
    y,
    opacity,
    duration,
    stagger,
    ease,
    delay,
  })
}
