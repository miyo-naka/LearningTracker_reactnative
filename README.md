# Learning Tracker

Learning Tracker は、日々の学習記録を簡単に管理し、可視化できるモバイルアプリです。<br>
自分の学びをデータで振り返り、成長を実感できるツールを目指しています。
<br><br>


## 主な機能

-  **ダッシュボード**：学習時間を「今週」「今月」「全期間」で切り替え可能なバーチャートで可視化  
-  **Create Record**：学習内容を記録（カテゴリー・内容・時間）  
-  **History**：過去の学習履歴を一覧表示、タップで編集・削除可能  
-  **News**：学習や生産性に関連した最新ニュースを表示・詳細閲覧
<br>

## 画面構成

- **Home（Dashboard）**
- **Create Record**
- **Record History**
- **News List**
<br>

## 使用技術

- **React Native 0.79.2**
- **Expo SDK 53**
- **TypeScript**
- **SQLite（expo-sqlite）**
- **React Navigation**
- **react-native-gifted-charts**（バーチャート表示）
- **axios**（ニュース取得）
- **nativewind**（Tailwind風スタイル）
<br>


## セットアップ手順

1. リポジトリをクローン
```bash
git clone https://github.com/your-username/learning-tracker.git
cd learning-tracker
```

2. 依存パッケージをインストール
```bash
npm install
```

3. Expo 開発サーバーを起動
```bash
npx expo start
```

