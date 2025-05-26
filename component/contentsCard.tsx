import { Pressable, StyleSheet, Text } from "react-native";

type ContentCardProps = {
  title: string;
  description: string;
  onPress?: () => void;
  icon: React.ReactNode;
  color: string;
  disabled?: boolean;
};

export default function ContentsCard({
  title,
  description,
  onPress,
  icon,
  color,
  disabled = false,
}: ContentCardProps) {
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      style={[styles.contentCard, { backgroundColor: color }]}
    >
      <Text style={styles.emoji}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc}>{description}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  contentCard: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },
  emoji: {
    fontSize: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  desc: {
    fontSize: 11,
    color: "#666",
  },
});
