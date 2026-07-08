# PROJECT STATUS（引き継ぎメモ）

> このチャットが長くなったため作成。新しいチャットの冒頭に、このメモ＋関連ファイルを貼れば再開できます。
> リポジトリ（GitHub）が正であり、このメモは「今どこに何があるか」の索引です。

---

## 1. こころの泉（AIカウンセラー）

**実体**：`products/ai-counselor/kokoro_izumi.html`（1本のHTMLファイル、全ロジック内包）

**実装済みの主な機能**
- 傾聴カウンセラーAI（森・泉のトーン、9タイプの防衛反応の枠組み、決めつけない誘導ヒアリング）
- 危機検知（希死念慮・身体症状のキーワードでJS側が即応答、AIを介さない安全弁）
- クイック返信（AIがJSON `{message, quick_replies}` を返し、選択肢ボタンを表示）
- 「🤝 相談員へ相談」：会話を要約し、宛先を選んでメール下書きを作成（`COUNSELORS`配列に宛先1件のみ登録済み、他は将来追加用にコメントアウト）
- 「🌿 静かな時間」：呼吸法＋グラウンディングの独立UI。環境音（`quiet_ambient.mp3`、要同フォルダ設置）を2トラックでクロスフェードループ、フェードイン/アウト付き
- ヘッダーは2段構成（ロゴ・タイトル行／「静かな時間・相談員へ相談・会話をリセット」の3ボタン行）。旧「⋯」メニューは廃止済み
- **INNER PATH（必要な時だけ現れる小径）実装済み（詳細版）**：本人の自発的な語りからのみ入口を示す、ホ・オポノポノは台本化しない、安全対応が常に最優先、等
- 直近のUI修正：注意書きバナーは初回送信で自動非表示＋手動✕あり／PCでの縦スクロール不具合を修正（body高さ固定・chat-wrapのみスクロール）／入力欄の文字数上限1200／iOS自動ズーム対策

**API構成**：Cloudflare Worker（`aisen-nomori-proxy.aisen-nomori.workers.dev`）経由でAnthropic APIへ中継。APIキーはWorker側のSecretに保管、CORSは`aisennomori.github.io`のみ許可。

---

## 2. チャッピー（日常の伴走者・Custom GPT）

**実体**：ChatGPT Custom GPT（公開版・開発版の2つ）。プロンプトは私（Claude）から直接編集できず、**gohさんがGPT編集画面のInstructionsへ手動反映**する運用。

**構成**：`# SPIRIT`〜`# INTERNAL ATTITUDE`など、短い一文＋余白のトーンで統一。
**実装済み**：`# INNER PATH`（圧縮版）を実装済み。こころの泉と同じ核（安全最優先・断ったら追わない・本人の言葉を最優先・「今、ここ」へ戻る）を持つが、「深く踏み込み続ける場ではない」という日常伴走者としての制限あり。ホ・オポノポノの文脈優先ルール（説明より直前の対話とのつながりを大切にする）も追記済み。

---

## 3. Soul Prompt（ChatGPT汎用テスト用）

**実体**：`products/soul/prompts/soul_prompt_v1.3.md`

三層構造（Knowledge→Wisdom→Soul Prompt）の原則のもと、Purpose Check／Self Understanding／Growth Philosophyを含む正式版。**INNER PATHは反映していません**（個別プロダクト固有の機能のため。この位置づけの違いは`products/soul/CHANGELOG.md`に記録済み）。

---

## 4. BRAIN/wisdom（Sprint進捗）

- Sprint001：完了（Soul Prompt v1 完成）
- Sprint002：完了。`BRAIN/wisdom/dependency.md`（依存型のWisdom）作成済み
- Sprint003以降（逃避型・自立型・アドラー等）：**未着手**

型ごとのWisdomは、Soul Promptには詳細を書かず「Self Understanding」の原則だけを残し、詳細は`BRAIN/wisdom/*.md`に格納する設計。

---

## 5. ドキュメント整備状況

直近で以下を更新済み：
- `products/README.md`：チャッピーを追加、役割に応じた深さ調整の方針を明記
- `products/soul/CHANGELOG.md`：INNER PATH実装の記録を追加
- `SPRINTS/Roadmap.md`：Version 2.0に役割調整方針を追記
- `ROADMAP.md`（ルート）：初期構想アーカイブである旨の案内を先頭に追加（`SPRINTS/Roadmap.md`が最新）

**注**：`Sprint-002.md`のResult欄はまだ空欄（対応保留中、急ぎではない）。

---

## 6. サイト構成（GitHub Pages）

- トップページ（`index.html`）：「愛泉の杜」の入口ページとして刷新済み。🌿カウンセリング（育成中）／🔮オラクルカード（真実の愛カードのみ公開）／🌙月読みツール（非表示・開発中）／✨その他（準備中）
- `products/moon-tools/`・`products/block-tools/`・`products/card-reading/`（`oracle_tools.html`・`other_tools.html`）に整理済み
- 月読みツールは、現状トップページには表示しない方針（サブメニュー単位で管理）

---

## 7. 保留中・未確定事項

- 相談員へのメール宛先（`COUNSELORS`配列）は1件のみ。追加予定があれば、名前とメールアドレスを準備
- 相談員紹介・選択画面は「将来パッケージ化する場合のアイデア」として`FUTURE_IDEAS.md`に記録済み、実装は未着手
- `quiet_ambient.mp3`は差し替え可能（現状のファイルは30秒・クロスフェードで運用中）

---

**新しいチャットで再開する際は**：やりたい作業に応じて、このメモ＋関連ファイル（`kokoro_izumi.html`／`soul_prompt_v1.3.md`／チャッピーのInstructions等）だけを添えれば十分です。
