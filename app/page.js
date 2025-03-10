import InteractiveBackground from "@/components/interactive-background"
import VantaBackground from "@/components/vanta-background"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import SkillsSection from "@/components/skills-section"
import ProjectsSection from "@/components/projects-section"
import ExperienceSection from "@/components/experience-section"
import BlogSection from "@/components/blog-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import ScrollIndicator from "@/components/scroll-indicator"

export default function Home() {
  return (
    <main className="overflow-hidden">
      {/* <VantaBackground /> */}
      <InteractiveBackground />
      <HeroSection />
      <ScrollIndicator targetId="about" />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <BlogSection />
      <ContactSection />
      <Footer />
    </main>
  )
}

