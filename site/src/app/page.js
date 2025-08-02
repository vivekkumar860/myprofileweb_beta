
import Navigation from "../components/Navigation";
import EnhancedHomepage from "../components/EnhancedHomepage";
import About from "../components/About";
import EnhancedSkills from "../components/EnhancedSkills";
import EnhancedWorkShowcase from "../components/EnhancedWorkShowcase";
import Certificates from "../components/Certificates";
import Achievements from "../components/Achievements";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <EnhancedHomepage />
        <About />
        <EnhancedSkills />
        <EnhancedWorkShowcase />
        <Certificates />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
