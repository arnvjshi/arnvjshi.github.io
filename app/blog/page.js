import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, ChevronLeft } from "lucide-react"

const blogPosts = [
  {
    title: "Building a Retro Game with JavaScript",
    excerpt: "Learn how I created a pixel-art based retro game using vanilla JavaScript and the Tiled map editor.",
    image: "/placeholder.svg?height=300&width=500",
    date: "March 15, 2023",
    readTime: "8 min read",
    slug: "/blog/building-retro-game-javascript",
    categories: ["JavaScript", "Game Development", "Tiled"],
  },
  {
    title: "Getting Started with Blockchain Development",
    excerpt:
      "A beginner's guide to understanding blockchain technology and building your first decentralized application.",
    image: "/placeholder.svg?height=300&width=500",
    date: "February 22, 2023",
    readTime: "10 min read",
    slug: "/blog/blockchain-development-guide",
    categories: ["Blockchain", "Web3", "JavaScript"],
  },
  {
    title: "Optimizing MongoDB for Web Applications",
    excerpt: "Tips and tricks for improving the performance of your MongoDB database in web applications.",
    image: "/placeholder.svg?height=300&width=500",
    date: "January 10, 2023",
    readTime: "6 min read",
    slug: "/blog/mongodb-optimization-tips",
    categories: ["MongoDB", "Database", "Performance"],
  },
  {
    title: "Creating Smooth Animations with GSAP",
    excerpt: "A deep dive into using GSAP for creating smooth and performant animations in web applications.",
    image: "/placeholder.svg?height=300&width=500",
    date: "December 5, 2022",
    readTime: "7 min read",
    slug: "/blog/smooth-animations-gsap",
    categories: ["Animation", "GSAP", "JavaScript"],
  },
  {
    title: "Implementing Authentication in Next.js Applications",
    excerpt: "A comprehensive guide to implementing secure authentication in your Next.js applications.",
    image: "/placeholder.svg?height=300&width=500",
    date: "November 18, 2022",
    readTime: "12 min read",
    slug: "/blog/nextjs-authentication-guide",
    categories: ["Next.js", "Authentication", "Security"],
  },
  {
    title: "Machine Learning Basics for Web Developers",
    excerpt: "An introduction to machine learning concepts for web developers with practical examples.",
    image: "/placeholder.svg?height=300&width=500",
    date: "October 30, 2022",
    readTime: "9 min read",
    slug: "/blog/ml-basics-web-developers",
    categories: ["Machine Learning", "TensorFlow", "JavaScript"],
  },
]

export default function BlogPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto">
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-6">
            <ChevronLeft size={16} className="mr-1" /> Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Tech <span className="gradient-text">Insights</span>
          </h1>
          <p className="text-gray-300 max-w-2xl">
            Sharing my coding experiences, project learnings, and tutorials to help others in their tech journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.title} className="card gradient-border overflow-hidden rounded-lg section-fade-in">
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
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.categories.map((category) => (
                    <span key={category} className="tech-pill">
                      {category}
                    </span>
                  ))}
                </div>
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
                  Read Article
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

