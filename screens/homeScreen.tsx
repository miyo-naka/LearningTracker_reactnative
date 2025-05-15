import { ScrollView, StyleSheet, Text, View } from "react-native";
import ContentsCard from "../component/contentsCard";

export default function HomeScreen({ navigation }: any) {
  return (
    <ScrollView>
      <View style={styles.headLine}>
        <Text style={styles.headLineTitle}>Learning Tracker</Text>
        <Text>学びを記録して、成長を見える化しよう</Text>
      </View>

      <View style={styles.contentCardContainer}>
        <ContentsCard
          title="Create Record"
          description="今日の学習内容を記録しましょう"
          onPress={() => navigation.navigate("Home")}
          emoji="✍️"
          color="#FDF1E6"
        />
        <ContentsCard
          title="View History"
          description="過去の記録を確認・編集"
          onPress={() => navigation.navigate("Home")}
          emoji="🔍"
          color="#EEF7FF"
        />
        <ContentsCard
          title="My Page"
          description="ユーザー情報を確認"
          onPress={() => navigation.navigate("Home")}
          emoji="👤"
          color="#E7E8EA"
        />
        <ContentsCard
          title="News"
          description="最近のニュース"
          onPress={() => navigation.navigate("News")}
          emoji="📖"
          color="#E0F6E0"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headLine: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    flex: 1,
    marginTop: 16,
    marginBottom: 16,
  },

  headLineTitle: {
    flex: 1,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },

  contentCardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});
