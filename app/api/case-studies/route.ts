import { NextResponse } from "next/server";
import { getCaseStudies } from "@/lib/case-studies";

export async function GET() {
  try {
    const caseStudies = await getCaseStudies();

    return NextResponse.json({ caseStudies });
  } catch (error) {
    console.error("Error fetching case studies:", error);
    return NextResponse.json(
      { caseStudies: [], error: "Failed to fetch case studies" },
      { status: 500 }
    );
  }
}
