import { NextRequest, NextResponse } from "next/server";
import { landing } from "@/content/landing";
import { SUPABASE_REST_URL, SUPABASE_SECRET_KEY } from "@/lib/supabase";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const { errors, success, alreadySubscribed } = landing.subscribe;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email } = body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: errors.nameRequired },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: errors.emailInvalid },
        { status: 400 }
      );
    }

    const response = await fetch(`${SUPABASE_REST_URL}/subscribers`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_SECRET_KEY,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        email: email.toLowerCase().trim(),
        name: name.trim(),
      }),
    });

    if (response.status === 409) {
      return NextResponse.json(
        { message: alreadySubscribed },
        { status: 409 }
      );
    }

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("[subscribe] Supabase responded with error", {
        status: response.status,
        body: errorBody,
      });
      return NextResponse.json(
        { error: errors.serverError },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: success },
      { status: 201 }
    );
  } catch (err) {
    console.error("[subscribe] Unhandled error", err);
    return NextResponse.json(
      { error: errors.serverError },
      { status: 500 }
    );
  }
}
