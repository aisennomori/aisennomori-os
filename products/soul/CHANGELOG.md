# CHANGELOG

## v1.3

### Added

- Purpose Check追加
- Growth Philosophy追加
- Self Understanding整理
- 三層構造対応

### Changed

- WisdomをSoul Promptから分離
- Knowledge → Wisdom → Soul構造へ変更
- 型固有の例文をPromptから削除

### Architecture

Knowledge

↓

Wisdom（Soul Brain）

↓

Soul Prompt

### Status

正式採用

Sprint001 完了

Sprint002（依存型）完了

---

## BRAIN強化（Emotion / Thinking / Decision Tree）

### Added

- Emotionに身体感覚・言葉になる前の体験への理解を追加
- Thinkingに「理解の6層」を追加
- Decision Treeに「深掘り可否の判断」を追加

### Note

- 瑠璃講座のAIカウンセラープロンプトとの設計照合を実施
- 新規Engine追加ではなく既存3Engine（Emotion / Thinking / Decision Tree）の強化を選択
- 「深掘りできるから深掘りするのではなく、今必要な深さに留まる」という愛泉の杜OSの原則を維持
- Knowledge → Wisdom → Soulの既存構造を維持

### 反映：こころの泉

- kokoro_izumi.htmlのSYSTEM_PROMPTへ最小変更で統合（3箇所）
  - 「深く聴く姿勢」：言葉になる前の感覚も受け止める旨を追記
  - 「深く聴く流れ」ステップ3：身体感覚を要素に追加、一度に扱わない旨を追記
  - 「深く聴く流れ」直後：「深く聴く深さについて」を新設（深掘り可否の判断・身体感覚の扱い方）
- 既存の6ステップ構造・9タイプ防衛・INNER PATH・世界観・JSON出力形式は変更なし

### 実対話テスト

- 5ケース（傾聴／整理／身体感覚／自己理解／助言要求）すべて合格
- テスト中に発生したフォールバック応答（「すみません、うまく受け取れませんでした」）は、再テストで再現せず、API／クレジット側の一時的な問題と判断。SYSTEM_PROMPT変更による不具合とは現時点で判断しない

### 反映：チャッピー

- Instructions（`products/chappy/instructions_published.md`）のSELF UNDERSTANDINGへ最小変更で統合（1箇所）
  - 視点リストに「身体感覚」を追加
  - 「言葉になる前の感覚も、大切な体験として受け止めてください。」を追加
- Decision Tree由来の追加は見送り（FIRST PRINCIPLE／DIALOGUE PRINCIPLES／RESPONSE FLOWに思想が既に実装済みと判断）
- Thinking Engineの6層構造・身体感覚への具体的な問いかけ・深掘り可否の独立セクションは追加せず、既存の短文構成と役割（日常の伴走者・長距離伴走）を維持
- リポジトリでの控え保存として`products/chappy/`（README.md／instructions_published.md）を新設。ChatGPTのGPT編集画面を稼働の場、`instructions_published.md`をリポジトリ管理上の正式なInstructionsと位置づける運用ルールを明記

### 実対話テスト（チャッピー）

- 5ケースすべて合格
- 確認できた点：日常会話を無理に相談化していない／言葉にならない感覚を急いで分析していない／身体感覚の意味を決めつけていない／「昔から」という表現から勝手に幼少期やINNER PATHへ進んでいない／本人から幼少期への関心が示された場合も、原因を決めつけず本人の意思を確認してから入口を提示している／こころの泉とチャッピーの役割の違いが維持されている
- 要観察事項：身体感覚への問いかけが今後の実対話で頻出しないか継続して確認する。現時点ではInstructionsの修正は不要と判断

---

## INNER PATH（必要な時だけ現れる小径）

### Added

- こころの泉：詳細版のINNER PATHを実装
- チャッピー（公開版・開発版）：役割に合わせた圧縮版のINNER PATHを実装

### Note

- soul_prompt_v1.3.md本体には未反映（各プロダクトのプロンプト／Instructionsへ直接実装）
- 共通するSoulの思想は同じだが、機能の深さ・現れ方は各AIの役割に応じて調整する方針を採用