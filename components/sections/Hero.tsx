"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, CheckCircle2, Send, Star } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const sampleCards = [
  {
    recipient: "Marie, infirmière",
    text: "Vous avez tenu ma main dans les moments les plus durs. Je n'oublierai jamais.",
    from: "Lucas R.",
    status: "Transmis",
    accent: "#00f0ff",
    className: "-rotate-2 top-0 left-0 z-10",
  },
  {
    recipient: "Thomas, professeur",
    text: "Grâce à vous j'ai compris que j'en étais capable. Dix ans plus tard, je me souviens encore.",
    from: "Amina K.",
    status: "Transmis",
    accent: "#bf00ff",
    className: "rotate-[2deg] top-12 left-6 z-20",
  },
  {
    recipient: "Élodie, bénévole",
    text: "Votre générosité silencieuse méritait d'être nommée. Merci d'exister.",
    from: "Karim B.",
    status: "En attente",
    accent: "#ff2d78",
    className: "-rotate-1 top-24 left-2 z-30",
  },
];

const stats = [
  { value: "2 400+", label: "Messages transmis" },
  { value: "98 %",   label: "Satisfaction" },
  { value: "12 h",   label: "Délai moyen" },
];

const trustPoints = [
  "Message personnalisé avec template décoré",
  "Envoi via Facebook Messenger par notre équipe",
  "Validation admin avant chaque transmission",
];

/* ─────────────────────────────────────────
   MESSAGE CARD
───────────────────────────────────────── */
interface CardProps {
  recipient: string;
  text: string;
  from: string;
  status: string;
  accent: string;
  className?: string;
}

function MessageCard({ recipient, text, from, status, accent, className }: CardProps) {
  const ok = status === "Transmis";

  return (
    <div
      className={cn(
        "absolute w-[280px] p-4 border",
        "transition-all duration-700 ease-out",
        "hover:-translate-y-2 hover:scale-[1.02] hover:z-50",
        className
      )}
      style={{
        background:     "rgba(0,8,20,0.72)",
        borderColor:    `${accent}40`,
        boxShadow:      `0 0 28px ${accent}20, inset 0 0 20px rgba(0,0,0,0.4)`,
        backdropFilter: "blur(10px)",
      }}
    >
      {/* top neon bar */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
        }}
      />

      {/* corner braces */}
      <div className="absolute top-0 left-0  w-3 h-3 border-t border-l" style={{ borderColor: accent }} />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r" style={{ borderColor: accent }} />

      {/* recipient */}
      <div className="flex items-center gap-1.5 mb-2.5">
        <Zap className="w-2.5 h-2.5 shrink-0" style={{ color: accent }} />
        <span
          className="text-[9px] tracking-[0.2em] uppercase font-bold"
          style={{ color: accent }}
        >
          {recipient}
        </span>
      </div>

      {/* message */}
      <p className="text-[12px] leading-relaxed text-white/65 mb-3 italic">
        &ldquo;{text}&rdquo;
      </p>

      {/* footer */}
      <div
        className="flex items-center justify-between border-t pt-2.5"
        style={{ borderColor: `${accent}25` }}
      >
        <span className="text-[10px] text-white/35">{from}</span>
        <span
          className="flex items-center gap-1 text-[9px] tracking-[0.1em] uppercase font-bold"
          style={{ color: ok ? "#00f0ff" : "#ff2d78" }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{
              background: ok ? "#00f0ff" : "#ff2d78",
              boxShadow:  `0 0 6px ${ok ? "#00f0ff" : "#ff2d78"}`,
            }}
          />
          {status}
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────── */
export function HeroSection() {
  return (
    <section className="relative min-h-screen grid lg:grid-cols-2 pt-[68px] overflow-hidden">

      {/* ── GAUCHE ── */}
      <div className="relative z-10 flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-20 py-20">

        {/* eyebrow — slide in */}
        <div
          className="flex items-center gap-3 mb-8 animate-[fadeSlideIn_0.6s_ease_both]"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff] animate-pulse" />
          <span className="w-8 h-px bg-gradient-to-r from-[#00f0ff] to-transparent" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#00f0ff] font-bold">
            Gratitude · Reconnaissance · Impact
          </span>
        </div>

        {/* titre principal */}
        <div
          className="relative mb-7 animate-[fadeSlideIn_0.6s_ease_both]"
          style={{ animationDelay: "0.25s" }}
        >
          <h1 className="text-[clamp(2.6rem,5vw,4.8rem)] font-black leading-[1.05] text-white uppercase tracking-tight">
            Vos mots,
            <span
              className="block"
              style={{
                color:      "#00f0ff",
                textShadow: "0 0 30px rgba(0,240,255,0.5), 0 0 60px rgba(0,240,255,0.2)",
              }}
            >
              leur éclat.
            </span>
            <span className="text-white/85">Enfin transmis.</span>
          </h1>

          {/* couche glitch décorative */}
          <h1
            aria-hidden
            className="absolute top-0 left-0 text-[clamp(2.6rem,5vw,4.8rem)] font-black leading-[1.05] uppercase tracking-tight text-[#ff2d78] pointer-events-none select-none opacity-30 glitch"
            style={{ animationDelay: "0.5s" }}
          >
            Vos mots,<span className="block">leur éclat.</span>
            <span>Enfin transmis.</span>
          </h1>
        </div>

        {/* description */}
        <p
          className="text-[14px] leading-[1.8] text-white/50 max-w-[420px] mb-8 animate-[fadeSlideIn_0.6s_ease_both]"
          style={{ animationDelay: "0.4s" }}
        >
          Rédigez un message sincère pour quelqu&apos;un qui compte.{" "}
          <span className="text-white/80">
            Notre équipe s&apos;occupe de le lui faire parvenir, mis en forme et décoré.
          </span>
        </p>

        {/* points de confiance */}
        <ul
          className="flex flex-col gap-2.5 mb-10 animate-[fadeSlideIn_0.6s_ease_both]"
          style={{ animationDelay: "0.55s" }}
        >
          {trustPoints.map((item, i) => (
            <li key={i} className="flex items-center gap-2.5 text-[12px] text-white/50">
              <CheckCircle2
                className="w-3.5 h-3.5 shrink-0 text-[#00f0ff]"
                style={{ filter: "drop-shadow(0 0 4px #00f0ff)" }}
              />
              {item}
            </li>
          ))}
        </ul>

        {/* CTAs */}
        <div
          className="flex flex-wrap items-center gap-4 animate-[fadeSlideIn_0.6s_ease_both]"
          style={{ animationDelay: "0.7s" }}
        >
          <Link
            href="/messages/new"
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 text-[11px] tracking-[0.15em] uppercase font-bold text-[#000810] overflow-hidden transition-all duration-300 hover:scale-[1.03]"
            style={{
              background: "#00f0ff",
              boxShadow:  "0 0 20px rgba(0,240,255,0.35)",
            }}
          >
            {/* shimmer */}
            <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <Send className="w-3.5 h-3.5 relative z-10" />
            <span className="relative z-10">Rédiger un message</span>
          </Link>

          <Link
            href="#comment"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-[11px] tracking-[0.15em] uppercase font-bold text-[#00f0ff] border border-[#00f0ff]/30 hover:border-[#00f0ff]/70 hover:bg-[#00f0ff]/5 transition-all duration-300"
          >
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            Comment ça marche
          </Link>
        </div>

        {/* stats */}
        <div
          className="flex flex-wrap gap-8 mt-14 pt-8 border-t border-[#00f0ff]/10 animate-[fadeSlideIn_0.6s_ease_both]"
          style={{ animationDelay: "0.85s" }}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="group cursor-default"
            >
              <div
                className="text-[1.8rem] font-black text-white leading-none transition-all duration-300 group-hover:text-[#00f0ff]"
                style={{ textShadow: "0 0 20px rgba(0,240,255,0.25)" }}
              >
                {s.value}
              </div>
              <div className="text-[9px] tracking-[0.2em] uppercase text-[#00f0ff]/60 mt-1.5 font-bold">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── DROITE ── */}
      <div className="relative hidden lg:flex items-center justify-center px-12 py-16 overflow-hidden">

        {/* HUD coins */}
        <div className="absolute top-8  right-8  w-16 h-16 border-t border-r border-[#00f0ff]/20 animate-pulse" />
        <div className="absolute bottom-8 left-8  w-12 h-12 border-b border-l border-[#bf00ff]/20 animate-pulse" />

        {/* label vertical animé */}
        <div
          className="absolute right-8 top-1/2 -translate-y-1/2 text-[9px] tracking-[0.4em] uppercase text-[#00f0ff]/25 font-bold animate-[fadeSlideIn_1s_ease_both]"
          style={{ writingMode: "vertical-rl", animationDelay: "1.2s" }}
        >
          Messages // 2025
        </div>

        {/* étoile décorative flottante */}
        <Star
          className="absolute top-20 left-16 w-3 h-3 text-[#00f0ff]/20 animate-[spin_12s_linear_infinite]"
        />
        <Star
          className="absolute bottom-28 right-20 w-2 h-2 text-[#bf00ff]/20 animate-[spin_18s_linear_infinite_reverse]"
        />

        {/* pile de cartes */}
        <div
          className="relative w-[340px] h-[380px] z-10 animate-[fadeSlideIn_0.8s_ease_both]"
          style={{ animationDelay: "0.5s" }}
        >
          {sampleCards.map((card, i) => (
            <MessageCard key={i} {...card} />
          ))}
        </div>

        {/* ligne décorative flottante sous les cartes */}
        <div
          className="absolute bottom-16 left-1/2 -translate-x-1/2 w-40 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(0,240,255,0.3), transparent)",
          }}
        />
      </div>

      {/* keyframes injectés inline */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes glitchShift {
          0%, 100% { clip-path: inset(0 0 95% 0); transform: translate(-2px, 0); }
          20%       { clip-path: inset(30% 0 50% 0); transform: translate(2px, 0); }
          40%       { clip-path: inset(60% 0 20% 0); transform: translate(-1px, 0); }
          60%       { clip-path: inset(80% 0 5%  0); transform: translate(1px,  0); }
          80%       { clip-path: inset(10% 0 70% 0); transform: translate(-2px, 0); }
        }
        .glitch { animation: glitchShift 3.5s steps(1) infinite; }
      `}</style>
    </section>
  );
}