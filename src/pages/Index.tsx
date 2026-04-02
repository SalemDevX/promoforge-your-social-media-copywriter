import { useState, useRef } from "react";
import HeroSection from "@/components/HeroSection";
import PromoForm, { type PromoFormData } from "@/components/PromoForm";
import PromoResults from "@/components/PromoResults";
import PricingTeaser from "@/components/PricingTeaser";

const Index = () => {
  const [formData, setFormData] = useState<PromoFormData | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleGenerate = (data: PromoFormData) => {
    setFormData(data);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleClear = () => {
    setFormData(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-20">
        <h2 className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          PromoForge
        </h2>
        <span className="text-xs font-medium text-muted-foreground rounded-full bg-secondary px-3 py-1">
          Free Beta
        </span>
      </header>

      <HeroSection />

      {/* Form Section */}
      <section className="mx-auto max-w-lg py-6">
        <h2 className="mb-4 px-4 text-lg font-bold text-foreground">Fill in your details</h2>
        <PromoForm
          onGenerate={handleGenerate}
          onClear={handleClear}
          isGenerated={!!formData}
        />
      </section>

      {/* Results */}
      {formData && (
        <section ref={resultsRef} className="mx-auto max-w-lg py-6">
          <PromoResults data={formData} />
        </section>
      )}

      <PricingTeaser />

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © 2026 PromoForge. Craft promos that convert.
      </footer>
    </div>
  );
};

export default Index;
