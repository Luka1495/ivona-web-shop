// src/components/Header.tsx

"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCartStore } from "../lib/store";
import { useState, useEffect } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const getTotalItems = useCartStore((state) => state.getTotalItems);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-[#e9dfd1] bg-[#fcfbf8]/95 backdrop-blur-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-semibold tracking-[0.2em] text-[#3f342d]"
          >
            IVONA
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-sm font-medium text-[#6f6259] transition hover:text-[#3f342d]"
            >
              Naslovna
            </Link>
            <Link
              href="/shop"
              className="text-sm font-medium text-[#6f6259] transition hover:text-[#3f342d]"
            >
              Shop
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/kosarica"
              className="relative rounded-full border border-[#e4d8c8] bg-white p-2.5 text-[#3f342d] transition hover:border-[#c8ae88] hover:text-[#2c241f]"
            >
              <ShoppingCart className="h-5 w-5" />
              {isMounted && getTotalItems() > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#3f342d] text-[10px] font-semibold text-white">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-full border border-[#e4d8c8] bg-white p-2.5 text-[#3f342d] md:hidden"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="mt-4 space-y-2 border-t border-[#eee4d9] pt-4 md:hidden">
            <Link
              href="/"
              className="block rounded-xl px-3 py-2 text-sm font-medium text-[#6f6259] hover:bg-[#f7efe7]"
              onClick={() => setIsMenuOpen(false)}
            >
              Naslovna
            </Link>
            <Link
              href="/shop"
              className="block rounded-xl px-3 py-2 text-sm font-medium text-[#6f6259] hover:bg-[#f7efe7]"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
