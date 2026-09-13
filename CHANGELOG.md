# CHANGELOG.md（OS Root）

このドキュメントは、愛泉の杜OS全体の**バージョンごとの履歴**を時系列で記録する。

各アプリ固有の実装修正・バグ修正の詳細は、各アプリのDOCS内にある個別の`CHANGELOG.md`（例：`products/moon-tools/DOCS/MoonCard/03_Operation/CHANGELOG.md`）に記録する。本書は、それらを1件ずつ列挙する場所ではなく、**OSとしてどのVersionで何をReleaseしたか**を一覧できることを目的とする。

各Versionの詳細は、対応する`RELEASE_NOTES.md`を参照する。

---

## Version 1.0

**Released**

- Documentation Standard（Edition 1 / Version 1.0）
- APP_REGISTRY.md
- DECISIONS.md（MoonCard／OS-root）
- DATA_AUDIT.md（OS-root）
- QUALITY_ASSURANCE.md
- RELEASE_NOTES.md
- PROJECT_STATUS.md
- Version 1.0 Release

---

### 2026-07-31 — Documentation Standard Edition 1 / Version 2.0

- Documentation Standard を Version 2.0へ更新
- APP_REGISTRY 等のOS-root文書は Version 2.0基準へ移行
- APP_REGISTRY.md に Ebook（電子書籍出版プロジェクト）を追加登録（`products/ebook/`、Status: Active）

### 2026-07-31 — DOC_STANDARD.md Edition 1 / Version 2.1

- DOC_STANDARD.md を Edition 1 / Version 2.1へ更新
- Documentation Version Ruleを追加し、OS-root文書の版更新時にCHANGELOGまたはDECISIONSへ記録する運用を明文化

### 2026-09-13 — BirthdayProfile Version 1.0

- `products/card-reading/birthday_profile.html` を新規追加
- 生年月日を1回入力することで、古代ハワイアンムーン・数秘術・宿曜占星術の3体系から基礎プロフィールを一覧表示する統合入口を実装
- 数秘術に年運数・月運数を追加
- 数秘術の共通還元ルールとして、1〜9および11・22・33を最終値とし、11・22・33はマスターナンバーとして保持
- `moon_card_gallery.html?night=XX` へのディープリンクを実装し、該当する月夜カードを直接表示
- PCではPDF印刷、スマートフォンでは画像保存に対応
- `APP_REGISTRY.md` に BirthdayProfile を Active として追加登録

### 2026-09-13 — BirthdayProfile Version 1.1

- BirthdayProfileの数秘サイクル仕様を拡張
- 「社会のサイクル」と「あなたのサイクル」の2階層表示を正式採用
- 社会年サイクル・社会月サイクルを追加
- 個人年サイクル・個人月サイクルの算出仕様を正式化
- 誕生日を基準としたサイクル切替方式を正式採用
- 対象日の判定基準を明文化
- 数秘術の共通還元ルールはOS-DEC-008を継承
- 上記仕様をOS-DEC-009「Birthday Profile 数秘サイクル仕様の正式化」として記録
- `birthday_profile.html` をVersion 1.1として更新
