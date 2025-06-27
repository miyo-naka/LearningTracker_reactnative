import "dotenv/config";
import { ConfigContext } from "@expo/config";

export default ({ config }: ConfigContext) => {
  return {
    ...config,
    android: {
      package: "com.miyonaka.learningtracker",
    },
    extra: {
      ...config.extra,
      NEWS_API_KEY: process.env.NEWS_API_KEY,
      eas: {
        projectId: "bcdc953e-b1ca-4f92-93f5-e9d09095d694",
      },
    },
    plugins: [...(config.plugins ?? []), "expo-sqlite"],
  };
};
