import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Features } from "@/components/Features";
import { FeaturedAgents } from "@/components/FeaturedAgents";
import { HowItWorks } from "@/components/HowItWorks";
import { FeaturedModels } from "@/components/FeaturedModels";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Stats />
        <Features />
        <FeaturedAgents />
        <HowItWorks />
        <FeaturedModels />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
