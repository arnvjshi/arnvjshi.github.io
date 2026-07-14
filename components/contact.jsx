"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Mail, Send, StickyNote, Github, Linkedin, ArrowUpRight } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import MagneticButton from "@/components/magnetic-button"

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef(null)
  const formRef = useRef(null)
  const linksRef = useRef(null)
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      if (formRef.current) {
        const fields = formRef.current.querySelectorAll(".form-field, .submit-btn-wrapper")
        gsap.from(fields, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
          }
        })
      }

      if (linksRef.current) {
        const links = linksRef.current.querySelectorAll(".social-link")
        gsap.from(links, {
          x: -50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: linksRef.current,
            start: "top 85%",
          }
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleFocus = (field) => setFocusedField(field)
  const handleBlur = () => setFocusedField(null)

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    const formUrl =
      "https://docs.google.com/forms/d/e/1FAIpQLSf-Ftv4Mt3YX9puPlulHwhIgo-w8dqf69dDbR5NDP6wDkv5Hg/formResponse";
  
    const formData = new FormData();
    formData.append("entry.578838710", formState.name);
    formData.append("entry.811746656", formState.email);
    formData.append("entry.1900870639", formState.message);
  
    fetch(formUrl, {
      method: "POST",
      mode: "no-cors",
      body: formData,
    })
      .then(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormState({ name: "", email: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 5000);
      })
      .catch((error) => {
        console.error("Form submission error:", error);
        setIsSubmitting(false);
      });
  };

  const socialLinks = [
    {
      name: "Email",
      icon: <Mail className="w-5 h-5" />,
      href: "mailto:arnvjshi@gmail.com",
      label: "arnvjshi@gmail.com",
    },
    {
      name: "GitHub",
      icon: <Github className="w-5 h-5" />,
      href: "https://github.com/arnvjshi",
      label: "github.com/arnvjshi",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://linkedin.com/in/arnav-joshi-aj05",
      label: "arnav-joshi-aj05",
    },
    {
      name: "Resume",
      icon: <StickyNote className="w-5 h-5" />,
      href: "https://raw.githubusercontent.com/arnvjshi/arnvjshi/main/Resume.pdf",
      label: "Download Resume",
    },
  ]

  return (
    <div ref={sectionRef} className="w-full py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.4 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.3em] uppercase text-emerald-400/60 mb-3"
          >
            Connect
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Get In Touch
          </motion.h2>
          <div className="w-12 h-[2px] bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Social Links */}
          <div ref={linksRef} className="lg:col-span-5 space-y-8">
            <div>
              <h3
                className="text-2xl font-bold mb-4 tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Let's build something <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">extraordinary.</span>
              </h3>

              <p className="text-base text-white/50 mb-8 leading-relaxed font-light">
                Whether you have a project in mind, a role to fill, or just want to chat about tech—I'm always open to discussing new opportunities.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="social-link group relative flex items-center justify-between glassmorphic-card-advanced p-5 rounded-2xl overflow-hidden"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="neumorphic-icon-container-3d p-3 rounded-xl text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-300">
                      {link.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm tracking-wide">{link.name}</h4>
                      <p className="text-xs text-white/40 mt-0.5">{link.label}</p>
                    </div>
                  </div>
                  
                  <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-emerald-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 relative z-10" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="relative group/form">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-emerald-500/20 rounded-[2rem] blur-xl opacity-30 group-hover/form:opacity-60 transition duration-1000" />
              
              <form ref={formRef} onSubmit={handleSubmit} className="relative glassmorphic-card-advanced p-8 md:p-10 rounded-[2rem] overflow-hidden">
                {/* Decorative blur elements */}
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-cyan-500/10 rounded-full blur-[60px] pointer-events-none" />
                <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-emerald-500/10 rounded-full blur-[60px] pointer-events-none" />

                <div className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-field relative">
                      <label htmlFor="name" className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'name' || formState.name ? '-top-2.5 text-[10px] px-1 bg-[#0a0a0a] text-emerald-400 font-medium tracking-wider uppercase' : 'top-4 text-sm text-white/30'}`}>
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        onFocus={() => handleFocus("name")}
                        onBlur={handleBlur}
                        required
                        className="w-full bg-white/[0.02] border border-white/10 focus:border-emerald-500/50 rounded-xl px-4 py-4 text-white outline-none transition-all duration-300 hover:bg-white/[0.04]"
                      />
                    </div>

                    <div className="form-field relative">
                      <label htmlFor="email" className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'email' || formState.email ? '-top-2.5 text-[10px] px-1 bg-[#0a0a0a] text-emerald-400 font-medium tracking-wider uppercase' : 'top-4 text-sm text-white/30'}`}>
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        onFocus={() => handleFocus("email")}
                        onBlur={handleBlur}
                        required
                        className="w-full bg-white/[0.02] border border-white/10 focus:border-emerald-500/50 rounded-xl px-4 py-4 text-white outline-none transition-all duration-300 hover:bg-white/[0.04]"
                      />
                    </div>
                  </div>

                  <div className="form-field relative">
                    <label htmlFor="message" className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'message' || formState.message ? '-top-2.5 text-[10px] px-1 bg-[#0a0a0a] text-emerald-400 font-medium tracking-wider uppercase' : 'top-4 text-sm text-white/30'}`}>
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      onFocus={() => handleFocus("message")}
                      onBlur={handleBlur}
                      required
                      rows={5}
                      className="w-full bg-white/[0.02] border border-white/10 focus:border-emerald-500/50 rounded-xl px-4 py-4 text-white outline-none transition-all duration-300 hover:bg-white/[0.04] resize-none"
                    />
                  </div>

                  <div className="submit-btn-wrapper pt-4">
                    <MagneticButton 
                      strength={0.2} 
                      as="div"
                      className="w-full"
                    >
                      <button
                        type="submit" 
                        disabled={isSubmitting} 
                        className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-3 text-sm uppercase tracking-[0.2em] relative overflow-hidden group"
                      >
                        {/* Button Background */}
                        <div className="absolute inset-0 bg-white transition-transform duration-300 group-hover:scale-[1.02]" />
                        
                        {/* Hover Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Button Content */}
                        <div className="relative z-10 flex items-center justify-center gap-3 w-full">
                          {isSubmitting ? (
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                              <svg className="h-5 w-5 text-black group-hover:text-white transition-colors duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                            </motion.div>
                          ) : (
                            <>
                              <span className="text-black group-hover:text-white transition-colors duration-300">Send Message</span>
                              <Send className="w-4 h-4 text-black group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                            </>
                          )}
                        </div>
                      </button>
                    </MagneticButton>
                  </div>

                  <AnimatePresence>
                    {isSubmitted && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        className="text-center text-emerald-400 text-sm font-medium tracking-wide bg-emerald-500/10 py-3 rounded-lg border border-emerald-500/20"
                      >
                        ✓ Message sent successfully! I'll get back to you soon.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
