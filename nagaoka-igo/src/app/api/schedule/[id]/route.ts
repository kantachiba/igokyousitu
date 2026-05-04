import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { deleteScheduleEvent } from "@/lib/schedule-store";

const ADMIN_SECRET = process.env.ADMIN_SECRET ?? "changeme-secret";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  if (cookieStore.get("admin_session")?.value !== ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await deleteScheduleEvent(id);
  return new NextResponse(null, { status: 204 });
}
