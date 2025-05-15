import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/homeScreen";
import NewsScreen from "./screens/newsScreen";
import NewsDetailScreen from "./screens/newsDetailScreen";
import HistoryScreen from "./screens/historyScreen";
import RecordScreen from "./screens/recordScreen";

export type navigationRouteName = {
  HomeScreen: undefined;
  NewsScreen: undefined;
  NewsDetailScreen: undefined;
};

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Record" component={RecordScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="News" component={NewsScreen} />
      <Stack.Screen name="NewsDetail" component={NewsDetailScreen} />
    </Stack.Navigator>
  );
}
