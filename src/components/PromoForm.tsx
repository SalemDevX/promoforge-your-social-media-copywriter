import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wand2, RotateCcw } from "lucide-react";

export interface PromoFormData {
  businessType: string;
  productName: string;
  price: string;
  keyFeatures: string;
  targetAudience: string;
  tone: string;
  cta: string;
}

const emptyForm: PromoFormData = {
  businessType: "",
  productName: "",
  price: "",
  keyFeatures: "",
  targetAudience: "",
  tone: "",
  cta: "",
};

interface PromoFormProps {
  onGenerate: (data: PromoFormData) => void;
  onClear: () => void;
  isGenerated: boolean;
}

const PromoForm = ({ onGenerate, onClear, isGenerated }: PromoFormProps) => {
  const [form, setForm] = useState<PromoFormData>(emptyForm);

  const update = (field: keyof PromoFormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(form);
  };

  const handleClear = () => {
    setForm(emptyForm);
    onClear();
  };

  const isValid = form.businessType && form.productName;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 px-4">
      <div className="space-y-2">
        <Label htmlFor="businessType">Business Type</Label>
        <Input
          id="businessType"
          placeholder="e.g. Bakery, Hair Salon, Tech Store"
          value={form.businessType}
          onChange={(e) => update("businessType", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="productName">Product / Service Name</Label>
        <Input
          id="productName"
          placeholder="e.g. Birthday Cakes, Hair Braiding"
          value={form.productName}
          onChange={(e) => update("productName", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Price (optional)</Label>
        <Input
          id="price"
          placeholder="e.g. $25, From $50"
          value={form.price}
          onChange={(e) => update("price", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="keyFeatures">Key Features / Benefits</Label>
        <Textarea
          id="keyFeatures"
          placeholder="e.g. Handmade, Fresh daily, Fast delivery"
          value={form.keyFeatures}
          onChange={(e) => update("keyFeatures", e.target.value)}
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="targetAudience">Target Audience (optional)</Label>
        <Input
          id="targetAudience"
          placeholder="e.g. Busy moms, Young professionals"
          value={form.targetAudience}
          onChange={(e) => update("targetAudience", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Tone of Voice</Label>
        <Select value={form.tone} onValueChange={(v) => update("tone", v)}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a tone" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="friendly">😊 Friendly</SelectItem>
            <SelectItem value="professional">💼 Professional</SelectItem>
            <SelectItem value="excited">🎉 Excited / Hype</SelectItem>
            <SelectItem value="luxury">✨ Luxury / Premium</SelectItem>
            <SelectItem value="casual">😎 Casual / Fun</SelectItem>
            <SelectItem value="urgent">🔥 Urgent / FOMO</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="cta">Call to Action</Label>
        <Input
          id="cta"
          placeholder="e.g. Order now, DM us, Visit our store"
          value={form.cta}
          onChange={(e) => update("cta", e.target.value)}
        />
      </div>

      {/* Sticky bottom bar on mobile */}
      <div className="sticky bottom-0 z-10 -mx-4 border-t border-border bg-background/95 px-4 py-3 backdrop-blur-sm md:static md:mx-0 md:border-0 md:bg-transparent md:px-0 md:py-0 md:backdrop-blur-none">
        <div className="flex gap-3">
          <Button
            type="submit"
            variant="hero"
            size="xl"
            className="flex-1"
            disabled={!isValid}
          >
            <Wand2 className="h-5 w-5" />
            {isGenerated ? "Regenerate" : "Generate Promo"}
          </Button>
          {isGenerated && (
            <Button
              type="button"
              variant="outline"
              size="xl"
              onClick={handleClear}
            >
              <RotateCcw className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};

export default PromoForm;
