// 正式確認データ（testdata）から「正式確認済み周期」一覧を生成し、検証モジュール official_verification.js を出力する。
// 一覧は表示（✦）専用。暦の計算には使わない。実行：node engine/qa/build_verification.js
'use strict';
const fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'..'), TD=path.join(ROOT,'testdata');
const J=f=>JSON.parse(fs.readFileSync(path.join(TD,f),'utf8'));
const DAY=864e5, P=s=>Date.parse(s+'T00:00:00Z');
const list=[];
for(const v of Object.values(J('confirmed_2026.json').cycles)) list.push({hilo:v.hilo,muku:v.muku,hasMauli:v.hasMauli,src:'2026確定値（2026-12は10/4訂正）'});
const H=J('official_hilo_2027.json').hilo2027, M=J('official_muku_2027.json').muku2027;
// 2027年：Hilo(i) と 次周期の直前のMuku(i+1) が両方とも正式値の周期だけ（2027-12周期はMuku未提供のため対象外）
for(let i=0;i+1<M.length;i++){ const hilo=H[i], muku=M[i+1]; const nights=(P(muku)-P(hilo))/DAY+1; list.push({hilo,muku,hasMauli:nights===30,src:'2027正式Hilo・正式Muku'}); }
const seen=new Set(); const out=list.filter(c=>!seen.has(c.hilo)&&seen.add(c.hilo)).sort((a,b)=>a.hilo<b.hilo?-1:1);
const data=out.map(c=>`    { hilo:'${c.hilo}', muku:'${c.muku}', hasMauli:${c.hasMauli} },  // ${c.src}`).join('\n');
const js=`/* ===== HAWAIIAN_CALENDAR_VERIFICATION BEGIN v1.0.0 ===== */
// 正式確認表示（✦・ピンク背景）専用の検証モジュール。正本：products/moon-tools/engine/official_verification.js
// engine/qa/build_verification.js が engine/testdata から生成する（手で編集しない）。
// ・暦の値（Hilo / Muku / Mauli / 夜番号）は常に共通暦エンジンの計算結果を使う。
// ・この一覧は計算結果を上書きしない。計算結果が正式確認値と完全一致した周期にだけ「正式確認済み」表示を付ける。
// ・正式確認値と計算結果が食い違う周期は表示を付けず、コンソールに QA 不一致として記録する。
var OFFICIAL_VERIFIED_CYCLES = [
${data}
];
function isOfficiallyVerified(cycle){
  if(!cycle) return false;
  var ymd=HawaiianCalendar.ymd, h=ymd(cycle.hiloMs), m=ymd(cycle.mukuMs);
  for(var i=0;i<OFFICIAL_VERIFIED_CYCLES.length;i++){
    var o=OFFICIAL_VERIFIED_CYCLES[i];
    var overlap = o.hilo<=m && o.muku>=h;
    if(!overlap) continue;
    if(o.hilo===h && o.muku===m && o.hasMauli===cycle.hasMauli) return true;
    if(typeof console!=='undefined') console.warn('[QA不一致] 正式確認値 '+o.hilo+'〜'+o.muku+' / 計算値 '+h+'〜'+m);
    return false;
  }
  return false;
}
/* ===== HAWAIIAN_CALENDAR_VERIFICATION END ===== */
`;
fs.writeFileSync(path.join(ROOT,'official_verification.js'),js);
console.log('正式確認済み周期',out.length,'件 → engine/official_verification.js');
