import { Sparkles, Zap } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="gradient-hero px-4 pt-12 pb-8 text-center">
      <div className="mx-auto max-w-lg">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
          <Sparkles className="h-4 w-4" />
          Free Promo Generator
        </div>
        <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
          Craft Killer Promos in <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Seconds</span>
        </h1>
        <p className="mb-6 text-base text-muted-foreground md:text-lg">
          Generate ready-to-post promotional messages for WhatsApp, Instagram & Facebook. No copywriter needed.
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Zap className="h-4 w-4 text-primary" />
          Used by 2,000+ small businesses
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
