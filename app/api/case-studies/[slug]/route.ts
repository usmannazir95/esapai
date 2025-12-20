import { NextResponse } from "next/server";
import { getCaseStudyBySlug } from "@/lib/case-studies";
import type { Params } from "@/types/api";

export async function GET(
  _request: Request,
  context: { params: Promise<Params> }
) {
  const params = await context.params;
  const slug = params.slug;

  if (!slug) {
    return NextResponse.json({ caseStudy: null }, { status: 400 });
  }

  try {
    const caseStudy = await getCaseStudyBySlug(slug);

    if (!caseStudy) {
      return NextResponse.json({ caseStudy: null }, { status: 404 });
    }

    return NextResponse.json({ caseStudy });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error fetching case study:", error);
    }
    return NextResponse.json(
      { caseStudy: null, error: "Failed to fetch case study" },
      { status: 500 }
    );
  }
}
