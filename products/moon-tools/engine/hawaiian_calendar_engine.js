/* ===== HAWAIIAN_CALENDAR_ENGINE BEGIN v1.0.0 ===== */
// 古来ハワイ太陰暦 共通暦エンジン（愛泉の杜OS）v1.0.0  2026-10-04
// 正本：products/moon-tools/engine/hawaiian_calendar_engine.js
// 各HTMLにはこのブロックをそのまま埋め込む（BEGIN〜END間はバイト単位で同一であること）。
//
// 処理の流れ（Single Source of Truth）：
//   天文学的新月（UT） → boundaryRule → Muku日 → 翌日Hilo → 周期 → 29夜/30夜 → Mauli → 夜番号
// 日付は「その暦日の UTC 0時」のミリ秒で表す（各アプリ既存の Date.UTC(y,m-1,d) と同じ表現）。
//
// boundaryRule について：
//   現行は UTC_DATE（新月時刻の UTC 日付を Muku とする）を採用する。
//   これは「現時点で確認できた正式暦データ（2026年確定値・2027年正式Hilo/Muku・2027/2028年正式Mauli）を
//   すべて再現する計算仕様」として採用したものであり、古来ハワイ暦の伝統的な境界時刻が
//   UTC 0:00（HST 14:00）であることを示すものではない。
//   正式データから確認できている境界は HST 13:51〜14:52 の間。
//   境界の扱いは BOUNDARY_RULES に分離しており、規則を差し替えれば全期間を再計算できる。
//
// CONFIRMED / 正式データは計算の入力に使わない（検証用データとしてのみ使う）。
var HawaiianCalendar = (function(){
  'use strict';
  var VERSION = '1.0.0';
  var DAY = 86400000;
  var RAD = Math.PI / 180;

  // ── 天文計算：Meeus『Astronomical Algorithms』第49章（周期項＋惑星補正項 A1〜A14）──
  function newMoonJDE(k){
    var T = k / 1236.85, T2 = T*T, T3 = T2*T, T4 = T3*T;
    var E = 1 - 0.002516*T - 0.0000074*T2, E2 = E*E;
    var M  = (2.5534 + 29.10535670*k - 0.0000014*T2 - 0.00000011*T3) * RAD;
    var Mp = (201.5643 + 385.81693528*k + 0.0107582*T2 + 0.00001238*T3 - 0.000000058*T4) * RAD;
    var F  = (160.7108 + 390.67050284*k - 0.0016118*T2 - 0.00000227*T3 + 0.000000011*T4) * RAD;
    var Om = (124.7746 - 1.56375588*k + 0.0020672*T2 + 0.00000215*T3) * RAD;
    var s = Math.sin;
    var jde = 2451550.09766 + 29.530588861*k + 0.00015437*T2 - 0.000000150*T3 + 0.00000000073*T4;
    jde += -0.40720*s(Mp) + 0.17241*E*s(M) + 0.01608*s(2*Mp) + 0.01039*s(2*F)
         + 0.00739*E*s(Mp-M) - 0.00514*E*s(Mp+M) + 0.00208*E2*s(2*M)
         - 0.00111*s(Mp-2*F) - 0.00057*s(Mp+2*F) + 0.00056*E*s(2*Mp+M)
         - 0.00042*s(3*Mp) + 0.00042*E*s(M+2*F) + 0.00038*E*s(M-2*F)
         - 0.00024*E*s(2*Mp-M) - 0.00017*s(Om) - 0.00007*s(Mp+2*M)
         + 0.00004*s(2*Mp-2*F) + 0.00004*s(3*M) + 0.00003*s(Mp+M-2*F)
         + 0.00003*s(2*Mp+2*F) - 0.00003*s(Mp+M+2*F) + 0.00003*s(Mp-M+2*F)
         - 0.00002*s(Mp-M-2*F) - 0.00002*s(3*Mp+M) + 0.00002*s(4*Mp);
    var A = [
      [299.77, 0.107408, -0.009173, 0.000325], [251.88, 0.016321, 0, 0.000165],
      [251.83, 26.651886, 0, 0.000164], [349.42, 36.412478, 0, 0.000126],
      [84.66, 18.206239, 0, 0.000110], [141.74, 53.303771, 0, 0.000062],
      [207.14, 2.453732, 0, 0.000060], [154.84, 7.306860, 0, 0.000056],
      [34.52, 27.261239, 0, 0.000047], [207.19, 0.121824, 0, 0.000042],
      [291.34, 1.844379, 0, 0.000040], [161.72, 24.198154, 0, 0.000037],
      [239.56, 25.513099, 0, 0.000035], [331.55, 3.592518, 0, 0.000023]
    ];
    for (var i = 0; i < A.length; i++) jde += A[i][3] * s((A[i][0] + A[i][1]*k + A[i][2]*T2) * RAD);
    return jde;
  }
  // ΔT（TT−UT、秒）：Espenak & Meeus（NASA 2006）の多項式
  function deltaT(year){
    var t, u;
    if (year < 1900){ t = year - 1860; return 7.62 + 0.5737*t - 0.251754*t*t + 0.01680668*t*t*t - 0.0004473624*t*t*t*t + t*t*t*t*t/233174; }
    if (year < 1920){ t = year - 1900; return -2.79 + 1.494119*t - 0.0598939*t*t + 0.0061966*t*t*t - 0.000197*t*t*t*t; }
    if (year < 1941){ t = year - 1920; return 21.20 + 0.84493*t - 0.076100*t*t + 0.0020936*t*t*t; }
    if (year < 1961){ t = year - 1950; return 29.07 + 0.407*t - t*t/233 + t*t*t/2547; }
    if (year < 1986){ t = year - 1975; return 45.45 + 1.067*t - t*t/260 - t*t*t/718; }
    if (year < 2005){ t = year - 2000; return 63.86 + 0.3345*t - 0.060374*t*t + 0.0017275*t*t*t + 0.000651814*t*t*t*t + 0.00002373599*t*t*t*t*t; }
    if (year < 2050){ t = year - 2000; return 62.92 + 0.32217*t + 0.005589*t*t; }
    if (year < 2150){ return -20 + 32*Math.pow((year-1820)/100, 2) - 0.5628*(2150 - year); }
    u = (year - 1820) / 100; return -20 + 32*u*u;
  }
  // 新月 k の時刻（UT、ミリ秒）
  function newMoonUT(k){
    var jde = newMoonJDE(k);
    var ms = (jde - 2440587.5) * DAY;
    var year = 2000 + k / 12.3685;
    return Math.round(ms - deltaT(year) * 1000);
  }
  function kNear(ms){ return Math.round(((ms / DAY + 2440587.5) - 2451550.09766) / 29.530588861); }

  // ── boundaryRule：新月時刻（UT ms）→ Muku の暦日（UTC 0時 ms）──
  var BOUNDARY_RULES = {
    UTC_DATE: {
      id: 'UTC_DATE',
      description: '新月時刻のUTC日付をMukuとする（確認済み正式データをすべて再現する採用仕様。伝統的境界の証明ではない）',
      mukuDate: function(utMs){ return Math.floor(utMs / DAY) * DAY; }
    }
  };
  var DEFAULT_RULE = 'UTC_DATE';

  function ymd(ms){ var d = new Date(ms); return d.getUTCFullYear() + '-' + ('0'+(d.getUTCMonth()+1)).slice(-2) + '-' + ('0'+d.getUTCDate()).slice(-2); }
  function parse(s){ return Date.parse(s + 'T00:00:00Z'); }

  // ── 周期構築：fromMs〜toMs を覆う周期の配列（時系列順）──
  // 周期 = { id, label, hiloMs, mukuMs, nights(29|30), hasMauli, mauliMs, newMoonUT, boundaryRule }
  //   id    : 計算用ID（Hiloの日付 'YYYY-MM-DD'）
  //   label : 表示用ラベル（Hiloの年月。同じ暦月に2周期目があれば 'b' を付す）。検索には使わない。
  var cache = {};
  function cycles(fromMs, toMs, ruleId){
    var rule = BOUNDARY_RULES[ruleId || DEFAULT_RULE];
    if (!rule) throw new Error('HawaiianCalendar: unknown boundaryRule ' + ruleId);
    var k0 = kNear(fromMs) - 2, k1 = kNear(toMs) + 2, out = [], prevMuku = null;
    for (var k = k0; k <= k1; k++){
      var key = rule.id + ':' + k;
      var ut = cache[key] || (cache[key] = newMoonUT(k));
      var muku = rule.mukuDate(ut);
      if (prevMuku !== null){
        var hilo = prevMuku + DAY;
        var nights = Math.round((muku - hilo) / DAY) + 1;
        if (nights !== 29 && nights !== 30) throw new Error('HawaiianCalendar: 周期長が29/30夜でない ' + ymd(hilo) + '〜' + ymd(muku) + ' (' + nights + ')');
        out.push({ id: ymd(hilo), hiloMs: hilo, mukuMs: muku, nights: nights, hasMauli: nights === 30,
                   mauliMs: nights === 30 ? muku - DAY : null, newMoonUT: ut, boundaryRule: rule.id, k: k });
      }
      prevMuku = muku;
    }
    out = out.filter(function(c){ return c.mukuMs >= fromMs && c.hiloMs <= toMs; });
    var seen = {};
    out.forEach(function(c){ var m = c.id.slice(0, 7); c.label = seen[m] ? m + 'b' : m; seen[m] = true; });
    return out;
  }
  // 対象日を含む周期（cycle.hilo <= target <= cycle.muku）
  function cycleAt(targetMs, ruleId){
    var list = cycles(targetMs - 40*DAY, targetMs + 40*DAY, ruleId);
    for (var i = 0; i < list.length; i++) if (list[i].hiloMs <= targetMs && targetMs <= list[i].mukuMs) return list[i];
    return null;
  }
  // 前後の周期（暦月ではなく周期順）
  function adjacent(cycle, dir, ruleId){
    var t = dir > 0 ? cycle.mukuMs + DAY : cycle.hiloMs - DAY;
    return cycleAt(t, ruleId);
  }
  // 夜番号：1〜28、Mauliありの周期は29（Mauli）、Mukuは30。Mauliなしの周期では29を飛ばす。
  function nightNumber(cycle, targetMs){
    if (!cycle || targetMs < cycle.hiloMs || targetMs > cycle.mukuMs) return null;
    if (targetMs === cycle.mukuMs) return 30;
    if (cycle.hasMauli && targetMs === cycle.mukuMs - DAY) return 29;
    return Math.round((targetMs - cycle.hiloMs) / DAY) + 1;
  }
  function nightAt(targetMs, ruleId){ return nightNumber(cycleAt(targetMs, ruleId), targetMs); }
  // 指定年にHiloがある周期（表示ラベル付き）
  function cyclesOfYear(year, ruleId){
    var a = Date.UTC(year, 0, 1), b = Date.UTC(year + 1, 0, 1) - DAY;
    return cycles(a - 40*DAY, b + 40*DAY, ruleId).filter(function(c){ return c.hiloMs >= a && c.hiloMs <= b; });
  }

  return { VERSION: VERSION, DAY: DAY, BOUNDARY_RULES: BOUNDARY_RULES, DEFAULT_RULE: DEFAULT_RULE,
           newMoonUT: newMoonUT, deltaT: deltaT, cycles: cycles, cycleAt: cycleAt, adjacent: adjacent,
           nightNumber: nightNumber, nightAt: nightAt, cyclesOfYear: cyclesOfYear, ymd: ymd, parse: parse };
})();
/* ===== HAWAIIAN_CALENDAR_ENGINE END ===== */
