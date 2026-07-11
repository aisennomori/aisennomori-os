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

## Context Check（文脈の確認）

### Added

- BRAIN（`decision-tree.md`）へ「Context Check（文脈の確認）」「感情や身体感覚が『わからない』」の2セクションを追加
- 深く進む前に、今の相談を理解するための文脈が十分かを確認し、不足時は欠けている一点だけを自然に確認する判断原則
- 「わからない」への応答として、そのまま留まる／別の角度から見る／現在の状況や関係性に戻る、という選択肢を明記
- 年齢・家族構成等のプロフィール収集や、相談者の属性分類を目的としないことを明記。安心・Purpose Checkより優先しない

### 反映：こころの泉

- 「深く聴く深さについて」へ最小変更で統合。Context Check本体の追記と、「よく分からない」後の選択肢（留まる／別角度／現在の状況や関係性へ戻る）を追加
- 実対話テスト5ケース（①幼少期＋感情不明／②整理／③夫との関係／④嫌われる怖さ／⑤傾聴希望）実施、合格
- 確認できた点：必要な場面のみContext Checkが働く／「わからない」を無理に深掘りしない／不要な質問を増やさない／Purpose Checkを妨げない
- ④で見られたSoulの解釈・構造化の先行傾向は、Context Checkとは別課題として`DOCS/FUTURE_IDEAS.md`へ記録し、今回の改修対象からは切り分けた

### 反映：チャッピー

- 反映不要と判断。理由：日常の伴走者であり深く進む場面自体が限定されている／FIRST PRINCIPLE等ですでに深掘りを抑制している／「言葉になる前の感覚」への対応も実装済みで、追加は既存Instructionsとの重複・冗長化につながるため

### 反映：Soul Prompt正式版

- 「Purpose Check」直後へ「Context Check（深く理解しようとする前に）」を新設。三層構造の原則に沿い、こころの泉の詳細実装はそのまま移植せず、汎用原則へ圧縮
- Purpose Check（相談者が今何を求めているか）とContext Check（Soulが今の相談を理解する文脈を十分に持っているか）の役割の違いを明記し、混同を回避
- ChatGPT上で①・②・⑤の3ケースを実対話テスト、合格
- 確認できた点：必要な場面だけContext Checkが働く／「わからない」を無理に深掘りしない／不要な質問を増やさない／Purpose Checkを邪魔しない
- ①②で見られた解釈・意味づけの先行傾向は、こころの泉のケースと同じくContext Checkとは別課題と判断し、今回の改修対象からは切り分けた

---

## INNER PATH（必要な時だけ現れる小径）

### Added

- こころの泉：詳細版のINNER PATHを実装
- チャッピー（公開版・開発版）：役割に合わせた圧縮版のINNER PATHを実装

### Note

- soul_prompt_v1.3.md本体には未反映（各プロダクトのプロンプト／Instructionsへ直接実装）
- 共通するSoulの思想は同じだが、機能の深さ・現れ方は各AIの役割に応じて調整する方針を採用