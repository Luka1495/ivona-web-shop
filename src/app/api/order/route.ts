import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const toEmail = process.env.ORDER_EMAIL || "info@nakitshop.hr";

    const orderSummary = body.items
      .map(
        (item: { product: { name: string }; quantity: number; size?: string }) =>
          `- ${item.product.name} (${item.quantity}x, ${item.size || "standardna veličina"})`,
      )
      .join("\n");

    const message = [
      "Pozdrav,",
      "",
      "Želim naručiti sljedeće proizvode:",
      orderSummary,
      "",
      `Ime i prezime: ${body.customerName}`,
      `Email: ${body.customerEmail}`,
      `Telefon: ${body.customerPhone}`,
      `Grad: ${body.customerCity}`,
      `Poštanski broj: ${body.customerPostalCode}`,
      `Ulica i kućni broj: ${body.customerAddress}`,
      `Način plaćanja: ${body.paymentMethod}`,
      `Napomena: ${body.note || "-"}`,
      "",
      `Ukupno: €${Number(body.totalPrice || 0).toFixed(2)}`,
    ].join("\n");

    const formData = new URLSearchParams({
      name: body.customerName,
      email: body.customerEmail,
      subject: "Nova narudžba",
      message,
      phone: body.customerPhone,
      payment: body.paymentMethod,
      address: `${body.customerCity}, ${body.customerPostalCode}, ${body.customerAddress}`,
    });

    const response = await fetch(`https://formsubmit.co/ajax/${toEmail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      throw new Error(`Email service returned ${response.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Order submission failed", error);
    return NextResponse.json(
      { success: false, error: "Nije moguće poslati narudžbu odmah." },
      { status: 500 },
    );
  }
}
