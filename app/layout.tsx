import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/theme-provider"
import SmoothScroll from "@/components/smooth-scroll";

export const metadata: Metadata = {
  title: "Arnav Joshi | Software Engineer & Full Stack Developer",
  description: "Portfolio of Arnav Joshi — Software Engineer specializing in scalable backend systems, low-latency APIs, and AI/ML solutions. Experienced with AWS, Docker, Next.js, and modern full-stack architectures.",
  keywords: [
    "Arnav Joshi", 
    "Software Engineer",
    "Full Stack Developer", 
    "Backend Developer",
    "Next.js Developer",
    "TypeScript",
    "Python",
    "FastAPI",
    "PostgreSQL", 
    "MongoDB",
    "AWS Developer",
    "Docker",
    "CI/CD",
    "PyTorch",
    "TensorFlow",
    "Cloud Computing",
    "REST APIs",
    "Microservices",
    "Shri Ramdeobaba College of Engineering", 
    "RCOEM", 
    "Ramdeobaba University", 
    "RBU",
    "Nagpur"
  ],
  generator: "arnavjoshi.vercel.app",
  openGraph: {
    title: "Arnav Joshi | Software Engineer & Full Stack Developer",
    description: "Explore Arnav Joshi's portfolio showcasing expertise in scalable backend systems, AI/ML solutions, and modern full-stack development.",
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
    title: "Arnav Joshi | Software Engineer & Full Stack Developer",
    description: "Portfolio of Arnav Joshi — Software Engineer building scalable backend systems, low-latency APIs, and AI/ML solutions.",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ThemeProvider defaultTheme="dark" attribute="class">
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
