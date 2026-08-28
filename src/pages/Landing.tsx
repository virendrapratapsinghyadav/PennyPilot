import ContactSection from "@/landing/ContactSection";
import FeaturesSection from "@/landing/FeaturesSection";
import Footer from "@/landing/Footer";
import HeroSection from "@/landing/HeroSection";
import NavBar from "@/landing/NavBar";
import PricingSection from "@/landing/PricingSection";
import TryItSection from "@/landing/TryItSection";
import UseCaseSection from "@/landing/UseCaseSection";


export default function Landing() {
  return (
    <div className="min-h-screen bg-[#050505] font-sans antialiased">
      <NavBar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <UseCaseSection />
        <TryItSection />
        <PricingSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
