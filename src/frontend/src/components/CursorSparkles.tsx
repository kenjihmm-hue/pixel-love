import { useCallback, useEffect, useRef } from "react";

let sparkleCounter = 0;

export default function CursorSparkles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sparklesRef = useRef<Map<number, HTMLDivElement>>(new Map());

  const createSparkle = useCallback((x: number, y: number) => {
    const container = containerRef.current;
    if (!container) return;

    const id = ++sparkleCounter;
    const el = document.createElement("div");
    const size = 6 + Math.random() * 8;
    const angle = Math.random() * 360;
    const offsetX = (Math.random() - 0.5) * 20;
    const offsetY = (Math.random() - 0.5) * 20;

    el.style.cssText = `
      position: fixed;
      left: ${x + offsetX}px;
      top: ${y + offsetY}px;
      width: ${size}px;
      height: ${size}px;
      pointer-events: none;
      z-index: 9999;
      transform: rotate(${angle}deg);
      animation: sparkle 0.8s ease-out forwards;
    `;
    el.innerHTML = `
      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
        <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5Z" 
              fill="oklch(72.8 0.145 66)" opacity="0.9"/>
      </svg>
    `;

    container.appendChild(el);
    sparklesRef.current.set(id, el);

    setTimeout(() => {
      el.remove();
      sparklesRef.current.delete(id);
    }, 800);
  }, []);

  useEffect(() => {
    let lastTime = 0;
    const THROTTLE_MS = 40;

    function handleMouseMove(e: MouseEvent) {
      const now = Date.now();
      if (now - lastTime < THROTTLE_MS) return;
      lastTime = now;

      // Only create sparkles occasionally for a subtle effect
      if (Math.random() > 0.4) return;
      createSparkle(e.clientX, e.clientY);
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [createSparkle]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      aria-hidden="true"
    />
  );
}
