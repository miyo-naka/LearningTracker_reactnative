// 学習時間（分単位）を計算
export default function calculateDuration(
  start: string,
  end: string | null
): string {
  if (!end) return "-";
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffMs = endDate.getTime() - startDate.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);

  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;
  return `${hours}h ${minutes}m`;
}
