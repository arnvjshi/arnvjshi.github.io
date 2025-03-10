"use client"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, ChevronRight } from "lucide-react"

const blogPosts = [
  {
    title: "Building a Retro Game with JavaScript",
    excerpt: "Learn how I created a pixel-art based retro game using vanilla JavaScript and the Tiled map editor.",
    image: "/placeholder.svg?height=300&width=500",
    date: "March 15, 2023",
    readTime: "8 min read",
    slug: "/blog/building-retro-game-javascript",
  },
  {
    title: "Getting Started with Blockchain Development",
    excerpt:
      "A beginner's guide to understanding blockchain technology and building your first decentralized application.",
    image: "/placeholder.svg?height=300&width=500",
    date: "February 22, 2023",
    readTime: "10 min read",
    slug: "/blog/blockchain-development-guide",
  },
  {
    title: "Optimizing MongoDB for Web Applications",
    excerpt: "Tips and tricks for improving the performance of your MongoDB database in web applications.",
    image: "/placeholder.svg?height=300&width=500",
    date: "January 10, 2023",
    readTime: "6 min read",
    slug: "/blog/mongodb-optimization-tips",
  },
]

const BlogSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })

  return (
    <section id="blog" ref={ref} className="py-20 md:py-32 px-4 relative overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Tech <span className="gradient-text">Insights</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            I share my coding experiences, project learnings, and tutorials to help others in their tech journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card gradient-border overflow-hidden rounded-lg"
            >
              <div className="relative overflow-hidden group">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  width={500}
                  height={300}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-400 mb-3">
                  <div className="flex items-center mr-4">
                    <Calendar size={14} className="mr-1" />
                    {post.date}
                  </div>
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    {post.readTime}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <p className="text-gray-300 mb-4">{post.excerpt}</p>
                <Link
                  href={post.slug}
                  className="inline-flex items-center text-primary hover:text-white transition-colors"
                >
                  Read More <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="px-8 py-3 border border-white/20 rounded-full text-white font-medium hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 inline-block"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  )
}

export default BlogSection

