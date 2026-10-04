/* ===== HAWAIIAN_CALENDAR_VERIFICATION BEGIN v1.0.0 ===== */
// 正式確認表示（✦・ピンク背景）専用の検証モジュール。正本：products/moon-tools/engine/official_verification.js
// engine/qa/build_verification.js が engine/testdata から生成する（手で編集しない）。
// ・暦の値（Hilo / Muku / Mauli / 夜番号）は常に共通暦エンジンの計算結果を使う。
// ・この一覧は計算結果を上書きしない。計算結果が正式確認値と完全一致した周期にだけ「正式確認済み」表示を付ける。
// ・正式確認値と計算結果が食い違う周期は表示を付けず、コンソールに QA 不一致として記録する。
var OFFICIAL_VERIFIED_CYCLES = [
    { hilo:'2026-03-20', muku:'2026-04-17', hasMauli:false },  // 2026確定値（2026-12は10/4訂正）
    { hilo:'2026-04-18', muku:'2026-05-16', hasMauli:false },  // 2026確定値（2026-12は10/4訂正）
    { hilo:'2026-05-17', muku:'2026-06-15', hasMauli:true },  // 2026確定値（2026-12は10/4訂正）
    { hilo:'2026-06-16', muku:'2026-07-14', hasMauli:false },  // 2026確定値（2026-12は10/4訂正）
    { hilo:'2026-07-15', muku:'2026-08-12', hasMauli:false },  // 2026確定値（2026-12は10/4訂正）
    { hilo:'2026-08-13', muku:'2026-09-11', hasMauli:true },  // 2026確定値（2026-12は10/4訂正）
    { hilo:'2026-09-12', muku:'2026-10-10', hasMauli:false },  // 2026確定値（2026-12は10/4訂正）
    { hilo:'2026-10-11', muku:'2026-11-09', hasMauli:true },  // 2026確定値（2026-12は10/4訂正）
    { hilo:'2026-11-10', muku:'2026-12-09', hasMauli:true },  // 2026確定値（2026-12は10/4訂正）
    { hilo:'2026-12-10', muku:'2027-01-07', hasMauli:false },  // 2026確定値（2026-12は10/4訂正）
    { hilo:'2027-01-08', muku:'2027-02-06', hasMauli:true },  // 2027正式Hilo・正式Muku
    { hilo:'2027-02-07', muku:'2027-03-08', hasMauli:true },  // 2027正式Hilo・正式Muku
    { hilo:'2027-03-09', muku:'2027-04-06', hasMauli:false },  // 2027正式Hilo・正式Muku
    { hilo:'2027-04-07', muku:'2027-05-06', hasMauli:true },  // 2027正式Hilo・正式Muku
    { hilo:'2027-05-07', muku:'2027-06-04', hasMauli:false },  // 2027正式Hilo・正式Muku
    { hilo:'2027-06-05', muku:'2027-07-04', hasMauli:true },  // 2027正式Hilo・正式Muku
    { hilo:'2027-07-05', muku:'2027-08-02', hasMauli:false },  // 2027正式Hilo・正式Muku
    { hilo:'2027-08-03', muku:'2027-08-31', hasMauli:false },  // 2027正式Hilo・正式Muku
    { hilo:'2027-09-01', muku:'2027-09-30', hasMauli:true },  // 2027正式Hilo・正式Muku
    { hilo:'2027-10-01', muku:'2027-10-29', hasMauli:false },  // 2027正式Hilo・正式Muku
    { hilo:'2027-10-30', muku:'2027-11-28', hasMauli:true },  // 2027正式Hilo・正式Muku
    { hilo:'2027-11-29', muku:'2027-12-27', hasMauli:false },  // 2027正式Hilo・正式Muku
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
