import { StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { categories } from "../constants/categories";

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
          {categories.map((category) => (
            <Picker.Item key={category} label={category} value={category} />
          ))}
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
