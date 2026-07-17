> Documentation Standard: Edition 1 / Version 1.0 (Frozen)　|　Layer: Operation　|　App: MoonCard　|　Status: Approved

# CHANGELOG.md

月読みカードの更新履歴。日付ではなく、開発の節目（リリース単位）で記録する。
各エントリの詳細な経緯・判断理由は `DECISIONS.md` と `DATA_AUDIT.md` を参照。

---

## v0.1 - 初版リリース

- 月読みツール集に新ツール「月読みカードギャラリー」を追加
- 1〜10夜分のデータ・画像を実装
- スワイプ／矢印ボタン／キーボードでの前後移動を実装
- `moon_tools.html`（ツール集トップページ）にカードを追加

## v0.2 - 11〜20夜の追加

- 11〜20夜分の画像・データを追加
- 画像フォルダを `moon_card_images/` として独立させ、既存アセットとの衝突を回避（Decision 002）

## v0.3 - レイアウト刷新

- 縦長1カラムのレイアウトから、コンパクトな2列パズルタイルへ変更（Decision 003）
- 画像をヘッダー右上の小さなサムネイルに変更

## v0.4 - 元素・神様・カナ情報の追加

- 各夜に元素（風・水・地・火）と対応する神様タグを追加
- カナ読みを追加
- ハワイ語表記をマクロン・オキナ付きの正式表記に統一
- トップバーの月齢アイコンを、実際の月相絵文字に変更（Decision 004）

## v0.5 - 11〜20夜のデータ整合性修正

- 11〜20夜の並び順の誤りを修正（Audit 001）
- 20日目のフィールドずれを修正（Audit 002）
- 画像ファイルを、夜の名前を基準に再配置

## v0.6 - サブタイトルの完全反映

- 1〜10夜の反映漏れを解消（Audit 003）
- 全夜（1〜20）で①②2つのサブタイトルを両方表示するよう `meaning` フィールドを拡張（Decision 005）

## Docs v1.0 - Documentation Standard の策定

- 愛泉の杜OS全体の理念を定義する `PURPOSE.md` を新設（OS直下）
- 月読みカードの存在理由を定義する `MANIFEST.md` を新設
- `DOCS/` 一式を Foundation / Architecture / Operation の3層構造に整理（Decision 008）
- 愛泉の杜 Documentation Standard v1.0（`DOC_STANDARD.md`）を策定し、OS直下へ配置
- MoonCardを、Documentation Standard v1.0 の Reference Implementation と位置付け

## Docs v1.0 - Documentation Standard の正式採用（Freeze）

- 愛泉の杜 Documentation Standard Edition 1 / Version 1.0 を正式採用（Freeze）
- Design Principle（「ドキュメントは一度書き、何度も活用する」）を `DOC_STANDARD.md` に明文化
- 全ドキュメントのStatusを `Approved` に更新（内容確定。実リポジトリへの反映は別途）
- `AI_INDEX.md` を汎用AI向けの表現に統一（特定のAI製品名を書かない方針とした）
- **反映状況**：本エントリまでの内容一式は、まだ実際のリポジトリには反映されていない（Draft運用中）。反映が完了次第、このCHANGELOGに追記する。

## Docs v1.0 追補 - 論理構造と物理構造の分離

- `APP_REGISTRY.md`（OS直下）を新設。論理名（MoonCard）と物理パス（`products/moon-tools/`）の対応を一元管理
- `DOC_STANDARD.md` に「論理構造と物理構造の分離」の節を追加（DEC-011）
- 各DOCS内の相対パスを、実際の物理配置（`products/moon-tools/DOCS/MoonCard/`）に合わせて修正
- **反映状況**：引き続きDraft運用中。実際のリポジトリへの反映はこれから

