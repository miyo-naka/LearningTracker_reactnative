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

  const formatDate = (iso: string) => {
    const date = new Date(iso);
    return `${date.getFullYear()}/${
      date.getMonth() + 1
    }/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <FlatList
      style={styles.historyContainer}
      data={records}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View>
          <Text>Start: {formatDate(item.start_time)}</Text>
          <Text>End: {formatDate(item.end_time)}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  historyContainer: {
    // alignItems: "center",
    // justifyContent: "center",
    // textAlign: "center",
    flex: 1,
    marginTop: 16,
    marginBottom: 16,
  },
});
