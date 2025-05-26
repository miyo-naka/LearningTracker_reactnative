import { categories } from "../constants/categories";
import { StudySession } from "../types/StudySession";
type CategoryTotal = {
  category: string;
  totalMinutes: number;
};

export type Period = "week" | "month" | "all";

export default function calculateTotalTimeByCategory(
  sessions: StudySession[],
  period: Period = "all"
): CategoryTotal[] {
  const totals: { [category: string]: number } = {};
  const now = new Date();
  let filterStartDate: Date | null = null;

  if (period === "week") {
    filterStartDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - now.getDay()
    ); // 今週の始まり（日曜日）
    filterStartDate.setHours(0, 0, 0, 0);
  } else if (period === "month") {
    filterStartDate = new Date(now.getFullYear(), now.getMonth(), 1); // 今月の始まり
    filterStartDate.setHours(0, 0, 0, 0);
  }

  sessions.forEach((session) => {
    if (session.end_time) {
      const start = new Date(session.start_time);
      if (filterStartDate && start < filterStartDate) {
        return; // 集計期間外のセッションはスキップ
      }

      const end = new Date(session.end_time);
      const diffMinutes = Math.floor((end.getTime() - start.getTime()) / 60000);

      if (!totals[session.category]) {
        totals[session.category] = 0;
      }
      totals[session.category] += diffMinutes;
    }
  });

  return categories.map((category) => ({
    category,
    totalMinutes: totals[category] ?? 0,
  }));
}
