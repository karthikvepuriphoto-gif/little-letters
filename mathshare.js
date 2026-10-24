// ---------- Multiply & Share (kindergarten rows/groups + pie sharing; Amy en-US clips) ----------
(()=>{
const MK="little-letters-math-v1";
const MS=Object.assign({mul:0,div:0,mc:[0,0,0,0],dc:[0,0,0,0]},JSON.parse(localStorage.getItem(MK)||"{}"));
const msave=()=>{try{localStorage.setItem(MK,JSON.stringify(MS))}catch(e){}};
const FACT=[2,3,4,5], NEED=3;
const OBJS=[["🍎","apples"],["⭐","stars"],["🦕","dinosaurs"],["🚗","cars"],["🍪","cookies"],["🎈","balloons"],["🐥","chicks"],["🌸","flowers"]];
const FRIENDS=["👧","👦","🐻","🐰","🐶","🐱"];
let tok=0;const live=t=>t===tok&&$("#mathshare").classList.contains("on");
function V(name,text,cut){if(!S.voice)return;if(cut){TA.pend=[];try{TA.src&&TA.src.stop()}catch(e){}}taPlay(name,text,"line")}
function body(h){tok++;GG.tok++;TA.pend=[];try{TA.src&&TA.src.stop()}catch(e){}$("#msbody").innerHTML=h}
function bar(back,title){return `<div class="bar"><button data-msb="${back}">${back==="games"?"⬅️":"⬅️"}</button><span class="stitle">${title}</span><span class="sp"></span><span class="stars">⭐ ${S.stars}</span></div>`}
const rnd=n=>Math.floor(Math.random()*n),shuf=a=>a.map(v=>[Math.random(),v]).sort((p,q)=>p[0]-q[0]).map(p=>p[1]);
function menu(first){show("mathshare","games");
 body(bar("games","🥧 Multiply & Share")+`
 <div class="msintro">See rows, groups, and sharing — no timers, just try!</div>
 <div class="msmodes">
  <button class="c1 msm" data-msa="mul">✖️<small>Multiply<br><i>rows & groups</i></small></button>
  <button class="c3 msm" data-msa="div">🥧<small>Share<br><i>pies & toys</i></small></button>
 </div>
 <div class="mslv">
  <div><b>Multiply level:</b> ×${FACT[MS.mul]}${MS.mul<FACT.length-1?` · finish ${NEED-Math.min(NEED,MS.mc[MS.mul])} more to unlock ×${FACT[MS.mul+1]}`:""}</div>
  <div><b>Share level:</b> ÷${FACT[MS.div]}${MS.div<FACT.length-1?` · finish ${NEED-Math.min(NEED,MS.dc[MS.div])} more to unlock ÷${FACT[MS.div+1]}`:""}</div>
 </div>`);
 if(first)setTimeout(()=>{if(live(tok))V("ms_intro","Welcome to Multiply and Share!")},280)}

function pickFact(kind){const lv=kind==="mul"?MS.mul:MS.div;const max=FACT[lv];
 // prefer current factor, sometimes easier ones for practice
 const pool=[];for(let i=0;i<=lv;i++)pool.push(FACT[i]);
 return Math.random()<.65?max:pool[rnd(pool.length)]}

// ---------- Multiply: rows × columns ----------
function doMul(){const f=pickFact("mul");
 // rows of cols, or groups of size
 const mode=Math.random()<.5?"rows":"groups";
 let rows,cols,ans,prompt,emo,label;
 if(mode==="rows"){rows=2+rnd(Math.min(3,f));cols=f;ans=rows*cols;
  const o=OBJS[rnd(OBJS.length)];emo=o[0];label=o[1];
  prompt=`${rows} rows of ${cols}`;}
 else{rows=f;cols=2+rnd(Math.min(3,f));ans=rows*cols; // groups of
  const o=OBJS[rnd(OBJS.length)];emo=o[0];label=o[1];
  prompt=`${rows} groups of ${cols}`;}
 const wrong=shuf([ans-1,ans+1,ans+cols,ans-cols,ans+2,Math.max(1,ans-2)].filter(v=>v>0&&v!==ans&&v<=30)); const opts=shuf([ans,...wrong.slice(0,2)]);
 body(bar("menu","✖️ Multiply")+`<div class="msprompt" id="msp">${prompt} ${emo}</div>
  <div class="msstage" id="msstage"></div>
  <div class="msask" id="msask" hidden>How many ${label} in all?</div>
  <div class="msbtns" id="msbtns" hidden></div>
  <button class="hear msh" id="mshear">🔊</button>`);
 const t=tok;
 const stage=$("#msstage");
 // build rows one at a time
 let r=0;
 const paint=()=>{
  if(mode==="rows"){
   stage.innerHTML=`<div class="msgrid" style="--c:${cols}">${[...Array(rows*cols)].map((_,i)=>`<span class="msi ${i<r*cols?"on":"off"}">${emo}</span>`).join("")}</div>
    <div class="mscap">${r?`${r} × ${cols} = ${r*cols}`:"…"}</div>`;
  }else{
   let h="";for(let g=0;g<rows;g++){h+=`<div class="msgroup ${g<r?"on":"off"}">${[...Array(cols)].map(()=>`<span class="msi">${emo}</span>`).join("")}<small>group of ${cols}</small></div>`}
   stage.innerHTML=`<div class="msgroups">${h}</div><div class="mscap">${r?`${r} groups of ${cols}`:"…"}</div>`;
  }
 };
 paint();V("ms_mul","Let's multiply with rows!",1);
 const step=()=>{if(!live(t))return;r++;paint();ding([520+r*80],.06);
  if(r<rows)setTimeout(step,700);else setTimeout(ask,650)};
 setTimeout(step,900);
 function ask(){if(!live(t))return;
  $("#msask").hidden=false;$("#msbtns").hidden=false;
  $("#msbtns").innerHTML=opts.map(n=>`<button class="msn" data-n="${n}">${n}</button>`).join("");
  V("ms_how","How many in all?",1);
  $("#mshear").onclick=()=>V("ms_how","How many in all?",1);
  $("#msbtns").querySelectorAll(".msn").forEach(b=>b.onclick=()=>{
   if(+b.dataset.n===ans){b.classList.add("ok");winMul(f,prompt,ans,emo)}
   else{b.classList.add("no");boop();V("ms_try","Not quite. Look at the picture and try again.",1);setTimeout(()=>b.classList.remove("no"),500)}})}
}
function winMul(f,prompt,ans,emo){const t=tok;ding([523,659,784,1046],.07);confetti();addStar(1);
 const idx=FACT.indexOf(f);let up=false;
 if(idx===MS.mul){MS.mc[idx]++;if(MS.mc[idx]>=NEED&&MS.mul<FACT.length-1){MS.mul++;up=true}}msave();
 const k=["ms_win1","ms_win2","ms_win3"][rnd(3)],tx={ms_win1:"Yes! That is how many!",ms_win2:"Great sharing!",ms_win3:"You got it! Super job!"}[k];
 $("#msstage").insertAdjacentHTML("beforeend",`<div class="msdone"><b>${prompt} = ${ans}</b> ${emo}<div class="msnext"><button data-msa="mul">✖️ Again</button><button data-msb="menu">📋 Menu</button></div></div>`);
 setTimeout(()=>{if(!live(t))return;V(k,tx);if(up)setTimeout(()=>{if(live(t)){toast("🎉 New level: ×"+FACT[MS.mul]+"!");V("ms_lvl","Wow! You unlocked a new level!");confetti()}},1600)},400)}

// ---------- Divide / Share ----------
function doDiv(){const f=pickFact("div");
 const pie=Math.random()<.55; // pie vs toys
 if(pie)return doPie(f);
 // share toys into equal piles
 const each=2+rnd(Math.min(3,f)); // each friend gets
 const friends=f;const total=each*friends; // exact for most
 const leftover=MS.div>=3&&Math.random()<.35?1+rnd(f-1):0;
 const N=total+leftover;
 const o=OBJS[rnd(OBJS.length)];const emo=o[0];
 const faces=shuf(FRIENDS).slice(0,friends);
 body(bar("menu","🥧 Share")+`<div class="msprompt">Share ${N} ${o[1]} with ${friends} friends</div>
  <div class="msstage" id="msstage">
   <div class="mstoys" id="mstoys">${[...Array(N)].map((_,i)=>`<button class="msi toy" data-i="${i}">${emo}</button>`).join("")}</div>
   <div class="mspiles" id="mspiles">${faces.map((fc,i)=>`<div class="mspile" data-p="${i}"><span class="msface">${fc}</span><div class="msdrop"></div><small>0</small></div>`).join("")}</div>
  </div>
  <div class="msask">Give each friend the same number. Tap a toy, then a friend.</div>
  <button class="mscheck" id="mscheck">✅ Check</button>
  <button class="hear msh" id="mshear">🔊</button>`);
 const t=tok;
 V("ms_share","Share them equally with your friends.",1);
 $("#mshear").onclick=()=>V("ms_share","Share them equally with your friends.",1);
 let sel=null,piles=Array(friends).fill(0).map(()=>[]);
 const toys=[...$("#mstoys").children];
 toys.forEach(el=>el.onclick=()=>{if(el.classList.contains("gone"))return;toys.forEach(x=>x.classList.remove("pick"));el.classList.add("pick");sel=+el.dataset.i;ding([600],.04)});
 $("#mspiles").querySelectorAll(".mspile").forEach(p=>p.onclick=()=>{
  if(sel==null){boop();return}const i=+p.dataset.p;const el=toys[sel];
  el.classList.add("gone");el.classList.remove("pick");piles[i].push(sel);
  p.querySelector(".msdrop").innerHTML=piles[i].map(()=>`<span class="msi mini">${emo}</span>`).join("");
  p.querySelector("small").textContent=piles[i].length;sel=null;ding([700+i*40],.05)});
 $("#mscheck").onclick=()=>{
  const left=toys.filter(x=>!x.classList.contains("gone")).length;
  const counts=piles.map(p=>p.length);const ok=counts.every(c=>c===each)&&left===leftover;
  if(ok){winDiv(f,`Each friend got ${each}${leftover?` · ${leftover} leftover`:""}`,emo)}
  else{boop();V("ms_try","Not quite. Look at the picture and try again.",1);
   // gentle reset toys that are uneven
   toast(left&&leftover===0?"Give every toy a home!":`Each friend needs ${each}`)}}
}
function doPie(f){const slices=f;const kinds=[["🍕","pizza"],["🥧","pie"],["🍪","cookie"]];const[emo,name]=kinds[rnd(kinds.length)];
 const ans=slices; // how many equal pieces
 body(bar("menu","🥧 Share")+`<div class="msprompt">Cut the ${name} into ${slices} equal pieces</div>
  <div class="msstage" id="msstage"><div class="mspie" id="mspie" style="--n:${slices}" data-cut="0">${pieSVG(0,slices,emo)}</div>
  <div class="mscap" id="mscap">Tap the ${name} to cut</div></div>
  <div class="msask" id="msask" hidden>How many equal pieces?</div>
  <div class="msbtns" id="msbtns" hidden></div>
  <button class="hear msh" id="mshear">🔊</button>`);
 const t=tok;
 V("ms_pie","Cut the pie into equal pieces.",1);
 $("#mshear").onclick=()=>V("ms_pie","Cut the pie into equal pieces.",1);
 let cut=0;
 $("#mspie").onclick=()=>{if(cut>=slices)return;cut++;$("#mspie").dataset.cut=cut;$("#mspie").innerHTML=pieSVG(cut,slices,emo);ding([500+cut*90],.06);
  $("#mscap").textContent=cut<slices?`${cut} cut${cut>1?"s":""}…`:`${slices} equal pieces!`;
  if(cut===slices){const wrong=shuf([ans-1,ans+1,2,3,4,5].filter(v=>v!==ans&&v>0)); const opts=shuf([ans,...wrong.slice(0,2)]);
   $("#msask").hidden=false;$("#msbtns").hidden=false;
   $("#msbtns").innerHTML=opts.map(n=>`<button class="msn" data-n="${n}">${n}</button>`).join("");
   V("ms_how","How many in all?",1);
   $("#msbtns").querySelectorAll(".msn").forEach(b=>b.onclick=()=>{
    if(+b.dataset.n===ans){b.classList.add("ok");winDiv(f,`${slices} equal pieces`,emo)}
    else{b.classList.add("no");boop();V("ms_try","Not quite. Look at the picture and try again.",1);setTimeout(()=>b.classList.remove("no"),500)}})}}
}
function pieSVG(cut,n,emo){const R=90,cx=100,cy=100;let parts="";
 for(let i=0;i<n;i++){const a0=-Math.PI/2+i*2*Math.PI/n,a1=a0+2*Math.PI/n;
  const x0=cx+R*Math.cos(a0),y0=cy+R*Math.sin(a0),x1=cx+R*Math.cos(a1),y1=cy+R*Math.sin(a1);
  const show=cut>=n||i<cut;const col=["#ff7043","#ffca28","#66bb6a","#42a5f5","#ab47bc"][i%5];
  if(cut===0&&i===0){parts+=`<circle cx="${cx}" cy="${cy}" r="${R}" fill="#ffca28" stroke="#f57c00" stroke-width="4"/>`;break}
  if(show&&cut>0)parts+=`<path d="M${cx} ${cy}L${x0} ${y0}A${R} ${R} 0 0 1 ${x1} ${y1}Z" fill="${col}" stroke="#fff" stroke-width="3"/>`}
 if(cut===0)parts+=`<text x="${cx}" y="${cy+12}" text-anchor="middle" font-size="48">${emo}</text>`;
 else if(cut>=n)for(let i=0;i<n;i++){const a=-Math.PI/2+(i+.5)*2*Math.PI/n;parts+=`<text x="${cx+R*.45*Math.cos(a)}" y="${cy+R*.45*Math.sin(a)+8}" text-anchor="middle" font-size="22">${emo}</text>`}
 return `<svg viewBox="0 0 200 200" width="200" height="200">${parts}</svg>`}
function winDiv(f,msg,emo){const t=tok;ding([523,659,784,1046],.07);confetti();addStar(1);
 const idx=FACT.indexOf(f);let up=false;
 if(idx===MS.div){MS.dc[idx]++;if(MS.dc[idx]>=NEED&&MS.div<FACT.length-1){MS.div++;up=true}}msave();
 const k=["ms_win1","ms_win2","ms_win3"][rnd(3)],tx={ms_win1:"Yes! That is how many!",ms_win2:"Great sharing!",ms_win3:"You got it! Super job!"}[k];
 $("#msstage").insertAdjacentHTML("beforeend",`<div class="msdone"><b>${msg}</b> ${emo}<div class="msnext"><button data-msa="div">🥧 Again</button><button data-msb="menu">📋 Menu</button></div></div>`);
 setTimeout(()=>{if(!live(t))return;V(k,tx);if(up)setTimeout(()=>{if(live(t)){toast("🎉 New level: ÷"+FACT[MS.div]+"!");V("ms_lvl","Wow! You unlocked a new level!");confetti()}},1600)},400)}

document.addEventListener("click",e=>{
 const open=e.target.closest("[data-ms]");if(open){menu(true);return}
 const b=e.target.closest("[data-msb]");if(b){if(b.dataset.msb==="games"){tok++;show("games")}else menu(false);return}
 const a=e.target.closest("[data-msa]");if(a){a.dataset.msa==="mul"?doMul():doDiv()}});
window.LLM={MS,FACT,menu,doMul,doDiv,doPie};
})();
