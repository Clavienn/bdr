"use client";
import { useEffect, useRef } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const gratitudeWords = [
      "merci", "thanks", "bravo", "thx", "wow",
      "top", "chapeau", "genial", "kudos", "waow",
      "super", "merci", "sympa", "cool", "extra",
      "parfait", "nickel", "formidable", "magnifique",
    ];

    type Rocket = {
      x: number; y: number;
      vx: number; vy: number;
      word: string;
      color: string;
      alpha: number;
      size: number;
      trail: { x: number; y: number; a: number }[];
      life: number;
      maxLife: number;
      rotation: number;
      spin: number;
    };

    const neonPalette = [
      "#00ffff", "#b400ff", "#ff00b4",
      "#00ff96", "#ff6b35", "#ffe600",
    ];

    const hexToRgba = (hex: string, a: number) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r},${g},${b},${a})`;
    };

    const rockets: Rocket[] = [];

    const spawnRocket = () => {
      const fromEdge = Math.random();
      let x: number, y: number, vx: number, vy: number;

      if (fromEdge < 0.4) {
        x = Math.random() * canvas.width;
        y = canvas.height + 20;
        vx = (Math.random() - 0.5) * 1.2;
        vy = -(1.5 + Math.random() * 2.5);
      } else if (fromEdge < 0.65) {
        x = -20;
        y = Math.random() * canvas.height;
        vx = 1.2 + Math.random() * 2;
        vy = -(Math.random() * 1.5);
      } else {
        x = canvas.width + 20;
        y = Math.random() * canvas.height;
        vx = -(1.2 + Math.random() * 2);
        vy = -(Math.random() * 1.5);
      }

      rockets.push({
        x, y, vx, vy,
        word: gratitudeWords[Math.floor(Math.random() * gratitudeWords.length)],
        color: neonPalette[Math.floor(Math.random() * neonPalette.length)],
        alpha: 0,
        size: 11 + Math.random() * 8,
        trail: [],
        life: 0,
        maxLife: 140 + Math.random() * 120,
        rotation: Math.atan2(vy, vx),
        spin: (Math.random() - 0.5) * 0.03,
      });
    };

    for (let i = 0; i < 18; i++) spawnRocket();

    let frame = 0;
    let id: number;

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Scanline uniquement
      const scanY = (frame * 1.0) % (canvas.height + 60) - 30;
      const sg = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
      sg.addColorStop(0, "rgba(0,255,255,0)");
      sg.addColorStop(0.5, "rgba(0,255,255,0.04)");
      sg.addColorStop(1, "rgba(0,255,255,0)");
      ctx.fillStyle = sg;
      ctx.fillRect(0, scanY - 30, canvas.width, 60);

      if (frame % 38 === 0 && rockets.length < 30) spawnRocket();

      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.life++;
        r.x += r.vx;
        r.y += r.vy;
        r.vy *= 0.998;
        r.vx *= 0.999;
        r.rotation += r.spin;

        const progress = r.life / r.maxLife;
        if (progress < 0.15)       r.alpha = progress / 0.15;
        else if (progress > 0.75)  r.alpha = 1 - (progress - 0.75) / 0.25;
        else                        r.alpha = 1;

        // Traînée
        r.trail.push({ x: r.x, y: r.y, a: r.alpha });
        if (r.trail.length > 22) r.trail.shift();

        for (let t = 1; t < r.trail.length; t++) {
          const tp = r.trail[t - 1];
          const tc = r.trail[t];
          const trailAlpha = (t / r.trail.length) * r.alpha * 0.5;
          ctx.beginPath();
          ctx.moveTo(tp.x, tp.y);
          ctx.lineTo(tc.x, tc.y);
          ctx.strokeStyle = hexToRgba(r.color, trailAlpha);
          ctx.lineWidth = (t / r.trail.length) * 3;
          ctx.stroke();
        }

        // Halo
        const glowR = ctx.createRadialGradient(r.x, r.y, 0, r.x, r.y, r.size * 2.5);
        glowR.addColorStop(0, hexToRgba(r.color, r.alpha * 0.35));
        glowR.addColorStop(1, hexToRgba(r.color, 0));
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = glowR;
        ctx.fill();

        // Mot
        ctx.save();
        ctx.translate(r.x, r.y);
        ctx.rotate(r.rotation);
        ctx.font = `${Math.round(r.size)}px 'Rajdhani', 'Sora', monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.shadowColor = r.color;
        ctx.shadowBlur = 12;
        ctx.fillStyle = hexToRgba(r.color, r.alpha);
        ctx.fillText(r.word, 0, 0);
        ctx.shadowBlur = 6;
        ctx.fillStyle = hexToRgba("#ffffff", r.alpha * 0.6);
        ctx.fillText(r.word, 0, 0);
        ctx.restore();

        // Micro-explosion à la mort
        if (r.life >= r.maxLife - 5 && r.alpha < 0.15) {
          for (let p = 0; p < 3; p++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * 20;
            ctx.beginPath();
            ctx.arc(
              r.x + Math.cos(angle) * dist,
              r.y + Math.sin(angle) * dist,
              1, 0, Math.PI * 2
            );
            ctx.fillStyle = hexToRgba(r.color, 0.6);
            ctx.fill();
          }
        }

        if (
          r.life >= r.maxLife ||
          r.x < -100 || r.x > canvas.width + 100 ||
          r.y < -100 || r.y > canvas.height + 100
        ) {
          rockets.splice(i, 1);
        }
      }

      id = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.9 }}
    />
  );
}

export default function Layouts({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      style={{
        background:
          "radial-gradient(ellipse 90% 70% at 20% 0%, #0d0020 0%, #000510 40%, #000000 100%)",
        minHeight: "100vh",
        fontFamily: "'Rajdhani', 'Sora', sans-serif",
      }}
    >
      <AnimatedBackground />

      <div
        className="fixed top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(0,255,255,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div
        className="fixed bottom-[5%] left-[-80px] w-[400px] h-[400px] rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(180,0,255,0.1) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div
        className="fixed bottom-[-60px] right-[20%] w-[300px] h-[300px] rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(255,0,180,0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="fixed left-0 top-0 h-full w-[2px] pointer-events-none z-0"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(0,255,255,0.4), rgba(180,0,255,0.4), transparent)",
        }}
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
}