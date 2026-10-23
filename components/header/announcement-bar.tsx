import Link from "next/link";

export function AnnouncementBar() {
  return (
    <div className="bg-black text-[#f5f5f5] border-b border-red-600/40 text-center py-2 px-4 transition-colors hover:bg-zinc-900">
      <Link
        href="/collections/all"
        className="text-xs sm:text-sm font-bold uppercase tracking-widest block hover:text-red-500 transition-colors"
      >
        YOUR 1 STOP MINI BIKE SHOP 4 PARTS &amp; UPGRADES
      </Link>
    </div>
  );
}
