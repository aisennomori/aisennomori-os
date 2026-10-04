const { chromium } = require('playwright');
const fs=require('fs');
const path=require('path'),{execSync}=require('child_process');
// 実行：node engine/qa/app_qa.js（Playwright 必要。開発・検証専用）
const BASE=path.resolve(__dirname,'..','..')+'/';
const APPS_ENV=(process.env.APPS||'moon_calendar,cycle_tracker,moon_cycle,moon_card_gallery').split(',');
for(const a of APPS_ENV){fs.writeFileSync(BASE+'__old_'+a+'.html',execSync(`git show baseline-before-engine:products/moon-tools/${a}.html`,{cwd:BASE}));}
process.on('exit',()=>{for(const a of APPS_ENV){try{fs.unlinkSync(BASE+'__old_'+a+'.html');}catch(e){}}});
const eng=fs.readFileSync(BASE+'engine/hawaiian_calendar_engine.js','utf8');
const HC=new Function(eng+'\nreturn HawaiianCalendar;')();
const APPS=APPS_ENV;
let pass=0,fail=0;const fails=[];
const ck=(n,ok,d)=>{ok?pass++:(fail++,fails.push(n));console.log((ok?'PASS ':'FAIL ')+n+(d?'  — '+d:''));};
async function open(b,file,iso){
  const p=await b.newPage({viewport:{width:430,height:1400}});
  const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>{errs.push('dialog '+d.message());d.dismiss();});
  await p.route('**/*',r=>r.request().url().startsWith('file:')||r.request().url().startsWith('data:')?r.continue():r.abort());
  await p.clock.setFixedTime(new Date(iso));
  await p.goto('file://'+file,{waitUntil:'load'}); await p.waitForTimeout(150);
  return {p,errs};
}
(async()=>{
  const b=await chromium.launch();
  for(const app of APPS){
    console.log('\n===== '+app);
    const {p,errs}=await open(b,BASE+app+'.html','2027-01-07T12:00:00+09:00');
    // 1) 全日照合：アプリの getMoonNight とエンジン
    const res=await p.evaluate(()=>{const o={};for(let t=Date.UTC(2026,0,1);t<=Date.UTC(2030,11,31);t+=864e5){const d=new Date(t);o[t]=getMoonNight(d.getUTCFullYear(),d.getUTCMonth()+1,d.getUTCDate());}return o;});
    let mis=0,n=0;for(const [t,v] of Object.entries(res)){n++;if(HC.nightAt(+t)!==v)mis++;}
    ck(`${app} 夜番号 2026-2030 全${n}日 エンジン一致`,mis===0,`不一致${mis}`);
    // 2) 重点日付
    const key=await p.evaluate(()=>[['2027-01-07','2027-01-08'],['2027-04-06','2027-04-07'],['2027-08-02','2027-08-03'],['2027-08-31','2027-09-01'],['2027-09-30','2027-10-01'],['2027-10-29','2027-10-30'],['2027-12-27','2027-12-28']].map(([m,h])=>{const f=s=>{const[y,mo,d]=s.split('-').map(Number);return getMoonNight(y,mo,d);};return [m,f(m),h,f(h)];}));
    ck(`${app} 重点日付 Muku=30/Hilo=1`,key.every(k=>k[1]===30&&k[3]===1),key.filter(k=>!(k[1]===30&&k[3]===1)).map(k=>k.join(' ')).join('; '));
    const gap=await p.evaluate(()=>{let g=0;for(const [y,m,d1,d2] of [[2027,8,3,31],[2027,10,1,29]]) for(let d=d1;d<=d2;d++) if(getMoonNight(y,m,d)===null) g++; return g;});
    ck(`${app} 2027/8/3-8/31・10/1-10/29 欠落なし`,gap===0,'欠落'+gap);
    // 3) 同月2周期・前後移動（findCycle/adjCycle）
    const oct=await p.evaluate(()=>{const c=findCycle(2027,10);const nx=adjCycle(c,1);const pv=adjCycle(nx,-1);const f=ms=>new Date(ms).toISOString().slice(0,10);return [f(c.hiloMs),f(c.mukuMs),f(nx.hiloMs),f(nx.mukuMs),f(pv.hiloMs),c.hasMauli,nx.hasMauli];});
    ck(`${app} 2027年10月の2周期（10/1〜10/29 → 次 10/30〜11/28 → 前 10/1）`,oct.join()==='2027-10-01,2027-10-29,2027-10-30,2027-11-28,2027-10-01,false,true',oct.join(' '));
    ck(`${app} JSエラー・ダイアログなし（2027/1/7で表示）`,errs.length===0,errs.join(' | '));
    await p.screenshot({path:require('os').tmpdir()+`/${app}_new_20270107.png`,fullPage:true});
    await p.close();
  }
  // 4) UI無変更：新旧で値が同じになる日（2026/6/20）の画面をピクセル比較
  for(const app of APPS){
    const a=await open(b,BASE+'__old_'+app+'.html','2026-06-20T12:00:00+09:00');
    const n=await open(b,BASE+app+'.html','2026-06-20T12:00:00+09:00');
    // moon_techo：公開版は ✦・ピンク背景を表示しない（OS-DEC-016）。旧版から ✦・ピンク背景だけを外した画面を基準に比較する
    if(app==='moon_techo') await a.p.evaluate(()=>{document.querySelectorAll('.confirmed-month').forEach(e=>e.classList.remove('confirmed-month'));
      const t=document.getElementById('calTitle'); if(t) t.textContent=t.textContent.replace(' ✦','');});
    const sa=await a.p.screenshot({fullPage:true}), sn=await n.p.screenshot({fullPage:true});
    fs.writeFileSync(require('os').tmpdir()+`/${app}_old_20260620.png`,sa);fs.writeFileSync(require('os').tmpdir()+`/${app}_new_20260620.png`,sn);
    ck(`${app} UI無変更（2026/6/20 表示を旧版とピクセル比較）`,Buffer.compare(sa,sn)===0,`${sa.length}B / ${sn.length}B`);
    await a.p.close();await n.p.close();
  }
  await b.close();
  console.log(`\nアプリ回帰QA（${APPS.length}本）: ${pass} PASS / ${fail} FAIL`+(fail?'  → '+fails.join(', '):''));
})();
