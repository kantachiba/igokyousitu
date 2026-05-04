import { getDb } from "@/lib/firebase";
import { newsData, type NewsItem, type NewsCategory } from "@/data/news";

const COLLECTION = "news";
const COUNTER_DOC = "_meta/counter";

async function ensureSeeded() {
  const db = getDb();
  const counterRef = db.doc(COUNTER_DOC);
  const counter = await counterRef.get();
  if (counter.exists) return;

  const batch = db.batch();
  for (const item of newsData) {
    const ref = db.collection(COLLECTION).doc(String(item.id));
    const { id, ...fields } = item;
    void id;
    batch.set(ref, fields);
  }
  const maxId = Math.max(...newsData.map((n) => n.id));
  batch.set(counterRef, { nextId: maxId + 1 });
  await batch.commit();
}

export async function getAllNews(): Promise<NewsItem[]> {
  await ensureSeeded();
  const db = getDb();
  const snapshot = await db
    .collection(COLLECTION)
    .orderBy("date", "desc")
    .get();
  return snapshot.docs.map((doc) => ({
    id: Number(doc.id),
    ...(doc.data() as Omit<NewsItem, "id">),
  }));
}

export async function getNewsById(id: number): Promise<NewsItem | undefined> {
  await ensureSeeded();
  const db = getDb();
  const doc = await db.collection(COLLECTION).doc(String(id)).get();
  if (!doc.exists) return undefined;
  return { id, ...(doc.data() as Omit<NewsItem, "id">) };
}

export interface CreateNewsInput {
  title: string;
  body: string;
  category: NewsCategory;
  date: string;
}

export async function createNews(data: CreateNewsInput): Promise<NewsItem> {
  await ensureSeeded();
  const db = getDb();
  const counterRef = db.doc(COUNTER_DOC);

  const newItem = await db.runTransaction(async (tx) => {
    const counter = await tx.get(counterRef);
    const nextId = (counter.data()?.nextId ?? 7) as number;
    const docRef = db.collection(COLLECTION).doc(String(nextId));
    tx.set(docRef, data);
    tx.update(counterRef, { nextId: nextId + 1 });
    return { id: nextId, ...data };
  });

  return newItem;
}
