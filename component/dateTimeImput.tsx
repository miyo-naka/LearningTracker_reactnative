import { Pressable, Text, View, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";

export default function DateTimeInput({
  dateTimeValue,
  onChange,
}: {
  dateTimeValue: string;
  onChange: (newISO: string) => void;
}) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const date = new Date(dateTimeValue);

  const handleDateChange = (_: any, selected?: Date) => {
    setShowDatePicker(false);
    if (selected) {
      const updated = new Date(dateTimeValue);
      updated.setFullYear(selected.getFullYear());
      updated.setMonth(selected.getMonth());
      updated.setDate(selected.getDate());
      onChange(updated.toISOString());
    }
  };

  const handleTimeChange = (_: any, selected?: Date) => {
    setShowTimePicker(false);
    if (selected) {
      const updated = new Date(dateTimeValue);
      updated.setHours(selected.getHours());
      updated.setMinutes(selected.getMinutes());
      onChange(updated.toISOString());
    }
  };

  return (
    <View>
      {/* 日付選択 */}
      <Pressable onPress={() => setShowDatePicker(true)} style={styles.input}>
        <Text>{date.toLocaleDateString()}</Text>
      </Pressable>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {/* 時間選択 */}
      <Pressable onPress={() => setShowTimePicker(true)} style={styles.input}>
        <Text>
          {date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </Text>
      </Pressable>
      {showTimePicker && (
        <DateTimePicker
          value={date}
          mode="time"
          display="default"
          is24Hour={true}
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
    marginTop: 4,
  },
});
