import { NextRequest, NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validations/checkout";

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const parsed = newsletterSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for subscribing to Fastlane Mini Bikes updates!",
    });
  } catch {
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
