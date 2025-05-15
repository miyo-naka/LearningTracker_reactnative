import { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  startStudySession,
  initDatabase,
  finishStudySession,
} from "../services/database";
import { Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function RecordScreen() {
  const [isDbReady, setIsDbReady] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Programming");
  const [content, setContent] = useState("");

  useEffect(() => {
    (async () => {
      await initDatabase();
      setIsDbReady(true);
    })();
  }, []);

  const handleStartRecord = async () => {
    const startTime = new Date().toISOString();
    try {
      await startStudySession(startTime, selectedCategory, content);
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

  return !isDbReady ? (
    <View style={styles.container}>
      <Text>データベース初期化中...</Text>
    </View>
  ) : (
    <View style={styles.container}>
      <Text style={styles.title}>学習セッション</Text>

      <View style={styles.card}>
        <Text style={styles.cardText}>
          {isSessionActive
            ? "セッション中です"
            : "まだセッションは開始されていません"}
        </Text>
        <View style={styles.formContainer}>
          <Text style={styles.label}>カテゴリー</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedCategory}
              onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            >
              <Picker.Item label="Programming" value="Programming" />
              <Picker.Item label="Data Analytics" value="Data Analytics" />
              <Picker.Item label="English" value="English" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>
          <Text style={styles.label}>メモ（任意）</Text>
          <TextInput
            style={styles.input}
            value={content}
            onChangeText={setContent}
            placeholder="例: Next.jsのAPIルーティングを学習"
            multiline
          />
        </View>

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

  formContainer: {
    marginVertical: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    minHeight: 60,
    textAlignVertical: "top",
  },
});
