import { getDb } from "@/lib/firebase";

export interface ScheduleEvent {
  id: string;
  date: string;       // YYYY-MM-DD
  startTime: string;  // HH:MM
  title: string;
  description?: string;
}

export type CreateScheduleEventInput = Omit<ScheduleEvent, "id">;

export async function getEventsByMonth(year: number, month: number): Promise<ScheduleEvent[]> {
  const db = getDb();
  const paddedMonth = String(month).padStart(2, "0");
  const startDate = `${year}-${paddedMonth}-01`;
  const nm = month === 12 ? 1 : month + 1;
  const ny = month === 12 ? year + 1 : year;
  const endDate = `${ny}-${String(nm).padStart(2, "0")}-01`;

  const snapshot = await db
    .collection("schedule")
    .where("date", ">=", startDate)
    .where("date", "<", endDate)
    .orderBy("date")
    .get();

  const events = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<ScheduleEvent, "id">),
  }));

  return events.sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    return a.startTime.localeCompare(b.startTime);
  });
}

export async function createScheduleEvent(data: CreateScheduleEventInput): Promise<ScheduleEvent> {
  const db = getDb();
  const ref = await db.collection("schedule").add(data);
  return { id: ref.id, ...data };
}

export async function deleteScheduleEvent(id: string): Promise<void> {
  const db = getDb();
  await db.collection("schedule").doc(id).delete();
}
