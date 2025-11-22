import { NextResponse } from "next/server";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export async function POST(request: Request) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    return NextResponse.json(
      { success: false, message: "Missing Web3Forms access key." },
      { status: 500 },
    );
  }

  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json(
      { success: false, message: "All fields are required." },
      { status: 400 },
    );
  }

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      access_key: accessKey,
      name,
      email,
      message,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    return NextResponse.json(
      {
        success: false,
        message: errorBody?.message || "Failed to submit contact form.",
      },
      { status: response.status },
    );
  }

  const data = await response.json();
  return NextResponse.json({ success: data.success, message: data.message });
}


