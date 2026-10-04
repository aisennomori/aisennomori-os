/* ===== HAWAIIAN_CALENDAR_VERIFICATION BEGIN v1.0.0 ===== */
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
