// Gate B ステップ1：2028年をエンジンだけで生成して保存（正式データ・testdataは読まない）
'use strict';
const fs=require('fs'),path=require('path'),crypto=require('crypto');
const ROOT=path.resolve(__dirname,'..');
const src=fs.readFileSync(path.join(ROOT,'hawaiian_calendar_engine.js'),'utf8');
const HC=new Function(src+'\nreturn HawaiianCalendar;')();
const year=+process.argv[2]||2028, P=HC.parse, Y=HC.ymd;
const list=HC.cycles(P(year+'-01-01'),P(year+'-12-31')).map(c=>({
  label:c.label, id:c.id, hilo:Y(c.hiloMs), muku:Y(c.mukuMs), nights:c.nights, hasMauli:c.hasMauli, mauli:c.mauliMs?Y(c.mauliMs):null,
  newMoonUTC:new Date(c.newMoonUT).toISOString().slice(0,19)+'Z', newMoonHST:new Date(c.newMoonUT-36e6).toISOString().slice(0,16).replace('T',' '),
  status:'Calculated'}));
const canon=s=>JSON.stringify(s);
const out={meta:{name:`hawaiian_calendar_calculated_${year}`, status:'Calculated（正式値ではない）', generatedAt:new Date().toISOString(),
  engineVersion:HC.VERSION, boundaryRule:HC.DEFAULT_RULE, astronomy:'Meeus 第49章（周期項＋A1〜A14）＋ΔT（Espenak & Meeus 2006）',
  engineSha256:crypto.createHash('sha256').update(src.slice(src.indexOf('/* ===== HAWAIIAN_CALENDAR_ENGINE BEGIN'),src.indexOf('/* ===== HAWAIIAN_CALENDAR_ENGINE END ===== */')+46),'utf8').digest('hex'),
  inputs:'エンジンのみ。正式Mauli・正式Hilo/Muku・CONFIRMEDは入力に使っていない', cycleCount:list.length,
  dataSha256:crypto.createHash('sha256').update(canon(list),'utf8').digest('hex')}, cycles:list};
const f=path.join(ROOT,'calculated',`calculated_${year}.json`);
fs.writeFileSync(f,JSON.stringify(out,null,1)); console.log('saved',path.relative(ROOT,f),out.meta.dataSha256.slice(0,12));
list.forEach(c=>console.log(`${c.label.padEnd(8)} Hilo ${c.hilo}  Muku ${c.muku}  ${c.nights}夜  Mauli ${c.mauli||'なし'}  新月HST ${c.newMoonHST}`));
