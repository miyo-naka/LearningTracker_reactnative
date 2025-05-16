import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import formatDateTime from "../services/formatDateTime";
import getNews from "../services/news";

type Article = {
  title: string;
  publishedAt: string;
  urlToImage: string;
  url: string;
};

export default function NewsScreen({ navigation }: any) {
  const [news, setNews] = useState<Article[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await getNews();
      setNews(response.data.articles);
    };
    fetchNews();
  }, []);

  return (
    <FlatList
      style={styles.container}
      data={news.slice(0, 5)}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("NewsDetail", { detailUrl: item.url })
          }
          style={styles.newsContainer}
        >
          <View style={styles.newsText}>
            <Text numberOfLines={3} style={styles.newsTitle}>
              {item.title}
            </Text>
            <Text style={styles.newsSubText}>
              {formatDateTime(item.publishedAt)}
            </Text>
          </View>
          <Image
            style={[{ width: 100, height: 100 }, styles.newsImage]}
            source={{ uri: item.urlToImage || "" }}
          ></Image>
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  newsContainer: {
    flexDirection: "row",
    backgroundColor: "#fff0f5",
    padding: 12,
    borderRadius: 12,
    margin: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  newsText: {
    flex: 1,
    padding: 8,
  },
  newsTitle: {
    fontSize: 14,
  },
  newsSubText: {
    fontSize: 12,
  },
  newsImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 4,
    backgroundColor: "#ccc",
  },
});
