# CHANGELOG

## v1.3

### Added

- Purpose Check追加
- Growth Philosophy追加
- Self Understanding整理
- 三層構造対応

### Changed

- WisdomをSoul Promptから分離
- Knowledge → Wisdom → Soul構造へ変更
- 型固有の例文をPromptから削除

### Architecture

Knowledge

↓

Wisdom（Soul Brain）

↓

Soul Prompt

### Status

正式採用

Sprint001 完了

Sprint002（依存型）完了

---

## BRAIN強化（Emotion / Thinking / Decision Tree）

### Added

- Emotionに身体感覚・言葉になる前の体験への理解を追加
- Thinkingに「理解の6層」を追加
- Decision Treeに「深掘り可否の判断」を追加

### Note

- 瑠璃講座のAIカウンセラープロンプトとの設計照合を実施
- 新規Engine追加ではなく既存3Engine（Emotion / Thinking / Decision Tree）の強化を選択
- 「深掘りできるから深掘りするのではなく、今必要な深さに留まる」という愛泉の杜OSの原則を維持
- Knowledge → Wisdom → Soulの既存構造を維持

### 反映：こころの泉

- kokoro_izumi.htmlのSYSTEM_PROMPTへ最小変更で統合（3箇所）
  - 「深く聴く姿勢」：言葉になる前の感覚も受け止める旨を追記
  - 「深く聴く流れ」ステップ3：身体感覚を要素に追加、一度に扱わない旨を追記
  - 「深く聴く流れ」直後：「深く聴く深さについて」を新設（深掘り可否の判断・身体感覚の扱い方）
- 既存の6ステップ構造・9タイプ防衛・INNER PATH・世界観・JSON出力形式は変更なし

### 実対話テスト

- 5ケース（傾聴／整理／身体感覚／自己理解／助言要求）すべて合格
- テスト中に発生したフォールバック応答（「すみません、うまく受け取れませんでした」）は、再テストで再現せず、API／クレジット側の一時的な問題と判断。SYSTEM_PROMPT変更による不具合とは現時点で判断しない

### 反映：チャッピー

- Instructions（`products/chappy/instructions_published.md`）のSELF UNDERSTANDINGへ最小変更で統合（1箇所）
  - 視点リストに「身体感覚」を追加
  - 「言葉になる前の感覚も、大切な体験として受け止めてください。」を追加
- Decision Tree由来の追加は見送り（FIRST PRINCIPLE／DIALOGUE PRINCIPLES／RESPONSE FLOWに思想が既に実装済みと判断）
- Thinking Engineの6層構造・身体感覚への具体的な問いかけ・深掘り可否の独立セクションは追加せず、既存の短文構成と役割（日常の伴走者・長距離伴走）を維持
- リポジトリでの控え保存として`products/chappy/`（README.md／instructions_published.md）を新設。ChatGPTのGPT編集画面を稼働の場、`instructions_published.md`をリポジトリ管理上の正式なInstructionsと位置づける運用ルールを明記

### 実対話テスト（チャッピー）

- 5ケースすべて合格
- 確認できた点：日常会話を無理に相談化していない／言葉にならない感覚を急いで分析していない／身体感覚の意味を決めつけていない／「昔から」という表現から勝手に幼少期やINNER PATHへ進んでいない／本人から幼少期への関心が示された場合も、原因を決めつけず本人の意思を確認してから入口を提示している／こころの泉とチャッピーの役割の違いが維持されている
- 要観察事項：身体感覚への問いかけが今後の実対話で頻出しないか継続して確認する。現時点ではInstructionsの修正は不要と判断

---

## Context Check（文脈の確認）

### Added

- BRAIN（`decision-tree.md`）へ「Context Check（文脈の確認）」「感情や身体感覚が『わからない』」の2セクションを追加
- 深く進む前に、今の相談を理解するための文脈が十分かを確認し、不足時は欠けている一点だけを自然に確認する判断原則
- 「わからない」への応答として、そのまま留まる／別の角度から見る／現在の状況や関係性に戻る、という選択肢を明記
- 年齢・家族構成等のプロフィール収集や、相談者の属性分類を目的としないことを明記。安心・Purpose Checkより優先しない

### 反映：こころの泉

- 「深く聴く深さについて」へ最小変更で統合。Context Check本体の追記と、「よく分からない」後の選択肢（留まる／別角度／現在の状況や関係性へ戻る）を追加
- 実対話テスト5ケース（①幼少期＋感情不明／②整理／③夫との関係／④嫌われる怖さ／⑤傾聴希望）実施、合格
- 確認できた点：必要な場面のみContext Checkが働く／「わからない」を無理に深掘りしない／不要な質問を増やさない／Purpose Checkを妨げない
- ④で見られたSoulの解釈・構造化の先行傾向は、Context Checkとは別課題として`DOCS/FUTURE_IDEAS.md`へ記録し、今回の改修対象からは切り分けた

### 反映：チャッピー

- 反映不要と判断。理由：日常の伴走者であり深く進む場面自体が限定されている／FIRST PRINCIPLE等ですでに深掘りを抑制している／「言葉になる前の感覚」への対応も実装済みで、追加は既存Instructionsとの重複・冗長化につながるため

### 反映：Soul Prompt正式版

- 「Purpose Check」直後へ「Context Check（深く理解しようとする前に）」を新設。三層構造の原則に沿い、こころの泉の詳細実装はそのまま移植せず、汎用原則へ圧縮
- Purpose Check（相談者が今何を求めているか）とContext Check（Soulが今の相談を理解する文脈を十分に持っているか）の役割の違いを明記し、混同を回避
- ChatGPT上で①・②・⑤の3ケースを実対話テスト、合格
- 確認できた点：必要な場面だけContext Checkが働く／「わからない」を無理に深掘りしない／不要な質問を増やさない／Purpose Checkを邪魔しない
- ①②で見られた解釈・意味づけの先行傾向は、こころの泉のケースと同じくContext Checkとは別課題と判断し、今回の改修対象からは切り分けた

---

## Foundation Wisdom（人生の流れ・リフレーミング）

### 背景

- アドラー流メンタルトレーナーテキスト・HSPカウンセラー講座テキスト・宇宙の法則について共有された分析結果、および既存の瑠璃講座関連資産をもとに、当初8つのFoundation Wisdom候補（自己理解／感情と感受性／勇気づけ／人間関係／リフレーミング／自己決定／成長と行動／人生の流れ）を検討
- 既存BRAIN・Soul Prompt・CONSTITUTION・RURI-006との照合の結果、8個をそのまま新設する方針は不採用。「本当に不足している智慧は何か」という観点で再整理
- 勇気づけ・自己決定・成長と行動は、Soul Prompt「対話の流れ」8ステップおよびCONSTITUTIONで既に十分と判断し追加せず
- 自己理解・感情と感受性は、Thinking Engine・Emotion Engine・9タイプWisdomで既に十分扱われていると判断し、新規Foundationは作らず既存Engineの最小強化で対応
- 人間関係は独立Foundationとはせず、Thinking Engine層④の軽微な拡張で対応
- 人生の流れ・リフレーミングのみ、新規Wisdomとしての価値ありと判断

### Added（新規Wisdom）

- `BRAIN/wisdom/foundations/life_flow.md`を新規作成。人生には流れ・変化・手放しの時期があるという視点を、事実として断定せず、必要な時だけ差し出せる智慧として整理
- `BRAIN/wisdom/reframing.md`を新規作成。型に依存しない汎用のリフレーミング智慧を整理。`dependency.md`の型固有リフレーミングとは役割分担（汎用 vs 型固有）
- `reframing.md`のPurposeは、実際に参照した情報源（分析結果として共有された価値・注意点、既存の`dependency.md`）に即して記載。瑠璃講座原本（`KNOWLEDGE/RURI/06-reframing.md`）は未作成のため、原本の要約という表記は行わず、出典を正確に区別した
- `KNOWLEDGE/RURI/INDEX.md`のRURI-006は、原本が未作成のため「未作成」のまま維持

### Added（既存Engine強化）

- `BRAIN/thinking-engine.md`層④「背景・つながり」へ、人間関係を一つの視点として見る旨を追記（すべてを人間関係の問題と決めつけない、という制約付き）
- `BRAIN/thinking-engine.md`層⑥「願い・選択」へ、目的論の視点を追記。「Soul内部の視点にとどめる」「本人より先に目的を言い当てない」「本人が自分の言葉で気づいた時だけ受け止める」という制約を、圧縮せずそのまま明記
- `BRAIN/emotion-engine.md`へ「感じ方の個人差」セクションを追加。感受性の強さを弱さや特別な特性と決めつけない、すべての悩みを感受性に結びつけない、という原則を明記
- 上記2ファイルの新設に伴い、`BRAIN/wisdom/*.md`というワイルドカード表記が`foundations/`サブフォルダと一致しなくなったため、`products/soul/prompts/soul_prompt_v1.3.md`・`products/soul/OPERATIONS.md`・`META/PROJECT_STATUS.md`の該当箇所を、glob表記から「`BRAIN/wisdom/`配下のWisdomファイル（サブフォルダを含む）」という自然言語表記に修正

### 影響範囲調査

- こころの泉・チャッピー・Soul Prompt正式版それぞれについて、5項目（人間関係・目的論・感じ方の個人差・reframing・life_flow）ごとに反映要否を個別に検討
- 特に目的論は、`DOCS/FUTURE_IDEAS.md`に記録済みの「Soulが本人より先に解釈・構造化しすぎる傾向」との関連を重視し、プロダクトごとに慎重度合いを変えて判断

### 反映：こころの泉

- 「深く聴く深さについて」のContext Check段落へ、人間関係の視点・目的論の視点を追加
- 身体感覚の段落へ、感じ方の個人差を追加
- 「深く聴く流れ」ステップ4「統合する」へ、reframingの慎重な運用原則（本人がまだそう思えていない段階で先に意味づけしない）を追加
- 「自然をたとえに使うとき」へ、life_flowの視点（人生の流れも一つの視点として使ってよい、事実として断定しない）を追加
- 5項目とも既存セクションへの最小統合とし、新規セクションは追加せず

### 反映：Soul Prompt正式版

- Context Checkへ、人間関係の視点を追加（こころの泉と同趣旨、圧縮版）
- 「コミュニケーションの原則」へ、感じ方の個人差を1行追加
- 「対話の流れ」ステップ6（リフレーミング）へ、life_flowの視点を追加。「必要な場合に限り」という限定を残し、事実断定の否定は既存の「一つの見方として差し出す」と機能的に重複するため含めず
- 目的論・reframingの詳細は反映せず。目的論は「Soulが本人より先に解釈するリスク」を、より広いユーザー層に広げないため。reframingは既存の対話の流れステップ6と「リフレーミングの例」で既に十分と判断

### 反映：チャッピー

- チャッピーは日常の伴走者であり、既存のSELF UNDERSTANDING・NATUREで必要な原則を既に保持している。今回のBRAIN強化内容について個別に反映要否を検討した結果、人間関係・目的論・reframingは役割上不要、感じ方の個人差・life_flowも既存設計で十分に対応可能と判断し、追加反映は行わなかった。「反映可能だから追加する」のではなく、役割上必要な変更だけを行うという三層構造の原則を優先した。

---

## ハワイアンサイエンス資料の分析（Knowledge Intake）

### 背景

- 外部資料として共有されたハワイアンサイエンス関連資料3本（南洋気術・ハワイ文化儀式、HUNA7原則と実践例、明晰夢・トランスパーソナル心理学等）を分析
- ホ・オポノポノ、アウマクア、マナ、自然観、魂、祈り、調和、癒し等の概念について、既存CONSTITUTION・BRAIN・Wisdom・各プロダクトと照合

### 判断

- 新規Wisdom作成なし、BRAIN変更なし、各プロダクトへの反映なし
- ホ・オポノポノ／魂／自然観／調和：こころの泉のINNER PATH・「自然をたとえに使うとき」・life_flow.md等、既存実装で既に十分。むしろ既存の方が資料より慎重な設計だったため追加せず
- 祈り／マナ：既存OSにほぼ存在しないが、資料内容（特定神名への祈祷・チャント、エネルギーワーク）をそのまま取り込むリスクが高く、見送り
- アウマクア（祖霊崇拝）・具体的なヒーリング技法（法螺貝・手印・黒石等）・独自スピリチュアル体系：既存のSafety Engine（治療をしない、事実として断定しない）と矛盾するため取り込まない
- 新月満月の質問集等、比較的中立な内容はKnowledgeとして保管し、必要時のみ参照

### Note

- 「取り込まないという判断」自体を正式な開発プロセスの成果として記録
- この判断プロセスを`products/soul/OPERATIONS.md`の「Sprintの流れ」、`DOCS/DECISIONS.md`のDecision 005として運用ルール化

---

## 運用ドキュメントの一本化（OPERATIONS.md）

### 背景

- CHANGELOG整理と同様の重複が、運用文書（`products/soul/OPERATIONS.md`と`DOCS/project_operation.md`）でも確認された
- 内容比較の結果、`OPERATIONS.md`は他ドキュメント（`products/chappy/README.md`）から実際に機能参照されており、実務上の正本として機能していた
- 一方`project_operation.md`の「Wisdom追加手順」には、Knowledge Intakeで確立した最新ロジック（既存OSとの照合・取り込まない判断・プロダクト個別の反映判断）が先に反映されていた

### 判断

- `OPERATIONS.md`を正式な運用文書として一本化
- `OPERATIONS.md`の「Sprintの流れ」を、`project_operation.md`の最新ロジックを統合した9段階フローへ更新
- `DOCS/project_operation.md`は削除
- `products/soul/CHANGELOG.md`内の`project_operation.md`への参照を`OPERATIONS.md`へ修正

### Note

- ファイルの場所や名称ではなく、実際にどちらが機能し、他から参照されているかを判断基準とした
- 運用ルールの重複管理を防ぐため、「運用ルールの一本化について」を`OPERATIONS.md`へ明記

---

## INNER PATH（必要な時だけ現れる小径）

### Added

- こころの泉：詳細版のINNER PATHを実装
- チャッピー（公開版・開発版）：役割に合わせた圧縮版のINNER PATHを実装

### Note

- soul_prompt_v1.3.md本体には未反映（各プロダクトのプロンプト／Instructionsへ直接実装）
- 共通するSoulの思想は同じだが、機能の深さ・現れ方は各AIの役割に応じて調整する方針を採用