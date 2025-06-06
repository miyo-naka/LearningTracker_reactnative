import { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getAllStudySessions, initDatabase } from "../services/database";
import formatDateTime from "../services/formatDateTime";
import calculateDuration from "../services/calculateDuration";
import { categoryColors } from "../constants/colors";
import { useFocusEffect } from "@react-navigation/native";

export default function HistoryScreen({ navigation }: any) {
  const [records, setRecords] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      await initDatabase();
      const sessions = await getAllStudySessions();
      setRecords(sessions);
    })();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchSessions = async () => {
        await initDatabase();
        const sessions = await getAllStudySessions();
        setRecords(sessions);
      };
      fetchSessions();
    }, [])
  );

  return (
    <FlatList
      style={styles.historyContainer}
      data={records}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <TouchableOpacity
            onPress={() => navigation.navigate("RecordDetail", { item })}
          >
            <Text style={styles.date}>{formatDateTime(item.start_time)}</Text>
            <View style={styles.row}>
              <Text
                style={[
                  styles.category,
                  { color: categoryColors[item.category] },
                ]}
              >
                {item.category}
              </Text>
              <Text style={styles.duration}>
                🕒 {calculateDuration(item.start_time, item.end_time)}
              </Text>
            </View>
            {item.content ? (
              <View style={styles.memoBox}>
                <Text style={styles.cardContent}> {item.content}</Text>
              </View>
            ) : null}
          </TouchableOpacity>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  historyContainer: {
    padding: 16,
    backgroundColor: "#f0f4f8",
  },
  card: {
    backgroundColor: "#ffffff",
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
    fontSize: 14,
    fontWeight: "500",
    color: "#1a1a1a",
    marginBottom: 6,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  category: {
    fontSize: 14,
    fontWeight: "500",
  },
  duration: {
    fontSize: 14,
    color: "#666",
  },
  memoBox: {
    backgroundColor: "#f7f9fc",
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
  },
  cardContent: {
    fontSize: 13,
    color: "#444",
    fontStyle: "italic",
  },
});
