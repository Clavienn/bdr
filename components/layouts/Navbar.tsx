"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Comment ça marche", href: "#comment" },
  { label: "Nos héros", href: "#heros" },
  { label: "Modèles", href: "#modeles" },
  { label: "À propos", href: "#apropos" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-[#00f0ff]/20 shadow-[0_0_30px_rgba(0,240,255,0.05)]"
          : "border-b border-transparent"
      )}
      style={{
        background: scrolled
          ? "rgba(0,8,20,0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 h-[68px] flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div className="absolute inset-0 border border-[#00f0ff]/60 rotate-45 group-hover:border-[#00f0ff] transition-colors" />
            <Zap className="w-3.5 h-3.5 text-[#00f0ff] relative z-10" />
          </div>
          <div className="flex flex-col leading-none">
            <span
              className="text-[13px] font-bold tracking-[0.15em] uppercase text-white"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Bureau
            </span>
            <span
              className="text-[9px] tracking-[0.3em] uppercase"
              style={{ color: "#00f0ff", fontFamily: "'Sora', sans-serif" }}
            >
              des remerciements
            </span>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "relative text-[11px] tracking-[0.18em] uppercase font-medium",
                  "text-white/50 hover:text-[#00f0ff] transition-colors duration-200",
                  "after:absolute after:bottom-[-4px] after:left-0 after:right-full after:h-px",
                  "after:bg-[#00f0ff] after:transition-all after:duration-300",
                  "hover:after:right-0",
                  "hover:[text-shadow:0_0_12px_rgba(0,240,255,0.8)]"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button
            asChild
            className={cn(
              "relative rounded-none text-[11px] tracking-[0.15em] uppercase font-bold",
              "bg-transparent text-[#00f0ff] border border-[#00f0ff]/60 px-6 h-9",
              "hover:bg-[#00f0ff]/10 hover:border-[#00f0ff]",
              "transition-all duration-200",
              "hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]",
              "before:absolute before:top-0 before:left-0 before:w-2 before:h-2 before:border-t before:border-l before:border-[#00f0ff]",
              "after:absolute after:bottom-0 after:right-0 after:w-2 after:h-2 after:border-b after:border-r after:border-[#00f0ff]"
            )}
          >
            <Link href="/messages/new">
              <Zap className="w-3 h-3 mr-1.5" />
              Envoyer un merci
            </Link>
          </Button>
        </div>

        {/* Mobile */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-[#00f0ff] hover:bg-[#00f0ff]/10 rounded-none border border-[#00f0ff]/30"
            >
              <Menu className="w-4 h-4" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-72 border-l border-[#00f0ff]/20 p-0"
            style={{ background: "rgba(0,8,20,0.97)", backdropFilter: "blur(20px)" }}
          >
            <div className="flex items-center justify-between px-6 h-[68px] border-b border-[#00f0ff]/15">
              <span
                className="text-[12px] tracking-[0.2em] uppercase text-[#00f0ff] font-bold"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                Navigation
              </span>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white/40 hover:text-[#00f0ff] rounded-none w-7 h-7"
                >
                  <X className="w-4 h-4" />
                </Button>
              </SheetTrigger>
            </div>

            <nav className="flex flex-col px-6 py-8 gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[11px] tracking-[0.2em] uppercase text-white/50 hover:text-[#00f0ff] transition-colors flex items-center gap-2"
                >
                  <span className="w-4 h-px bg-[#00f0ff]/40" />
                  {link.label}
                </Link>
              ))}

              <div className="pt-4 border-t border-[#00f0ff]/15 mt-2">
                <Button
                  asChild
                  className="w-full rounded-none bg-[#00f0ff]/10 text-[#00f0ff] text-[11px] tracking-[0.15em] uppercase font-bold h-10 border border-[#00f0ff]/50 hover:bg-[#00f0ff]/20"
                >
                  <Link href="/messages/new">
                    <Zap className="w-3 h-3 mr-1.5" />
                    Envoyer un merci
                  </Link>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}