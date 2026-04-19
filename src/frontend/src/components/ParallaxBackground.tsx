import { useCallback, useEffect, useRef } from "react";

interface ParallaxBackgroundProps {
  children: React.ReactNode;
}

export default function ParallaxBackground({
  children,
}: ParallaxBackgroundProps) {
  const bgRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const scrollYRef = useRef(0);

  const onScroll = useCallback(() => {
    scrollYRef.current = window.scrollY;
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      const bg = bgRef.current;
      if (bg) {
        // Subtle parallax: moves at 30% of scroll speed
        bg.style.transform = `translateY(${scrollYRef.current * 0.3}px)`;
      }
      rafRef.current = null;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [onScroll]);

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Parallax decorative background layer */}
      <div
        ref={bgRef}
        className="fixed inset-0 pointer-events-none will-change-transform"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      >
        {/* Deep burgundy base */}
        <div className="absolute inset-0 bg-background" />

        {/* Radial wine glow top-left */}
        <div
          className="absolute -top-1/4 -left-1/4 w-3/4 h-3/4 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, oklch(41.8 0.145 15 / 0.6) 0%, transparent 70%)",
          }}
        />

        {/* Gold shimmer bottom-right */}
        <div
          className="absolute -bottom-1/4 -right-1/4 w-2/3 h-2/3 rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, oklch(72.8 0.145 66 / 0.5) 0%, transparent 70%)",
          }}
        />

        {/* Subtle grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />
      </div>

      {/* Content layer */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
