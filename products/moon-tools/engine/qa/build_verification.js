// 検証モジュール official_verification.js（正式確認表示 ✦ 用）を出力する。表示専用で、暦の計算には使わない。
// 公開版（OS-DEC-016）：正式資料由来の一覧は公開リポジトリに置かないため、一覧は空で出力する（v1.0.0公開版では ✦ は表示されない）。
// 内部QA：privateList() が非公開の検証データ（engine/testdata、git管理外）から一覧を作り、QA時にだけページへ注入する。
// 実行：node engine/qa/build_verification.js   → engine/official_verification.js（公開版）を出力
'use strict';
const fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'..'), TD=path.join(ROOT,'testdata');
const DAY=864e5, P=s=>Date.parse(s+'T00:00:00Z');

// 非公開の検証データから「正式確認済み周期」一覧を作る（QA専用。公開ファイルには書き出さない）
function privateList(){
  const J=f=>JSON.parse(fs.readFileSync(path.join(TD,f),'utf8'));
  const list=[];
  for(const v of Object.values(J('confirmed_2026.json').cycles)) list.push({hilo:v.hilo,muku:v.muku,hasMauli:v.hasMauli});
  const H=J('official_hilo_2027.json').hilo2027, M=J('official_muku_2027.json').muku2027;
  // 2027年：Hilo(i) と 次周期の直前のMuku(i+1) が両方とも正式値の周期だけ（Mukuが未提供の周期は対象外）
  for(let i=0;i+1<M.length;i++){ const hilo=H[i], muku=M[i+1]; const nights=(P(muku)-P(hilo))/DAY+1; list.push({hilo,muku,hasMauli:nights===30}); }
  const seen=new Set();
  return list.filter(c=>!seen.has(c.hilo)&&seen.add(c.hilo)).sort((a,b)=>a.hilo<b.hilo?-1:1);
}

const PUBLIC_MODULE=`/* ===== HAWAIIAN_CALENDAR_VERIFICATION BEGIN v1.0.0 ===== */
// 正式確認表示（✦・ピンク背景）用の検証モジュール。正本：products/moon-tools/engine/official_verification.js
// engine/qa/build_verification.js が出力する（手で編集しない）。
// 公開版：正式資料由来の一覧は公開リポジトリに置かない（OS-DEC-016）。一覧が空のため、✦・ピンク背景は表示されない。
// 判定の仕組みは将来の再検討に備えて残している。内部QAでは非公開の一覧をQA時にだけ注入して動作を確認する。
// ・暦の値（Hilo / Muku / Mauli / 夜番号）は常に共通暦エンジンの計算結果を使う。一覧は計算結果を上書きしない。
// ・一覧と計算結果が食い違う周期は表示を付けず、コンソールに QA 不一致として記録する。
var OFFICIAL_VERIFIED_CYCLES = [];
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

module.exports={privateList, PUBLIC_MODULE};
if(require.main===module){
  fs.writeFileSync(path.join(ROOT,'official_verification.js'),PUBLIC_MODULE);
  console.log('公開版の検証モジュール（一覧は空）→ engine/official_verification.js');
}
