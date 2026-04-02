import { useState } from "react";
import { Check, Copy, MessageCircle, Instagram, Facebook, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PromoFormData, BusinessType } from "./PromoForm";

interface PromoResultsProps {
  data: PromoFormData;
}

/* ── Business-type vocabulary ── */
const bizVocab: Record<BusinessType, { words: string[]; emoji: string; urgency: string }> = {
  fashion: {
    words: ["elevate your style", "turn heads everywhere you go", "express your confidence"],
    emoji: "👗👠✨",
    urgency: "🔥 Styles are selling out fast — don't miss your size!",
  },
  beauty: {
    words: ["unlock your glow-up", "transform your look", "treat yourself to the self-care you deserve"],
    emoji: "💅💇‍♀️✨",
    urgency: "⏳ Limited appointment slots available this week!",
  },
  food: {
    words: ["satisfy your cravings", "taste the freshness in every bite", "indulge in flavors you'll love"],
    emoji: "🍽️🔥😋",
    urgency: "🕐 Order before we sell out today!",
  },
  digital: {
    words: ["get instant results", "unlock powerful value from day one", "work smarter, not harder"],
    emoji: "💻📈🚀",
    urgency: "⚡ Launch offer — price goes up soon!",
  },
  services: {
    words: ["experience trusted expertise", "let the professionals handle it", "reliability you can count on"],
    emoji: "🛠️⭐🤝",
    urgency: "📅 Book now — spots are filling up fast!",
  },
  realestate: {
    words: ["invest in your dream space", "find comfort in the perfect location", "secure your future today"],
    emoji: "🏠🔑🌇",
    urgency: "🏷️ This property won't last — schedule a viewing now!",
  },
  general: {
    words: ["discover something amazing", "get exactly what you need", "quality you can trust"],
    emoji: "⭐🎯🔥",
    urgency: "⏳ Limited stock available — act now!",
  },
};

/* ── Tone modifiers ── */
function toneAdjust(tone: string) {
  switch (tone) {
    case "casual":
      return { opener: "Yo, check this out!", closer: "Hit us up! 🤙", style: "relaxed" };
    case "professional":
      return { opener: "We're pleased to present", closer: "Get in touch today.", style: "formal" };
    case "luxury":
      return { opener: "Introducing an exclusive offering", closer: "Experience the difference.", style: "elegant" };
    case "urgent":
      return { opener: "🚨 DON'T MISS THIS!", closer: "Act NOW before it's gone! 🔥", style: "urgent" };
    case "excited":
      return { opener: "🎉 BIG NEWS!", closer: "Let's gooo! 🚀", style: "hype" };
    default:
      return { opener: "Hey there! 👋", closer: "We'd love to hear from you! 😊", style: "warm" };
  }
}

function generatePromos(d: PromoFormData) {
  const name = d.productName || "our product";
  const biz = d.businessType || "general";
  const price = d.price ? ` for just ${d.price}` : "";
  const features = d.keyFeatures || "premium quality";
  const audience = d.targetAudience || "you";
  const cta = d.cta || "Contact us today";
  const vocab = bizVocab[biz as BusinessType] || bizVocab.general;
  const tone = toneAdjust(d.tone);

  /* ── WhatsApp ── */
  const whatsapp = [
    `${tone.opener}`,
    "",
    `*${name}* is here! ${vocab.emoji}`,
    "",
    `${vocab.words[0].charAt(0).toUpperCase() + vocab.words[0].slice(1)} with *${name}*.`,
    "",
    `✅ ${features}`,
    price ? `💰 Yours${price}` : "",
    `🎯 Perfect for ${audience.toLowerCase()}`,
    "",
    vocab.urgency,
    "",
    `👉 *${cta}*`,
    "",
    tone.closer,
  ]
    .filter(Boolean)
    .join("\n");

  /* ── Instagram ── */
  const hashtags = [
    `#${biz.charAt(0).toUpperCase() + biz.slice(1)}`,
    "#SmallBusiness",
    "#ShopNow",
    `#${name.replace(/\s+/g, "")}`,
    "#SupportLocal",
  ].join(" ");

  const instagram = [
    `${vocab.words[1].charAt(0).toUpperCase() + vocab.words[1].slice(1)}. ✨`,
    "",
    `Introducing *${name}* — ${vocab.words[2]}.`,
    "",
    `🔹 ${features}`,
    price ? `💸 Starting${price}` : "",
    `👤 Made for ${audience.toLowerCase()}`,
    "",
    vocab.urgency,
    "",
    `${cta} 👇`,
    "🔗 Link in bio",
    "",
    hashtags,
  ]
    .filter(Boolean)
    .join("\n");

  /* ── Short Ad Copy ── */
  const adCopy = [
    `${vocab.words[0].charAt(0).toUpperCase() + vocab.words[0].slice(1)}!`,
    `${name}${price} — ${features}.`,
    vocab.urgency,
    `${cta}! 🚀`,
  ].join(" ");

  /* ── Premium ── */
  const premium = [
    `— *${name}* —`,
    "",
    `Where excellence meets ${biz === "realestate" ? "real estate" : biz}.`,
    "",
    `${vocab.words[2].charAt(0).toUpperCase() + vocab.words[2].slice(1)}.`,
    "",
    `▸ ${features}`,
    price ? `▸ Investment:${price}` : "▸ Reach out for exclusive pricing",
    `▸ Curated for ${audience.toLowerCase()}`,
    "",
    vocab.urgency,
    "",
    `${cta}.`,
    "",
    tone.closer,
  ]
    .filter(Boolean)
    .join("\n");

  return { whatsapp, instagram, adCopy, premium };
}

/* ── Result Card ── */
const ResultCard = ({
  icon: Icon,
  label,
  content,
  iconColor,
  accentBorder,
}: {
  icon: React.ElementType;
  label: string;
  content: string;
  iconColor: string;
  accentBorder: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`rounded-2xl border-l-4 ${accentBorder} border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md`}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary">
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
          <span className="text-sm font-bold text-foreground">{label}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="h-8 gap-1.5 rounded-lg text-xs font-medium"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-green-600" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>
      <pre className="whitespace-pre-wrap break-words rounded-xl bg-muted/50 p-4 text-sm leading-relaxed text-foreground font-sans">
        {content}
      </pre>
    </div>
  );
};

const PromoResults = ({ data }: PromoResultsProps) => {
  const promos = generatePromos(data);

  return (
    <div className="space-y-5 px-4 pb-32">
      <div className="space-y-1">
        <h2 className="text-lg font-bold text-foreground">Your Promo Messages</h2>
        <p className="text-sm text-muted-foreground">
          Ready-to-use marketing copy — just copy & paste! 📋
        </p>
      </div>

      <ResultCard
        icon={MessageCircle}
        label="WhatsApp Message"
        content={promos.whatsapp}
        iconColor="text-green-600"
        accentBorder="border-l-green-500"
      />
      <ResultCard
        icon={Instagram}
        label="Instagram Caption"
        content={promos.instagram}
        iconColor="text-pink-500"
        accentBorder="border-l-pink-500"
      />
      <ResultCard
        icon={Facebook}
        label="Short Ad Copy"
        content={promos.adCopy}
        iconColor="text-blue-600"
        accentBorder="border-l-blue-500"
      />
      <ResultCard
        icon={Crown}
        label="Premium / Classy Version"
        content={promos.premium}
        iconColor="text-amber-500"
        accentBorder="border-l-amber-500"
      />
    </div>
  );
};

export default PromoResults;
