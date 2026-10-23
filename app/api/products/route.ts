import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/lib/repositories/products";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const search = searchParams.get("search") || undefined;
    const sort = (searchParams.get("sort") as "featured" | "best-selling" | "title-asc" | "title-desc" | "price-asc" | "price-desc") || "featured";
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const offset = parseInt(searchParams.get("offset") || "0", 10);

    const result = await getProducts({
      category,
      search,
      sort,
      limit,
      offset,
    });

    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error("API /api/products error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
