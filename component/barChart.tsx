import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { Period } from "../services/calculateTotalTime";
import { BarChart } from "react-native-gifted-charts";

type Props = {
  period: Period;
  onPeriodChange: (p: Period) => void;
  data: {
    label: string;
    value: number;
    frontColor: string;
  }[];
};

export default function DashboardBarChart({
  period,
  onPeriodChange,
  data,
}: Props) {
  const getAdjustedMaxValue = (data: { value: number }[]) => {
    const max = Math.max(...data.map((item) => item.value), 0);
    return Math.ceil(max * 1.1);
  };

  return (
    <View style={styles.chartContainer}>
      <View style={styles.periodSelector}>
        {["week", "month", "all"].map((p) => (
          <TouchableOpacity
            key={p}
            style={[
              styles.periodButton,
              period === p && styles.selectedPeriodButton,
            ]}
            onPress={() => onPeriodChange(p as Period)}
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
          data={data}
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
          maxValue={getAdjustedMaxValue(data)}
          noOfSections={5}
          isAnimated
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
