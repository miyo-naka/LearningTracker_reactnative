import * as SQLite from "expo-sqlite";
import { StudySession } from "../types/StudySession";

let db: SQLite.SQLiteDatabase | null = null;

export async function initDatabase() {
  if (!db) {
    db = await SQLite.openDatabaseAsync("learning-tracker_db");

    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS study_sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        start_time TEXT NOT NULL,
        end_time TEXT,
        category TEXT NOT NULL,
        content TEXT
      );
    `);
  }
}

// 安全にDBにアクセスするヘルパー
async function getDb(): Promise<SQLite.SQLiteDatabase> {
  if (!db) {
    throw new Error("Database not initialized. Call initDatabase() first.");
  }
  return db;
}

// 学習開始
export async function startStudySession(
  start: string,
  category: string,
  content?: string
) {
  const db = await getDb();
  const result = await db.runAsync(
    "INSERT INTO study_sessions (start_time, category, content) VALUES (?,?,?)",
    start,
    category,
    content || null
  );
  return result.lastInsertRowId;
}

// 学習終了
export async function finishStudySession(end: string) {
  const db = await getDb();

  const lastSession = await db.getFirstAsync<{
    id: number;
    start_time: string;
    end_time: string | null;
  }>(
    "SELECT * FROM study_sessions WHERE end_time IS NULL ORDER BY start_time DESC"
  );
  if (!lastSession) {
    throw new Error("未完了のセッションがありません");
  }
  const result = await db.runAsync(
    "UPDATE study_sessions SET end_time = ? WHERE id = ?",
    end,
    lastSession.id
  );
  return lastSession.id;
}

// 学習記録を取得
export async function getAllStudySessions(): Promise<StudySession[]> {
  const db = await getDb();
  const result = await db.getAllAsync(
    "SELECT * FROM study_sessions ORDER BY start_time DESC"
  );
  return result as StudySession[];
}

// 学習状態を取得
export async function isStudySessionActive() {
  const db = await getDb();
  const result = await db.getAllAsync(
    `SELECT * FROM study_sessions WHERE end_time IS NULL LIMIT 1`
  );
  return result.length > 0;
}

// 学習情報を編集
export async function updateStudySession(session: StudySession) {
  const db = await getDb();
  await db.runAsync(
    `UPDATE study_sessions SET category = ?, content = ?, start_time = ?, end_time = ? WHERE id = ?`,
    [
      session.category,
      session.content ?? null,
      session.start_time,
      session.end_time,
      session.id,
    ]
  );
}

// 学習情報を削除
export async function deleteStudySession(id: number) {
  const db = await getDb();
  await db.runAsync(`DELETE FROM study_sessions WHERE id = ?`, [id]);
}
