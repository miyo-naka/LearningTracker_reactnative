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
      const id = await startStudySession(startTime);
      setIsSessionActive(true);
      Alert.alert("セッション開始", `ID: ${id}`);
    } catch (error) {
      console.error("開始エラー:", error);
      Alert.alert("エラー", "セッションの開始に失敗しました");
    }
  };

  const handleFinishRecord = async () => {
    const endTime = new Date().toISOString();
    try {
      const id = await finishStudySession(endTime);
      setIsSessionActive(false);
      Alert.alert("セッション終了", `ID: ${id}`);
    } catch (error) {
      console.error("終了エラー:", error);
      Alert.alert("エラー", "セッションの終了に失敗しました");
    }
  };

  return (
    <View style={styles.recordContainer}>
      <Text>学習内容を記録</Text>
      <TouchableOpacity
        style={[styles.button, isSessionActive && styles.buttonDisabled]}
        onPress={handleStartRecord}
        disabled={isSessionActive}
      >
        <Text style={styles.buttonText}>開始</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, !isSessionActive && styles.buttonDisabled]}
        onPress={handleFinishRecord}
        disabled={!isSessionActive}
      >
        <Text style={styles.buttonText}>終了</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  recordContainer: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    flex: 1,
  },
  button: {
    backgroundColor: "#fff0f5",
    padding: 20,
    margin: 20,
    borderColor: "gray",
    borderStyle: "dotted",
    borderWidth: 0.5,
    borderRadius: 5,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: { fontSize: 14 },
});
