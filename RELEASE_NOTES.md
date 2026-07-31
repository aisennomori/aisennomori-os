# RELEASE_NOTES.md

────────────────────────
# ドキュメント情報

Document Type: Release Notes
Status: Released
Edition: 1
Version: 1.0

────────────────────────
# 1. Release Information

- **Version**: 1.0
- **Release Date**: 2026-07-31
- **Status**: Released

────────────────────────
# 2. Overview

Version 1.0では、月読みツール集（Hawaiian Moon Tools）を中心としたアプリ群の実装・バグ修正・データ整備を完了し、あわせて愛泉の杜OS全体で共通運用するDocumentation Standard（PURPOSE / APP_REGISTRY / DECISIONS / DATA_AUDIT / QUALITY_ASSURANCE）を確立した。

技術的な正確性の検証（天文計算の裏付け）、200名分の実データ検証、複数アプリを横断するUI標準化（戻り導線・画像保存機能）、そしてAIを役割ごとに分担する品質保証プロセスの実運用まで完了し、Release Auditを経て本Versionの公開に至った。

────────────────────────
# 3. Major Deliverables

## アプリケーション

- **MoonCard（moon_card_gallery.html）**：全30夜分のデータ・雰囲気画像を実装。著名人データ（200名分）を統合。画像保存・印刷機能、陰陽相性バッジを実装
- **月読みツール集の橋渡し**：`moon_tools.html`（トップメニュー）に全11ツールを掲載し、各ツールに統一された「戻る」導線を実装
- **birthday_moon_lookup.html**：夜番号算出ロジックの不具合を修正（月境界をまたぐ際にサイクルを取りこぼすバグ）。130年分の全日付で欠落ゼロを確認
- **moon_calendar.html／cycle_tracker.html**：週の始まりを日曜始まりから月曜始まりへ変更
- **moon_age_calendar.html（新規）**：ハワイ暦とは独立した、新月・満月・輝面比（%）専用の月齢カレンダーを新設。年月ジャンプ機能を実装
- **symptom_mind_map.html**：病気・症状の部分一致検索機能を追加
- **マナカード一覧（manacard.html）**：カード画像49枚の統合、クリックによる拡大表示（ライトボックス）を実装

## Documentation Standard（OS Root）

- **APP_REGISTRY.md**：論理名と物理パスの対応表を運用開始
- **DECISIONS.md**：アプリ単位（MoonCard）およびOS-root単位の設計判断記録を開始
- **DATA_AUDIT.md**：複数アプリにまたがる調査・分析記録（OS-root）を開始
- **QUALITY_ASSURANCE.md**：品質保証プロセスを標準化し、Version 1.0として確定
- **AI役割分担**：Soul（ChatGPT）／ChatGPT Work／Claude Code／プロダクトオーナーの4者による役割分担を明文化
- **Version管理ルール**：メジャーバージョンの更新条件、Documentation StandardのVersionとの分離を明文化

────────────────────────
# 4. Quality Assurance

Version 1.0は、`QUALITY_ASSURANCE.md`が定める以下のプロセスに準拠してリリースされた。

```text
Content Audit（ChatGPT Work）
     ↓
AI Safety Audit / Architecture Audit（ChatGPT／Soul）
     ↓
Release Audit（Claude Code）
     ↓
Product Owner Acceptance（プロダクトオーナー）
```

Release Audit（Claude Code）による技術監査の結果、致命的な技術的不備（構文エラー・機密情報漏洩等）は検出されず、判定は**CAUTION**であった。CAUTION項目はプロダクトオーナーが確認済みであり、`QUALITY_ASSURANCE.md`が定めるRelease条件（CAUTION項目の確認完了）を満たしたことを確認の上、本Versionを公開した。

────────────────────────
# 5. Known Limitations

Version 1.0では、以下は意図的に対応を見送っている。

- **`ai_niyori.html`・`pule.html`のパスワード方式**：クライアント側での平文比較のままであり、閲覧制限としての強度は簡易的なものにとどまる
- **`manacard.html`・`symptom_mind_map.html`**：`moon_tools.html`のメニューに未掲載、「戻る」導線も未実装
- **アプリ専用DOCSフォルダ**：MoonAgeCalendar・ManaCard等、MoonCard以外のアプリには、01_Foundation〜03_Operationの個別DOCS一式をまだ作成していない
- **CHANGELOG.md**：初版リリースのため、まだ運用を開始していない
- **マナカード画像のファイル名英数字化**：外部ブログ記事のローカル保存版をそのまま組み込む案は、検討を保留中
- **陰陽相性列のレイアウト変更**：アルファベット直下へのカナ移動、空いた列への説明文追加は、構想段階にとどまり未実装
- **`VALIDATION.md`の独立**：他アプリとの数値照合記録の蓄積が浅いため、独立ドキュメント化は見送り、`DATA_AUDIT.md`内に留めている

これらはVersion 1.1以降のバックログ、または将来の改善検討事項として扱う。

────────────────────────
# 6. Lessons Learned

- **AI役割分担の実運用**：ChatGPT（Soul）・ChatGPT Work・Claude Codeを担当領域で明確に分離し、最終判断をプロダクトオーナーに一元化する体制が、実際のレビューサイクルの中で機能することを確認した
- **監査と実装の分離**：Release Auditにおいて「明確な技術的不備のみを修正し、判断が分かれるものは指摘に留める」という制約を守ることで、設計・文章への意図しない改変を防げた
- **品質保証における判定区分の有効性**：CAUTIONを「リリース不可」ではなく「プロダクトオーナーの判断待ち」として扱うことで、軽微な確認事項がリリースそのものを不必要に止めない運用ができた
- **Documentation Standardの段階的成熟**：必要性が個別アプリの範囲を超えて実際に発生した時点で初めてOS-root文書を新設する、という判断基準が、複数の実例（設計判断の一般化、監査プロセスの標準化）を通じて機能することを確認した
- **天文計算・データ検証の積み重ね**：新月・満月の算出ロジックは、外部の天文データ（Six Millennium Catalog of Phases of the Moon）との照合や、実在の歴史上の日付での検算を通じて、精度を実証的に確認しながら育てた

────────────────────────
# 7. Next Step

Version 1.0の次に取り組むのは、Version 1.1の開発ではなく、**Version 1.0を実運用へ展開すること**である。

- 電子書籍出版プロジェクトへの、Documentation Standard・品質保証プロセスの適用
- 愛泉の杜OS内の他プロダクト（こころの泉等）への、同様の運用体制の横展開

Version 1.1に向けた機能追加・改善は、上記の実運用を通じて必要性が確認されたものから、`FUTURE_IDEAS.md`等への記録を経て検討する。

────────────────────────

Version 1.0は初めて実運用した標準版である。今後は実運用を通して改善点を蓄積し、Version管理のもとで継続的に発展させる。

────────────────────────

```text
Approved by:
Product Owner

Release Status:
Released
```

