import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  startStudySession,
  initDatabase,
  finishStudySession,
} from "../services/database";
import { Alert } from "react-native";

export default function RecordScreen() {
  const [isSessionActive, setIsSessionActive] = useState(false);

  useEffect(() => {
    (async () => {
      await initDatabase();
    })();
  }, []);

  const handleStartRecord = async () => {
    const startTime = new Date().toISOString();
    try {
      await startStudySession(startTime);
      setIsSessionActive(true);
      Alert.alert("セッション開始");
    } catch (error) {
      console.error("開始エラー:", error);
      Alert.alert("エラー", "セッションの開始に失敗しました");
    }
  };

  const handleFinishRecord = async () => {
    const endTime = new Date().toISOString();
    try {
      await finishStudySession(endTime);
      setIsSessionActive(false);
      Alert.alert("セッション終了");
    } catch (error) {
      console.error("終了エラー:", error);
      Alert.alert("エラー", "セッションの終了に失敗しました");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>学習セッション</Text>

      <View style={styles.card}>
        <Text style={styles.cardText}>
          {isSessionActive
            ? "セッション中です"
            : "まだセッションは開始されていません"}
        </Text>

        <TouchableOpacity
          style={[
            styles.button,
            isSessionActive ? styles.buttonDisabled : styles.buttonStart,
          ]}
          onPress={handleStartRecord}
          disabled={isSessionActive}
        >
          <Text style={styles.buttonText}>開始</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            !isSessionActive ? styles.buttonDisabled : styles.buttonEnd,
          ]}
          onPress={handleFinishRecord}
          disabled={!isSessionActive}
        >
          <Text style={styles.buttonText}>終了</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f0f4f8",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    alignItems: "center",
  },
  cardText: {
    fontSize: 16,
    marginBottom: 16,
    color: "#555",
  },
  button: {
    width: "80%",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 12,
    alignItems: "center",
  },
  buttonStart: {
    backgroundColor: "#4caf50", // 緑
  },
  buttonEnd: {
    backgroundColor: "#4caf50", // 赤
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
