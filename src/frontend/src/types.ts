import type { PhotoMeta as BackendPhotoMeta } from "./backend.d.ts";

export interface Photo {
  id: string;
  caption: string;
  url: string;
  dateTaken: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface TimeElapsed {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface HeartParticle {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

export interface SparkleParticle {
  id: number;
  x: number;
  y: number;
}

export function fromBackendPhoto(meta: BackendPhotoMeta): Photo {
  return {
    id: String(meta.id),
    caption: meta.caption,
    url: meta.url,
    dateTaken: meta.dateTaken,
  };
}
