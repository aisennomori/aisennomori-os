> Documentation Standard: Edition 1 / Version 1.0 (Frozen)　|　Layer: Architecture　|　App: MoonCard　|　Status: Approved

# DATA_SPEC.md

## 概要

月読みカードは、30夜分（`day: 1`〜`30`）のレコードからなる配列データを扱います。
現時点（v1）では `moon_card_gallery.html` 内に `<script type="application/json">` として埋め込まれています。

## レコード構造

```json
{
  "day": 1,
  "name_en": "Hilo",
  "kana": "ヒロ",
  "meaning": "月の先駆者 ／ 人生を情熱的に生きる者",
  "calendar": "古来ハワイ太陰暦　１日目",
  "action": "独立心が高く自己中心的、想像力豊か　生まれもってのリーダー気質",
  "trait": "野心が原動力　起業家マインド...",
  "health": "幼少期は、感染症　胸　肺　腹部...",
  "relationship": "リーダーで子分を従えることを好む...",
  "career": "強い精神力とクリエイティブ知性を刺激する職...",
  "color": "黄色　宇宙の中で日光の意味を持つ...",
  "mood": "金色の光が広がる背景。情熱・太陽・王族の象徴。...",
  "hasImage": true,
  "phase_icon": "🌑",
  "element": "🌬",
  "kami": null
}
```

## フィールド定義

| フィールド | 型 | 説明 |
|---|---|---|
| `day` | number | 1〜30。太陰暦の何日目か |
| `name_en` | string | ハワイ語の正式表記。マクロン（ā, ū, ō）・オキナ（ʻ）を含む正しい綴りを使用する |
| `kana` | string | `name_en` のカナ読み |
| `meaning` | string | その夜の意味・キャッチコピー。元となるPPTスライドが2枚（①②）に分かれているため、`① / ②` の形式で両方を保持する |
| `calendar` | string | 「古来ハワイ太陰暦　○日目」の表記。日によって「番目」「の月」など表記ゆれがあるが、原資料の表記をそのまま尊重する |
| `action` | string | 【行動】の内容 |
| `trait` | string | 【特徴】の内容 |
| `health` | string | 【健康】の内容 |
| `relationship` | string | 【人間関係】の内容 |
| `career` | string | 【職業】の内容 |
| `color` | string | 【ラッキーカラー】の内容 |
| `mood` | string | カード画像を選定・生成する際に使った「画像の雰囲気」の説明文。**画面には表示しない**、画像制作用の内部データ |
| `hasImage` | boolean | `moon_card_images/card_XX.jpg` が存在するか |
| `phase_icon` | string \| null | その夜の実際の月相を表す絵文字（🌑〜🌘）。参照テーブルに基づく |
| `element` | string \| null | 元素。`🌬`=風／`🌊`=水／`🌍`=地／`🔥`=火 |
| `kami` | string \| null | 対応する神様（例：`"Kū神"`）。無ければ `null` |

## データの完成度（v1時点）

| 範囲 | 状態 |
|---|---|
| 1〜20夜 | 全フィールド完成（画像含む） |
| 21〜30夜 | `name_en` / `kana` / `phase_icon` / `element` / `kami` のみ。`action`以下の6項目と `hasImage` は未着手（`false` / 空） |

`action` が空（falsy）であることを、アプリ側は「詳細データ未着手」の判定条件として使用している（`SCREEN_SPEC.md` 参照）。

## データの正しさの優先順位

複数のソースが存在した経緯があるため、矛盾が起きた場合は以下の優先順位で判断する。

1. **実際のPowerPointスライド**（Goh様によるスクリーンショット・文字起こし）＝最終権威
2. Goh様が直接確認・修正したエクセル（ハワイアンムーン_1-20.xlsx 最新版）
3. AIによる要約・言い換え（過去に発生した劣化の原因。`DATA_AUDIT.md` 参照）

## 画像アセットとの対応

- ファイル名は `card_XX.jpg`（`XX` は2桁ゼロ埋めの `day`）
- 配置場所は `assets/moon_card_images/`
- 命名・配置ともに、既存の月相アイコン用フォルダ（`moon_01.png`〜`moon_30.png`）と衝突しないよう意図的に分離している（`DECISIONS.md` 参照）
