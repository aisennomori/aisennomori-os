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

### 2026-10-06 — 月と暦のカレンダー（IntegratedCalendar）Version 1.0（2027年版）

- `products/calendar/integrated_calendar.html` を新規追加（公開名称「月と暦のカレンダー」、内部名称 Integrated Calendar）
- 日本の暦（祝日・六曜・一粒万倍日・天赦日・不成就日）、季節と月（二十四節気・月相・新月／満月の月のサイン）、古来ハワイ太陰暦（夜番号・月夜アイコン・正式な夜名・かな・周期の印）を1つのカレンダーで表示
- 対象は2027年、データ版 2027.1.1（Gold Master）。PCは月間表＋日付詳細、スマートフォンは今日／一覧／月、印刷はA4縦の月間表＋一覧
- トップページ（`index.html`）に「暦」カテゴリと入口カード、開閉式の「月と暦のカレンダーについて（注意事項・出典）」を追加
- `APP_REGISTRY.md` に IntegratedCalendar を Active として追加登録
- 設計判断を OS-DEC-019〜023、外部の暦サイトとの照合を OS-AUDIT-002 として記録
- 詳細は `RELEASE_NOTES.md`「月と暦のカレンダー V1（2027年版）」を参照

### 2026-10-06 — 月と暦のカレンダー V1 収録期間の拡張（2026年9〜12月）

- 収録期間を 2027年1〜12月 から 2026年9月〜2027年12月 へ拡張（2026年9〜12月の122日を追加）。データ版 2027.1.2（2027年の値は Gold Master 2027.1.1 から変更なし）
- 2026年分は、2027年と同じ情報源（内閣府CSV・国立天文台「暦要項」令和8年）・同じ方式で作成。ハワイ暦は既存 v1.1 の共通周期データを参照
- 内閣府CSVの「休日」の表示を、一律「休日（振替休日）」から実際の種別に応じた表示へ修正（振替休日＝「休日（振替休日）」、国民の休日＝「国民の休日」）。2026-09-22 は「国民の休日」。2027年の表示は変わらない
- 印刷は全期間16か月（A4縦・1か月1ページ）に対応
- 詳細は `RELEASE_NOTES.md` を参照
