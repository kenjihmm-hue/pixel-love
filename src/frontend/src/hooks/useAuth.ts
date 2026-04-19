import { createActor } from "@/backend";
import type { AuthState } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useCallback, useState } from "react";

const AUTH_KEY = "pixel_love_auth";

const VALID_CODES = ["candybara", "pixellove"];

export function useAuth(): AuthState & {
  checkPassword: (password: string) => Promise<boolean>;
  logout: () => void;
} {
  const { actor, isFetching } = useActor(createActor);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(AUTH_KEY) === "true";
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkPassword = useCallback(
    async (password: string): Promise<boolean> => {
      if (!actor || isFetching) {
        // Fallback: check hardcoded passwords while actor loads
        const isValid = VALID_CODES.includes(password);
        if (isValid) {
          localStorage.setItem(AUTH_KEY, "true");
          setIsAuthenticated(true);
          setError(null);
        } else {
          setError("Wrong secret code. Try again 💕");
        }
        return isValid;
      }

      setIsLoading(true);
      setError(null);
      try {
        const valid = await actor.checkPassword(password);
        if (valid) {
          localStorage.setItem(AUTH_KEY, "true");
          setIsAuthenticated(true);
        } else {
          // Also check hardcoded codes as fallback
          const hardcodedValid = VALID_CODES.includes(password);
          if (hardcodedValid) {
            localStorage.setItem(AUTH_KEY, "true");
            setIsAuthenticated(true);
            return true;
          }
          setError("Wrong secret code. Try again 💕");
        }
        return valid;
      } catch {
        const fallback = VALID_CODES.includes(password);
        if (fallback) {
          localStorage.setItem(AUTH_KEY, "true");
          setIsAuthenticated(true);
        } else {
          setError("Wrong secret code. Try again 💕");
        }
        return fallback;
      } finally {
        setIsLoading(false);
      }
    },
    [actor, isFetching],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
    setError(null);
  }, []);

  return { isAuthenticated, isLoading, error, checkPassword, logout };
}
