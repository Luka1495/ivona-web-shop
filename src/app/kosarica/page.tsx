"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { Trash2, ShoppingBag, Plus, Minus } from "lucide-react";
import { useCartStore } from "@/lib/store";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { useRouter, useSearchParams } from "next/navigation";

function CartPageContent() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerCity, setCustomerCity] = useState("");
  const [customerPostalCode, setCustomerPostalCode] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Kartično plaćanje");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [hasProcessedSuccess, setHasProcessedSuccess] = useState(false);

  const checkoutStatus = searchParams.get("checkout");

  const totalPrice = useMemo(() => {
    return items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
  }, [items]);

  useEffect(() => {
    if (checkoutStatus !== "success" || hasProcessedSuccess) {
      return;
    }

    const pendingOrder = window.sessionStorage.getItem("pending-card-order");

    if (!pendingOrder) {
      setHasProcessedSuccess(true);
      return;
    }

    const submitPendingOrder = async () => {
      try {
        const payload = JSON.parse(pendingOrder);
        const response = await fetch("/api/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.error || "Nije moguće poslati narudžbu.");
        }

        window.sessionStorage.removeItem("pending-card-order");
        setSubmitted(true);
        clearCart();
        setHasProcessedSuccess(true);
      } catch (error) {
        setSubmitError(
          error instanceof Error
            ? error.message
            : "Došlo je do pogreške prilikom obrade narudžbe.",
        );
        setHasProcessedSuccess(true);
      }
    };

    void submitPendingOrder();
  }, [checkoutStatus, clearCart, hasProcessedSuccess]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      if (paymentMethod === "Kartično plaćanje") {
        const payload = {
          customerName,
          customerEmail,
          customerPhone,
          customerCity,
          customerPostalCode,
          customerAddress,
          paymentMethod,
          note,
          totalPrice,
          items,
        };

        window.sessionStorage.setItem("pending-card-order", JSON.stringify(payload));

        const response = await fetch("/api/create-checkout-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok || !data.success || !data.url) {
          throw new Error(data.error || "Nije moguće pokrenuti plaćanje.");
        }

        window.location.href = data.url;
        return;
      }

      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName,
          customerEmail,
          customerPhone,
          customerCity,
          customerPostalCode,
          customerAddress,
          paymentMethod,
          note,
          totalPrice,
          items,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Nije moguće poslati narudžbu.");
      }

      setSubmitted(true);
      clearCart();
      router.push("/shop");
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Došlo je do pogreške. Pokušaj ponovno.",
      );
    } finally {
      setIsSubmitting(false);
    }
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
            Nakon što ispuniš podatke, narudžba će biti poslana direktno i
            spremna za obradu.
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

            <div className="grid gap-4 sm:grid-cols-2">
              <input
                required
                value={customerCity}
                onChange={(event) => setCustomerCity(event.target.value)}
                className="w-full rounded-2xl border border-gray-300 px-4 py-3"
                placeholder="Grad"
              />
              <input
                required
                value={customerPostalCode}
                onChange={(event) => setCustomerPostalCode(event.target.value)}
                className="w-full rounded-2xl border border-gray-300 px-4 py-3"
                placeholder="Poštanski broj"
              />
            </div>

            <input
              required
              value={customerAddress}
              onChange={(event) => setCustomerAddress(event.target.value)}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3"
              placeholder="Ulica i kućni broj"
            />

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Način plaćanja
              </label>
              <div className="grid gap-2 sm:grid-cols-2">
                <label className="flex cursor-pointer items-center gap-2 rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Kartično plaćanje"
                    checked={paymentMethod === "Kartično plaćanje"}
                    onChange={(event) => setPaymentMethod(event.target.value)}
                  />
                  Kartično plaćanje
                </label>
                <label className="flex cursor-pointer items-center gap-2 rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Pouzećem"
                    checked={paymentMethod === "Pouzećem"}
                    onChange={(event) => setPaymentMethod(event.target.value)}
                  />
                  Pouzećem
                </label>
              </div>
            </div>

            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              className="min-h-24 w-full rounded-2xl border border-gray-300 px-4 py-3"
              placeholder="Napomena za narudžbu"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Šaljem narudžbu..." : "Pošalji narudžbu"}
            </button>
          </form>

          <div className="mt-6 rounded-2xl bg-white p-4 text-sm text-gray-700 shadow-sm">
            <p className="font-semibold text-gray-900">
              Ukupno: €{totalPrice.toFixed(2)}
            </p>
            <p className="mt-2">
              Ako odabereš kartično plaćanje, bit ćeš preusmjeren na siguran
              Stripe checkout. Za pouzeće narudžba se šalje direktno.
            </p>
            {checkoutStatus === "success" && (
              <p className="mt-3 text-green-600">
                Plaćanje je uspješno završeno. Hvala na narudžbi!
              </p>
            )}
            {checkoutStatus === "cancel" && (
              <p className="mt-3 text-red-600">
                Plaćanje je otkazano. Ako želiš, možeš pokušati ponovno.
              </p>
            )}
            {submitted && (
              <p className="mt-3 text-green-600">
                Narudžba je uspješno poslana. Hvala!
              </p>
            )}
            {submitError && <p className="mt-3 text-red-600">{submitError}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-16">Učitavanje...</div>}>
      <CartPageContent />
    </Suspense>
  );
}
