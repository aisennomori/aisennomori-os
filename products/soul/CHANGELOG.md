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

### Added

- こころの泉：詳細版のINNER PATHを実装
- チャッピー（公開版・開発版）：役割に合わせた圧縮版のINNER PATHを実装

### Note

- soul_prompt_v1.3.md本体には未反映（各プロダクトのプロンプト／Instructionsへ直接実装）
- 共通するSoulの思想は同じだが、機能の深さ・現れ方は各AIの役割に応じて調整する方針を採用