// 2029・2030年の Calculated / Predicted 値をエンジンのみで生成して凍結する（正式データ・testdataは読まない）
// 実行：node engine/qa/freeze_predictions.js 2029 2030
'use strict';
const fs=require('fs'),path=require('path'),crypto=require('crypto'),{execSync}=require('child_process');
const ROOT=path.resolve(__dirname,'..');
const src=fs.readFileSync(path.join(ROOT,'hawaiian_calendar_engine.js'),'utf8');
const HC=new Function(src+'\nreturn HawaiianCalendar;')();
const B='/* ===== HAWAIIAN_CALENDAR_ENGINE BEGIN', E='/* ===== HAWAIIAN_CALENDAR_ENGINE END ===== */';
const block=src.slice(src.indexOf(B),src.indexOf(E)+E.length);
const commit=execSync('git rev-parse HEAD',{cwd:ROOT,encoding:'utf8'}).trim();
const dirty=execSync('git status --porcelain -- .',{cwd:ROOT,encoding:'utf8'}).trim();
if(dirty){console.log('STOP: engine/ に未コミットの変更があるため凍結しない\n'+dirty);process.exit(1);}
const P=HC.parse,Y=HC.ymd,toMin=d=>d.getUTCHours()*60+d.getUTCMinutes();
for(const year of process.argv.slice(2).map(Number)){
  const f=path.join(ROOT,'calculated',`predicted_${year}.json`);
  if(fs.existsSync(f)){console.log('STOP: 既に凍結済み（上書きしない）',path.relative(ROOT,f));continue;}
  const cycles=HC.cycles(P(year+'-01-01'),P(year+'-12-31')).map(c=>{
    const hst=new Date(c.newMoonUT-36e6);
    return {label:c.label,id:c.id,hilo:Y(c.hiloMs),muku:Y(c.mukuMs),nights:c.nights,hasMauli:c.hasMauli,mauli:c.mauliMs?Y(c.mauliMs):null,
      newMoonUTC:new Date(c.newMoonUT).toISOString().slice(0,19)+'Z',newMoonHST:hst.toISOString().slice(0,16).replace('T',' '),
      boundaryTestCase:toMin(hst)>=13*60+51&&toMin(hst)<=14*60+52, status:'Calculated / Predicted'};});
  const meta={name:`hawaiian_calendar_predicted_${year}`,status:'Calculated / Predicted（正式値ではない。正式資料入手後も書き換えない）',
    generatedAt:new Date().toISOString(),engineVersion:HC.VERSION,boundaryRule:HC.DEFAULT_RULE,
    boundaryNote:'UTC_DATEは確認済み正式データを再現する採用仕様であり、伝統的境界がHST 14:00であることの証明ではない。boundaryTestCase=true の周期は新月がHST 13:51〜14:52にあり、境界時刻の検証ケースになる',
    astronomy:'Meeus 第49章（周期項＋A1〜A14）＋ΔT（Espenak & Meeus 2006）',commit,engineSha256:crypto.createHash('sha256').update(block,'utf8').digest('hex'),
    inputs:'エンジンのみ。正式Mauli・正式Hilo/Muku・CONFIRMEDは入力に使っていない',cycleCount:cycles.length,
    dataSha256:crypto.createHash('sha256').update(JSON.stringify(cycles),'utf8').digest('hex')};
  fs.writeFileSync(f,JSON.stringify({meta,cycles},null,1));
  console.log(`== ${year}  saved ${path.relative(ROOT,f)}  data sha256 ${meta.dataSha256.slice(0,12)}  commit ${commit.slice(0,7)}`);
  cycles.forEach(c=>console.log(`${c.label.padEnd(8)} Hilo ${c.hilo}  Muku ${c.muku}  ${c.nights}夜  Mauli ${c.mauli||'なし'}  新月HST ${c.newMoonHST}${c.boundaryTestCase?'  ★境界検証ケース':''}`));
}
