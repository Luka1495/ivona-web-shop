import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

let stripe: Stripe | null = null;

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    return null;
  }

  if (!stripe) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-06-24.dahlia",
    });
  }

  return stripe;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const stripeClient = getStripe();

    if (!stripeClient) {
      return NextResponse.json(
        { success: false, error: "Stripe nije konfiguriran." },
        { status: 500 },
      );
    }

    const session = await stripeClient.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `Narudžba iz nakit shop`,
            },
            unit_amount: Math.round(Number(body.totalPrice || 0) * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${request.headers.get("origin") || "http://localhost:3000"}/kosarica?checkout=success`,
      cancel_url: `${request.headers.get("origin") || "http://localhost:3000"}/kosarica?checkout=cancel`,
      customer_email: body.customerEmail,
      metadata: {
        customerName: body.customerName,
        customerEmail: body.customerEmail,
        customerPhone: body.customerPhone,
        customerCity: body.customerCity,
        customerPostalCode: body.customerPostalCode,
        customerAddress: body.customerAddress,
        paymentMethod: body.paymentMethod,
        note: body.note || "",
        items: JSON.stringify(body.items || []),
      },
    });

    return NextResponse.json({ success: true, url: session.url });
  } catch (error) {
    console.error("Stripe checkout failed", error);
    return NextResponse.json(
      { success: false, error: "Nije moguće pokrenuti plaćanje." },
      { status: 500 },
    );
  }
}
