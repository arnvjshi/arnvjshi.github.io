import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Arnav Joshi | Full Stack Developer & Tech Enthusiast",
  description: "Portfolio of Arnav Joshi - Full Stack Developer skilled in Next.js, MongoDB, AWS, and Web3. Passionate about competitive coding and building innovative applications.",
  keywords: [
    "Arnav Joshi", 
    "Full Stack Developer", 
    "Software Engineer", 
    "Next.js Developer", 
    "MongoDB", 
    "AWS Developer", 
    "Web3", 
    "Competitive Programming", 
    "Blockchain", 
    "Cloud Computing", 
    "Shri Ramdeobaba College of Engineering", 
    "RCOEM", 
    "Ramdeobaba University", 
    "RBU",
    "Nagpur"
  ],
  generator: "arnavjoshi.vercel.app",
  openGraph: {
    title: "Arnav Joshi | Full Stack Developer & Tech Enthusiast",
    description: "Explore Arnav Joshi's portfolio showcasing expertise in Next.js, MongoDB, AWS, and Web3 development.",
    url: "https://arnavjoshi.vercel.app",
    siteName: "Arnav Joshi Portfolio",
    images: [
      {
        url: "/arnav.png",
        width: 1200,
        height: 630,
        alt: "Arnav Joshi Portfolio Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arnav Joshi | Full Stack Developer & Tech Enthusiast",
    description: "Portfolio of Arnav Joshi - Full Stack Developer with expertise in Next.js, MongoDB, AWS, and Web3.",
    images: ["/arnav.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://arnavjoshi.vercel.app"),
  alternates: {
    canonical: "https://arnavjoshi.vercel.app",
  },
  authors: [{ name: "Arnav Joshi", url: "https://arnavjoshi.vercel.app" }],
  publisher: "Arnav Joshi",
};


export const viewport: Viewport = {
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
