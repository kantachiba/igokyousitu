import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getAllNews, createNews } from "@/lib/news-store";
import type { NewsCategory } from "@/data/news";

const ADMIN_SECRET = process.env.ADMIN_SECRET ?? "changeme-secret";

export async function GET() {
  return NextResponse.json(await getAllNews());
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  if (cookieStore.get("admin_session")?.value !== ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { title, content, category, date } = body as {
    title: string;
    content: string;
    category: NewsCategory;
    date: string;
  };

  if (!title || !category || !date) {
    return NextResponse.json(
      { error: "title・category・dateは必須です" },
      { status: 400 }
    );
  }

  const item = await createNews({ title, body: content ?? "", category, date });
  return NextResponse.json(item, { status: 201 });
}
