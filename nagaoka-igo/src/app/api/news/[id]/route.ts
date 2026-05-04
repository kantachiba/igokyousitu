import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { deleteNews } from "@/lib/news-store";

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
  await deleteNews(Number(id));
  return new NextResponse(null, { status: 204 });
}
