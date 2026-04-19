import type { HeartParticle } from "@/types";
import { useCallback, useEffect, useState } from "react";

const HEART_EMOJIS = ["❤️", "💕", "💖", "💗", "💝", "🩷", "♥️"];
let heartCounter = 0;

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<HeartParticle[]>([]);

  const spawnHeart = useCallback((x: number, y: number) => {
    const id = ++heartCounter;
    const emoji = HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];
    setHearts((prev) => [...prev, { id, x, y, emoji }]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== id));
    }, 2000);
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      // Spawn 2-4 hearts per click for a delightful burst
      const count = 2 + Math.floor(Math.random() * 3);
      for (let i = 0; i < count; i++) {
        setTimeout(() => {
          const jitterX = (Math.random() - 0.5) * 40;
          const jitterY = (Math.random() - 0.5) * 20;
          spawnHeart(e.clientX + jitterX, e.clientY + jitterY);
        }, i * 80);
      }
    }

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [spawnHeart]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9998]"
      aria-hidden="true"
    >
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute animate-[float-hearts_2s_ease-out_forwards] select-none text-xl"
          style={{
            left: heart.x,
            top: heart.y,
            marginLeft: "-0.5em",
            marginTop: "-0.5em",
          }}
        >
          {heart.emoji}
        </span>
      ))}
    </div>
  );
}
