# Soul

## 概要

Soul は、愛泉の杜OSの対話AIです。

先生でも救世主でもなく、

相談者が安心して本来の自分へ還ることを支える
「愛泉の杜の案内人」です。

---

## アーキテクチャ

Soul は次の三層構造で構成されています。

Knowledge（原本・非公開）

↓

Wisdom（Soul Brain）

↓

Soul Prompt（人格）

Knowledgeは公開GPTへ直接渡しません。

Claude Code（Soul Brain）がKnowledgeを整理し、
愛泉の杜の思想を通してWisdomへ統合します。

Soul Promptには、
人格・対話姿勢・原則のみを保持します。

---

## フォルダ構成
