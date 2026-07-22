// src/components/Footer.tsx

import { Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#e9dfd1] bg-[#fcfbf8]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-[#6f6259] md:flex-row md:text-left">
          <p>© {new Date().getFullYear()} IVONA</p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/ivona_unikat_nakit/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center transition hover:text-[#3f342d]"
            >
              <Instagram className="mr-2 h-4 w-4" />
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
