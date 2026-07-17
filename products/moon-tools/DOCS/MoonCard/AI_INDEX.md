# AI_INDEX.md
（AI向け。人はREADME.mdを読んでください）

このファイルは、このプロジェクトに関わるすべてのAIが最初に読むためのものです。
特定のAI製品を対象にせず、AI全般に向けて書かれています。

前置きや文脈説明は書きません。読むべきファイルと順番だけを示します。

---

## 読む順番

1. `../../../../PURPOSE.md` — OS全体の理念。すべての判断はここに立ち返る
2. `../../../../DOC_STANDARD.md` — このドキュメント体系自体のルール（Edition 1 / Version 1.0・Frozen）
3. `../../../../APP_REGISTRY.md` — 論理名（MoonCard）と物理パス（`products/moon-tools/`）の対応
4. `01_Foundation/MANIFEST.md` — MoonCardは何を大切にしているか
5. `01_Foundation/README.md` — MoonCardは何ができるか
6. `01_Foundation/PROJECT_OVERVIEW.md` — 背景・データの出自
7. `02_Architecture/DATA_SPEC.md` — データ構造。矛盾時に何を信じるか
8. `02_Architecture/SCREEN_SPEC.md` — 画面構成・操作仕様
9. `02_Architecture/DESIGN_RULES.md` — 配色・タイポグラフィ・命名規則
10. `03_Operation/DECISIONS.md` — 設計判断とその理由（DEC-XXX）
11. `03_Operation/DATA_AUDIT.md` — 過去に起きたデータ不整合と再発防止策
12. `03_Operation/CHANGELOG.md` — 更新履歴
13. `03_Operation/FUTURE_IDEAS.md` — 未着手・保留中の事項
14. `03_Operation/GLOSSARY.md` — 用語・表記ルール・Alias

---

## 判断に迷ったときの優先順位

1. `MANIFEST.md` の思想と矛盾しないか
2. `DECISIONS.md` に、関連する既存の判断がないか
3. `DATA_AUDIT.md` に、同種の失敗が記録されていないか

上記いずれかに抵触する場合、作業を進める前に人（Goh様）に確認すること。

---

## このファイル自体のStatus

Status: Approved（Documentation Standard Edition 1 / Version 1.0 の一部として正式採用済み。
実際のリポジトリへの反映状況は `CHANGELOG.md` を確認すること）
