# APP_REGISTRY.md

> Documentation Standard: Edition 1 / Version 2.0　|　Layer: OS Root　|　Status: Approved

このファイルは、愛泉の杜OSにおける**論理名（Logical Name）**と、
その実体である**実装・Documentation・関連資産**の対応関係を一元管理する唯一の正本である。

## なぜ必要か

Documentation Standard（`DOC_STANDARD.md`）は、会話・設計・ドキュメントの中で
アプリを「論理名」（例：MoonCard）で扱う。

一方、実際のリポジトリは、これまで積み上げてきた資産（既存のフォルダ構成、
既存のリンク、既存のツール連携設定など）を尊重し、無理に論理名へ合わせて
リネームしない。

論理構造と実体を橋渡しするのが、このファイルである。

**論理構造（Documentation Standardが使う名前）と、
物理構造（実際のGitリポジトリのパス）は分離する。**
実装・Documentation・関連資産を含む対応関係を一元管理する場所を、このファイル1つに限定する
（`PURPOSE.md`を単一実体にしたのと同じ理由＝ドリフト防止）。

---

## 対応表

| Logical App | Repository Path（実装） | Repository Path（DOCS） | Status |
|---|---|---|---|
| MoonCard | `products/moon-tools/`（`moon_card_gallery.html`、`moon_card_images/`。他の月読みツールと同居） | `products/moon-tools/DOCS/MoonCard/` | Active |
| MoonAgeCalendar | `products/moon-tools/moon_age_calendar.html`（他の月読みツールと同居。ハワイ暦とは独立した月齢専用カレンダー） | 未定 | Active |
| ManaCard | 未定 | 未定 | Planned |
| SoulReading | 未定 | 未定 | Planned |
| Healing | 未定 | 未定 | Planned |

## 備考：MoonCardと`moon-tools`の関係

`products/moon-tools/` は、月読みカードギャラリー（MoonCard）専用のフォルダではなく、
`moon_calendar.html`・`moon_practice.html`・`moon_techo.html`など、
複数の月読みツールが同居する**製品ファミリーのフォルダ**である。

MoonCardはその中の1ツールであるため、DOCSも
`products/moon-tools/DOCS/` 直下ではなく、
`products/moon-tools/DOCS/MoonCard/` という、
**アプリ単位で区切られたサブフォルダ**に配置する。

将来、`moon_calendar.html`など他のツールにもDOCSを作る場合は、
同様に `products/moon-tools/DOCS/{ToolName}/` として追加していく。

---

## 運用ルール

- 新しいアプリを追加する際は、まずこのファイルに1行追加する
- 実体が「未定」のうちは、そのアプリのDOCSに実体への対応を記載しない（`PROJECT_OVERVIEW.md`にPlanned状態である旨だけ書く）
- 実装・Documentation・関連資産の物理構造に変更（リネーム・移動・追加）が発生した場合は、このファイルの該当行を更新する。他のDocumentationに対応関係を複製しない
