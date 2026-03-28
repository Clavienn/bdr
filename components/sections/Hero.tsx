"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, CheckCircle2, Send } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Sample cards ── */
const sampleCards = [
  {
    recipient: "Marie, infirmière",
    text: "Vous avez tenu ma main dans les moments les plus durs. Je n'oublierai jamais.",
    from: "Lucas R.",
    status: "Transmis",
    accent: "#00f0ff",
    rotate: "-rotate-2",
    top: "top-0",
    left: "left-0",
    delay: "0s",
    z: "z-10",
  },
  {
    recipient: "Thomas, professeur",
    text: "Grâce à vous j'ai compris que j'en étais capable. Dix ans plus tard, je me souviens.",
    from: "Amina K.",
    status: "Transmis",
    accent: "#bf00ff",
    rotate: "rotate-[2deg]",
    top: "top-12",
    left: "left-6",
    delay: "2s",
    z: "z-20",
  },
  {
    recipient: "Élodie, bénévole",
    text: "Votre générosité silencieuse méritait d'être nommée. Merci d'exister.",
    from: "Karim B.",
    status: "En attente",
    accent: "#ff2d78",
    rotate: "-rotate-1",
    top: "top-24",
    left: "left-2",
    delay: "4s",
    z: "z-30",
  },
];

const stats = [
  { value: "2 400+", label: "Messages envoyés" },
  { value: "98 %", label: "Satisfaction" },
  { value: "12 h", label: "Délai moyen" },
];

const trustPoints = [
  "Message personnalisé avec template décoré",
  "Envoi manuel via Facebook Messenger",
  "Validation admin avant chaque envoi",
];

interface CardProps {
  recipient: string;
  text: string;
  from: string;
  status: string;
  accent: string;
  rotate: string;
  top: string;
  left: string;
  delay: string;
  z: string;
}

function MessageCard({ recipient, text, from, status, accent, rotate, top, left, delay, z }: CardProps) {
  const ok = status === "Transmis";
  return (
    <div
      className={cn("absolute w-[280px] p-4 border", rotate, top, left, z, "animate-float")}
      style={{
        background: "rgba(0,8,20,0.82)",
        borderColor: `${accent}40`,
        boxShadow: `0 0 24px ${accent}18, inset 0 0 24px rgba(0,0,0,0.5)`,
        backdropFilter: "blur(10px)",
        animationDelay: delay,
      }}
    >
      {/* top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />

      {/* corner deco */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l" style={{ borderColor: accent }} />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r" style={{ borderColor: accent }} />

      <div className="flex items-center gap-1.5 mb-2.5">
        <Zap className="w-2.5 h-2.5" style={{ color: accent }} />
        <span className="text-[9px] tracking-[0.2em] uppercase font-bold" style={{ color: accent }}>
          {recipient}
        </span>
      </div>

      <p
        className="text-[12px] leading-relaxed text-white/70 mb-3 italic"
        style={{ fontFamily: "'Sora', sans-serif" }}
      >
        &ldquo;{text}&rdquo;
      </p>

      <div className="flex items-center justify-between border-t pt-2.5" style={{ borderColor: `${accent}25` }}>
        <span className="text-[10px] text-white/35" style={{ fontFamily: "'Sora', sans-serif" }}>
           {from}
        </span>
        <span
          className="flex items-center gap-1 text-[9px] tracking-[0.1em] uppercase font-bold"
          style={{ color: ok ? "#00f0ff" : "#ff2d78" }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: ok ? "#00f0ff" : "#ff2d78",
              boxShadow: `0 0 6px ${ok ? "#00f0ff" : "#ff2d78"}`,
            }}
          />
          {status}
        </span>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: [
            "@keyframes float {",
            "  0%,100% { transform: translateY(0px); }",
            "  50%      { transform: translateY(-10px); }",
            "}",
            ".animate-float { animation: float 6s ease-in-out infinite; }",
            "@keyframes scanline {",
            "  0% { transform: translateY(-100%); }",
            "  100% { transform: translateY(100vh); }",
            "}",
            ".scanline {",
            "  animation: scanline 8s linear infinite;",
            "  background: linear-gradient(transparent, rgba(0,240,255,0.03), transparent);",
            "  height: 80px; width: 100%; position: absolute; left: 0; pointer-events: none;",
            "}",
            "@keyframes glitch {",
            "  0%,100% { clip-path: inset(0 0 100% 0); }",
            "  20% { clip-path: inset(20% 0 50% 0); transform: translateX(-4px); }",
            "  40% { clip-path: inset(60% 0 10% 0); transform: translateX(4px); }",
            "  60% { clip-path: inset(40% 0 30% 0); transform: translateX(-2px); }",
            "  80% { clip-path: inset(10% 0 70% 0); transform: translateX(2px); }",
            "}",
            ".glitch-layer {",
            "  animation: glitch 4s steps(1) infinite;",
            "}",
          ].join("\n"),
        }}
      />

      <section className="relative min-h-screen grid lg:grid-cols-2 pt-[68px] overflow-hidden">
        {/* scanline effect */}
        <div className="scanline z-[1] top-0" />

        {/* horizontal grid lines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,240,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* ── LEFT ── */}
        <div className="relative z-10 flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-20 py-20">

          {/* eyebrow */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
              <span className="w-8 h-px bg-gradient-to-r from-[#00f0ff] to-transparent" />
            </div>
            <span
              className="text-[10px] tracking-[0.3em] uppercase text-[#00f0ff] font-bold"
              style={{ fontFamily: "'Sora', sans-serif", textShadow: "0 0 12px rgba(0,240,255,0.6)" }}
            >
              À nos héros du quotidien
            </span>
          </div>

          {/* title */}
          <div className="relative mb-7">
            <h1
              className="text-[clamp(2.6rem,5vw,4.8rem)] font-black leading-[1.05] text-white uppercase"
              style={{ fontFamily: "'Sora', sans-serif", letterSpacing: "-0.02em" }}
            >
              Dire
              <span
                className="block"
                style={{
                  color: "#00f0ff",
                  textShadow: "0 0 30px rgba(0,240,255,0.5), 0 0 60px rgba(0,240,255,0.2)",
                }}
              >
                merci,
              </span>
              <span className="text-white/90">enfin reconnu.</span>
            </h1>
            {/* glitch duplicate */}
            <h1
              className="absolute top-0 left-0 text-[clamp(2.6rem,5vw,4.8rem)] font-black leading-[1.05] uppercase text-[#ff2d78] glitch-layer pointer-events-none select-none"
              aria-hidden
              style={{ fontFamily: "'Sora', sans-serif", letterSpacing: "-0.02em", opacity: 0.4 }}
            >
              Dire<span className="block">merci,</span><span>enfin reconnu.</span>
            </h1>
          </div>

          {/* desc */}
          <p
            className="text-[14px] leading-[1.8] text-white/50 max-w-[420px] mb-8"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Envoyez un message de remerciement décoré à ceux qui font une
            différence dans votre vie.{" "}
            <span className="text-white/80">
              L&apos;admin s&apos;occupe de l&apos;envoi — vous, vous mettez les mots.
            </span>
          </p>

          {/* trust bullets */}
          <ul className="flex flex-col gap-2.5 mb-10">
            {trustPoints.map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-2.5 text-[12px] text-white/50"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00f0ff] shrink-0" style={{ filter: "drop-shadow(0 0 4px #00f0ff)" }} />
                {item}
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            {/* primary */}
            <Button
              asChild
              className={cn(
                "relative rounded-none text-[11px] tracking-[0.15em] uppercase font-bold",
                "bg-[#00f0ff] text-[#000810] px-8 h-11",
                "hover:bg-[#00f0ff]/90 transition-all duration-200",
                "hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]",
                "before:absolute before:top-0 before:left-0 before:w-2 before:h-2 before:border-t before:border-l before:border-[#000810]/40",
                "after:absolute after:bottom-0 after:right-0 after:w-2 after:h-2 after:border-b after:border-r after:border-[#000810]/40"
              )}
            >
              <Link href="/messages/new">
                <Send className="w-3.5 h-3.5 mr-2" />
                Créer mon message
              </Link>
            </Button>

            {/* secondary */}
            <Button
              variant="ghost"
              asChild
              className="rounded-none text-[11px] text-white/40 hover:text-[#00f0ff] hover:bg-transparent gap-2.5 px-0 uppercase tracking-[0.15em] font-bold"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              <Link href="#comment">
                <span
                  className="w-6 h-6 border border-white/20 flex items-center justify-center transition-all duration-200 hover:border-[#00f0ff]"
                >
                  <ArrowRight className="w-3 h-3" />
                </span>
                Comment ça marche
              </Link>
            </Button>
          </div>

          {/* stats */}
          <div className="flex flex-wrap gap-8 mt-14 pt-8 border-t border-[#00f0ff]/10">
            {stats.map((s) => (
              <div key={s.label}>
                <div
                  className="text-[1.8rem] font-black text-white leading-none"
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    textShadow: "0 0 20px rgba(0,240,255,0.3)",
                  }}
                >
                  {s.value}
                </div>
                <div
                  className="text-[9px] tracking-[0.2em] uppercase text-[#00f0ff]/60 mt-1.5 font-bold"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="relative hidden lg:flex items-center justify-center px-12 py-16 overflow-hidden">
          {/* corner braces */}
          <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-[#00f0ff]/20" />
          <div className="absolute bottom-8 left-8 w-12 h-12 border-b border-l border-[#bf00ff]/20" />

          {/* vertical label */}
          <div
            className="absolute right-8 top-1/2 -translate-y-1/2 text-[9px] tracking-[0.4em] uppercase text-[#00f0ff]/25 font-bold"
            style={{ writingMode: "vertical-rl", fontFamily: "'Sora', sans-serif" }}
          >
            Messages // 2025
          </div>

          {/* card stack */}
          <div className="relative w-[340px] h-[380px] z-10">
            {sampleCards.map((card, i) => (
              <MessageCard key={i} {...card} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}