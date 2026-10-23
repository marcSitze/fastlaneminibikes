"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "Thank you for subscribing to Fastlane updates!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Failed to subscribe. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="w-full max-w-md">
      <h3 className="text-sm font-black text-white uppercase tracking-wider mb-2">
        Subscribe to our newsletter
      </h3>
      <p className="text-xs text-zinc-400 mb-4 leading-relaxed font-bold uppercase tracking-wider">
        Get the latest drops on custom mini bike builds, racing parts, and exclusive promo codes.
      </p>

      {status === "success" ? (
        <div className="flex items-center gap-2 text-green-400 text-xs font-bold uppercase tracking-wide bg-green-950/40 border border-green-800 p-3">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{message}</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="flex">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 bg-black border border-zinc-700 px-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ffd000] focus:ring-1 focus:ring-[#ffd000]"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-white hover:bg-red-600 text-red-600 hover:text-white px-5 py-2.5 font-bold uppercase text-xs tracking-wider border border-white hover:border-red-600 transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              <span>{status === "loading" ? "Joining..." : "Subscribe"}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

          {status === "error" && (
            <div className="flex items-center gap-1.5 text-red-400 text-xs mt-1">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{message}</span>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
