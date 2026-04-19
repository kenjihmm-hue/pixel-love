import CursorSparkles from "@/components/CursorSparkles";
import FloatingHearts from "@/components/FloatingHearts";
import ParallaxBackground from "@/components/ParallaxBackground";
import { useAuth } from "@/hooks/useAuth";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import { useEffect, useRef, useState } from "react";

const HEART_POSITIONS = [
  { left: "8%", top: "10%", delay: "0s" },
  { left: "15.5%", top: "23%", delay: "0.2s" },
  { left: "23%", top: "36%", delay: "0.4s" },
  { left: "30.5%", top: "49%", delay: "0.6s" },
  { left: "38%", top: "62%", delay: "0.8s" },
  { left: "45.5%", top: "75%", delay: "1s" },
  { left: "53%", top: "18%", delay: "1.2s" },
  { left: "60.5%", top: "31%", delay: "1.4s" },
  { left: "68%", top: "44%", delay: "1.6s" },
  { left: "75.5%", top: "57%", delay: "1.8s" },
  { left: "83%", top: "70%", delay: "2s" },
  { left: "90.5%", top: "83%", delay: "2.2s" },
];

function WelcomeSplash({ onDone }: { onDone: () => void }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 1800);
    const doneTimer = setTimeout(() => onDone(), 2600);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
      style={{
        background: "oklch(7.2 0.02 0)",
        opacity: fading ? 0 : 1,
        transition: "opacity 0.8s ease",
        pointerEvents: fading ? "none" : "auto",
      }}
      aria-live="polite"
      data-ocid="welcome.panel"
    >
      {/* Decorative hearts */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        {HEART_POSITIONS.map((pos) => (
          <span
            key={`heart-${pos.left}-${pos.top}`}
            className="absolute text-2xl animate-float"
            style={{
              left: pos.left,
              top: pos.top,
              animationDelay: pos.delay,
              opacity: 0.15,
              color: "oklch(72.8 0.145 66)",
            }}
          >
            ♥
          </span>
        ))}
      </div>

      <div className="relative flex flex-col items-center gap-6 animate-slide-up text-center px-6">
        <p
          className="text-sm uppercase tracking-[0.4em]"
          style={{ color: "oklch(72.8 0.145 66)", animationDelay: "0.1s" }}
        >
          Aidan & Falak
        </p>
        <h1
          className="font-display text-6xl md:text-8xl"
          style={{
            color: "oklch(90.2 0.045 1)",
            textShadow: "0 0 40px oklch(41.8 0.145 15 / 0.6)",
          }}
        >
          Welcome to
        </h1>
        <h2
          className="font-display text-5xl md:text-7xl"
          style={{
            color: "oklch(72.8 0.145 66)",
            textShadow: "0 0 30px oklch(72.8 0.145 66 / 0.5)",
            animationDelay: "0.2s",
          }}
        >
          Pixel Love
        </h2>
        <p
          className="text-lg mt-2"
          style={{ color: "oklch(90.2 0.045 1 / 0.55)" }}
        >
          Just for us 💕
        </p>
      </div>
    </div>
  );
}

function AppInner() {
  const { isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const prevAuth = useRef(false);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    setMounted(true);
  }, []);

  useEffect(() => {
    // Trigger welcome splash when isAuthenticated first becomes true
    if (isAuthenticated && !prevAuth.current) {
      setShowWelcome(true);
    }
    prevAuth.current = isAuthenticated;
  }, [isAuthenticated]);

  if (!mounted) return null;

  return (
    <ParallaxBackground>
      <CursorSparkles />
      <FloatingHearts />
      {isAuthenticated ? <HomePage /> : <LoginPage />}
      {showWelcome && <WelcomeSplash onDone={() => setShowWelcome(false)} />}
    </ParallaxBackground>
  );
}

export default function App() {
  return <AppInner />;
}
