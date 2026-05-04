import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_SECRET = process.env.ADMIN_SECRET;

export async function POST(request: Request) {
  const body = await request.json();
  const { password } = body as { password: string };

  if (!ADMIN_PASSWORD || !password || password !== ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "パスワードが正しくありません" },
      { status: 401 }
    );
  }

  if (!ADMIN_SECRET) {
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
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
