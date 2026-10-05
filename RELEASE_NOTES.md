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

────────────────────────
# Hawaiian Lunar Calendar Engine v1.0.0

- **Component**: Hawaiian Lunar Calendar Engine（月読みツール集・共通暦エンジン）
- **Version**: 1.0.0
- **Status**: Released
- **Release Date**: 2026-10-04
- **公開**: PR #1 を merge commit 方式で main に統合（c8cd0f0）。GitHub Pages 反映後、公開版の Smoke Test 完了
- **Branch**: `calendar-engine-2026-10-04`
- **関連決定**: DECISIONS.md OS-DEC-010〜016

## 変更内容

- **共通暦エンジンを導入**：天文計算から Hilo・Muku・Mauli・夜番号を一本で算出する共通エンジンを導入し、これを暦計算の唯一の正本とした（エンジンは非公開。OS-DEC-017）
- **CONFIRMED補正型から計算型へ移行**：本番経路から CONFIRMED による計算結果の上書き・補正を撤去した。CONFIRMED／正式資料のデータは計算入力ではなく、内部QA用の検証データとして扱う。正式資料由来のデータは公開リポジトリに置かない
- **周期ベース探索へ移行**：カレンダー月（YYYY-MM）を計算上の主キーとせず、日付から周期を直接引く方式とした。1か月に2回Hiloがある月（例：2027年10月）や、旧方式で欠落していた区間（2027年8月・10月）も正しく扱える
- **境界判定（boundaryRule）を採用**：現時点で入手済みの正式確認データ（2026年・2027年 Hilo／Muku／Mauli）をすべて再現する**運用上の採用仕様**を採用した（内容は非公開）。伝統的な日界が特定の時刻であることを確定したものではない。boundaryRule は将来差し替え可能な構造とした
- **2026-12 周期の正式訂正**：2026年12月の CONFIRMED 値を正式資料に基づき訂正した（Hilo 2026-12-10／Muku 2027-01-07／Mauliなし）
- **対象5アプリを共通エンジンへ移行**：`moon_calendar.html`・`cycle_tracker.html`・`moon_cycle.html`・`moon_card_gallery.html`・`moon_techo.html`。暦計算ブロックのみを置き換え、UIは変更していない（moon_techo の ✦ は下記）
- **moon_techo の ✦・ピンク背景を非表示**：v1.0.0公開版では、✦・ピンク背景を表示しない。正式資料由来のデータを公開リポジトリに置かないため（OS-DEC-016）。暦の表示値は常にエンジンの計算結果で、変更はない
- **mauli_tool.html**：Hilo–Muku の日付差判定を 28日（29夜・Mauliなし）／29日（30夜・Mauliあり）に修正し、共通エンジンで周期を算出するよう変更。正式資料は検証データとして照合する運用へ説明文を整理（`moon_tools.html` の紹介文も同趣旨に更新）
- **2029・2030年を Calculated／Predicted として凍結**：共通エンジンのみで生成した 2029年（13周期）・2030年（14周期）の Hilo／Muku／Mauli を、生成日時・engine version・commit・data hash とともに凍結した（凍結データは非公開で保管）。将来の正式資料との out-of-sample 検証に用いるため、予測ファイル自体は今後も書き換えない

## 検証結果

- Gate A（エンジン単体・正式確認データ照合）：28/28 PASS
- Gate B（2028年計算値と2028年正式Mauliの照合）：12/12 一致。ただし boundaryRule 選定時に2028年正式Mauliを参照済みのため、これは**事後再現・実装整合性の確認**であり、未知データへの予測成功ではない
- 対象5アプリ回帰QA：30/30 PASS（2026〜2030年の全対象日でエンジンと一致、UIピクセル比較を含む）
- moon_techo 固有QA：20/20 PASS（公開版で ✦・ピンク背景が0件であること、暦がエンジンの計算結果のままであることを含む）
- Gate A・Gate B・moon_techo固有QAの正式資料との照合は、非公開の検証データを使って内部で実施

## Deferred（意図的な段階分離）

- **Birthday Moon系**：`moon_reading.html`・`birthday_moon_calendar.html`・`birthday_moon_lookup.html` は今回変更していない（`moon_practice.html` も同様）。共通エンジンとの間で夜番号に差異が生じ得ることを Known Issue とし、過去の正式ハワイ暦によるバックテスト（Phase 2：Historical Backtesting / Birthday Moon）を経てから統合する

────────────────────────

────────────────────────
# Hawaiian Lunar Calendar Engine v1.1.0（通常更新）

- **Version**: 1.1.0
- **Date**: 2026-10-05
- **関連決定**: DECISIONS.md OS-DEC-017・OS-DEC-018

## 変更内容

- **公開版を共通周期データ方式へ変更**：公開アプリには、非公開エンジンで生成した1500〜2100年の共通周期データと検索・表示の処理だけを置き、暦の算出ロジックを公開側から外した。エンジン原本・QA・計算済みデータは公開リポジトリから外した。年次更新は不要
- **ΔTの年代式を補完（engine v1.1.0）**：1860年より前の補正式を補った。1860〜2100年の周期はv1.0.0と同一
- **Birthday Moonを共通基準へ統一**：moon_reading・birthday_moon_calendar・birthday_moon_lookup・birthday_profile を、ほかの月関連アプリと同じ共通周期データに統一し、旧方式を廃止した（旧方式とは約4割の日付で夜番号が1つ変わる）。v1.0.0のDeferred（Birthday Moon系）はこれで解消
- **MoonCardの著名人**：200名を共通基準の夜に所属させた（75名を移動。人数の調整はしない）
- **入力範囲**：Birthday Moonは1500年〜今日（未来日不可。1500〜1899年は歴史年代・参考利用として注意を表示、1499年以前は対象外）。通常の月関連アプリは今年1月〜2100年12月。Mauli検証ツールは1500〜2100年
- **moon_practice.html**：使われていなかった旧計算コードを削除

