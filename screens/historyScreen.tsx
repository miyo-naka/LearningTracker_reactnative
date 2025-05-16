import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { getAllStudySessions, initDatabase } from "../services/database";
import formatDateTime from "../services/formatDateTime";
import calculateDuration from "../services/calculateDuration";

export default function HistoryScreen() {
  const [records, setRecords] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      await initDatabase();
      const sessions = await getAllStudySessions();
      setRecords(sessions);
    })();
  }, []);

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
