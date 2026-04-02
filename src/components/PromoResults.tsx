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
    hooks: ["Your next obsession just dropped", "This is the look everyone's asking about", "Stop scrolling — you need to see this"],
    benefits: ["Feel unstoppable every time you step out", "Pieces that actually get you compliments", "Designed for people who don't follow trends — they set them"],
    emoji: "👗✨🔥",
    urgency: ["Sizes are disappearing — grab yours before they're gone", "This drop won't be restocked", "Last chance to snag this before it sells out"],
  },
  beauty: {
    hooks: ["Your glow-up starts right here", "This is the secret your skin's been waiting for", "Warning: you might not recognize yourself after this"],
    benefits: ["Walk out feeling like the best version of you", "Self-care that actually delivers results", "Because you deserve to look in the mirror and smile"],
    emoji: "💅✨💇‍♀️",
    urgency: ["Appointments are filling up — don't wait", "Only a few slots left this week", "Book now or miss out until next month"],
  },
  food: {
    hooks: ["Your taste buds called — they want this", "One bite and you'll be hooked", "This is the meal you've been craving all week"],
    benefits: ["Made fresh, made right, made for you", "Real ingredients, real flavor, zero compromise", "The kind of food that makes you close your eyes and go 'mmm'"],
    emoji: "🍽️😋🔥",
    urgency: ["We sell out every day — order early", "Today's batch is almost gone", "Limited servings available — first come, first served"],
  },
  digital: {
    hooks: ["This is the shortcut you didn't know you needed", "Stop wasting time — there's a better way", "What if you could get twice the results in half the time?"],
    benefits: ["Built to save you hours and make you money", "No fluff, no filler — just results", "The tool smart business owners are switching to"],
    emoji: "💻🚀📈",
    urgency: ["Launch pricing ends soon — lock it in now", "This deal disappears at midnight", "Early adopters get the best price — don't sleep on it"],
  },
  services: {
    hooks: ["Finally, someone who actually gets the job done right", "Tired of unreliable service? We hear you", "This is what stress-free looks like"],
    benefits: ["We show up on time, deliver on promises, and earn your trust", "Hundreds of happy clients can't be wrong", "Professional results without the runaround"],
    emoji: "⭐🤝🛠️",
    urgency: ["Our schedule fills up fast — book your spot", "We only take on a limited number of clients each month", "Secure your booking before the week fills up"],
  },
  realestate: {
    hooks: ["Picture yourself waking up here every morning", "This isn't just a property — it's your next chapter", "Homes like this don't stay on the market long"],
    benefits: ["The location, the space, the lifestyle — it all clicks", "An investment that pays you back in comfort and value", "Where your family's best memories are waiting to happen"],
    emoji: "🏠🔑🌇",
    urgency: ["Viewings are booking up — schedule yours today", "At this price, it won't last the weekend", "Serious buyers are already circling — don't miss your window"],
  },
  general: {
    hooks: ["You're going to want to hear about this", "Here's something that actually lives up to the hype", "We made this with people like you in mind"],
    benefits: ["Quality that speaks for itself", "Built to solve a real problem, not just look good", "The kind of value that keeps customers coming back"],
    emoji: "⭐🎯🔥",
    urgency: ["Stock is limited — once it's gone, it's gone", "This offer expires soon", "Don't wait — the best deals go first"],
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
