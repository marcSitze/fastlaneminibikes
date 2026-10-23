import { NextRequest, NextResponse } from "next/server";
import { checkoutRequestSchema } from "@/lib/validations/checkout";
import { processOrderCheckout } from "@/lib/services/checkout";

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const parsed = checkoutRequestSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const { shippingAddress, items, discountCode, paymentMethod } = parsed.data;

    const orderResult = await processOrderCheckout({
      shippingAddress,
      items,
      discountCode,
      paymentMethod,
    });

    return NextResponse.json(orderResult, { status: 201 });
  } catch (error: unknown) {
    console.error("Checkout process error:", error);
    const message = error instanceof Error ? error.message : "Failed to process checkout";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
