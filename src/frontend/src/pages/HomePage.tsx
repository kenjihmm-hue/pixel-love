import PhotoWall from "@/components/PhotoWall";
import { useAnniversaryCountdown, useTimeSinceMet } from "@/hooks/useTime";
import { useState } from "react";

const DAILY_MESSAGES = [
  "Every moment with you is my favourite story.",
  "You are my home, wherever we are.",
  "My love for you grows deeper every single day.",
  "You make ordinary moments feel extraordinary.",
  "I choose you, today and every day.",
  "With you, I have everything I need.",
  "You are the poem I never knew how to write.",
];

function getDailyMessage(): string {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
      86_400_000,
  );
  return DAILY_MESSAGES[dayOfYear % DAILY_MESSAGES.length];
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span
        className="font-display text-4xl md:text-5xl tabular-nums"
        style={{ color: "oklch(72.8 0.145 66)" }}
      >
        {String(value).padStart(2, "0")}
      </span>
      <span
        className="text-xs uppercase tracking-widest"
        style={{ color: "oklch(90.2 0.045 1 / 0.5)" }}
      >
        {label}
      </span>
    </div>
  );
}

export default function HomePage() {
  const elapsed = useTimeSinceMet();
  const anniversaryCountdown = useAnniversaryCountdown(
    new Date("2025-06-01T00:00:00").getTime(),
  );
  const [lovePct, setLovePct] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 glass-effect border-b"
        style={{ borderColor: "oklch(41.8 0.145 15 / 0.2)" }}
      >
        <div className="flex items-center gap-2">
          <span className="text-2xl">💕</span>
          <span
            className="font-display text-xl tracking-wider"
            style={{ color: "oklch(72.8 0.145 66)" }}
          >
            Pixel Love
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {["Our Wall", "Together", "Love Meter"].map((label, i) => (
            <a
              key={label}
              href={`#${label.toLowerCase().replace(" ", "-")}`}
              className="transition-smooth hover:text-accent"
              style={{ color: "oklch(90.2 0.045 1 / 0.7)" }}
              data-ocid={`nav.link.${i + 1}`}
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      {/* Hero banner - first photo as full-width banner */}
      <section
        id="hero"
        className="relative flex items-center justify-center min-h-[60vh] overflow-hidden"
        data-ocid="hero.section"
      >
        <img
          src="/assets/photos/photo-01.jpg"
          alt="Aidan & Falak"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ filter: "brightness(0.5) saturate(1.2)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, oklch(7.2 0.02 0 / 0.3) 0%, oklch(7.2 0.02 0 / 0.8) 100%)",
          }}
        />
        <div className="relative z-10 flex flex-col items-center gap-4 text-center px-6 animate-slide-up">
          <p
            className="text-sm uppercase tracking-[0.3em]"
            style={{ color: "oklch(72.8 0.145 66)" }}
          >
            Aidan & Falak
          </p>
          <h1
            className="font-display text-5xl md:text-7xl leading-tight"
            style={{ color: "oklch(90.2 0.045 1)" }}
          >
            Our Pixel Love
          </h1>
          <p
            className="text-lg max-w-md"
            style={{ color: "oklch(90.2 0.045 1 / 0.75)" }}
          >
            Every photo, every moment, every heartbeat — preserved here, just
            for us.
          </p>
        </div>
      </section>

      {/* Time together counter */}
      <section
        id="together"
        className="py-16 px-6"
        data-ocid="together.section"
      >
        <div className="max-w-2xl mx-auto text-center flex flex-col gap-8">
          <div>
            <p
              className="text-xs uppercase tracking-[0.3em] mb-2"
              style={{ color: "oklch(72.8 0.145 66)" }}
            >
              We've Been Together
            </p>
            <div className="flex items-center justify-center gap-6 md:gap-12 flex-wrap">
              <TimeUnit value={elapsed.days} label="Days" />
              <span
                style={{ color: "oklch(41.8 0.145 15 / 0.5)" }}
                className="text-3xl font-light hidden md:block"
              >
                ·
              </span>
              <TimeUnit value={elapsed.hours} label="Hours" />
              <span
                style={{ color: "oklch(41.8 0.145 15 / 0.5)" }}
                className="text-3xl font-light hidden md:block"
              >
                ·
              </span>
              <TimeUnit value={elapsed.minutes} label="Minutes" />
              <span
                style={{ color: "oklch(41.8 0.145 15 / 0.5)" }}
                className="text-3xl font-light hidden md:block"
              >
                ·
              </span>
              <TimeUnit value={elapsed.seconds} label="Seconds" />
            </div>
          </div>

          {/* Anniversary countdown */}
          {anniversaryCountdown && (
            <div
              className="glass-effect rounded-xl px-8 py-6 flex flex-col items-center gap-3"
              data-ocid="anniversary.card"
            >
              <p
                className="text-xs uppercase tracking-[0.3em]"
                style={{ color: "oklch(72.8 0.145 66)" }}
              >
                Next Anniversary In
              </p>
              <div className="flex items-center justify-center gap-6 flex-wrap">
                <TimeUnit value={anniversaryCountdown.days} label="Days" />
                <span
                  style={{ color: "oklch(41.8 0.145 15 / 0.5)" }}
                  className="text-2xl font-light hidden md:block"
                >
                  ·
                </span>
                <TimeUnit value={anniversaryCountdown.hours} label="Hours" />
                <span
                  style={{ color: "oklch(41.8 0.145 15 / 0.5)" }}
                  className="text-2xl font-light hidden md:block"
                >
                  ·
                </span>
                <TimeUnit
                  value={anniversaryCountdown.minutes}
                  label="Minutes"
                />
              </div>
            </div>
          )}

          {/* Daily message */}
          <blockquote
            className="glass-effect rounded-xl px-8 py-6 italic"
            style={{ color: "oklch(90.2 0.045 1 / 0.85)" }}
          >
            <span
              className="text-2xl"
              style={{ color: "oklch(72.8 0.145 66)" }}
            >
              "
            </span>
            <span className="font-display text-lg">{getDailyMessage()}</span>
            <span
              className="text-2xl"
              style={{ color: "oklch(72.8 0.145 66)" }}
            >
              "
            </span>
          </blockquote>
        </div>
      </section>

      {/* Photo wall */}
      <section
        id="our-wall"
        className="py-16 px-6"
        style={{ background: "oklch(10.5 0.015 0 / 0.6)" }}
        data-ocid="photowall.section"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p
              className="text-xs uppercase tracking-[0.3em] mb-2"
              style={{ color: "oklch(72.8 0.145 66)" }}
            >
              Our Memories
            </p>
            <h2
              className="font-display text-4xl"
              style={{ color: "oklch(90.2 0.045 1)" }}
            >
              The Photo Wall
            </h2>
          </div>
          <PhotoWall />
        </div>
      </section>

      {/* Love meter */}
      <section
        id="love-meter"
        className="py-16 px-6"
        data-ocid="lovemeter.section"
      >
        <div className="max-w-md mx-auto flex flex-col items-center gap-6 text-center">
          <p
            className="text-xs uppercase tracking-[0.3em]"
            style={{ color: "oklch(72.8 0.145 66)" }}
          >
            The Scientific Truth
          </p>
          <h2
            className="font-display text-3xl"
            style={{ color: "oklch(90.2 0.045 1)" }}
          >
            Today's Love Meter
          </h2>

          {lovePct !== null && (
            <div className="animate-scale-in flex flex-col items-center gap-2">
              <span
                className="font-display text-8xl tabular-nums"
                style={{ color: "oklch(72.8 0.145 66)" }}
              >
                {lovePct}%
              </span>
              <p style={{ color: "oklch(90.2 0.045 1 / 0.7)" }}>
                {lovePct >= 99 ? "Basically infinite ♾️" : "Off the charts 💫"}
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={() => setLovePct(95 + Math.floor(Math.random() * 6))}
            className="px-8 py-3 rounded-full font-medium transition-smooth hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2"
            style={{
              background:
                "linear-gradient(135deg, oklch(41.8 0.145 15), oklch(35 0.12 15))",
              color: "oklch(90.2 0.045 1)",
              boxShadow: "0 4px 20px oklch(41.8 0.145 15 / 0.4)",
            }}
            data-ocid="lovemeter.primary_button"
          >
            Check Today's Love % ❤️
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-8 px-6 text-center border-t"
        style={{
          borderColor: "oklch(41.8 0.145 15 / 0.2)",
          background: "oklch(10.5 0.015 0)",
        }}
      >
        <p
          className="font-display text-lg mb-1"
          style={{ color: "oklch(72.8 0.145 66)" }}
        >
          Made with love by Aidan × Falak
        </p>
        <p className="text-sm" style={{ color: "oklch(65 0.02 0)" }}>
          Pixel Love © Forever &nbsp;·&nbsp;{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline transition-smooth"
            style={{ color: "oklch(65 0.02 0)" }}
          >
            Built with caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
