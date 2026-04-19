import { useCallback, useEffect, useState } from "react";

interface PolaroidPhoto {
  src: string;
  caption: string;
  rotation: number;
  label: string;
}

const PHOTOS: PolaroidPhoto[] = [
  {
    src: "/assets/photos/photo-02.jpg",
    caption: "Us 💕",
    rotation: -3,
    label: "Matching outfits, matching hearts",
  },
  {
    src: "/assets/photos/photo-03.jpg",
    caption: "Our Steps 🌸",
    rotation: 2,
    label: "Every step together",
  },
  {
    src: "/assets/photos/photo-04.jpg",
    caption: "Falak 💙",
    rotation: -1.5,
    label: "Her beautiful smile",
  },
  {
    src: "/assets/photos/photo-05.jpg",
    caption: "Falak 🕶️",
    rotation: 3,
    label: "Cool & effortlessly stunning",
  },
  {
    src: "/assets/photos/photo-06.jpg",
    caption: "Falak 🌸",
    rotation: -2,
    label: "Flower in her hair, jhumka shining",
  },
  {
    src: "/assets/photos/photo-07.jpg",
    caption: "Falak ✨",
    rotation: 1.5,
    label: "A candid moment of beauty",
  },
  {
    src: "/assets/photos/photo-08.jpg",
    caption: "Aidan & Falak 🌊",
    rotation: -4,
    label: "Travel License — Sparkle Sea",
  },
  {
    src: "/assets/photos/photo-09.jpg",
    caption: "Aidan 🪞",
    rotation: 2.5,
    label: "Looking sharp as always",
  },
  {
    src: "/assets/photos/photo-10.jpg",
    caption: "Aidan 🌼",
    rotation: -1,
    label: "Daisy boy ❤️",
  },
];

interface LightboxProps {
  photo: PolaroidPhoto;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function Lightbox({ photo, onClose, onPrev, onNext }: LightboxProps) {
  return (
    <div
      className="fixed inset-0 z-[9990] flex items-center justify-center p-4"
      style={{ background: "oklch(7.2 0.02 0 / 0.95)" }}
      data-ocid="photowall.dialog"
    >
      <button
        type="button"
        className="absolute inset-0 w-full h-full cursor-default"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        aria-label="Close lightbox background"
        style={{ background: "transparent" }}
      />
      <div
        className="relative max-w-2xl w-full animate-scale-in z-10"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <img
          src={photo.src}
          alt={photo.caption}
          className="w-full rounded-lg shadow-elevated"
          style={{ maxHeight: "75vh", objectFit: "contain" }}
        />
        <div className="text-center mt-4">
          <p
            className="font-display text-xl"
            style={{ color: "oklch(72.8 0.145 66)" }}
          >
            {photo.caption}
          </p>
          <p
            className="text-sm mt-1"
            style={{ color: "oklch(90.2 0.045 1 / 0.6)" }}
          >
            {photo.label}
          </p>
        </div>

        {/* Controls */}
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-3 -right-3 w-9 h-9 rounded-full flex items-center justify-center transition-smooth hover:scale-110 focus-visible:outline-none"
          style={{
            background: "oklch(41.8 0.145 15)",
            color: "oklch(90.2 0.045 1)",
          }}
          aria-label="Close"
          data-ocid="photowall.close_button"
        >
          ✕
        </button>
        <button
          type="button"
          onClick={onPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-9 h-9 rounded-full flex items-center justify-center transition-smooth hover:scale-110 focus-visible:outline-none"
          style={{
            background: "oklch(41.8 0.145 15 / 0.8)",
            color: "oklch(90.2 0.045 1)",
          }}
          aria-label="Previous photo"
          data-ocid="photowall.pagination_prev"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={onNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-9 h-9 rounded-full flex items-center justify-center transition-smooth hover:scale-110 focus-visible:outline-none"
          style={{
            background: "oklch(41.8 0.145 15 / 0.8)",
            color: "oklch(90.2 0.045 1)",
          }}
          aria-label="Next photo"
          data-ocid="photowall.pagination_next"
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default function PhotoWall() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [shuffled, setShuffled] = useState(false);
  const [photos, setPhotos] = useState<(PolaroidPhoto & { key: string })[]>(
    PHOTOS.map((p, i) => ({ ...p, key: `photo-${i}` })),
  );
  const [slideshowActive, setSlideshowActive] = useState(false);

  const handleShuffle = useCallback(() => {
    setShuffled(true);
    setPhotos((prev) => [...prev].sort(() => Math.random() - 0.5));
    setTimeout(() => setShuffled(false), 300);
  }, []);

  const handlePrev = useCallback(() => {
    setOpenIndex((i) =>
      i === null ? 0 : (i - 1 + photos.length) % photos.length,
    );
  }, [photos.length]);

  const handleNext = useCallback(() => {
    setOpenIndex((i) => (i === null ? 0 : (i + 1) % photos.length));
  }, [photos.length]);

  // Slideshow: auto-advance every 3 seconds when active
  useEffect(() => {
    if (!slideshowActive) return;
    // Open at first photo if none selected
    setOpenIndex((prev) => (prev === null ? 0 : prev));
    const interval = setInterval(() => {
      setOpenIndex((i) => (i === null ? 0 : (i + 1) % photos.length));
    }, 3000);
    return () => clearInterval(interval);
  }, [slideshowActive, photos.length]);

  const handleToggleSlideshow = useCallback(() => {
    setSlideshowActive((active) => {
      if (active) {
        // stopping slideshow also closes lightbox
        setOpenIndex(null);
      }
      return !active;
    });
  }, []);

  return (
    <div>
      {/* Controls */}
      <div className="flex justify-center gap-3 mb-8">
        <button
          type="button"
          onClick={handleShuffle}
          className="px-5 py-2 rounded-full text-sm transition-smooth hover:scale-105 active:scale-95 focus-visible:outline-none"
          style={{
            border: "1px solid oklch(41.8 0.145 15 / 0.5)",
            color: "oklch(72.8 0.145 66)",
            background: "oklch(41.8 0.145 15 / 0.1)",
          }}
          data-ocid="photowall.secondary_button"
        >
          Shuffle Photos 🔀
        </button>
        <button
          type="button"
          onClick={handleToggleSlideshow}
          className="px-5 py-2 rounded-full text-sm transition-smooth hover:scale-105 active:scale-95 focus-visible:outline-none"
          style={{
            border: `1px solid ${slideshowActive ? "oklch(72.8 0.145 66 / 0.6)" : "oklch(41.8 0.145 15 / 0.5)"}`,
            color: slideshowActive
              ? "oklch(72.8 0.145 66)"
              : "oklch(72.8 0.145 66)",
            background: slideshowActive
              ? "oklch(72.8 0.145 66 / 0.15)"
              : "oklch(41.8 0.145 15 / 0.1)",
          }}
          data-ocid="photowall.toggle"
        >
          {slideshowActive ? "Stop Slideshow ⏹" : "Start Slideshow ▶"}
        </button>
      </div>

      {/* Polaroid grid */}
      <div
        className={`grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-8 transition-opacity duration-300 ${shuffled ? "opacity-0" : "opacity-100"}`}
        data-ocid="photowall.list"
      >
        {photos.map((photo, i) => (
          <button
            key={photo.key}
            type="button"
            className="group cursor-pointer focus-visible:outline-none"
            style={{
              transform: `rotate(${photo.rotation}deg)`,
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onClick={() => setOpenIndex(i)}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform =
                "rotate(0deg) scale(1.04)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform =
                `rotate(${photo.rotation}deg) scale(1)`;
            }}
            aria-label={`View photo: ${photo.caption}`}
            data-ocid={`photowall.item.${i + 1}`}
          >
            {/* Polaroid frame */}
            <div
              className="p-3 pb-8 shadow-elevated"
              style={{ background: "oklch(14 0.018 0)" }}
            >
              <div className="overflow-hidden aspect-square">
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <p
                className="mt-3 text-center text-xs font-display"
                style={{ color: "oklch(72.8 0.145 66 / 0.9)" }}
              >
                {photo.caption}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {openIndex !== null && (
        <Lightbox
          photo={photos[openIndex]}
          onClose={() => setOpenIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
}
