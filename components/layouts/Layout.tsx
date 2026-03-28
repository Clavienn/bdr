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

    const pts: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    for (let i = 0; i < 55; i++) {
      pts.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1,
      });
    }

    let id: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(251,191,36,0.35)";
        ctx.fill();
        for (const q of pts) {
          const dx = p.x - q.x,
            dy = p.y - q.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(251,191,36,${0.12 * (1 - d / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
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
      style={{ opacity: 0.7 }}
    />
  );
}

export default function Layouts({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% -10%,#1e3a5f 0%,#0a1628 55%,#000d1a 100%)",
        minHeight: "100vh",
        fontFamily: "'Sora', sans-serif",
      }}
    >
      {/* Fond animé partagé sur toutes les pages */}
      <AnimatedBackground />

      {/* Blobs décoratifs globaux */}
      <div
        className="fixed top-[-80px] right-[-80px] w-[420px] h-[420px] rounded-full pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle,rgba(251,191,36,.12) 0%,transparent 70%)",
        }}
      />
      <div
        className="fixed bottom-[10%] left-[-60px] w-[300px] h-[300px] rounded-full pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle,rgba(59,130,246,.1) 0%,transparent 70%)",
        }}
      />

      {/* Contenu au-dessus du fond */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
