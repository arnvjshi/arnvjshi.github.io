"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X, Send, Bot, User, Smile } from "lucide-react"

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { text: "Hi there! I'm Arnav's virtual assistant. How can I help you today?", sender: "bot" },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
    }
  }, [isOpen])

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim() === "") return

    // Add user message
    setMessages([...messages, { text: input, sender: "user" }])
    setInput("")

    // Show typing indicator
    setIsTyping(true)

    // Simulate bot response after a delay
    setTimeout(() => {
      setIsTyping(false)

      // Determine response based on user input
      const userMessage = input.toLowerCase()
      let botResponse = ""

      if (userMessage.includes("hello") || userMessage.includes("hi") || userMessage.includes("hey")) {
        botResponse = "Hello! How can I assist you with Arnav's portfolio today?"
      } else if (userMessage.includes("project") || userMessage.includes("work") || userMessage.includes("built")) {
        botResponse =
          "Arnav has built some impressive projects! ThreatDetect Dashboard (97.4% accuracy AI surveillance), EduBot (AI learning platform with Gemini), AI Misinformation Detection Agent (92% accuracy), and ClipMind AI (video highlight detection). Check the Projects section for details!"
      } else if (userMessage.includes("contact") || userMessage.includes("hire") || userMessage.includes("email")) {
        botResponse =
          "You can reach Arnav at arnvjshi@gmail.com, connect on LinkedIn (arnav-joshi-aj05), or use the Contact form on this page!"
      } else if (userMessage.includes("experience") || userMessage.includes("intern") || userMessage.includes("work")) {
        botResponse =
          "Arnav has interned at AILifeBot (Software Developer, building REST APIs), Youniformwala (Full Stack Developer, Next.js + FastAPI e-Commerce platform), EduSkills/AWS Academy (Cloud Virtual Intern), and CompEx 2025 (Tech Intern, React + Firebase). Check the Experience section!"
      } else if (
        userMessage.includes("skill") ||
        userMessage.includes("technology") ||
        userMessage.includes("tech stack") ||
        userMessage.includes("language")
      ) {
        botResponse =
          "Arnav is proficient in JavaScript, TypeScript, Python, Java, C, and SQL. For frameworks: React, Next.js, Node.js, Express, Flask, FastAPI. Cloud: AWS (EC2, Lambda, S3), Azure, Docker. AI/ML: TensorFlow, PyTorch, OpenCV. Check the Skills section for the full breakdown!"
      } else if (userMessage.includes("education") || userMessage.includes("study") || userMessage.includes("degree") || userMessage.includes("college")) {
        botResponse =
          "Arnav is pursuing B.Tech in Information Technology (Honors) at Shri Ramdeobaba College of Engineering and Management, Nagpur (2023-2027) with a 9.18 CGPA."
      } else if (userMessage.includes("certification") || userMessage.includes("certificate") || userMessage.includes("aws")) {
        botResponse =
          "Arnav has certifications in Cloud Architecting (AWS, 60hrs), Data Engineering (AWS, 40hrs), Computer Vision (IBM), Python Programming (Google/Coursera), and Cybersecurity Architecture (IBM/Coursera). Check the Certifications section!"
      } else if (userMessage.includes("achievement") || userMessage.includes("dsa") || userMessage.includes("leetcode") || userMessage.includes("open source")) {
        botResponse =
          "Arnav has solved 400+ DSA problems on LeetCode and other platforms, maintained a 200+ day coding streak, contributed to open-source projects at OpenSauced (Pizza CLI) and AutoMQ, and participated in national-level hackathons!"
      } else if (userMessage.includes("thank")) {
        botResponse = "You're welcome! Feel free to ask if you have any other questions about Arnav."
      } else if (userMessage.includes("resume") || userMessage.includes("cv")) {
        botResponse =
          "You can download Arnav's resume from the Contact section, or directly from GitHub: github.com/arnvjshi/arnvjshi"
      } else {
        botResponse =
          "That's a great question! Arnav would be happy to discuss this further. Would you like to reach out to him directly at arnvjshi@gmail.com or use the contact form?"
      }

      setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }])
    }, 1500)
  }

  return (
    <>
      {/* Chatbot toggle button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full text-white"
        style={{
          background: "linear-gradient(135deg, #10b981, #059669)",
          boxShadow: "0 4px 20px rgba(16, 185, 129, 0.3)",
        }}
        whileHover={{ scale: 1.1, boxShadow: "0 6px 30px rgba(16, 185, 129, 0.4)" }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChat}
        aria-label="Toggle chat"
      >
        {isOpen ? <X size={22} /> : <MessageSquare size={22} />}
      </motion.button>

      {/* Chatbot window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed bottom-24 right-6 z-50 w-80 md:w-96 h-[500px] rounded-xl overflow-hidden flex flex-col border border-white/[0.08]"
            style={{
              background: "rgba(10, 10, 10, 0.95)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Chat header */}
            <div className="p-4 border-b border-white/[0.06] flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Bot size={16} className="text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-white">Arnav's Assistant</h3>
                  <p className="text-[10px] text-white/40">Always here to help</p>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="p-1.5 rounded-full hover:bg-white/[0.06] transition-colors"
                aria-label="Close chat"
              >
                <X size={16} className="text-white/40" />
              </button>
            </div>

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.sender === "bot" && (
                    <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center mr-2 flex-shrink-0 self-end">
                      <Bot size={14} className="text-emerald-400" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message.sender === "user"
                        ? "bg-emerald-500/20 text-white rounded-tr-none border border-emerald-500/10"
                        : "bg-white/[0.04] text-white/80 rounded-tl-none border border-white/[0.06]"
                    }`}
                  >
                    <p className="text-[13px] leading-relaxed">{message.text}</p>
                  </div>

                  {message.sender === "user" && (
                    <div className="w-7 h-7 rounded-full bg-white/[0.08] flex items-center justify-center ml-2 flex-shrink-0 self-end">
                      <User size={14} className="text-white/60" />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center mr-2 flex-shrink-0 self-end">
                    <Bot size={14} className="text-emerald-400" />
                  </div>
                  <div className="bg-white/[0.04] p-3 rounded-lg rounded-tl-none border border-white/[0.06]">
                    <div className="flex space-x-1">
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full bg-emerald-400/60"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: 0 }}
                      />
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full bg-emerald-400/60"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full bg-emerald-400/60"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Chat input */}
            <form
              onSubmit={handleSubmit}
              className="p-3 border-t border-white/[0.06] flex gap-2"
            >
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Type your message..."
                  className="neumorphic-input-3d w-full px-4 py-2.5 pr-10 rounded-full text-sm"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/20 hover:text-white/40"
                >
                  <Smile size={16} />
                </button>
              </div>
              <motion.button
                type="submit"
                className="p-2.5 rounded-full text-white"
                style={{
                  background: input.trim() ? "linear-gradient(135deg, #10b981, #059669)" : "rgba(255,255,255,0.04)",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={input.trim() === ""}
                aria-label="Send message"
              >
                <Send size={16} />
              </motion.button>
            </form>

            {/* Suggested questions */}
            <div className="p-3 border-t border-white/[0.06]">
              <p className="text-[10px] text-white/30 mb-2 uppercase tracking-[0.1em]">Suggested</p>
              <div className="flex flex-wrap gap-1.5">
                {["What projects has Arnav built?", "Tell me about his skills", "How can I contact him?", "What certifications does he have?"].map(
                  (question, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setInput(question)
                        inputRef.current?.focus()
                      }}
                      className="text-[11px] py-1 px-2.5 rounded-full bg-white/[0.04] border border-white/[0.06] hover:border-emerald-500/20 hover:text-emerald-400 transition-colors text-white/40"
                    >
                      {question}
                    </button>
                  ),
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
