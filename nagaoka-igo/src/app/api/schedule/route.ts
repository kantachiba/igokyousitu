import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getEventsByMonth, createScheduleEvent } from "@/lib/schedule-store";

const ADMIN_SECRET = process.env.ADMIN_SECRET;

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const year = Number(url.searchParams.get("year") ?? new Date().getFullYear());
  const month = Number(url.searchParams.get("month") ?? new Date().getMonth() + 1);

  const events = await getEventsByMonth(year, month);
  return NextResponse.json(events);
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  if (!ADMIN_SECRET || cookieStore.get("admin_session")?.value !== ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { date, startTime, title, description } = body as {
    date: string;
    startTime: string;
    title: string;
    description?: string;
  };

  if (!date || !startTime || !title) {
    return NextResponse.json(
      { error: "date・startTime・titleは必須です" },
      { status: 400 }
    );
  }

  try {
    const event = await createScheduleEvent({ date, startTime, title, description });
    return NextResponse.json(event, { status: 201 });
  } catch (err) {
    console.error("[schedule POST]", err);
    return NextResponse.json({ error: "サーバーエラーが発生しました" }, { status: 500 });
  }
}
