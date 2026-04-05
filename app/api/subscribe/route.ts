import { NextRequest, NextResponse } from "next/server";
import { landing } from "@/content/landing";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const subscribers = new Set<string>();

const { errors, successMessage } = landing.subscribe;

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

    const normalizedEmail = email.toLowerCase().trim();

    if (subscribers.has(normalizedEmail)) {
      return NextResponse.json(
        { error: errors.emailDuplicate },
        { status: 409 }
      );
    }

    subscribers.add(normalizedEmail);

    // TODO: Replace in-memory Set with Supabase persistence (second iteration)

    return NextResponse.json(
      { message: successMessage },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: errors.serverError },
      { status: 500 }
    );
  }
}
