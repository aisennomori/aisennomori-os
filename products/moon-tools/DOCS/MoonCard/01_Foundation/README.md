> Documentation Standard: Edition 1 / Version 1.0 (Frozen)　|　Layer: Foundation　|　App: MoonCard　|　Status: Approved

# 月読みカード（MoonCard）

このアプリは、愛泉の杜OSを構成するアプリケーションの一つです。
愛泉の杜OSは、「安心から、本来の自分へ還る。」をテーマとした、心・魂・人生を支える統合プラットフォームです。
本ドキュメントでは、このアプリの目的・機能・構成について説明します。

---

## 1. 愛泉の杜とは

愛泉の杜OSは、「安心は、本来の自分へ還る泉。」という一文を核とする、
複数のアプリからなる統合プラットフォームです。

なぜこのOSが存在するのか、何を目指し何を目指さないのかは、
OS全体の理念を定義した `PURPOSE.md`（OS直下、単一の実体）に書かれています。

→ [`../../../../../PURPOSE.md`](../../../../../PURPOSE.md)

---

## 2. このアプリが存在する理由

月読みカードは、占いを提供するためのアプリではありません。
ハワイの30夜の月の物語を通して、利用者が自分自身と静かに向き合う時間を届けることを目的としています。

答えを与えるのではなく、気づきを促す。
未来を決めるのではなく、今を照らす。

このアプリが何を大切にし、何を大切にしないかは `MANIFEST.md` に定義されています。
実装や仕様に迷ったときは、まずこちらを読んでください。

→ [`01_Foundation/MANIFEST.md`](./MANIFEST.md)

---

## 3. このアプリでできること

- ハワイの太陰暦30夜分の物語を、1枚ずつカードとして表示
- スワイプ／矢印キー／キーボードの左右矢印で、前後の夜へ移動（30夜で循環）
- 各夜のカードには、雰囲気を伝える画像、名前とカナ読み、意味、暦、元素（風・水・地・火）、対応する神様タグを表示
- 行動・特徴・健康・人間関係・職業・ラッキーカラーの6項目を、パズル状の2列タイルでコンパクトに表示
- 上部の月齢アイコンが、その夜の実際の月相を表示

### 現在のデータ状況

| 夜 | 状態 |
|---|---|
| 1〜20夜 | 名前・物語・画像すべて完成 |
| 21〜30夜 | 名前・カナ・元素・神様タグのみ表示。詳しい物語と画像は準備中 |

未完成の部分は、取り繕わずに「近日公開予定です」と正直に表示します。
これは`MANIFEST.md`に定義した姿勢そのものです。

---

## 4. 使い方

1. `moon_card_gallery.html` をブラウザで開く
2. 画面右または左の矢印ボタンをタップ、あるいは画面をスワイプして夜を送る
3. デスクトップではキーボードの ← → キーでも操作可能
4. 下部の「◯◯ / 30」表示で、現在何日目のカードを見ているか確認できる

---

## 5. フォルダ構成

### 論理構造と物理構造

MoonCardは、Documentation Standardの中では「MoonCard」という論理名で扱われるが、
実際のリポジトリでは `products/moon-tools/` という、複数の月読みツールが同居する
製品ファミリーのフォルダの中に存在する。論理名と物理パスの対応は
`APP_REGISTRY.md`（OS直下）を正とする。

```
products/moon-tools/                    ← 物理パス（他の月読みツールと同居）
├── moon_card_gallery.html              … MoonCard本体（HTML/CSS/JS、データも内包）
├── moon_card_images/                   … MoonCard用の各夜の雰囲気画像
├── moon_calendar.html 他               … 同じ製品ファミリーの他ツール（MoonCard外）
│
└── DOCS/
    └── MoonCard/                       ← MoonCard専用のDOCS（論理名でスコープを区切る）
        ├── AI_INDEX.md
        ├── 01_Foundation/
        │   ├── MANIFEST.md
        │   ├── README.md               … このファイル
        │   └── PROJECT_OVERVIEW.md
        ├── 02_Architecture/
        │   ├── DATA_SPEC.md
        │   ├── SCREEN_SPEC.md
        │   └── DESIGN_RULES.md
        └── 03_Operation/
            ├── DECISIONS.md
            ├── DATA_AUDIT.md
            ├── CHANGELOG.md
            ├── FUTURE_IDEAS.md
            └── GLOSSARY.md
```

> 現状、30夜分のデータは `moon_card_gallery.html` 内にJSONとして埋め込まれています。
> 外部データファイルへの分離は将来構想として `FUTURE_IDEAS.md` に記載します。
>
> このDOCS構成は、愛泉の杜OS全体の `DOC_STANDARD.md`（OS直下）に定義された
> Documentation Standard Edition 1 / Version 1.0（Frozen）に準拠しています。MoonCardはその Reference Implementation（最初の実装例）です。

---

## 6. ドキュメント一覧

### 01_Foundation（世界観の理解）
| ドキュメント | 内容 |
|---|---|
| [`MANIFEST.md`](./MANIFEST.md) | このアプリは何を大切にしているか（思想） |
| `README.md` | このファイル |
| [`PROJECT_OVERVIEW.md`](./PROJECT_OVERVIEW.md) | プロジェクト概要・想定利用者・データの出自 |

### 02_Architecture（設計の理解）
| ドキュメント | 内容 |
|---|---|
| [`DATA_SPEC.md`](../02_Architecture/DATA_SPEC.md) | 30夜分のデータ構造・各フィールドの定義 |
| [`SCREEN_SPEC.md`](../02_Architecture/SCREEN_SPEC.md) | 画面仕様・操作仕様 |
| [`DESIGN_RULES.md`](../02_Architecture/DESIGN_RULES.md) | 配色・フォント・レイアウトルール |

### 03_Operation（運用フェーズ）
| ドキュメント | 内容 |
|---|---|
| [`DECISIONS.md`](../03_Operation/DECISIONS.md) | 設計判断とその理由の記録 |
| [`DATA_AUDIT.md`](../03_Operation/DATA_AUDIT.md) | データ不整合の発生と修正の記録 |
| [`CHANGELOG.md`](../03_Operation/CHANGELOG.md) | 更新履歴 |
| [`FUTURE_IDEAS.md`](../03_Operation/FUTURE_IDEAS.md) | 将来構想（21〜30夜追加、data分離など） |
| [`GLOSSARY.md`](../03_Operation/GLOSSARY.md) | ハワイ語表記・用語の定義・Alias |

### OS全体（上位ドキュメント）
| ドキュメント | 内容 |
|---|---|
| `PURPOSE.md` | 愛泉の杜OS全体の理念（OS直下） |
| `DOC_STANDARD.md` | このDOCS構成自体のルール（OS直下） |
| `APP_REGISTRY.md` | 論理名（MoonCard等）と物理パス（`products/moon-tools/`等）の対応表（OS直下） |
