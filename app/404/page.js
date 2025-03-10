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

const NotFound = () => {
    return (
        <main className="overflow-hidden">
            {/* <VantaBackground /> */}
            <InteractiveBackground />
            <ScrollIndicator targetId="about" />
            <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-3d"
            style={{ transformStyle: "preserve-3d" }}
          >
            <span className="gradient-text">404 - Page Not Found</span>
          </h1>
          <p className="text-l md:text-l lg:text-l font-bold mb-4 text-3d">Sorry, the page you are looking for does not exist.</p>
        <Footer />
        </main>
    );
};

export default NotFound;