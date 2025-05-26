import { View, StyleSheet } from "react-native";
import WebView from "react-native-webview";

export default function NewsDetailScreen(props: any) {
  const { route } = props;
  const { detailUrl } = route.params;
  console.log(detailUrl);

  return (
    <View style={styles.container}>
      <WebView source={{ uri: detailUrl }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
