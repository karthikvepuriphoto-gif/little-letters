// ---------- Word Search (easy CVC words, across & down only; Amy en-US clips) ----------
(()=>{
const WK="little-letters-wordsearch-v1";
const WS=Object.assign({lv:0,cnt:[0,0,0,0,0]},JSON.parse(localStorage.getItem(WK)||"{}"));
const wsave=()=>{try{localStorage.setItem(WK,JSON.stringify(WS))}catch(e){}};
// levels: [gridSize, wordCount]
const LV=[[4,3],[4,4],[5,4],[5,5],[6,5]], NEED=2;
const BANK=[
 {w:"cat",e:"🐱"},{w:"dog",e:"🐶"},{w:"sun",e:"☀️"},{w:"hat",e:"🎩"},{w:"bus",e:"🚌"},
 {w:"mom",e:"👩"},{w:"dad",e:"👨"},{w:"pig",e:"🐷"},{w:"cup",e:"🥤"},{w:"bed",e:"🛏️"},
 {w:"fox",e:"🦊"},{w:"box",e:"📦"},{w:"hen",e:"🐔"},{w:"map",e:"🗺️"},{w:"net",e:"🥅"},
 {w:"pen",e:"🖊️"},{w:"red",e:"🔴"},{w:"run",e:"🏃"},{w:"sit",e:"🧘"},{w:"top",e:"🔝"},
 {w:"jam",e:"🍓"},{w:"log",e:"🪵"},{w:"mud",e:"🟤"},{w:"nap",e:"😴"},{w:"web",e:"🕸️"},
 {w:"zip",e:"🤐"},{w:"van",e:"🚐"},{w:"bug",e:"🐛"},{w:"can",e:"🥫"},{w:"fan",e:"🪭"}
];
const LETTERS="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let tok=0;const live=t=>t===tok&&$("#wordsearch").classList.contains("on");
function V(name,text,cut){if(!S.voice)return;if(cut){TA.pend=[];try{TA.src&&TA.src.stop()}catch(e){}}taPlay(name,text,"line")}
function body(h){tok++;GG.tok++;TA.pend=[];try{TA.src&&TA.src.stop()}catch(e){}$("#wsbody").innerHTML=h}
function bar(back,title){return `<div class="bar"><button data-wsb="${back}">⬅️</button><span class="stitle">${title}</span><span class="sp"></span><span class="stars">⭐ ${S.stars}</span></div>`}
const rnd=n=>Math.floor(Math.random()*n),shuf=a=>a.map(v=>[Math.random(),v]).sort((p,q)=>p[0]-q[0]).map(p=>p[1]);

function menu(first){show("wordsearch","games");const L=WS.lv;
 body(bar("games","🔎 Word search")+`
 <div class="wsintro">Find easy words across → and down ↓. No diagonals yet!</div>
 <div class="wslv">${LV.map((_,i)=>`<button class="wsl ${i===L?"on":""} ${i>WS.lv?"lock":""}" data-wsl="${i}">${i>WS.lv?"🔒":(WS.cnt[i]>=NEED?"🏅":"🔎")} ${LV[i][0]}×${LV[i][0]} · ${LV[i][1]} words</button>`).join("")}</div>
 <div class="wsinfo" id="wsinfo">${L<WS.lv||WS.cnt[L]>=NEED?`Level ${L+1} 🏅 done! Play any time.`:`Level ${L+1}: finish ${NEED-Math.min(NEED,WS.cnt[L])} more to grow.`}</div>
 <button class="c2 wsplay" data-wsp="1">▶️ Play level ${L+1}</button>`);
 if(first)setTimeout(()=>{if(live(tok))V("ws_intro","Find the words! Look across and down.")},280)}

function placeWords(N,words){
 const g=Array.from({length:N},()=>Array(N).fill(""));
 const placed=[];
 for(const item of words){
  const w=item.w.toUpperCase();let ok=false;
  for(let tries=0;tries<80&&!ok;tries++){
   const across=Math.random()<.55;const len=w.length;
   if(across){const r=rnd(N),c=rnd(N-len+1);let clear=true;
    for(let i=0;i<len;i++){const ch=g[r][c+i];if(ch&&ch!==w[i]){clear=false;break}}
    if(clear){for(let i=0;i<len;i++)g[r][c+i]=w[i];placed.push({...item,r,c,dir:"across",cells:[...Array(len)].map((_,i)=>[r,c+i])});ok=true}}
   else{const r=rnd(N-len+1),c=rnd(N);let clear=true;
    for(let i=0;i<len;i++){const ch=g[r+i][c];if(ch&&ch!==w[i]){clear=false;break}}
    if(clear){for(let i=0;i<len;i++)g[r+i][c]=w[i];placed.push({...item,r,c,dir:"down",cells:[...Array(len)].map((_,i)=>[r+i,c])});ok=true}}
  }
 }
 for(let r=0;r<N;r++)for(let c=0;c<N;c++)if(!g[r][c])g[r][c]=LETTERS[rnd(26)];
 return {g,placed}}

let G=null;
function play(level){const L=level??WS.lv,[N,nw]=LV[L];
 const words=shuf(BANK).slice(0,nw);let {g,placed}=placeWords(N,words);
 // if some failed to place, retry once with reshuffle
 if(placed.length<nw){const retry=placeWords(N,shuf(BANK).slice(0,nw));if(retry.placed.length>placed.length){g=retry.g;placed=retry.placed}}
 body(bar("menu","🔎 Word search")+`
  <div class="wswrap">
   <div class="wslist" id="wslist">${placed.map((p,i)=>`<button class="wsword" data-wi="${i}"><span>${p.e}</span><b>${p.w}</b></button>`).join("")}</div>
   <div class="wsgrid" id="wsgrid" style="--n:${N}">${g.map((row,r)=>row.map((ch,c)=>`<button class="wsc" data-r="${r}" data-c="${c}">${ch}</button>`).join("")).join("")}</div>
  </div>
  <div class="wshint" id="wshint">Tap letters across or down. Picture clues help!</div>
  <button class="hear msh" id="wshear">🔊</button>`);
 const t=tok;G={t,L,N,placed,found:new Set(),sel:[],path:[]};
 V("ws_go","Find this word in the letters.",1);
 $("#wshear").onclick=()=>V("ws_go","Find this word in the letters.",1);
 wireGrid();
 // speak first unfound word on list tap
 $("#wslist").querySelectorAll(".wsword").forEach(b=>b.onclick=()=>{const p=placed[+b.dataset.wi];if(G.found.has(+b.dataset.wi))return;V(null,p.w+". "+p.w.split("").join(", "),1)})}

function cellKey(r,c){return r+","+c}
function wireGrid(){const grid=$("#wsgrid");let down=false;
 const at=(e)=>{const el=document.elementFromPoint(e.clientX,e.clientY)?.closest?.(".wsc");return el};
 const start=e=>{e.preventDefault();const el=e.target.closest(".wsc");if(!el)return;down=true;G.path=[[+el.dataset.r,+el.dataset.c]];paintSel();try{el.setPointerCapture(e.pointerId)}catch(_){}};
 const move=e=>{if(!down)return;e.preventDefault();const el=at(e);if(!el)return;const r=+el.dataset.r,c=+el.dataset.c;const last=G.path[G.path.length-1];
  if(last[0]===r&&last[1]===c)return;
  // only straight across or down from start
  const [sr,sc]=G.path[0];
  if(r!==sr&&c!==sc)return; // diagonal blocked
  if(r<sr||c<sc)return; // no backward
  // rebuild path as line from start to current
  const path=[];if(r===sr){for(let x=sc;x<=c;x++)path.push([sr,x])}else{for(let y=sr;y<=r;y++)path.push([y,sc])}
  G.path=path;paintSel()};
 const end=e=>{if(!down)return;down=false;checkPath();G.path=[];paintSel()};
 grid.addEventListener("pointerdown",start);grid.addEventListener("pointermove",move);
 grid.addEventListener("pointerup",end);grid.addEventListener("pointercancel",end);
 // also simple tap-to-extend for accessibility
 grid.querySelectorAll(".wsc").forEach(el=>el.addEventListener("click",e=>{
  if(e.pointerType&&e.pointerType!=="mouse")return; // pointer already handled
 }))}
function paintSel(){const on=new Set(G.path.map(([r,c])=>cellKey(r,c)));
 document.querySelectorAll(".wsc").forEach(el=>{const k=cellKey(+el.dataset.r,+el.dataset.c);
  el.classList.toggle("sel",on.has(k));el.classList.toggle("found",[...G.found].some(i=>G.placed[i].cells.some(([r,c])=>cellKey(r,c)===k)))})}
function checkPath(){if(G.path.length<3)return;
 const letters=G.path.map(([r,c])=>document.querySelector(`.wsc[data-r="${r}"][data-c="${c}"]`).textContent).join("");
 const hit=G.placed.findIndex((p,i)=>!G.found.has(i)&&p.w.toUpperCase()===letters);
 if(hit<0){boop();V("ws_try","Keep looking. Across or down.",1);return}
 G.found.add(hit);ding([660,880],.07);paintSel();
 const btn=$(`[data-wi="${hit}"]`);if(btn)btn.classList.add("done");
 V("ws_win1","You found it!",1);toast(G.placed[hit].e+" "+G.placed[hit].w);
 if(G.found.size===G.placed.length)setTimeout(winAll,500)}
function winAll(){const t=G.t,L=G.L;ding([523,659,784,1046],.07);confetti();addStar(2);
 let up=false;if(L===WS.lv){WS.cnt[L]++;if(WS.cnt[L]>=NEED&&WS.lv<LV.length-1){WS.lv++;up=true}}wsave();
 $("#wshint").textContent="All the words! Hooray!";
 $("#wsgrid").insertAdjacentHTML("afterend",`<div class="wsdone"><button data-wsp="1">🔎 Again</button><button data-wsb="menu">📋 Menu</button></div>`);
 V("ws_win3","All the words! Hooray!");
 if(up)setTimeout(()=>{if(live(t)){toast("🎉 Bigger grid unlocked!");V("ws_lvl","Wow! A bigger word search!");confetti()}},1500)}

document.addEventListener("click",e=>{
 const open=e.target.closest("[data-ws]");if(open){menu(true);return}
 const b=e.target.closest("[data-wsb]");if(b){if(b.dataset.wsb==="games"){tok++;show("games")}else menu(false);return}
 const l=e.target.closest("[data-wsl]");if(l){const v=+l.dataset.wsl;if(v>WS.lv){boop();toast("🔒 Finish level "+(WS.lv+1)+" first!");return}
  WS.cur=v;document.querySelectorAll("[data-wsl]").forEach(x=>x.classList.toggle("on",+x.dataset.wsl===v));
  $("#wsinfo").textContent=v<WS.lv||WS.cnt[v]>=NEED?`Level ${v+1} 🏅 done! Play any time.`:`Level ${v+1}: finish ${NEED-Math.min(NEED,WS.cnt[v])} more to grow.`;
  const playBtn=document.querySelector("[data-wsp]");if(playBtn)playBtn.textContent="▶️ Play level "+(v+1);return}
 const p=e.target.closest("[data-wsp]");if(p)play(WS.cur??WS.lv)});
window.LLW={WS,LV,BANK,menu,play,get G(){return G}};
})();
