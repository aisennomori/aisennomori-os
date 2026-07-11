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
- **Context Check（文脈の確認）実装済み**：「深く聴く深さについて」に統合。深く進む前に、人間関係の視点・目的論の視点（Soul内部の視点にとどめ、本人より先に目的を言い当てない）を含めて文脈を確認
- **Foundation Wisdom（人生の流れ・リフレーミング）反映済み**：「統合する」ステップ・「自然をたとえに使うとき」へ、reframingの慎重な運用原則とlife_flowの視点を統合
- **感じ方の個人差（HSP的視点）反映済み**：身体感覚の段落へ、感受性の強さを弱さや特別な特性と決めつけない旨を追加
- 直近のUI修正：注意書きバナーは初回送信で自動非表示＋手動✕あり／PCでの縦スクロール不具合を修正（body高さ固定・chat-wrapのみスクロール）／入力欄の文字数上限1200／iOS自動ズーム対策

**API構成**：Cloudflare Worker（`aisen-nomori-proxy.aisen-nomori.workers.dev`）経由でAnthropic APIへ中継。APIキーはWorker側のSecretに保管、CORSは`aisennomori.github.io`のみ許可。

---

## 2. チャッピー（日常の伴走者・Custom GPT）

**実体**：ChatGPT Custom GPT（公開版・開発版の2つ、現状は同一内容）。プロンプトは私（Claude）から直接編集できず、**gohさんがGPT編集画面のInstructionsへ手動反映**する運用。

**リポジトリでの控え**：`products/chappy/instructions_published.md`（正式なInstructionsの控え、手動同期）／`products/chappy/README.md`（役割・運用ルールの説明）を新設済み。ChatGPTのGPT編集画面が稼働の場、このファイルがリポジトリ管理上の正式なInstructions。

**構成**：`# SPIRIT`〜`# INTERNAL ATTITUDE`など、短い一文＋余白のトーンで統一。
**実装済み**：`# INNER PATH`（圧縮版）、SELF UNDERSTANDINGへ「身体感覚」「言葉になる前の感覚」を追加済み。
**BRAIN強化・Context Check・Foundation Wisdomはいずれも反映不要と判断**：日常の伴走者であり深く進む場面自体が限定的、FIRST PRINCIPLE等で既に深掘りを抑制している、という理由を毎回CHANGELOGへ記録。「反映可能だから追加する」のではなく役割上必要な変更だけを行う方針を一貫して優先。

---

## 3. Soul Prompt（ChatGPT汎用テスト用）

**実体**：`products/soul/prompts/soul_prompt_v1.3.md`

三層構造（Knowledge→Wisdom→Soul Prompt）の原則のもと、Purpose Check／Self Understanding／Growth Philosophyを含む正式版。**INNER PATHは反映していません**（個別プロダクト固有の機能のため。この位置づけの違いは`products/soul/CHANGELOG.md`に記録済み）。

**BRAIN強化以降の反映状況**：
- Context Check（深く理解しようとする前に）：Purpose Check直後へ新設、実装済み
- Foundation Wisdom：人間関係の視点（Context Check文言へ統合）・感じ方の個人差（コミュニケーションの原則へ追加）・life_flowの視点（対話の流れステップ6へ、圧縮した形で追加）を反映済み
- 目的論・reframingの詳細は、三層構造の原則（詳細を書かない）と「Soulが先に解釈しすぎるリスクを広げない」という判断から、あえて反映せず

---

## 4. BRAIN（エンジン・Wisdom・Sprint進捗）

**BRAIN 5エンジン構成**：Safety Engine / Emotion Engine / Thinking Engine / Decision Tree / Response Builder（`BRAIN/README.md`参照）

**実施済みSprint**：
- Sprint001：完了（Soul Prompt v1完成）
- Sprint002：完了。`BRAIN/wisdom/dependency.md`（依存型のWisdom）作成済み
- **BRAIN強化Sprint**：瑠璃講座AIカウンセラープロンプトとの照合を経て、Emotion Engine（身体感覚・言葉になる前の体験）／Thinking Engine（理解の6層）／Decision Tree（深掘り可否の判断）を強化。新規Engineは追加せず既存3Engineの強化を選択
- **Context Check Sprint**：Decision Treeに「Context Check（文脈の確認）」「感情や身体感覚が『わからない』」を追加。こころの泉・Soul Prompt正式版へ反映、チャッピーは反映不要
- **Foundation Wisdom Sprint**：アドラー流メンタルトレーナーテキスト・HSPカウンセラー講座テキスト・宇宙の法則の分析結果と既存OSを照合。8候補中、新規Wisdomは`BRAIN/wisdom/foundations/life_flow.md`・`BRAIN/wisdom/reframing.md`の2つのみ新設。Thinking Engine層④（人間関係）・層⑥（目的論）・Emotion Engine（感じ方の個人差）を最小強化
- **ハワイアンサイエンス資料のKnowledge Intake**：3本のPDF（南洋気術・HUNA7原則・明晰夢等）を分析した結果、**新規Wisdom作成なし・BRAIN変更なし**と判断。ホ・オポノポノ／魂／自然観／調和は既存実装で十分、癒し技法・アウマクア・特定神への祈祷・独自スピリチュアル体系はSafety原則と矛盾するため取り込まず
- Sprint003以降（逃避型・自立型等）：**未着手**
- RURI-006（リフレーミング）：`BRAIN/wisdom/reframing.md`は完成しているが、瑠璃講座原本`KNOWLEDGE/RURI/06-reframing.md`はまだ作成されておらず、`KNOWLEDGE/RURI/INDEX.md`は「未作成」のまま維持

型ごとのWisdomは、Soul Promptには詳細を書かず「Self Understanding」の原則だけを残し、詳細は`BRAIN/wisdom/`配下のWisdomファイル（サブフォルダを含む）に格納する設計。

**開発フロー**：BRAIN更新時は「既存OSとの照合→本当に不足している智慧か判断→（取り込まない場合は記録して終了／取り込む場合はWisdom化）→影響範囲調査→プロダクト個別に反映要否判断→実対話テスト→レビュー→CHANGELOG記録」という手順に統一（`products/soul/OPERATIONS.md`「Sprintの流れ」に集約済み）。

---

## 5. ドキュメント整備状況

直近で以下を更新済み：
- `products/README.md`：チャッピーを追加、役割に応じた深さ調整の方針を明記
- `products/soul/CHANGELOG.md`：INNER PATH〜Foundation Wisdom〜Knowledge Intake〜運用ドキュメント一本化まで、すべての開発履歴を記録
- `SPRINTS/Roadmap.md`：Version 2.0に役割調整方針を追記
- `ROADMAP.md`（ルート）：初期構想アーカイブである旨の案内を先頭に追加（`SPRINTS/Roadmap.md`が最新）
- **運用ドキュメントの一本化**：`DOCS/CHANGELOG.md`（CHANGELOGの重複）・`DOCS/project_operation.md`（運用フローの重複）は、いずれも`products/soul/OPERATIONS.md`・`products/soul/CHANGELOG.md`との内容比較・参照調査の結果、削除。**CHANGELOGは`products/soul/CHANGELOG.md`に、運用ルールは`products/soul/OPERATIONS.md`に一本化**（`OPERATIONS.md`内に「CHANGELOGの記録先について」「運用ルールの一本化について」を明記済み）
- `DOCS/DECISIONS.md`：Decision 005（外部資料は取り込まない判断もあり得る）を追加

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
- **「Soulが本人より先に解釈・構造化しすぎる傾向」**：こころの泉・Soul Prompt正式版の実対話テストで複数回観測（`FUTURE_IDEAS.md`記録済み）。Context Check・Foundation Wisdomとは意図的に切り分けており、次にBRAIN改修する際の最有力候補
- RURI-006（リフレーミング）の瑠璃講座原本（`KNOWLEDGE/RURI/06-reframing.md`）はまだ未作成

---

---

## 8. 運用ルールの索引（迷ったらここ）

- **運用ルール全般**：`products/soul/OPERATIONS.md`（Sprintの流れ・BRAIN更新後の反映フロー・反映要否の確認対象など、すべてここに一本化）
- **変更履歴**：`products/soul/CHANGELOG.md`（BRAIN・Wisdom・各プロダクトへの反映は必ずここへ記録）
- **設計判断の記録**：`DOCS/DECISIONS.md`（Decision 005まで）
- **将来の改善候補**：`DOCS/FUTURE_IDEAS.md`
- `DOCS/CHANGELOG.md`・`DOCS/project_operation.md`は重複のため削除済み（もし過去のリンク等で見かけても存在しない）

---

**新しいチャットで再開する際は**：やりたい作業に応じて、このメモ＋関連ファイル（`kokoro_izumi.html`／`soul_prompt_v1.3.md`／チャッピーのInstructions等）だけを添えれば十分です。
