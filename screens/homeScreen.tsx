import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ContentsCard from "../component/contentsCard";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { getAllStudySessions, initDatabase } from "../services/database";
import calculateTotalTimeByCategory, {
  Period,
} from "../services/calculateTotalTime";
import { BarChart } from "react-native-gifted-charts";
import { categoryColors } from "../constants/colors";

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

  const getAdjustedMaxValue = (data: { value: number }[]) => {
    const max = Math.max(...data.map((item) => item.value), 0);
    return Math.ceil(max * 1.1);
  };

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

      <View style={styles.chartContainer}>
        {/* <Text style={styles.chartTitle}>カテゴリー別 学習時間</Text> */}
        <View style={styles.periodSelector}>
          {["week", "month", "all"].map((p) => (
            <TouchableOpacity
              key={p}
              style={[
                styles.periodButton,
                period === p && styles.selectedPeriodButton,
              ]}
              onPress={() => setPeriod(p as Period)}
            >
              <Text
                style={[
                  styles.periodButtonText,
                  period === p && styles.selectedPeriodText,
                ]}
              >
                {p === "week" ? "今週" : p === "month" ? "今月" : "全期間"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.barChart}>
          <BarChart
            data={chartData}
            barWidth={50}
            yAxisThickness={1}
            xAxisThickness={1}
            yAxisTextStyle={{ fontSize: 10 }}
            xAxisLabelTextStyle={{ fontSize: 10 }}
            formatYLabel={(value) => {
              const totalMinutes = parseInt(value, 10);
              const hours = Math.floor(totalMinutes / 60);
              return `${hours}h`;
            }}
            maxValue={getAdjustedMaxValue(chartData)}
            noOfSections={5}
            isAnimated
          />
        </View>
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

  chartContainer: {
    marginHorizontal: "auto",
    marginTop: 8,
  },
  periodSelector: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  periodButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 6,
    borderRadius: 20,
    backgroundColor: "#eee",
  },
  selectedPeriodButton: {
    backgroundColor: "#4CAF50",
  },
  periodButtonText: {
    fontSize: 14,
    color: "#333",
  },
  selectedPeriodText: {
    color: "#fff",
    fontWeight: "bold",
  },
  barChart: {
    paddingTop: 10,
  },

  contentCardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto",
  },
});
