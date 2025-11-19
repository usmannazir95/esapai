import { NextResponse } from "next/server";
import { getServiceBySlug } from "@/lib/services";

interface Params {
  slug: string;
}

export async function GET(
  _request: Request,
  context: { params: Promise<Params> },
) {
  const params = await context.params;
  const slug = params.slug;

  if (!slug) {
    return NextResponse.json({ service: null }, { status: 400 });
  }

  const service = getServiceBySlug(slug);

  if (!service) {
    return NextResponse.json({ service: null }, { status: 404 });
  }

  return NextResponse.json({ service });
}


