"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Trash2, ShoppingBag, Plus, Minus } from "lucide-react";
import { useCartStore } from "@/lib/store";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const totalPrice = useMemo(() => {
    return items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
  }, [items]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const orderSummary = items
      .map(
        (item) =>
          `- ${item.product.name} (${item.quantity}x, ${item.size || "standardna veličina"})`,
      )
      .join("\n");

    const body = encodeURIComponent(
      `Pozdrav,\n\nŽelim naručiti sljedeće proizvode:\n${orderSummary}\n\nIme: ${customerName}\nEmail: ${customerEmail}\nTelefon: ${customerPhone}\nNapomena: ${note || "-"}\n\nUkupno: €${totalPrice.toFixed(2)}`,
    );

    window.location.href = `mailto:info@nakitshop.hr?subject=${encodeURIComponent("Nova narudžba")}&body=${body}`;
    setSubmitted(true);
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <ShoppingBag className="h-8 w-8 text-gray-700" />
        </div>
        <h1 className="mt-6 text-3xl font-bold text-gray-900">
          Košarica je prazna
        </h1>
        <p className="mt-3 text-gray-600">
          Dodaj proizvode u košaricu i narudžba će biti odmah spremna.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-block rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-700"
        >
          Pogledaj proizvode
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">
            Košarica
          </p>
          <h1 className="text-3xl font-bold text-gray-900">Tvoja narudžba</h1>
        </div>
        <button
          type="button"
          onClick={() => clearCart()}
          className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-900 hover:text-gray-900"
        >
          Isprazni košaricu
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr]">
        <div className="space-y-4">
          {items.map((item) => {
            const imageUrl = item.product.images?.[0]
              ? urlFor(item.product.images[0]).width(300).height(300).url()
              : "/placeholder.jpg";

            return (
              <div
                key={`${item.product._id}-${item.size || "default"}`}
                className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
              >
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                  <Image
                    src={imageUrl}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        {item.product.name}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {item.size
                          ? `Veličina: ${item.size}`
                          : "Standardna veličina"}
                      </p>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">
                      €{(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <label className="text-sm font-medium text-gray-600">
                      Količina
                    </label>
                    <div className="flex items-center gap-2 rounded-full border border-gray-300 px-2 py-2">
                      <button
                        type="button"
                        onClick={() =>
                          item.quantity > 1 &&
                          updateQuantity(
                            item.product._id,
                            item.quantity - 1,
                            item.size,
                          )
                        }
                        disabled={item.quantity <= 1}
                        className="rounded-full p-1 text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-6 text-center text-sm font-semibold text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.product._id,
                            item.quantity + 1,
                            item.size,
                          )
                        }
                        className="rounded-full p-1 text-gray-600 transition hover:bg-gray-100"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.product._id, item.size)}
                      className="flex items-center text-sm font-medium text-gray-500 transition hover:text-red-600"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Ukloni
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900">
            Podaci za narudžbu
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Nakon što ispuniš podatke, otvorit će se tvoj e-mail klijent sa
            spremnom narudžbom.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              required
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3"
              placeholder="Ime i prezime"
            />
            <input
              required
              type="email"
              value={customerEmail}
              onChange={(event) => setCustomerEmail(event.target.value)}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3"
              placeholder="Email"
            />
            <input
              required
              value={customerPhone}
              onChange={(event) => setCustomerPhone(event.target.value)}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3"
              placeholder="Telefon"
            />
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              className="min-h-24 w-full rounded-2xl border border-gray-300 px-4 py-3"
              placeholder="Napomena za narudžbu"
            />

            <button
              type="submit"
              className="w-full rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-700"
            >
              Pošalji narudžbu
            </button>
          </form>

          <div className="mt-6 rounded-2xl bg-white p-4 text-sm text-gray-700 shadow-sm">
            <p className="font-semibold text-gray-900">
              Ukupno: €{totalPrice.toFixed(2)}
            </p>
            <p className="mt-2">
              Narudžba će biti poslana na e-mail i odmah spremna za daljnju
              obradu.
            </p>
            {submitted && (
              <p className="mt-3 text-green-600">
                E-mail je pripremljen. Pošalji ga ako je potrebno.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
