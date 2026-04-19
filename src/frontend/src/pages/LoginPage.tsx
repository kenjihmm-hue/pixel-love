import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

export default function LoginPage() {
  const { checkPassword, isLoading, error } = useAuth();
  const [password, setPassword] = useState("");
  const [shaking, setShaking] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const valid = await checkPassword(password);
    if (!valid) {
      setShaking(true);
      setTimeout(() => setShaking(false), 600);
      setPassword("");
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      data-ocid="login.page"
    >
      <div
        className={`w-full max-w-sm glass-effect rounded-2xl p-10 flex flex-col items-center gap-6 animate-scale-in ${shaking ? "animate-[shake_0.5s_ease-in-out]" : ""}`}
      >
        {/* Logo */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-5xl select-none">💕</span>
          <h1
            className="font-display text-3xl tracking-wide"
            style={{ color: "oklch(72.8 0.145 66)" }}
          >
            Pixel Love
          </h1>
          <p
            className="text-sm text-center"
            style={{ color: "oklch(90.2 0.045 1 / 0.65)" }}
          >
            A private space for Aidan & Falak
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-4"
          data-ocid="login.form"
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="secret-code"
              className="text-xs uppercase tracking-widest"
              style={{ color: "oklch(72.8 0.145 66 / 0.8)" }}
            >
              Our Secret Code
            </label>
            <input
              id="secret-code"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your secret…"
              autoComplete="current-password"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 transition-smooth"
              style={{
                borderColor: "oklch(41.8 0.145 15 / 0.5)",
                background: "oklch(95 0.005 0)",
                color: "oklch(12 0.01 0)",
                caretColor: "oklch(12 0.01 0)",
              }}
              data-ocid="login.input"
              disabled={isLoading}
            />
          </div>

          {error && (
            <p
              className="text-sm text-center animate-fade-in"
              style={{ color: "oklch(72.8 0.145 66)" }}
              data-ocid="login.error_state"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading || !password}
            className="w-full py-3 rounded-lg font-body font-medium tracking-wide transition-smooth focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background:
                "linear-gradient(135deg, oklch(41.8 0.145 15), oklch(35 0.12 15))",
              color: "oklch(90.2 0.045 1)",
              boxShadow: "0 4px 16px oklch(41.8 0.145 15 / 0.4)",
            }}
            data-ocid="login.submit_button"
          >
            {isLoading ? "Checking…" : "Enter Our Space ❤️"}
          </button>
        </form>

        <p
          className="text-xs text-center"
          style={{ color: "oklch(65 0.02 0 / 0.6)" }}
        >
          Only Aidan & Falak know the way in
        </p>
      </div>
    </div>
  );
}
