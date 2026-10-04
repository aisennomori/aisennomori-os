// moon_techo 固有QA（正式確認表示と計算の分離）。実行：node engine/qa/techo_qa.js（Playwright 必要）
// A. 公開版：一覧は空。✦・ピンク背景が一切表示されず、暦はエンジンの計算結果のまま。
// B. 内部QA：非公開の検証データ（engine/testdata、git管理外）から作った一覧をQA時にだけ注入し、判定の仕組みを確認する。
//    非公開データが無い環境では B を FAIL とする（未確認のまま PASS にしない）。
const { chromium } = require('playwright'); const path=require('path'), fs=require('fs');
const FILE='file://'+path.resolve(__dirname,'..','..','moon_techo.html');
const eng=fs.readFileSync(path.resolve(__dirname,'..','hawaiian_calendar_engine.js'),'utf8');
const HC=new Function(eng+'\nreturn HawaiianCalendar;')();
let pass=0,fail=0;const ck=(n,ok,d)=>{ok?pass++:fail++;console.log((ok?'PASS ':'FAIL ')+n+(d?'  — '+d:''));};
let PRIVATE=null; try{ PRIVATE=require('./build_verification.js').privateList(); }catch(e){ PRIVATE=null; }
(async()=>{
  const b=await chromium.launch(); const p=await b.newPage({viewport:{width:430,height:1400}});
  const errs=[],warns=[]; p.on('pageerror',e=>errs.push(e.message)); p.on('console',m=>{if(m.type()==='warning')warns.push(m.text());});
  await p.route('**/*',r=>/^(file|data):/.test(r.request().url())?r.continue():r.abort());
  await p.clock.setFixedTime(new Date('2027-01-07T12:00:00+09:00')); await p.goto(FILE); await p.waitForTimeout(150);
  const view=async(y,m)=>p.evaluate(([y,m])=>{renderCycle(findCycle(y,m));const inner=document.getElementById('sheetInner');
    return {title:document.getElementById('calTitle').textContent, pink:inner.classList.contains('confirmed-month'), cells:inner.innerText};},[y,m]);
  const viewAt=async(iso)=>p.evaluate((iso)=>{const t=Date.parse(iso+'T00:00:00Z');renderCycle(hcCycle(HawaiianCalendar.cycleAt(t)));const inner=document.getElementById('sheetInner');
    return {title:document.getElementById('calTitle').textContent, pink:inner.classList.contains('confirmed-month')};},iso);
  // 2026-2030 の全周期を順に表示し、✦・ピンク背景の件数と周期の値を集める
  const scan=async()=>p.evaluate(()=>{const o=[];let c=findCycle(2026,1);while(c&&c.hiloMs<Date.UTC(2031,0,1)){renderCycle(c);
    const t=document.getElementById('calTitle').textContent, pink=document.getElementById('sheetInner').classList.contains('confirmed-month');
    o.push({v:[c.hiloMs,c.mukuMs,c.hasMauli],star:t.includes('✦'),pink});c=adjCycle(c,1);}return o;});
  const MONTHS=[[2026,6],[2026,12],[2027,3],[2027,8],[2027,10],[2028,4]];

  // ===== A. 公開版 =====
  ck('A1 公開版の一覧は空（正式資料由来データを保持しない）', await p.evaluate(()=>Array.isArray(OFFICIAL_VERIFIED_CYCLES)&&OFFICIAL_VERIFIED_CYCLES.length===0));
  const pub=await scan();
  ck('A2 公開版 ✦ 0件・ピンク背景 0件（2026-2030 全周期）', pub.every(x=>!x.star&&!x.pink), `${pub.length}周期中 ✦${pub.filter(x=>x.star).length} ピンク${pub.filter(x=>x.pink).length}`);
  const engAll=HC.cycles(Date.UTC(2026,0,1),Date.UTC(2030,11,31)).filter(c=>c.hiloMs>=pub[0].v[0]).map(c=>[c.hiloMs,c.mukuMs,c.hasMauli]);
  ck('A3 表示周期＝エンジン計算値（2026-2030 全周期）', JSON.stringify(pub.map(x=>x.v))===JSON.stringify(engAll.slice(0,pub.length)), pub.length+'周期');
  const pubCells=[]; for(const [y,m] of MONTHS) pubCells.push((await view(y,m)).cells);
  ck('A4 公開版で QA不一致の警告なし', !warns.some(w=>w.includes('QA不一致')));

  // ===== B. 内部QA（非公開一覧をQA時にだけ注入） =====
  ck('B0 非公開の検証データから一覧を作成（22周期）', !!PRIVATE&&PRIVATE.length===22, PRIVATE?PRIVATE.length+'周期':'engine/testdata が無い（非公開データを配置して実行）');
  if(PRIVATE){
    await p.evaluate(list=>{OFFICIAL_VERIFIED_CYCLES.push(...list);},PRIVATE);
    for(const [iso,label,exp] of [['2026-06-20','2026-06周期','2026年6月16日〜2026年7月14日'],['2026-12-20','2026-12 訂正周期','2026年12月10日〜2027年1月7日'],
                                 ['2027-08-10','2027-08周期（旧欠落区間）','2027年8月3日〜2027年8月31日'],['2027-10-10','2027-10（10/1周期）','2027年10月1日〜2027年10月29日'],
                                 ['2027-12-01','2027-11周期','2027年11月29日〜2027年12月27日']]){
      const v=await viewAt(iso); ck(`B1 注入時 ✦表示あり：${label}`, v.title.startsWith(exp)&&v.title.includes('✦')&&v.pink, v.title);
    }
    const v10b=await p.evaluate(()=>{renderCycle(adjCycle(findCycle(2027,10),1));return {t:document.getElementById('calTitle').textContent,pink:document.getElementById('sheetInner').classList.contains('confirmed-month')};});
    ck('B1 注入時 ✦表示あり：2027-10b（10/30周期）', v10b.t.includes('✦')&&v10b.pink, v10b.t);
    for(const [iso,label,exp] of [['2028-01-10','2027-12周期（Muku未提供）','2027年12月28日〜2028年1月26日'],['2028-04-01','2028-03周期','2028年3月27日〜2028年4月24日'],
                                 ['2029-05-01','2029周期','2029年4月14日〜2029年5月13日'],['2025-06-01','2025周期','2025年5月28日〜2025年6月25日']]){
      const v=await viewAt(iso); ck(`B2 注入時 ✦表示なし：${label}`, v.title.startsWith(exp)&&!v.title.includes('✦')&&!v.pink, v.title);
    }
    const inj=await scan();
    ck('B3 注入時 ✦ はちょうど22周期（正式確認済み周期のみ）', inj.filter(x=>x.star&&x.pink).length===22&&inj.every(x=>x.star===x.pink), `✦${inj.filter(x=>x.star).length}`);
    ck('B4 注入しても表示周期は公開版と同一（正式値で上書きしない）', JSON.stringify(inj.map(x=>x.v))===JSON.stringify(pub.map(x=>x.v)));
    const injCells=[]; for(const [y,m] of MONTHS) injCells.push((await view(y,m)).cells);
    ck('B5 注入しても暦の表示内容（日付・夜番号・夜名）は公開版と同一', JSON.stringify(injCells)===JSON.stringify(pubCells));
    // 不一致時：正式値で上書きせず、表示を付けず、QA不一致を記録
    const mm=await p.evaluate(()=>{OFFICIAL_VERIFIED_CYCLES.push({hilo:'2028-03-27',muku:'2028-04-25',hasMauli:true});
      const c=findCycle(2028,4); renderCycle(c); return {t:document.getElementById('calTitle').textContent, muku:HawaiianCalendar.ymd(c.mukuMs), n:getMoonNight(2028,4,25)};});
    ck('B6 不一致時：値は計算結果のまま（Muku 4/24・4/25はHilo）・✦なし・警告を記録', mm.muku==='2028-04-24'&&mm.n===1&&!mm.t.includes('✦')&&warns.some(w=>w.includes('QA不一致')), JSON.stringify(mm));
  }
  ck('JavaScriptエラーなし', errs.length===0, errs.join('|'));
  await b.close(); console.log(`\nmoon_techo 固有QA: ${pass} PASS / ${fail} FAIL`); process.exit(fail?1:0);
})();
