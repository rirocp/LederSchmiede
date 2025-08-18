import Header from "@/app/components/Header";
import HeroSection from "@/app/components/HeroSection";
import ServicesSection from "@/app/components/ServicesSection";
import AboutUsSection from "@/app/components/AboutUsSection";
import GallerySection from "@/app/components/GallerySection";
import ContactSection from "@/app/components/ContactSection";
import Footer from "@/app/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAF6ED] font-sans">
      <Header />
      <main>
        <HeroSection />
        <AboutUsSection />
        <ServicesSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
