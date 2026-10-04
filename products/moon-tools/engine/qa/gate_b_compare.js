// Gate B ステップ2：凍結済みの2028計算値（ハッシュ検証）と、2028正式Mauli表を照合
'use strict';
const fs=require('fs'),path=require('path'),crypto=require('crypto');
const ROOT=path.resolve(__dirname,'..');
const calc=JSON.parse(fs.readFileSync(path.join(ROOT,'calculated','calculated_2028.json'),'utf8'));
const h=crypto.createHash('sha256').update(JSON.stringify(calc.cycles),'utf8').digest('hex');
if(h!==calc.meta.dataSha256){console.log('STOP: 計算値のハッシュ不一致');process.exit(1);}
const OM=JSON.parse(fs.readFileSync(path.join(ROOT,'testdata','official_mauli_2027_2028.json'),'utf8')).months;
let ok=0,n=0;const rows=[];
for(let m=1;m<=12;m++){
  const key='2028-'+String(m).padStart(2,'0'), off=OM[key];
  const got=calc.cycles.filter(c=>c.mauli&&c.mauli.startsWith(key)).map(c=>c.mauli);
  const g=got.length===1?got[0]:got.length===0?null:got.join(',');
  n++; const hit=g===off; ok+=hit;
  rows.push(`${key}  正式 ${off||'無し'}  計算 ${g||'なし'}  ${hit?'一致':'不一致'}`);
}
rows.forEach(r=>console.log(r));
console.log(`\nGate B: 2028正式Mauli ${ok}/${n} 一致`+(ok===n?'  → PASS':'  → STOP'));
process.exit(ok===n?0:1);
