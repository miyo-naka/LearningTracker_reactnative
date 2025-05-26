import { StyleSheet, Text, View } from "react-native";
import ContentsCard from "../component/contentsCard";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { getAllStudySessions, initDatabase } from "../services/database";
import calculateTotalTimeByCategory, {
  Period,
} from "../services/calculateTotalTime";
import { categoryColors } from "../constants/colors";
import DashboardBarChart from "../component/barChart";

export default function HomeScreen({ navigation }: any) {
  const [categorySummary, setCategorySummary] = useState<
    { category: string; totalMinutes: number }[]
  >([]);
  const [period, setPeriod] = useState<Period>("all");

  const chartData = categorySummary.map((item) => ({
    value: item.totalMinutes,
    label: item.category,
    frontColor: categoryColors[item.category] || "#ccc",
    topLabelComponent: () => <Text>{Math.floor(item.totalMinutes / 60)}</Text>,
  }));

  useEffect(() => {
    (async () => {
      await initDatabase();
      const sessions = await getAllStudySessions();
      const summary = calculateTotalTimeByCategory(sessions, period);
      setCategorySummary(summary);
    })();
  }, [period]);

  return (
    <View style={styles.container}>
      <View style={styles.headLine}>
        <Text style={styles.headLineTitle}>Learning Tracker</Text>
        <Text>学びを記録して、成長を見える化しよう</Text>
      </View>

      <DashboardBarChart
        data={chartData}
        period={period}
        onPeriodChange={setPeriod}
      />

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
          description="過去の記録を確認"
          onPress={() => navigation.navigate("History")}
          icon={<Feather name="clock" size={28} color="#333" />}
          color="#EEF7FF"
        />
        <ContentsCard
          title="News"
          description="最新のニュース"
          onPress={() => navigation.navigate("News")}
          icon={<Feather name="book-open" size={28} color="#333" />}
          color="#E0F6E0"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
  },

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
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto",
  },
});
