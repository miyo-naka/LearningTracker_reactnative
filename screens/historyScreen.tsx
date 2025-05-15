import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { getAllStudySessions, initDatabase } from "../services/database";

export default function HistoryScreen() {
  const [records, setRecords] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      await initDatabase();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const sessions = await getAllStudySessions();
      setRecords(sessions);
    })();
  }, []);

  // 学習時間（分単位）を計算
  function calculateDuration(start: string, end: string | null): string {
    if (!end) return "-";
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffMs = endDate.getTime() - startDate.getTime();
    const diffMinutes = Math.floor(diffMs / 60000);

    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    return `${hours}h ${minutes}m`;
  }

  // 日付フォーマット（例: 2025/05/13 14:00）
  function formatDateTime(datetime: string | null): string {
    if (!datetime) return "-";
    const date = new Date(datetime);
    return `${date.getFullYear()}/${
      date.getMonth() + 1
    }/${date.getDate()} ${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  }

  // const formatDate = (iso: string) => {
  //   const date = new Date(iso);
  //   return `${date.getFullYear()}/${
  //     date.getMonth() + 1
  //   }/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(
  //     2,
  //     "0"
  //   )}`;
  // };

  return (
    <FlatList
      style={styles.historyContainer}
      data={records}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.date}>{formatDateTime(item.start_time)}</Text>
          <Text style={styles.duration}>
            🕒 {calculateDuration(item.start_time, item.end_time)}
          </Text>
          <Text style={styles.cardCategory}>カテゴリ: {item.category}</Text>
          {item.content ? (
            <Text style={styles.cardContent}>メモ: {item.content}</Text>
          ) : null}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  historyContainer: {
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  date: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },
  duration: {
    fontSize: 14,
    color: "#666",
  },
  cardCategory: {
    fontSize: 12,
    color: "#555",
    marginTop: 4,
  },
  cardContent: {
    fontSize: 12,
    color: "#333",
    marginTop: 2,
    fontStyle: "italic",
  },
});
