import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

export function getDb(): Firestore {
  if (getApps().length === 0) {
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      // ローカル開発: .env.local のサービスアカウントJSONを使用
      initializeApp({
        credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)),
      });
    } else {
      // Firebase App Hosting: 環境に付与された認証情報を自動使用
      initializeApp();
    }
  }
  return getFirestore();
}
