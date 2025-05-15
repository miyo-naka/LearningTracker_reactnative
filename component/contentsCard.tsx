import { Pressable, StyleSheet, Text } from "react-native";

type ContentCardProps = {
  title: string;
  description: string;
  onPress?: () => void;
  emoji: string;
  color: string;
  disabled?: boolean;
};

export default function ContentsCard({
  title,
  description,
  onPress,
  emoji,
  color,
  disabled = false,
}: ContentCardProps) {
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      style={[styles.contentCard, { backgroundColor: color }]}
    >
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc}>{description}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  contentCard: {
    width: "40%",
    padding: 16,
    margin: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    marginBottom: 12,
  },
  emoji: {
    fontSize: 32,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  desc: {
    fontSize: 14,
    color: "#666",
  },
});
