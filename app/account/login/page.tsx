"use client";

import { useState } from "react";
import Link from "next/link";
import { User } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setIsLoggedIn(true);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24 text-center">
      <div className="w-16 h-16 mx-auto rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-red-500 mb-6">
        <User className="w-8 h-8" />
      </div>

      <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wider mb-2">
        Customer Login
      </h1>
      <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider mb-8">
        Access your Fastlane Mini Bikes order history &amp; saved details
      </p>

      {isLoggedIn ? (
        <div className="p-6 bg-green-950/40 border border-green-800 text-green-300 space-y-4">
          <p className="font-bold text-sm uppercase">Welcome back, racer!</p>
          <p className="text-xs text-zinc-300">
            You are signed in as <span className="font-bold text-white">{email}</span>.
          </p>
          <div className="pt-2">
            <Link href="/collections/all" className="btn-fastlane-primary text-xs py-2 px-4">
              Browse Mini Bike Shop
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-6 bg-zinc-950 border border-zinc-800 space-y-4 text-left">
          <div>
            <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="racer@example.com"
              className="w-full bg-black border border-zinc-700 px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#ffd000]"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-bold uppercase text-zinc-400">
                Password
              </label>
              <a href="#" className="text-[11px] text-red-500 hover:underline uppercase">
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-black border border-zinc-700 px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#ffd000]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-black uppercase text-xs tracking-widest transition-colors shadow-[0_0_15px_rgba(255,0,0,0.4)]"
          >
            Sign In
          </button>

          <div className="pt-4 text-center border-t border-zinc-900">
            <p className="text-xs text-zinc-400">
              New customer?{" "}
              <a href="#" className="text-white hover:text-red-500 font-bold uppercase">
                Create Account
              </a>
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
