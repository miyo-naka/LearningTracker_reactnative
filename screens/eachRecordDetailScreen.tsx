import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { updateStudySession, deleteStudySession } from "../services/database";
import { Alert } from "react-native";
import { StudySession } from "../types/StudySession";
import DateTimeInput from "../component/dateTimeImput";

type RootStackParamList = {
  RecordDetail: { item: StudySession };
};
type RecordDetailRouteProp = RouteProp<RootStackParamList, "RecordDetail">;

export default function RecordDetailScreen({ navigation }: any) {
  const route = useRoute<RecordDetailRouteProp>();
  const { item } = route.params;

  const [category, setCategory] = useState(item.category);
  const [content, setContent] = useState(item.content);
  const [startTime, setStartTime] = useState(item.start_time);
  const [endTime, setEndTime] = useState(item.end_time);

  const handleUpdate = async () => {
    await updateStudySession({
      ...item,
      category,
      content,
      start_time: startTime,
      end_time: endTime,
    });
    navigation.goBack();
  };

  const handleDelete = () => {
    Alert.alert(
      "確認",
      "この記録を削除してよろしいですか？",
      [
        { text: "キャンセル", style: "cancel" },
        {
          text: "削除する",
          style: "destructive",
          onPress: async () => {
            await deleteStudySession(item.id);
            navigation.goBack();
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={styles.label}>カテゴリー</Text>
      <TextInput
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />

      <Text style={styles.label}>内容</Text>
      <TextInput
        value={content}
        onChangeText={setContent}
        style={styles.input}
      />

      <Text style={styles.label}>開始日時</Text>
      <DateTimeInput dateTimeValue={startTime} onChange={setStartTime} />

      <Text style={styles.label}>終了日時</Text>
      <DateTimeInput
        dateTimeValue={endTime ?? new Date().toISOString()}
        onChange={setEndTime}
      />

      <View style={styles.buttonGroup}>
        <Button title="保存" onPress={handleUpdate} />
        <View style={{ width: 20 }} />
        <Button title="削除" color="red" onPress={handleDelete} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
    marginTop: 4,
  },
  timeText: {
    fontSize: 16,
    marginTop: 4,
  },
  buttonGroup: {
    flexDirection: "row",
    marginTop: 24,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
