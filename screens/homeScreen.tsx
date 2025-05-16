import { StyleSheet, Text, View } from "react-native";
import ContentsCard from "../component/contentsCard";
import { Feather } from "@expo/vector-icons";

export default function HomeScreen({ navigation }: any) {
  return (
    <View>
      <View style={styles.headLine}>
        <Text style={styles.headLineTitle}>Learning Tracker</Text>
        <Text>学びを記録して、成長を見える化しよう</Text>
      </View>

      <View style={styles.contentCardContainer}>
        <ContentsCard
          title="Create Record"
          description="今日の学習内容を記録しましょう"
          onPress={() => navigation.navigate("Record")}
          icon={<Feather name="edit-3" size={28} color="#333" />}
          color="#FDF1E6"
        />
        <ContentsCard
          title="View History"
          description="過去の記録を確認・編集"
          onPress={() => navigation.navigate("History")}
          icon={<Feather name="clock" size={28} color="#333" />}
          color="#EEF7FF"
        />
        <ContentsCard
          title="News"
          description="最近のニュース"
          onPress={() => navigation.navigate("News")}
          icon={<Feather name="book-open" size={28} color="#333" />}
          color="#E0F6E0"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headLine: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 16,
  },

  headLineTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },

  contentCardContainer: {
    gap: 8,
    margin: 8,
  },
});
