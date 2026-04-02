import { Rocket } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const PricingTeaser = () => {
  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-lg rounded-2xl border border-border bg-card p-6 text-center shadow-card">
        <Badge className="mb-3 gradient-primary border-0 text-primary-foreground">Coming Soon</Badge>
        <h3 className="mb-2 text-xl font-bold text-foreground">PromoForge Premium</h3>
        <p className="mb-4 text-sm text-muted-foreground">
          AI-powered promos, saved templates, bulk generation, and scheduling — all coming soon.
        </p>
        <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-muted-foreground">
          <Rocket className="h-4 w-4 text-primary" />
          Join the waitlist for early access
        </div>
      </div>
    </section>
  );
};

export default PricingTeaser;
