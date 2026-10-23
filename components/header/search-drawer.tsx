"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

interface SearchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchDrawer({ isOpen, onClose }: SearchDrawerProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    onClose();
  };

  return (
    <div className="fixed inset-x-0 top-0 z-50 bg-black/95 backdrop-blur-md border-b-2 border-red-600 shadow-[0_4px_25px_rgba(255,0,0,0.3)] animate-in slide-in-from-top duration-200">
      <div className="max-w-4xl mx-auto px-4 py-6 flex items-center gap-4">
        <form onSubmit={handleSubmit} className="flex-1 flex items-center relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search our catalog (e.g. roller kit, 212cc, tire, exhaust)..."
            autoFocus
            className="w-full bg-zinc-900 border border-zinc-700 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-[#ffd000] focus:ring-1 focus:ring-[#ffd000] text-base"
          />
          <button
            type="submit"
            className="absolute right-3 text-zinc-400 hover:text-red-500 transition-colors p-1"
            aria-label="Submit search"
          >
            <Search className="w-5 h-5" />
          </button>
        </form>

        <button
          onClick={onClose}
          className="text-zinc-400 hover:text-white p-2 border border-zinc-800 hover:border-red-600 transition-colors"
          aria-label="Close search"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
