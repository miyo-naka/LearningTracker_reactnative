import { StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

type category = {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
};

export default function CategoryPicker({
  selectedCategory,
  setSelectedCategory,
}: category) {
  return (
    <View>
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
    </View>
  );
}

const styles = StyleSheet.create({
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
});
