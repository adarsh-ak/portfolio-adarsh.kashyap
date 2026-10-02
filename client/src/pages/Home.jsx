import ThemeToggle from '../components/ThemeToggle'
import StarBackground from '../components/StarBackground'
import { ScrollProgress } from '../components/ScrollProgress'
import { Navbar } from '../components/Navbar'
import { HeroSection } from '../components/HeroSection'
import { AboutSection } from '../components/AboutSection'
import { ProcessSection } from '../components/ProcessSection'
import { SkillsSection } from '../components/SkillsSection'
import { ProjectsSection } from '../components/ProjectsSection'
import { CertificatesSection } from '../components/CertificationsSection'
import { ContactSection } from '../components/ContactSection'
import { Footer } from '../components/Footer'

const Home = () => (
  <div className='min-h-screen bg-background text-foreground overflow-x-hidden'>
    <ScrollProgress />
    <ThemeToggle />
    <StarBackground />
    <Navbar />
    <main>
      <HeroSection />
      <AboutSection />
      <ProcessSection />
      <SkillsSection />
      <ProjectsSection />
      <CertificatesSection />
      <ContactSection />
    </main>
    <Footer />
  </div>
)

export default Home