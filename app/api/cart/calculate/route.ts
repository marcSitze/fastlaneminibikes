import { NextRequest, NextResponse } from "next/server";
import { calculateOrderServer } from "@/lib/services/checkout";
import { z } from "zod";

const calculateBodySchema = z.object({
  items: z.array(
    z.object({
      variantId: z.string(),
      quantity: z.number().int().positive(),
    })
  ),
  discountCode: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const parsed = calculateBodySchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid cart payload", details: parsed.error.issues }, { status: 400 });
    }

    const calculation = await calculateOrderServer({
      items: parsed.data.items,
      discountCode: parsed.data.discountCode,
    });

    return NextResponse.json(calculation);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Calculation failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
