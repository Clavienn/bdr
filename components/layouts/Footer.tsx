import Link from "next/link";
import { Zap, Send } from "lucide-react";

const footerLinks = {
  Plateforme: [
    { label: "Comment ça marche", href: "#comment" },
    { label: "Envoyer un message", href: "/messages/new" },
    { label: "Modèles disponibles", href: "/modeles" },
    { label: "Nos héros", href: "#heros" },
    { label: "Tarifs", href: "/tarifs" },
  ],
  Compte: [
    { label: "Créer un compte", href: "/auth/register" },
    { label: "Se connecter", href: "/auth/login" },
    { label: "Tableau de bord", href: "/dashboard" },
    { label: "Mes messages", href: "/messages" },
    { label: "Notifications", href: "/notifications" },
  ],
  Aide: [
    { label: "Questions fréquentes", href: "/faq" },
    { label: "Nous contacter", href: "/contact" },
    { label: "Devenir modérateur", href: "/admin/apply" },
    { label: "Signaler un contenu", href: "/report" },
    { label: "Espace presse", href: "/presse" },
  ],
};

const socialLinks = [
  { label: "FB", href: "https://facebook.com" },
  { label: "IG", href: "https://instagram.com" },
  { label: "X",  href: "https://x.com" },
];

const legalLinks = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Confidentialité",  href: "/confidentialite" },
  { label: "CGU",              href: "/cgu" },
];

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden border-t border-[#00f0ff]/15"
      style={{ fontFamily: "'Sora', sans-serif" }}
    >
      {/* Ligne lumineuse supérieure */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #00f0ff, #bf00ff, transparent)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-8">

        {/* ── Grille principale ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-14">

          {/* Marque */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5 group">
              <div className="relative w-7 h-7 flex items-center justify-center shrink-0">
                <div className="absolute inset-0 border border-[#00f0ff]/50 rotate-45 group-hover:border-[#00f0ff] transition-colors" />
                <Zap className="w-3 h-3 text-[#00f0ff] relative z-10" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[12px] font-bold tracking-[0.15em] uppercase text-white">
                  Bureau
                </span>
                <span className="text-[8px] tracking-[0.25em] uppercase text-[#00f0ff]/70">
                  des remerciements
                </span>
              </div>
            </Link>

            <p className="text-[12px] leading-[1.8] text-white/35 max-w-[260px] mb-6">
              Rendez hommage à ceux qui font la différence — vos héros du quotidien méritent d&apos;être reconnus.
            </p>

            <div className="flex gap-2">
              {socialLinks.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 border border-[#00f0ff]/20 flex items-center justify-center text-[11px] font-bold text-[#00f0ff]/50 hover:border-[#00f0ff]/60 hover:text-[#00f0ff] transition-all duration-200 hover:shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Colonnes de liens */}
          {Object.entries(footerLinks).map(([cat, links]) => (
            <div key={cat}>
              <h3 className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#00f0ff] mb-5 flex items-center gap-2">
                <span className="w-3 h-px bg-[#00f0ff]" />
                {cat}
              </h3>
              <ul className="flex flex-col gap-[0.6rem]">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[11px] text-white/35 hover:text-[#00f0ff] transition-colors duration-200 inline-block tracking-wide"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Newsletter ── */}
        <div className="relative mb-10 p-5 border border-[#00f0ff]/15">
          {/* Coins décoratifs */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#00f0ff]/40" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#00f0ff]/40" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-[13px] font-bold text-white tracking-wide uppercase mb-1">
                Ne rien manquer
              </p>
              <p className="text-[11px] text-white/35 tracking-wide">
                Témoignages inspirants, nouveautés et événements de la communauté.
              </p>
            </div>
            <div className="flex shrink-0">
              <input
                type="email"
                placeholder="votre@email.com"
                className="h-9 px-3 border border-[#00f0ff]/20 border-r-0 text-[11px] text-white placeholder:text-white/25 outline-none focus:border-[#00f0ff]/50 transition-colors tracking-wide w-48 bg-transparent"
              />
              <button className="h-9 px-4 bg-[#00f0ff] text-[#000810] text-[10px] tracking-[0.15em] uppercase font-bold hover:bg-[#00f0ff]/80 transition-colors shrink-0 flex items-center gap-1.5">
                <Send className="w-3 h-3" />
                OK
              </button>
            </div>
          </div>
        </div>

        {/* ── Barre inférieure ── */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-6 border-t border-[#00f0ff]/10">
          <p className="text-[10px] text-white/20 tracking-widest uppercase">
            © {new Date().getFullYear()} Bureau des Remerciements — Tous systèmes opérationnels
          </p>
          <nav className="flex gap-5">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[10px] text-white/20 hover:text-[#00f0ff]/60 transition-colors tracking-widest uppercase"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

      </div>
    </footer>
  );
}