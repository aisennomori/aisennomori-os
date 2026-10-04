// Gate A：2026回帰＋2027正式Hilo/Muku＋正式Mauli照合（開発・検証専用。利用者向けUIには出さない）
// 実行：node products/moon-tools/engine/qa/gate_a.js
'use strict';
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const ROOT = path.resolve(__dirname, '..', '..');           // products/moon-tools
const ENGINE_FILE = path.join(ROOT, 'engine', 'hawaiian_calendar_engine.js');
const TD = path.join(ROOT, 'engine', 'testdata');
const BEGIN = '/* ===== HAWAIIAN_CALENDAR_ENGINE BEGIN', END = '/* ===== HAWAIIAN_CALENDAR_ENGINE END ===== */';

function engineBlock(text){ const a = text.indexOf(BEGIN), b = text.indexOf(END); if (a < 0 || b < 0) return null; return text.slice(a, b + END.length); }
function loadEngine(text){ return new Function(engineBlock(text) + '\nreturn HawaiianCalendar;')(); }
const canonical = fs.readFileSync(ENGINE_FILE, 'utf8');
const ABEGIN = '/* ===== HAWAIIAN_CALENDAR_ADAPTER BEGIN', AEND = '/* ===== HAWAIIAN_CALENDAR_ADAPTER END ===== */';
const adapterCanon = fs.readFileSync(path.join(ROOT, 'engine', 'app_adapter.js'), 'utf8');
function adapterBlock(text){ const a = text.indexOf(ABEGIN), b = text.indexOf(AEND); return (a < 0 || b < 0) ? null : text.slice(a, b + AEND.length); }
const HC = loadEngine(canonical);
const sha = s => crypto.createHash('sha256').update(s, 'utf8').digest('hex');
const DAY = HC.DAY, P = HC.parse, Y = HC.ymd;
const J = f => JSON.parse(fs.readFileSync(path.join(TD, f), 'utf8'));

let pass = 0, fail = 0; const failures = [];
function check(name, ok, detail){ ok ? pass++ : (fail++, failures.push(name)); console.log((ok ? 'PASS ' : 'FAIL ') + name + (detail ? '  — ' + detail : '')); }

// 0. 埋め込みブロックが正本と同一か
const embedTargets = (process.env.EMBED_TARGETS || 'mauli_tool.html').split(',').filter(Boolean);
for (const f of embedTargets){
  const t = fs.readFileSync(path.join(ROOT, f), 'utf8');
  check(`0 埋め込みエンジン一致: ${f}`, engineBlock(t) === engineBlock(canonical), 'sha256 ' + sha(engineBlock(canonical)).slice(0, 12));
  if (t.indexOf(ABEGIN) >= 0) check(`0b 埋め込み接続コード一致: ${f}`, adapterBlock(t) === adapterBlock(adapterCanon), 'sha256 ' + sha(adapterBlock(adapterCanon)).slice(0, 12));
}

const H = J('official_hilo_2027.json').hilo2027, M = J('official_muku_2027.json').muku2027;
const OM = J('official_mauli_2027_2028.json').months, C26 = J('confirmed_2026.json').cycles;

// 1. 正式Hilo 13/13（エンジンが2027年にHiloを置く日の集合と完全一致するか）
const y27 = HC.cyclesOfYear(2027);
const engH = y27.map(c => c.id);
check('1 2027正式Hilo 13/13', JSON.stringify(engH) === JSON.stringify(H), `engine ${engH.length}件 / 一致 ${H.filter(h => engH.includes(h)).length}/13`);
// 2. 正式Muku 13/13（2026-12周期〜2027-11周期のMuku）
const engM = HC.cycles(P('2026-12-01'), P('2027-12-27')).filter(c => c.mukuMs >= P('2027-01-01') && c.mukuMs <= P('2027-12-31')).map(c => Y(c.mukuMs));
check('2 2027正式Muku 13/13', JSON.stringify(engM) === JSON.stringify(M), `一致 ${M.filter(m => engM.includes(m)).length}/13`);
// 3. Muku翌日＝Hilo 13/13（正式値どうし・エンジン値どうしの両方）
check('3 Muku翌日=Hilo 13/13（正式値）', M.every((m, i) => Y(P(m) + DAY) === H[i]));
const all = HC.cycles(P('2026-01-01'), P('2031-12-31'));
check('3b Muku翌日=Hilo（エンジン 2026-2031 全周期）', all.every((c, i) => i === 0 || c.hiloMs === all[i - 1].mukuMs + DAY), all.length + '周期');
// 4. 正式Mauli（2027年1〜11月）との矛盾0
let contra = [];
for (const [m, v] of Object.entries(OM)){
  if (!m.startsWith('2027') || v === 'UNPUBLISHED') continue;
  const inMonth = all.filter(c => c.hasMauli && Y(c.mauliMs).slice(0, 7) === m).map(c => Y(c.mauliMs));
  const got = inMonth[0] || null;
  if (inMonth.length > 1 || got !== v) contra.push(`${m}: 正式 ${v} / エンジン ${inMonth.join(',') || 'なし'}`);
}
check('4 2027正式Mauliとの矛盾 0', contra.length === 0, contra.join(' ; '));
// 5. 2026既存確定値（2026-03〜2026-11）の無回帰＋訂正後2026-12
const engBy = Object.fromEntries(all.map(c => [c.id, c]));
const reg = [];
for (const [k, v] of Object.entries(C26)){
  const c = engBy[v.hilo];
  if (!c || Y(c.mukuMs) !== v.muku || c.hasMauli !== v.hasMauli) reg.push(`${k}: 確定 ${v.hilo}〜${v.muku} Mauli${v.hasMauli} / エンジン ${c ? Y(c.hiloMs) + '〜' + Y(c.mukuMs) + ' Mauli' + c.hasMauli : '該当周期なし'}`);
}
check('5 2026確定値（訂正後）10/10', reg.length === 0, reg.join(' ; '));
const c12 = HC.cycleAt(P('2026-12-20'));
check('5b 訂正2026-12周期：12/10 Hilo・1/7 Muku・Mauliなし・1/8次Hilo',
  Y(c12.hiloMs) === '2026-12-10' && Y(c12.mukuMs) === '2027-01-07' && !c12.hasMauli && Y(HC.adjacent(c12, 1).hiloMs) === '2027-01-08');
// 6. 2027-03 境界ケース（新月 HST 2027-04-06 13:51 → Muku 4/6, Hilo 4/7）
const c3 = HC.cycleAt(P('2027-03-20')), hst = new Date(c3.newMoonUT - 10 * 3600 * 1000);
check('6 2027-03境界：新月HST 4/6 13:51 → Muku 4/6・Hilo 4/7',
  Y(c3.mukuMs) === '2027-04-06' && Y(HC.adjacent(c3, 1).hiloMs) === '2027-04-07' && hst.toISOString().slice(0, 16) === '2027-04-06T13:51',
  '新月HST ' + hst.toISOString().slice(0, 16).replace('T', ' '));
// 7. 同一暦月2周期（2027-10 / 2027-10b）
const oct = y27.filter(c => c.id.startsWith('2027-10'));
check('7 同一暦月2周期を保持（10/1・10/30）', oct.length === 2 && oct[0].label === '2027-10' && oct[1].label === '2027-10b'
  && HC.cycleAt(P('2027-10-15')).id === '2027-10-01' && HC.cycleAt(P('2027-10-30')).id === '2027-10-30', oct.map(c => c.label + ':' + c.id).join(' '));
// 8. 重点日付の夜番号（Muku=30 / Hilo=1）
const pairs = [['2027-01-07','2027-01-08'],['2027-04-06','2027-04-07'],['2027-08-02','2027-08-03'],['2027-08-31','2027-09-01'],
               ['2027-09-30','2027-10-01'],['2027-10-29','2027-10-30'],['2027-12-27','2027-12-28']];
const bad8 = pairs.filter(([m, h]) => HC.nightAt(P(m)) !== 30 || HC.nightAt(P(h)) !== 1);
check('8 重点日付 Muku→30夜 / Hilo→1夜', bad8.length === 0, bad8.map(p => p.join('→')).join(' '));
check('8b 2027-01-07 は Muku（30）であり Mauli（29）ではない', HC.nightAt(P('2027-01-07')) === 30 && HC.nightAt(P('2027-01-06')) === 28);
// 9. 周期探索の欠落なし（1900-2100の全日が周期に属し、夜番号が取れる）・29/30夜のみ
let gaps = 0, badLen = 0, n = 0;
const span = HC.cycles(P('1900-01-01'), P('2100-12-31'));
span.forEach(c => { if (c.nights !== 29 && c.nights !== 30) badLen++; });
for (let t = P('1900-01-01'); t <= P('2100-12-31'); t += DAY){ n++; const c = HC.cycleAt(t); if (!c || HC.nightNumber(c, t) === null) gaps++; }
check('9 1900-2100 全日で周期・夜番号が取得できる（欠落0）', gaps === 0, `${n}日中 欠落${gaps}`);
check('9b 全周期が29夜または30夜', badLen === 0, span.length + '周期');
check('9c 2027-08-03〜08-31・2027-10-01〜10-29 に欠落なし',
  ['2027-08-03','2027-08-31','2027-10-01','2027-10-29'].every(d => HC.nightAt(P(d)) !== null));
// 10. 夜番号の連続性（各周期で 1..28 →（29）→ 30）
let seqBad = 0;
HC.cycles(P('2026-01-01'), P('2030-12-31')).forEach(c => {
  const seq = []; for (let t = c.hiloMs; t <= c.mukuMs; t += DAY) seq.push(HC.nightNumber(c, t));
  const exp = []; for (let i = 1; i <= 28; i++) exp.push(i); if (c.hasMauli) exp.push(29); exp.push(30);
  if (JSON.stringify(seq) !== JSON.stringify(exp)) seqBad++;
});
check('10 夜番号の並び（1〜28、Mauliありは29、Mukuは30）', seqBad === 0);
// 11. 前後移動（周期順）の往復整合
let navBad = 0; const nav = HC.cycles(P('2026-01-01'), P('2030-12-31'));
nav.slice(1, -1).forEach(c => { const nx = HC.adjacent(c, 1), pv = HC.adjacent(c, -1); if (HC.adjacent(nx, -1).id !== c.id || HC.adjacent(pv, 1).id !== c.id) navBad++; });
check('11 前後周期への移動が往復で一致（2026-2030）', navBad === 0);

// 参考（開発専用の二重計算）：旧ロジック（10/1起点のmauli_tool、JST日付）との差分
try {
  const { execSync } = require('child_process');
  const old = execSync('git show baseline-before-engine:products/moon-tools/mauli_tool.html', { cwd: ROOT, encoding: 'utf8' });
  const a = old.indexOf('const D=86400000;'), b = old.indexOf('function fmtYMD(ms){');
  const OLD = new Function(old.slice(a, b) + '\nreturn {getKariCycles};')();
  console.log('\n[参考] 旧ロジック(JST日付)と新エンジン(UTC_DATE)の差（2026-2028、Hiloが異なる周期）');
  for (const y of [2026, 2027, 2028]){
    const o = OLD.getKariCycles(y), nn = HC.cyclesOfYear(y);
    nn.forEach(c => {
      const oc = o.find(x => Math.abs(x.hiloMs - c.hiloMs) <= 2 * DAY);
      if (!oc || oc.hiloMs !== c.hiloMs || oc.mukuMs !== c.mukuMs){
        const nm = new Date(c.newMoonUT);
        console.log(`  ${c.label}: 旧 ${oc ? Y(oc.hiloMs) + '〜' + Y(oc.mukuMs) : '—'} / 新 ${Y(c.hiloMs)}〜${Y(c.mukuMs)}  閉じる新月 UTC ${nm.toISOString().slice(0,16)} JST ${new Date(c.newMoonUT + 9*3600e3).toISOString().slice(0,16)} HST ${new Date(c.newMoonUT - 10*3600e3).toISOString().slice(0,16)}`);
      }
    });
  }
} catch (e) { console.log('[参考] 旧ロジック比較はスキップ: ' + e.message.split('\n')[0]); }

console.log(`\nGate A: ${pass} PASS / ${fail} FAIL` + (fail ? '  → STOP: ' + failures.join(', ') : ''));
console.log('engine sha256: ' + sha(engineBlock(canonical)));
process.exit(fail ? 1 : 0);
