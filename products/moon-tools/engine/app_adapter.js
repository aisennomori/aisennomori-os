/* ===== HAWAIIAN_CALENDAR_ADAPTER BEGIN v1.0.0 ===== */
// アプリ接続（全アプリ共通・アプリ別の補正は禁止）。正本：products/moon-tools/engine/app_adapter.js
// 暦の値はすべて HawaiianCalendar（共通暦エンジン）から取得する。暦月key・CONFIRMEDは使わない。
// 既存画面のコードが使う関数名（findCycle / adjCycle / getMoonNight）と周期オブジェクトの形を保つ。
function hcCycle(c){ return c ? { hiloMs:c.hiloMs, mukuMs:c.mukuMs, hasMauli:c.hasMauli, id:c.id, label:c.label } : null; }
// 指定した年月を表示するための周期：その月の初日と重なる最初の周期（従来の表示仕様を維持）
function findCycle(y,m){
  var a=Date.UTC(y,m-1,1), b=Date.UTC(y,m,1);
  var list=HawaiianCalendar.cycles(a,b-1);
  for(var i=0;i<list.length;i++){ if(list[i].hiloMs<b && list[i].mukuMs>a) return hcCycle(list[i]); }
  return null;
}
// 前後の周期（暦月ではなく周期の順番で移動）
function adjCycle(cycle,dir){ return hcCycle(HawaiianCalendar.adjacent(cycle,dir)); }
// 指定日の夜番号（1〜30。Mauliのない周期では29を飛ばす）
function getMoonNight(year,month,day){ return HawaiianCalendar.nightAt(Date.UTC(year,month-1,day)); }
/* ===== HAWAIIAN_CALENDAR_ADAPTER END ===== */
