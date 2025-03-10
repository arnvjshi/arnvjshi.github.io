import { Space_Grotesk, Inter } from "next/font/google"
import dynamic from 'next/dynamic';
import "./globals.css"
import CustomCursor from "@/components/custom-cursor"
import Navbar from "@/components/navbar"
import { AnimationProvider } from "@/components/animation-provider"
import LoadingAnimation from "@/components/loading-animation"
import CustomScrollbar from "@/components/custom-scrollbar"

// Only using 2 fonts: Space Grotesk for headings and Inter for body text
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata = {
  title: "Arnav Joshi | Developer & Tech Enthusiast",
  description:
    "Portfolio of Arnav Joshi, a passionate developer specializing in web development, machine learning, cloud computing, and blockchain.",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} font-sans bg-[rgb(var(--background))] text-[rgb(var(--foreground))] antialiased`}
      >
        <AnimationProvider>
          <LoadingAnimation />
          <CustomCursor />
          <CustomScrollbar />
          <Navbar />
          {children}
        </AnimationProvider>
      </body>
    </html>
  )
}



import './globals.css'