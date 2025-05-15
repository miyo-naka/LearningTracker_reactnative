import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Constants from "expo-constants";
import axios from "axios";

type Article = {
  title: string;
  publishedAt: string;
  urlToImage: string;
  url: string;
};

export default function NewsScreen({ navigation }: any) {
  const [news, setNews] = useState<Article[]>([]);
  const apiKey = Constants.expoConfig?.extra?.NEWS_API_KEY;
  const URI = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${apiKey}`;

  useEffect(() => {
    getNews();
  }, []);
  const getNews = async () => {
    const response = await axios.get(URI);
    setNews(response.data.articles);
  };

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const publishDate = year + "/" + month + "/" + day;

  return (
    <FlatList
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
              {item.publishedAt}
              {publishDate}
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
  newsContainer: {
    flexDirection: "row",
    backgroundColor: "#fff0f5",
    padding: 8,
    borderColor: "gray",
    borderStyle: "dotted",
    borderWidth: 0.5,
  },
  newsText: {
    flex: 1,
    padding: 8,
  },
  newsTitle: {
    fontSize: 14,
  },
  newsSubText: {
    fontSize: 10,
  },
  newsImage: {
    borderRadius: 10,
  },
});
