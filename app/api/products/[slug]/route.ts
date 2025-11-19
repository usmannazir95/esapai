import { NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/products";

interface Params {
  slug: string;
}

export async function GET(
  request: Request,
  context: { params: Promise<Params> },
) {
  const params = await context.params;
  const slug = params.slug;

  if (!slug) {
    return NextResponse.json({ product: null }, { status: 400 });
  }

  const product = getProductBySlug(slug);

  if (!product) {
    return NextResponse.json({ product: null }, { status: 404 });
  }

  return NextResponse.json({ product });
}


