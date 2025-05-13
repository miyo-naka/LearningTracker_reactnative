import { Image, StyleSheet, Text, View } from "react-native";

type NewsProps = {
  imageuri: string;
  title: string;
  subtext: string;
};

export default function News({ imageuri, title, subtext }: NewsProps) {
  return (
    <View style={styles.newsContainer}>
      <View style={styles.newsText}>
        <Text style={styles.newsTitle}>{title}</Text>
        <Text style={styles.newsSubText}>{subtext}</Text>
      </View>
      <Image
        style={[{ width: 100, height: 100 }, styles.newsImage]}
        source={{ uri: imageuri }}
      ></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  newsContainer: {
    flexDirection: "row",
    backgroundColor: "#fff0f5",
    padding: 8,
  },
  newsText: {
    flex: 1,
    padding: 8,
  },
  newsTitle: {
    fontSize: 12,
  },
  newsSubText: {
    fontSize: 10,
  },
  newsImage: {
    borderRadius: 10,
  },
});
