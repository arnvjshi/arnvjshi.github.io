"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Mail, Github, Linkedin, Send, Instagram } from "lucide-react"

export default function Contact() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState(null)

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleFocus = (field) => {
    setFocusedField(field)
  }

  const handleBlur = () => {
    setFocusedField(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    const formUrl =
      "https://docs.google.com/forms/d/e/1FAIpQLSf-Ftv4Mt3YX9puPlulHwhIgo-w8dqf69dDbR5NDP6wDkv5Hg/formResponse";
  
    const formData = new FormData();
    formData.append("entry.578838710", formState.name); // Name
    formData.append("entry.811746656", formState.email); // Email
    formData.append("entry.1900870639", formState.message); // Message
    console.log(formState.name, formState.email, formState.message);
  
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
  

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const socialLinks = [
    {
      name: "Email",
      icon: <Mail className="w-5 h-5" />,
      href: "mailto:arnavjoshi0512@gmail.com",
      label: "arnavjoshi0512@gmail.com",
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
      label: "linkedin.com/in/arnav-joshi-aj05",
    },
    {
      name: "Instagram",
      icon: <Instagram className="w-5 h-5" />,
      href: "https://instagram.com/arnv_jshi",
      label: "instagram.com/arnv_jshi",
    },
    
  ]

  return (
    <section id="contact" ref={sectionRef} className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400"
        >
          Get In Touch
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            <motion.h3 variants={itemVariants} className="text-2xl font-semibold mb-6">
              Contact Information
            </motion.h3>

            <motion.p variants={itemVariants} className="mb-8">
              Feel free to reach out for collaborations, opportunities, or just to say hello! I'll get back to you as
              soon as possible.
            </motion.p>

            <motion.div variants={itemVariants} className="space-y-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  className="flex items-center gap-4 glassmorphic-card-advanced p-4 rounded-xl"
                  whileHover={{
                    x: 5,
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "rgba(200, 200, 200, 0.1)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.div
                    className="neumorphic-icon-container-3d p-2 rounded-full"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {link.icon}
                  </motion.div>
                  <div>
                    <h4 className="font-medium">{link.name}</h4>
                    <p className="text-sm opacity-75">{link.label}</p>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <motion.form
              variants={itemVariants}
              onSubmit={handleSubmit}
              className="glassmorphic-card-advanced p-6 rounded-xl"
            >
              <div className="space-y-6">
                <motion.div whileHover={{ y: -2 }} animate={focusedField === "name" ? { scale: 1.02 } : { scale: 1 }}>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
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
                    className="neumorphic-input-3d w-full px-4 py-3 rounded-lg transition-all duration-300"
                    placeholder="Your name"
                  />
                </motion.div>

                <motion.div whileHover={{ y: -2 }} animate={focusedField === "email" ? { scale: 1.02 } : { scale: 1 }}>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
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
                    className="neumorphic-input-3d w-full px-4 py-3 rounded-lg transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </motion.div>

                <motion.div
                  whileHover={{ y: -2 }}
                  animate={focusedField === "message" ? { scale: 1.02 } : { scale: 1 }}
                >
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
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
                    className="neumorphic-input-3d w-full px-4 py-3 rounded-lg transition-all duration-300"
                    placeholder="Your message..."
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  className="neumorphic-btn-3d w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2"
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: "rgba(200, 200, 200, 0.2)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
                    >
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </motion.div>
                  ) : (
                    <>
                      Send Message <Send className="w-4 h-4" />
                    </>
                  )}
                </motion.button>

                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-green-500 dark:text-green-400 mt-4 pulse-animation"
                  >
                    Message sent successfully!
                  </motion.div>
                )}
              </div>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

