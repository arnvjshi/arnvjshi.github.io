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
      } else if (userMessage.includes("project") || userMessage.includes("work")) {
        botResponse =
          "Arnav has worked on several exciting projects including web applications, AI solutions, and mobile apps. You can check them out in the Projects section!"
      } else if (userMessage.includes("contact") || userMessage.includes("hire") || userMessage.includes("email")) {
        botResponse =
          "You can contact Arnav through the Contact form on this page, or directly via email at arnavjoshi0512@gmail.com"
      } else if (userMessage.includes("experience") || userMessage.includes("background")) {
        botResponse =
          "Arnav has experience in full-stack development, machine learning, and UI/UX design. Check out the Experience section for more details!"
      } else if (
        userMessage.includes("skill") ||
        userMessage.includes("technology") ||
        userMessage.includes("tech stack")
      ) {
        botResponse =
          "Arnav is proficient in JavaScript, Python, React, Next.js, Node.js, and various ML frameworks. The Skills section has a complete breakdown!"
      } else if (userMessage.includes("education") || userMessage.includes("study") || userMessage.includes("degree")) {
        botResponse =
          "Arnav has a strong educational background in Computer Science with a focus on AI and web technologies."
      } else if (userMessage.includes("thank")) {
        botResponse = "You're welcome! Feel free to ask if you have any other questions."
      } else {
        botResponse =
          "That's an interesting question! Arnav would be happy to discuss this further. Would you like to reach out to him directly through the contact form?"
      }

      setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }])
    }, 1500)
  }

  return (
    <>
      {/* Chatbot toggle button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 neumorphic-btn-3d p-4 rounded-full text-black dark:text-white"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChat}
        aria-label="Toggle chat"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>

      {/* Chatbot window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed bottom-24 right-6 z-50 w-80 md:w-96 h-[500px] glassmorphic-card-advanced rounded-xl overflow-hidden flex flex-col"
          >
            {/* Chat header */}
            <div className="p-4 border-b border-white/10 dark:border-black/10 flex justify-between items-center bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 dark:from-gray-300 dark:to-gray-500 flex items-center justify-center">
                  <Bot size={18} className="text-white dark:text-gray-900" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Arnav's Assistant</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Always here to help</p>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-gray-900/50">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.sender === "bot" && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 dark:from-gray-300 dark:to-gray-500 flex items-center justify-center mr-2 flex-shrink-0 self-end">
                      <Bot size={16} className="text-white dark:text-gray-900" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-tr-none"
                        : "bg-white dark:bg-gray-800 rounded-tl-none shadow-sm"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block text-right">
                      {message.sender === "user" ? "You" : "Bot"} •{" "}
                      {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>

                  {message.sender === "user" && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 dark:from-gray-400 dark:to-gray-600 flex items-center justify-center ml-2 flex-shrink-0 self-end">
                      <User size={16} className="text-white" />
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
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 dark:from-gray-300 dark:to-gray-500 flex items-center justify-center mr-2 flex-shrink-0 self-end">
                    <Bot size={16} className="text-white dark:text-gray-900" />
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg rounded-tl-none shadow-sm">
                    <div className="flex space-x-1">
                      <motion.div
                        className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8, delay: 0.4 }}
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
              className="p-3 border-t border-white/10 dark:border-black/10 flex gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md"
            >
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Type your message..."
                  className="neumorphic-input-3d w-full px-4 py-3 pr-10 rounded-full text-sm"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <Smile size={18} />
                </button>
              </div>
              <motion.button
                type="submit"
                className="neumorphic-btn-3d p-3 rounded-full bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-300 dark:to-gray-500 text-white dark:text-gray-900"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={input.trim() === ""}
                aria-label="Send message"
              >
                <Send size={18} />
              </motion.button>
            </form>

            {/* Suggested questions */}
            <div className="p-3 border-t border-white/10 dark:border-black/10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Suggested questions:</p>
              <div className="flex flex-wrap gap-2">
                {["What projects have you worked on?", "What are your skills?", "How can I contact you?"].map(
                  (question, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setInput(question)
                        inputRef.current?.focus()
                      }}
                      className="text-xs py-1 px-3 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
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

