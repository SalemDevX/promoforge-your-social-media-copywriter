import { useState } from "react";
import { Check, Copy, MessageCircle, Instagram, Facebook, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PromoFormData } from "./PromoForm";

interface PromoResultsProps {
  data: PromoFormData;
}

function generatePromos(d: PromoFormData) {
  const name = d.productName || "our product";
  const biz = d.businessType || "business";
  const price = d.price ? ` for just ${d.price}` : "";
  const features = d.keyFeatures || "top quality";
  const audience = d.targetAudience || "everyone";
  const cta = d.cta || "Contact us today";

  const whatsapp = `🔥 *${name}* is here!\n\nLooking for the best ${biz.toLowerCase()} experience? We've got you covered!\n\n✅ ${features}\n💰 Get yours${price}\n👥 Perfect for ${audience.toLowerCase()}\n\n${cta}! 📲\n\nDon't miss out — limited availability! ⏳`;

  const instagram = `✨ ${name} — made for YOU.\n\nWe're a ${biz.toLowerCase()} that takes pride in ${features.toLowerCase()}.\n\n${price ? `💸 Starting${price}` : ""}\n🎯 Built for ${audience.toLowerCase()}\n\n${cta} 👇\nLink in bio 🔗\n\n#${biz.replace(/\s+/g, "")} #SmallBusiness #ShopNow #${name.replace(/\s+/g, "")}`;

  const adCopy = `${name}${price}. ${features}. ${cta}! 🚀`;

  const premium = `Introducing *${name}* — where excellence meets ${biz.toLowerCase()}.\n\nCrafted with precision. Designed for the discerning ${audience.toLowerCase()}.\n\n${features}.\n\n${price ? `Investment:${price}` : "Reach out for exclusive pricing."}\n\n${cta}.\n\n— ${biz}`;

  return { whatsapp, instagram, adCopy, premium };
}

const ResultCard = ({
  icon: Icon,
  label,
  content,
  iconColor,
}: {
  icon: React.ElementType;
  label: string;
  content: string;
  iconColor: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className={`h-5 w-5 ${iconColor}`} />
          <span className="text-sm font-semibold text-foreground">{label}</span>
        </div>
        <Button variant="ghost" size="sm" onClick={handleCopy} className="h-8 gap-1.5 text-xs">
          {copied ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>
      <pre className="whitespace-pre-wrap break-words rounded-xl bg-secondary/50 p-3 text-sm leading-relaxed text-foreground font-sans">
        {content}
      </pre>
    </div>
  );
};

const PromoResults = ({ data }: PromoResultsProps) => {
  const promos = generatePromos(data);

  return (
    <div className="space-y-4 px-4 pb-32">
      <h2 className="text-lg font-bold text-foreground">Your Promo Messages</h2>

      <ResultCard
        icon={MessageCircle}
        label="WhatsApp Message"
        content={promos.whatsapp}
        iconColor="text-green-600"
      />
      <ResultCard
        icon={Instagram}
        label="Instagram Caption"
        content={promos.instagram}
        iconColor="text-pink-500"
      />
      <ResultCard
        icon={Facebook}
        label="Short Ad Copy"
        content={promos.adCopy}
        iconColor="text-blue-600"
      />
      <ResultCard
        icon={Crown}
        label="Premium / Classy Version"
        content={promos.premium}
        iconColor="text-amber-500"
      />
    </div>
  );
};

export default PromoResults;
