import Link from "next/link";
import { Instagram, Mail, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-3xl rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">
          Kontakt
        </p>
        <h1 className="mt-3 text-4xl font-bold text-gray-900">
          Kontaktiraj nas
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Ako imaš pitanja o proizvodima, veličinama ili željenoj narudžbi,
          slobodno nas kontaktiraj.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <a
            href="mailto:info@nakitshop.hr"
            className="flex items-center rounded-2xl border border-gray-200 p-4 transition hover:border-gray-900"
          >
            <Mail className="mr-3 h-5 w-5 text-gray-700" />
            <span className="font-medium text-gray-900">info@nakitshop.hr</span>
          </a>
          <a
            href="tel:+385123456789"
            className="flex items-center rounded-2xl border border-gray-200 p-4 transition hover:border-gray-900"
          >
            <Phone className="mr-3 h-5 w-5 text-gray-700" />
            <span className="font-medium text-gray-900">+385 12 345 6789</span>
          </a>
        </div>

        <a
          href="https://instagram.com/nakitshop"
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center rounded-full bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-700"
        >
          <Instagram className="mr-2 h-4 w-4" />
          Posjeti Instagram
        </a>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <Link
            href="/shop"
            className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
          >
            ← Povratak na proizvode
          </Link>
        </div>
      </div>
    </div>
  );
}
