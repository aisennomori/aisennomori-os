# 愛泉の杜OS ロードマップ

> Role: 愛泉の杜OS全体の戦略・優先順位・完成条件・Statusを管理する唯一の正本。Soul／BRAINの個別開発計画は `SPRINTS/Roadmap.md` を参照する。

## Version と Status

本ロードマップでは、VersionとStatusを明確に区別する。

- **Version**：成果物・システムの成熟度と、到達した節目を表す。
- **Status**：現在の制作・品質保証・リリース工程を表す。

Versionは到達した節目を示し、Statusは現在地を示す。両者は独立して管理する。

### Version体系

| 種別 | 意味 | 表記例 |
|---|---|---|
| OS Version | 愛泉の杜OS全体の成熟度 | OS Version 1.0 |
| Architecture Baseline | 設計基盤の成熟度 | Baseline 1.0 |
| Soul Version | Soul／BRAINの成熟度 | Soul Version 1.1 |
| Application Version | 個別アプリ・コンテンツの版 | ManaCard Version 1.0 |

### Status Lifecycle

```text
Planned
↓
In Production
↓
Content Complete
↓
QA Complete
↓
Released
```

| Status | 定義 |
|---|---|
| Planned | 着手前。目的・優先順位・必要な正本が定まっている状態。 |
| In Production | 制作・開発・編集を進めている状態。 |
| Content Complete | 正本コンテンツが確定し、制作内容として承認された状態。 |
| QA Complete | コンテンツQA・CSV QA・必要な実装前確認が完了し、リリース可能な状態。 |
| Released | 実装・公開・APP_REGISTRY上の正式登録まで完了した状態。 |

---

## Phase 1：OS基盤設計【完了】

Status：Baseline 1.0 Complete

- README
- CONSTITUTION
- SYSTEM
- MEMORY
- DECISIONS
- DOC_STANDARD
- CONTENT_PRODUCTION_STANDARD

ここまでで、「OSとは何か」と、長期運用のための設計・Documentation基盤を定義した。

---

## Phase 2：制作基盤構築【完了】

- ChatGPT：コンテンツ編集
- Codex：品質保証
- ブランドオーナー：最終承認
- Draft → QA → 承認 → CSV → 実装 の制作フロー

ここまでで、「どう作るか」を定義した。

---

## Phase 3：コンテンツ資産構築【進行中】

### Priority 1：愛泉の杜Edition マナカード

Status：In Production

- 49 Message Recordsの完成
- コンテンツQA・CSV QA
- アプリ実装
- APP_REGISTRYへの正式登録

マナカードは、Content Complete、QA Complete、Releasedの順に進める。

### Priority 2：宇宙の法則

Status：Planned

- 内容整理
- Edition化
- UI実装

### Priority 3：AIカウンセラー

Status：In Production

基本機能は実装済み。今後は品質強化とCONTENT_PRODUCTION_STANDARDへの運用移行を進める。

### Priority 4：電子書籍

Status：In Production

愛泉の杜の世界観を、本という形で届ける。

---

## Phase 4：サービス統合

Status：Planned

Web、LINE、アプリ、Kindle、音声などを、同じOS基盤から展開する。

---

## Phase 5：AIエージェント

Status：Planned

ChatGPT、Codex、Claude、Copilot、および将来のAIが、愛泉の杜OSの共通原則に基づいて動く状態を目指す。

---

## 2026年の優先順位

```text
★★★★★  愛泉の杜Edition マナカード完成
★★★★☆  宇宙の法則
★★★★☆  電子書籍
★★★☆☆  AIカウンセラー品質強化
★★☆☆☆  Web改善
★☆☆☆☆  新規機能
```

今は新しい機能を増やすより、完成させることを優先するフェーズである。

---

## OS Version 1.0 完成条件

- OS基盤文書と制作標準が整備されている
- 愛泉の杜Edition マナカードがReleasedに到達している
- 宇宙の法則のEdition化が完了している
- 電子書籍プロジェクト第1冊が公開されている
- AIカウンセラーがCONTENT_PRODUCTION_STANDARDに基づく運用へ移行している

---

## Version 1.0以後

```text
OS Version 1.0
↓
運用開始
↓
改善サイクル
↓
OS Version 2.0
```

---

## Vision

愛泉の杜OSは、単なるAIプロンプト集やコンテンツ集ではない。

人が安心して立ち戻り、自分らしく考え、選び、創り続けられるための基盤（OS）である。

思想を設計し、制作標準を整え、品質を保証し、コンテンツを育て、複数のAIやサービスへ展開していく。これが愛泉の杜OSの長期ビジョンである。
