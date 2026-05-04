import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "nagaoka2025";
const ADMIN_SECRET = process.env.ADMIN_SECRET ?? "changeme-secret";

export async function POST(request: Request) {
  const body = await request.json();
  const { password } = body as { password: string };

  if (!password || password !== ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "パスワードが正しくありません" },
      { status: 401 }
    );
  }

  const cookieStore = await cookies();
  cookieStore.set("admin_session", ADMIN_SECRET, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return NextResponse.json({ ok: true });
}
