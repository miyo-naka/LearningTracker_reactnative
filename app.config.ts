import "dotenv/config";
import { ConfigContext } from "@expo/config";

export default ({ config }: ConfigContext) => {
  config.extra = {
    ...config.extra,
    NEWS_API_KEY: process.env.NEWS_API_KEY,
  };
  return config;
};
