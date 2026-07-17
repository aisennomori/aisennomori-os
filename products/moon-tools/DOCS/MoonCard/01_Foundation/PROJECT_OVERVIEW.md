> Documentation Standard: Edition 1 / Version 1.0 (Frozen)　|　Layer: Foundation　|　App: MoonCard　|　Status: Approved

# PROJECT_OVERVIEW.md

## これは何か

月読みカード（MoonCard）は、ハワイの太陰暦30夜それぞれに伝わる物語を、
1枚のカードとしてめくりながら出会っていくWebアプリです。

愛泉の杜OSが運営する「月読みツール集」（moon-tools）の一つで、
既存のハワイアンムーン系ツール群
（moon_calendar.html／moon_techo.html／moon_reading.html／moon_practice.html／
birthday_moon_lookup.html／cycle_tracker.html／mauli_tool.html）
と同じ思想的系譜に属しますが、「一覧性」よりも
「一夜ずつ、静かに向き合う」ことを重視して独立したツールとして設計されました。

## なぜ作られたか

既存の月読みツール群はカレンダーや手帳、診断ツールとしての性格が強く、
「30夜分の物語をじっくり読む」体験に特化したツールがありませんでした。
月読みカードは、その隙間を埋めるものとして企画されました。

## データの出自

このアプリの30夜分のデータは、単一のソースから作られたものではありません。

1. もともとの30夜分の解説は、Goh様が過去に作成した**PowerPointプレゼンテーション**
   （録画時間 約2時間8分）に収録されている
2. その内容を**エクセル（ハワイアンムーン_1-20.xlsx）**に文字起こしする形で構造化された
3. さらに、コパイロットによる別作業の過程で、11〜20夜の並び順に誤りが生じた
4. Goh様がPowerPointの実画面をスクリーンショットで撮影し、Claudeがそれを文字起こし・
   構造化することで、最終的にデータの正しさを人力で検証した

この経緯から、**データの正しさの最終的な拠り所は「実際のPowerPointスライド」**であり、
エクセルやその他の中間生成物はあくまで作業用の写しである、という位置付けになっています。
（詳細は `DATA_SPEC.md` と `DATA_AUDIT.md` を参照）

## 想定利用者

- 愛泉の杜の理念（安心から、本来の自分へ還る）に触れたことがある、または触れたい人
- ハワイの月の智慧に関心があり、日々のふとした時間に自分と向き合いたい人
- 診断や断定ではなく、静かな気づきのきっかけを求めている人

## 技術的な位置付け

- 単一のHTMLファイル（`moon_card_gallery.html`）として実装され、外部フレームワークに依存しない
- 30夜分のデータはHTML内にJSONとして埋め込み（v1時点。将来的な分離は `FUTURE_IDEAS.md` 参照）
- 画像アセットは `moon_card_images/` フォルダに分離し、既存の月相アイコン用フォルダ（`画像`／moon_01〜30.png）とは独立させている
- GitHub Pages想定の静的サイトとして、他の月読みツール群と同じ階層に配置される

## 論理名と物理パス

Documentation Standardの中で、このアプリは「MoonCard」という論理名で扱われる。
実際のリポジトリでは、複数の月読みツールが同居する `products/moon-tools/` の中に存在する。

| 項目 | 内容 |
|---|---|
| 論理名 | MoonCard |
| 実装の物理パス | `products/moon-tools/moon_card_gallery.html`、`products/moon-tools/moon_card_images/` |
| DOCSの物理パス | `products/moon-tools/DOCS/MoonCard/` |

この対応関係の正は `APP_REGISTRY.md`（OS直下）であり、食い違いが生じた場合はそちらを正とする。

## このアプリの位置付け

月読みカードは、愛泉の杜OS Documentation Standard v1.0 の
**Reference Implementation（最初の実装例）**でもあります。
今後追加されるManaCard、SoulReading、Healingなどのアプリは、
このアプリのDOCS一式を雛形として複製されます（`DOC_STANDARD.md` 参照）。

## 関連ドキュメント

- 存在理由 → `01_Foundation/MANIFEST.md`
- OS全体の理念 → OS直下の `PURPOSE.md`
- データ構造の詳細 → `02_Architecture/DATA_SPEC.md`
