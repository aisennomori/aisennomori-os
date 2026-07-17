# DOC_STANDARD.md
## 愛泉の杜 Documentation Standard（ADS）
### Edition 1 / Version 1.0 — **Frozen（正式採用）**
**Status**: Approved

> 配置場所：愛泉の杜OSの直下（`愛泉の杜OS/DOC_STANDARD.md`）。
> MoonCard専用のファイルではなく、**すべてのアプリに共通するOS標準**である。

> **凍結宣言**
> Documentation Standard Edition 1 / Version 1.0 は、この時点をもって正式採用（Freeze）される。
> 以後の改善は、実際にアプリ（ManaCard、SoulReading、Healingなど）を作り、運用する中で
> 「この標準に足りない点」が具体的に見えたときにのみ行う。
> 思いつきベースでの改訂は行わず、次の版は Edition 1 / Version 1.1 として、
> 変更理由とともに `DECISIONS.md`（該当アプリ）に記録した上で改訂する。

このドキュメントは、愛泉の杜OSに属するすべてのアプリが持つべき
ドキュメント構成・執筆ルールの標準を定義する。

コードはアプリごとに変わる。しかし、
「どういう思想で、どういう順番で、どういう品質でドキュメントを書くか」という標準は、
すべてのアプリに受け継がれる。この意味で、DOC_STANDARDは
愛泉の杜OSの**開発文化そのもの**を定義する文書である。

---

## Design Principle

> Documentation is written once, but used many times.
> Write for the future. Write for humans. Write for AI.
> Keep a single source of truth.

ドキュメントは一度書き、何度も活用する。
未来の自分のために書く。
人のために書く。
AIのために書く。
真実は一つの場所で管理する。

この一文が、Documentation Standardのすべての規則の根拠である。
個別の判断に迷ったときは、規則の字面よりも、この原則に立ち返ること。

---

## Reference Implementation

このEdition 1 / Version 1.0は、**MoonCard**を最初の実装例（Reference Implementation）として策定された。

新しいアプリ（ManaCard、SoulReading、Healing、HSP、AI Counselorなど）の
DOCSを作る際は、MoonCardの `Apps/MoonCard/DOCS/` 一式をそのまま雛形として複製し、
内容だけをそのアプリのものに置き換える。

**重要**：MoonCardのDOCSに書かれている内容は、あくまでMoonCard固有の実装例である。
一方、この`DOC_STANDARD.md`に書かれている構成・ルールは、全アプリに共通するOS標準である。
両者を混同しないこと。

---

## Edition と Version について

Documentation Standardのバージョンは、**Edition**と**Version**の2軸で管理する。

| 軸 | 意味 | 例 |
|---|---|---|
| Edition | 体系そのものが変わる大きな改訂 | Edition 1 → Edition 2 |
| Version | Edition内での細かな改訂・追加 | Version 1.0 → 1.1 |

```
Edition 1
  ├─ Version 1.0（現行・Frozen）
  └─ Version 1.1（将来、運用の中で必要になった時点で）

Edition 2（将来、体系ごと作り直す場合）
  └─ Version 1.0
```

Editionを跨ぐ変更は、既存アプリのDOCSとの互換性が失われる可能性があるため、
必ず理由とともに記録すること。

---

## ドキュメントの3層構造（Foundation / Architecture / Operation）

各アプリのDOCSは、以下の3つのフォルダに分けて配置する。

```
Apps/{AppName}/DOCS/
│
├── AI_INDEX.md           … AI向けの読了順インデックス（人は読まなくてよい）
│
├── 01_Foundation/        … 世界観の理解。まずここを読む
│   ├── MANIFEST.md       … このアプリは何を大切にしているか（思想）
│   ├── README.md         … 何ができるか／使い方（人向けの入口）
│   └── PROJECT_OVERVIEW.md … 何のためのアプリか、なぜ作られたか、データの出自
│
├── 02_Architecture/      … 設計の理解。ここだけ読めば実装できる
│   ├── DATA_SPEC.md      … データ構造、フィールド定義、矛盾時に何を信じるか
│   ├── SCREEN_SPEC.md    … 画面構成、操作、状態のパターン
│   └── DESIGN_RULES.md   … 配色・タイポグラフィ・レイアウト・命名規則
│
└── 03_Operation/         … 運用フェーズの資料
    ├── DECISIONS.md      … 設計判断の記録（DEC-XXX、カテゴリ付き）
    ├── DATA_AUDIT.md     … データ不整合の発生・原因・修正・再発防止策の記録
    ├── CHANGELOG.md      … 更新履歴
    ├── FUTURE_IDEAS.md   … 将来構想・未判断事項
    └── GLOSSARY.md       … 用語・表記ルール・Alias
```

AIはファイル名よりもフォルダ構造から先に意味を理解する。
`01_Foundation/` を見た瞬間に「まずここを読めばいい」と分かることを意図している。

### PURPOSE.md の扱い（OS全体の理念）

`PURPOSE.md` は、OS全体で唯一の理念文書であり、`愛泉の杜OS/PURPOSE.md` にのみ存在する。
各アプリの `01_Foundation/` には複製せず、`README.md` の冒頭から参照リンクする。

理由：複製すると、PURPOSEが更新された際に複製先が古いまま取り残される
「ドリフト」が発生する。単一の情報源（Single Source of Truth）を保つため、
実体は1つに保ち、各アプリからは常にリンクで参照する。

---

## README.md と AI_INDEX.md の役割分担

| | 対象読者 | 内容 |
|---|---|---|
| `README.md` | 人 | 文脈・背景を含めた説明。「愛泉の杜とは」から始まり、思想を裏切らない順序で機能に降りていく |
| `AI_INDEX.md` | AI全般 | 前置きなし。読むべきファイルと順番だけを列挙する |

`AI_INDEX.md` は特定のAI製品（あるモデルやツール名など）を名指しせず、
「AI全般」を対象として書く。これにより、将来登場する新しいAIに対しても、
そのまま使い続けられる。

AI_INDEX.mdの書式例：

```markdown
# AI_INDEX.md
（AI向け。人はREADME.mdを読んでください）

## 読む順番

1. ../../../PURPOSE.md
2. ../../../DOC_STANDARD.md
3. 01_Foundation/MANIFEST.md
4. 01_Foundation/README.md
5. 01_Foundation/PROJECT_OVERVIEW.md
6. 02_Architecture/DATA_SPEC.md
7. 02_Architecture/SCREEN_SPEC.md
8. 02_Architecture/DESIGN_RULES.md
9. 03_Operation/DECISIONS.md
10. 03_Operation/DATA_AUDIT.md
11. 03_Operation/CHANGELOG.md
12. 03_Operation/FUTURE_IDEAS.md
13. 03_Operation/GLOSSARY.md
```

---

## ドキュメント全体における位置付け

```
PURPOSE              OS全体：なぜ存在するのか（OS直下、単一の実体）
　　↓
CONSTITUTION           OS全体：何を守るのか（未整備。今後追加）
　　↓
DOC_STANDARD            OS全体：ドキュメントをどう作るか　← このファイル（Edition 1 / v1.0・Frozen）
　　↓
AI_INDEX（アプリ別）      アプリ：AIはここから読み始める
　　↓
01_Foundation（アプリ別）  アプリ：何を大切にし、何ができるのか
　　↓
02_Architecture（アプリ別） アプリ：どう作られているか
　　↓
03_Operation（アプリ別）   アプリ：どう運用され、育てられていくか
```

---

## 各ドキュメントに適用する執筆ルール

### MANIFEST.md（01_Foundation）
- 「何ができるか」ではなく「何を大切にしているか」だけを書く。機能の話は書かない

### DECISIONS.md（03_Operation）
- **推測を書かない。実際に採用された設計判断だけを書く**
- **採用されなかった案は記載しない**（比較検討のログは別の場所で管理し、DECISIONSは「確定した結論と理由」のみを残す）
- IDは `DEC-XXX`（3桁連番）を付与する
- 各エントリに **カテゴリ** を1つ付与する：`Data` / `UI` / `Architecture` / `Documentation` / `Performance`
- 1決定＝1エントリ。ID・カテゴリ・決定・理由・（あれば）将来の見直し条件、の構成で書く

### DATA_AUDIT.md（03_Operation）
- 発生した不整合は、以下の項目で記録する：発生の経緯／内容／原因／対応／教訓／**再発防止策**
- 「再発防止策」は、次にAIが同じ作業をするときにそのまま手順として使える粒度で書く

### GLOSSARY.md（03_Operation）
- 正式名称・表記ルールに加えて、`Alias`（別名・言い換え）を持つ
- **Aliasは、実際に会話・資料の中で使われた呼び方に限定する。存在しない呼び方を創作して登録しない**

### AI_INDEX.md（DOCS直下）
- 前置き・説明文を書かない。読む順番のリストのみで構成する
- 特定のAI製品名を書かない。「AI全般」を対象に書く
- 人向けの文脈説明は書かない（それはREADME.mdの役割）

### 全ドキュメント共通
- 各ファイルの冒頭に、以下の1行メタ情報を付与する

  ```
  > Documentation Standard: Edition 1 / Version 1.0 (Frozen)　|　Layer: {Foundation|Architecture|Operation}　|　App: {AppName}　|　Status: {Draft|Review|Approved|Deprecated}
  ```

- **Status** の意味（内容の確定状況を示すものであり、実リポジトリへの反映＝デプロイ状況とは別に管理する）：

  | Status | 意味 |
  |---|---|
  | Draft | 起草中。内容は変わる可能性がある |
  | Review | レビュー待ち |
  | Approved | 内容が確定した最終版。実際のリポジトリへの反映（デプロイ）は別途 `CHANGELOG.md` で管理する |
  | Deprecated | 古い情報。参照しないこと。後継ドキュメントがあればリンクする |

  AIはStatusを見て、「これは確定した情報か、まだ暫定か」を判断してから内容を扱うこと。
  ただし Approved であっても、実際のアプリ・リポジトリに反映済みとは限らない点に注意する
  （反映状況は各アプリの `CHANGELOG.md` を確認する）。

---

## 変更履歴

| Edition | Version | 内容 |
|---|---|---|
| 1 | 1.0 | 初版。MoonCardを Reference Implementation として策定。Foundation / Architecture / Operation の3層構造、Edition／Version分離、Statusフィールド、DECISIONSのカテゴリ分類、AI_INDEX.mdを導入。**この版をもって正式採用（Freeze）** |
