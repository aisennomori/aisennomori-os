> Documentation Standard: Edition 1 / Version 1.0 (Frozen)　|　Layer: Operation　|　App: MoonCard　|　Status: Approved

# FUTURE_IDEAS.md

思いついたこと、保留にしたこと、まだ判断していないことのストック場所。
実装を約束するものではなく、育てていくアイデアの置き場。

---

## 確定している次のステップ

- **21〜30夜のデータ・画像追加**：Goh様の作業予定として、2週間程度先を目安に着手予定
- **コパイロット作業の精査結果の反映**：`DATA_AUDIT.md` の「未解決・保留中の項目」を参照。画像・内容の差し替えが発生する可能性あり

## 構造・実装まわり

- 30夜分データを `moon_card_gallery.html` から `data/moon_data.json` のような外部ファイルへ分離する（Decision 001の見直し）
- 各夜の記録（利用者が読んだ日・メモ）をローカルまたは `window.storage` を使って保持するジャーナル機能
- 特定の夜を直接開けるシェアリンク（例：`?day=14`）

## 体験まわり

- 他の月読みツール（moon_calendar.html、moon_techo.html等）との相互リンク。「今日の月」から該当カードへ直接遷移するなど
- 静かな時間を意識したBGMやアンビエント演出（こころの泉の「静かな時間」機能を参考に検討）

## ドキュメントまわり

- `PURPOSE.md` → `CONSTITUTION.md` → `MANIFEST.md` → `README.md` の4層構成への移行（現状は `CONSTITUTION.md` 未整備）
- Documentation Standard v1.0 を、ManaCard・SoulReading・Healingなど今後のアプリへ実際に適用し、v1.1として改善点を反映する

## 未判断・保留

- 21〜30夜のデータが揃った後、30夜全体を通した「まとめ読み」ビュー（一覧性）を別途用意するかどうか
- 多言語対応（英語版）の要否
