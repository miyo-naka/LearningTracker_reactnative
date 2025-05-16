import Constants from "expo-constants";
import axios from "axios";

export default async function getNews() {
  const apiKey = Constants.expoConfig?.extra?.NEWS_API_KEY;
  const URI = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${apiKey}`;
  const fetchData = await axios.get(URI);

  return fetchData;
}
