import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import News from "./news";
import { RootStackParamList } from "../App";
import ContentsCard from "./contentsCard";
import axios from "axios";
import { useEffect, useState } from "react";
import Constants from "expo-constants";

type Article = {
  title: string;
  publishedAt: string;
  urlToImage: string;
};

export default function Home() {
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

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScrollView>
      <View style={styles.headLine}>
        <Text style={styles.headLineTitle}>Learning Tracker</Text>
        <Text>学びを記録して、成長を見える化しよう</Text>
      </View>

      <View>
        <ContentsCard
          title="Create Record"
          description="今日の学習内容を記録しましょう"
          onPress={() => navigation.navigate("Home")}
          emoji="✍️"
          color="#FDF1E6"
        />
        <ContentsCard
          title="My progress"
          description="最近の学習まとめ"
          onPress={() => navigation.navigate("Home")}
          emoji="📖"
          color="#E0F6E0"
        />
        <ContentsCard
          title="View History"
          description="過去の記録を確認・編集"
          onPress={() => navigation.navigate("Home")}
          emoji="🔍"
          color="#EEF7FF"
        />
        <ContentsCard
          title="My Page"
          description="ユーザー情報を確認"
          onPress={() => navigation.navigate("Home")}
          emoji="👤"
          color="#E7E8EA"
        />
      </View>

      <FlatList
        data={news.slice(0, 3)}
        renderItem={({ item }) => (
          <News
            imageuri={item.urlToImage || ""}
            title={item.title}
            subtext={item.publishedAt}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headLine: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    flex: 1,
    marginTop: 16,
    marginBottom: 16,
  },

  headLineTitle: {
    flex: 1,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
