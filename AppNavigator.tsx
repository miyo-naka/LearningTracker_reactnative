import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/homeScreen";
import NewsScreen from "./screens/newsScreen";
import NewsDetailScreen from "./screens/newsDetailScreen";

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
      <Stack.Screen name="News" component={NewsScreen} />
      <Stack.Screen name="NewsDetail" component={NewsDetailScreen} />
    </Stack.Navigator>
  );
}
