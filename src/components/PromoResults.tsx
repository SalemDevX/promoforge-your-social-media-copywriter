import { useState } from "react";
import { Check, Copy, MessageCircle, Instagram, Facebook, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PromoFormData, BusinessType } from "./PromoForm";

interface PromoResultsProps {
  data: PromoFormData;
}

/* ── Business-type vocabulary ── */
const bizVocab: Record<BusinessType, {
  hooks: string[]; benefits: string[]; emoji: string; urgency: string[];
}> = {
  fashion: {
    hooks: ["That outfit that makes people ask 'where did you get that?'", "When you put this on, you'll feel it — that confidence shift", "Some pieces just hit different. This is one of them"],
    benefits: ["The kind of piece you reach for every single time", "Designed to make you feel like the best-dressed person in the room", "Wear it once and watch the compliments roll in"],
    emoji: "👗✨🔥",
    urgency: ["We made a limited run — once these are gone, they're gone", "This colorway won't come back", "A few sizes left and we're not restocking"],
  },
  beauty: {
    hooks: ["Imagine catching your reflection and actually loving what you see", "That 'I just left the salon' energy — every single day", "This is the glow people will notice before you even say a word"],
    benefits: ["You'll walk out feeling like a whole new person", "The kind of self-care that actually shows results", "Because the way you feel about yourself matters"],
    emoji: "💅✨💇‍♀️",
    urgency: ["Bookings for this week are almost full", "We only have a few openings left", "Spots go fast — especially weekends"],
  },
  food: {
    hooks: ["You know that meal you can't stop thinking about? This is it", "Close your eyes. Imagine the smell. Now imagine the taste", "The kind of food that makes you put your phone down and just enjoy"],
    benefits: ["Every bite made from scratch with ingredients you can actually taste", "This isn't fast food — it's food made with love, served fast", "The flavors hit different when someone actually cares about what they're cooking"],
    emoji: "🍽️😋🔥",
    urgency: ["We prep fresh daily and when it's gone, it's gone", "Today's special is almost sold out", "Order before the lunch rush — trust us on this one"],
  },
  digital: {
    hooks: ["What if you could spend less time grinding and more time growing?", "The difference between hustling harder and hustling smarter is right here", "Built by someone who got tired of the same problems you're facing"],
    benefits: ["Less busywork, more results — that's the whole point", "Designed to pay for itself within the first week", "The kind of tool you'll wonder how you ever worked without"],
    emoji: "💻🚀📈",
    urgency: ["Early pricing goes away soon — this is the lowest it'll ever be", "We're capping access to keep the experience premium", "The intro rate ends this week"],
  },
  services: {
    hooks: ["What if you could hand this off to someone who actually cares about doing it right?", "We've built our reputation one happy client at a time", "The kind of service where you call once and never need to call again"],
    benefits: ["We treat every project like it's for our own family", "Reliable, professional, and genuinely invested in your satisfaction", "Our clients don't just come back — they send their friends"],
    emoji: "⭐🤝🛠️",
    urgency: ["Our calendar is filling up — we'd love to fit you in", "We take on a limited number of projects to keep quality high", "Reach out now so we can lock in your preferred date"],
  },
  realestate: {
    hooks: ["Imagine pulling into this driveway every evening and thinking 'this is mine'", "Some places are houses. This one feels like home the moment you walk in", "The neighborhood, the layout, the light — it all just works"],
    benefits: ["A space where your morning coffee actually feels peaceful", "The kind of investment that grows while you sleep in it", "Room to breathe, space to grow, and a place to call yours"],
    emoji: "🏠🔑🌇",
    urgency: ["Properties in this area don't sit — serious interest is already coming in", "We've had multiple viewing requests this week alone", "At this price point, waiting usually means missing out"],
  },
  general: {
    hooks: ["We made something we're genuinely proud of — and we think you'll love it too", "This started as an idea to solve a real problem. Now it's here", "The kind of thing you didn't know you needed until you tried it"],
    benefits: ["Built with care, backed by people who actually use it themselves", "Quality you can feel the moment you experience it", "Not just another product — a better way to do something you already do"],
    emoji: "⭐🎯🔥",
    urgency: ["We have limited stock and demand has been wild", "This batch is almost spoken for", "Grab yours while we still have them"],
  },
};

/* ── Tone modifiers ── */
function toneAdjust(tone: string) {
  switch (tone) {
    case "casual":
      return { opener: "Yo, real talk —", closer: "Slide into our DMs, we got you 🤙", style: "relaxed" };
    case "professional":
      return { opener: "We're excited to share something special.", closer: "We'd love to connect — reach out anytime.", style: "formal" };
    case "luxury":
      return { opener: "For those who appreciate the finer things.", closer: "Elevate your experience — you deserve nothing less.", style: "elegant" };
    case "urgent":
      return { opener: "🚨 This won't last — read this NOW.", closer: "Seriously, don't sleep on this. Act today! 🔥", style: "urgent" };
    case "excited":
      return { opener: "🎉 OK we literally can't contain our excitement!", closer: "Let's make it happen — we're SO ready! 🚀", style: "hype" };
    default:
      return { opener: "Hey! We've got something you'll love 👋", closer: "We're here whenever you're ready — let's chat! 😊", style: "warm" };
  }
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generatePromos(d: PromoFormData) {
  const name = d.productName || "our product";
  const biz = d.businessType || "general";
  const price = d.price ? ` for just ${d.price}` : "";
  const features = d.keyFeatures || "premium quality";
  const audience = d.targetAudience || "people who know what they want";
  const cta = d.cta || "Reach out today";
  const v = bizVocab[biz as BusinessType] || bizVocab.general;
  const tone = toneAdjust(d.tone);

  /* ── WhatsApp ── */
  const whatsapp = [
    tone.opener,
    "",
    `${pick(v.hooks)}. ${v.emoji}`,
    "",
    `Meet *${name}* — ${pick(v.benefits).toLowerCase()}.`,
    "",
    `Here's what makes it special:`,
    `✅ ${features}`,
    price ? `💰 All yours${price}` : "",
    `🎯 Perfect for ${audience.toLowerCase()}`,
    "",
    `⏳ ${pick(v.urgency)}`,
    "",
    `👉 *${cta}* — we're ready when you are!`,
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
    `${pick(v.hooks)}. ✨`,
    "",
    `Say hello to *${name}* — and say goodbye to settling for less.`,
    "",
    `Why people love it:`,
    `🔹 ${features}`,
    price ? `💸 Starting${price}` : "",
    `👤 Built for ${audience.toLowerCase()}`,
    "",
    `${pick(v.urgency)} 👀`,
    "",
    `${cta} 👇`,
    "🔗 Link in bio",
    "",
    hashtags,
  ]
    .filter(Boolean)
    .join("\n");

  /* ── Short Ad Copy ── */
  const adCopy = `${pick(v.hooks)}. ${name}${price} — ${features}. ${pick(v.urgency)}. ${cta}! 🚀`;

  /* ── Premium ── */
  const premium = [
    `— *${name}* —`,
    "",
    `${pick(v.hooks)}.`,
    "",
    `${pick(v.benefits)}.`,
    "",
    `▸ ${features}`,
    price ? `▸ Investment:${price}` : "▸ Inquire for exclusive pricing",
    `▸ Curated for ${audience.toLowerCase()}`,
    "",
    `${pick(v.urgency)}.`,
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
