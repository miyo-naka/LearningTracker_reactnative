import * as SQLite from "expo-sqlite";

let db: SQLite.SQLiteDatabase | null = null;

export async function initDatabase() {
  if (!db) {
    db = await SQLite.openDatabaseAsync("learning-tracker_db");

    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS study_sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        start_time TEXT NOT NULL,
        end_time TEXT
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
export async function startStudySession(start: string) {
  const db = await getDb();
  const result = await db.runAsync(
    "INSERT INTO study_sessions (start_time) VALUES (?)",
    start
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
export async function getAllStudySessions() {
  const db = await getDb();
  const rows = await db.getAllAsync(
    "SELECT * FROM study_sessions ORDER BY start_time DESC"
  );
  return rows;
}
