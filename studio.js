// ---------- Color Studio & More Fun (original content; narration = pre-recorded en-US clips) ----------
(()=>{
const SK="little-letters-studio-v1";
const SP=Object.assign({made:{},cbn:{},songs:{},rb:0,feel:0,ten:0,tenLv:0,mk:0,tintSaid:0,shadeSaid:0},JSON.parse(localStorage.getItem(SK)||"{}"));
const ssave=()=>{try{localStorage.setItem(SK,JSON.stringify(SP))}catch(e){}};
const rnd=n=>Math.floor(Math.random()*n),shuf=a=>a.map(v=>[Math.random(),v]).sort((p,q)=>p[0]-q[0]).map(p=>p[1]);
let tok=0;const live=t=>t===tok&&$("#studio").classList.contains("on");
function V(name,text,cut){if(!S.voice)return;if(cut){TA.pend=[];try{TA.src&&TA.src.stop()}catch(e){}}taPlay(name,text,"line")}
function win(cb,ms=2600){const t=tok;ding([523,659,784,1046],.07);addStar(1);confetti();setTimeout(()=>{if(live(t))cb&&cb()},ms)}
function wig(el){boop();if(el){el.classList.remove("wig");void el.offsetWidth;el.classList.add("wig")}}
// paint model (subtractive / pigment mixing as taught in kindergarten art)
const PAINT={r:["#e53935","red"],y:["#fdd835","yellow"],b:["#1e63d6","blue"],w:["#ffffff","white"],k:["#222222","black"]};
const CL={red:["#e53935","red"],yellow:["#fdd835","yellow"],blue:["#1e63d6","blue"],orange:["#fb8c00","orange"],green:["#43a047","green"],purple:["#8e24aa","purple"],brown:["#795548","brown"],
 pink:["#f48fb1","pink"],lblue:["#90caf9","light blue"],lgreen:["#a5d6a7","light green"],lpurple:["#ce93d8","light purple"],lorange:["#ffcc80","light orange"],lyellow:["#fff59d","light yellow"],lbrown:["#bc9a84","light brown"],
 dred:["#8e0000","dark red"],dblue:["#0d2a6b","dark blue"],dgreen:["#1b5e20","dark green"],dpurple:["#4a0072","dark purple"],dorange:["#b45309","dark orange"],dyellow:["#9e8b00","dark yellow"],dbrown:["#3e2723","dark brown"],
 gray:["#9e9e9e","gray"],white:["#ffffff","white"],black:["#222222","black"]};
const MIXED=Object.keys(CL).filter(k=>!["red","yellow","blue","white","black"].includes(k));
function mixKey(d){const has=c=>d.includes(c),h=["r","y","b"].filter(has);let base;
 if(!h.length)return has("w")&&has("k")?"gray":has("w")?"white":has("k")?"black":null;
 base=h.length===3?"brown":h.length===1?{r:"red",y:"yellow",b:"blue"}[h[0]]:{ry:"orange",yb:"green",rb:"purple"}[h.join("")];
 if(has("k"))return "d"+base;if(has("w"))return base==="red"?"pink":"l"+base;return base}
function recipe(k){const R={orange:"ry",green:"yb",purple:"rb",brown:"ryb",gray:"wk",pink:"rw"};if(R[k])return R[k].split("");
 const m=k[0],b=k.slice(1),bb={red:"r",yellow:"y",blue:"b",orange:"ry",green:"yb",purple:"rb",brown:"ryb"}[b];return (bb+(m==="l"?"w":"k")).split("")}
const dot=c=>`<i class="sdot" style="background:${PAINT[c][0]}"></i>`;
const rline=k=>recipe(k).map(dot).join(" + ")+` = <i class="sdot" style="background:${CL[k][0]}"></i>`;

// ---------- screens ----------
function bar(back,title){return `<div class="bar"><button data-sb="${back}">${back==="home"?"🏠":"⬅️"}</button><span class="stitle">${title}</span><span class="sp"></span><span class="stars">⭐ ${S.stars}</span></div>`}
function screen(html){tok++;GG.tok++;TA.pend=[];try{TA.src&&TA.src.stop()}catch(e){}$("#sbody").innerHTML=html;$("#studio").scrollTop=0}
function menu(first){show("studio","draw");screen(bar("home","🌈 Colors & fun")+`
 <div class="swl">🎨 Color Studio</div>
 <div class="sgrid">
  <button class="c1" data-sa="mix">🥣<small>Mix paints</small></button>
  <button class="c3" data-sa="make">🎯<small>Make this color</small></button>
  <button class="c2" data-sa="rainbow">🌈<small>Rainbow order</small></button>
  <button class="c4" data-sa="cbn">🖌️<small>Color by number</small></button>
  <button class="c5" data-sa="light">💡<small>Light is different</small></button>
 </div>
 <div class="swl">✨ More fun</div>
 <div class="sgrid">
  <button class="c2" data-sa="xylo">🎶<small>Rainbow xylophone</small></button>
  <button class="c1" data-sa="feel">😊<small>Feelings</small></button>
  <button class="c3" data-sa="ten">🔟<small>Ten frames</small></button>
 </div>
 <div class="smade"><b>🎨 Colors I made: ${MIXED.filter(k=>SP.made[k]).length}/${MIXED.length}</b><div>${MIXED.map(k=>`<i class="sdot big ${SP.made[k]?"":"no"}" title="${CL[k][1]}" style="background:${SP.made[k]?CL[k][0]:"#eee"}">${SP.made[k]?"":"?"}</i>`).join("")}</div></div>`);
 if(first)V("c_menu","Welcome to the color studio!")}

// ---------- mixing bowl ----------
let MX=null;
function mixer(target){const t=tok;MX={d:[],key:null,target,fails:0};
 $("#sbody").insertAdjacentHTML("beforeend",`<div class="mixwrap">
  ${target?`<div class="target"><span>Make:</span><i class="sdot huge" id="mtgt"></i><button class="hear" id="mhear">🔊</button></div>`:""}
  <div class="bowlrow"><div id="bowl" class="bowl"><div id="paint" class="paint"></div><div class="rim"></div></div></div>
  <div id="mrec" class="mrec">&nbsp;</div>
  <div class="pots">${Object.keys(PAINT).map(c=>`<button class="pot" data-p="${c}" aria-label="${PAINT[c][1]}" style="--c:${PAINT[c][0]}"><i></i><small>${PAINT[c][1]}</small></button>`).join("")}</div>
  <div class="mbtns"><button id="mwash" class="wash">🧽 Wash</button>${target?"":`<button id="mhear2" class="hear">🔊</button>`}</div></div>`);
 if(target)$("#mtgt").style.background=CL[target][0];
 $("#mwash").onclick=()=>{MX.d=[];MX.key=null;$("#paint").style.background="transparent";$("#paint").className="paint";$("#mrec").innerHTML="&nbsp;";ding([500,400],.08)};
 const hear=()=>target?V("c_mk_"+target,"Can you make "+CL[target][1]+"?",1):V("c_intro","Red, yellow, and blue are the primary colors.",1);
 if($("#mhear"))$("#mhear").onclick=hear;if($("#mhear2"))$("#mhear2").onclick=hear;
 document.querySelectorAll(".pot").forEach(p=>potDrag(p,()=>addDrop(p.dataset.p,t)));
 setTimeout(()=>{if(live(t))hear()},300)}
function potDrag(p,onDrop){let st=null,blob=null;
 p.addEventListener("pointerdown",e=>{e.preventDefault();st={x:e.clientX,y:e.clientY,moved:false};try{p.setPointerCapture(e.pointerId)}catch(_){}});
 p.addEventListener("pointermove",e=>{if(!st)return;if(!st.moved&&Math.hypot(e.clientX-st.x,e.clientY-st.y)>14){st.moved=true;blob=document.createElement("div");blob.className="blob";blob.style.background=p.style.getPropertyValue("--c");document.body.appendChild(blob)}
  if(blob){blob.style.left=e.clientX+"px";blob.style.top=e.clientY+"px"}});
 const end=e=>{if(!st)return;const m=st.moved;st=null;if(blob){blob.remove();blob=null;const r=$("#bowl").getBoundingClientRect(),pad=40;
   if(e.type==="pointerup"&&e.clientX>r.left-pad&&e.clientX<r.right+pad&&e.clientY>r.top-pad&&e.clientY<r.bottom+pad)onDrop()}else if(!m&&e.type==="pointerup")onDrop()};
 p.addEventListener("pointerup",end);p.addEventListener("pointercancel",end)}
function addDrop(c,t){if(!live(t)||!MX)return;if(MX.d.length>=4){V("c_full","The bowl is full!",1);wig($("#bowl"));return}
 const prev=MX.key,prevHex=prev?CL[prev][0]:PAINT[c][0];MX.d.push(c);const k=mixKey(MX.d);MX.key=k;const hex=CL[k][0];
 const pt=$("#paint");pt.className="paint";void pt.offsetWidth;pt.style.background=`conic-gradient(${prevHex} 0 25%,${PAINT[c][0]} 0 50%,${prevHex} 0 75%,${PAINT[c][0]} 0)`;pt.classList.add("swirl");
 ding([440+MX.d.length*110],.05);setTimeout(()=>{if(MX&&MX.key===k){pt.style.background=hex;pt.classList.add("settle")}},1100);
 const uniq=[...new Set(MX.d)];$("#mrec").innerHTML=MX.d.length>1?MX.d.map(dot).join(" + ")+` = <i class="sdot" style="background:${hex}"></i> <b>${CL[k][1]}</b>`:`${dot(c)} <b>${PAINT[c][1]}</b>`;
 // narration
 const L=[];if(MX.d.length===1){if("ryb".includes(c))L.push(["c_n_"+{r:"red",y:"yellow",b:"blue"}[c],PAINT[c][1]])}
 else if(k===prev)L.push(["c_same","The same color stays the same!"]);
 else{const h=uniq.filter(x=>"ryb".includes(x)).sort((a,b)=>"ryb".indexOf(a)-"ryb".indexOf(b)).join("");
  if(k==="gray")L.push(["c_wk","Black and white make gray!"]);
  else if(h==="ryb"&&"ryb".includes(c))L.push(["c_ryb","Red, yellow, and blue all together make brown!"]);
  else if({ry:1,yb:1,rb:1}[h]&&"ryb".includes(c)&&uniq.length===2)L.push(["c_"+h,CL[k][1]]);
  else L.push(["c_r_"+k,"You made "+CL[k][1]+"!"]);
  if(c==="w"&&k[0]==="l"||c==="w"&&k==="pink"){if(SP.tintSaid<3){SP.tintSaid++;L.push(["c_tint","That is called a tint."])}}
  if(c==="k"&&k[0]==="d"&&k!=="dred"||c==="k"&&k==="dred"){if(SP.shadeSaid<3){SP.shadeSaid++;L.push(["c_shade","That is called a shade."])}}}
 L.forEach((x,i)=>setTimeout(()=>{if(live(t))V(x[0],x[1],i===0)},i===0?200:0));
 if(MIXED.includes(k)&&!SP.made[k]){SP.made[k]=1;ssave();if(!MX.target)setTimeout(()=>{if(live(t)){toast("🎨 New color: "+CL[k][1]+"!");addStar(1);confetti()}},1300)}else ssave();
 if(MX.target){if(k===MX.target){MX.target=null;SP.mk++;ssave();setTimeout(()=>{if(!live(t))return;V("c_mkwin","You matched it!",1);win(()=>openMake(),3200)},1300)}
  else if(MX.d.length>=recipe(MX.target).length){MX.fails++;setTimeout(()=>{if(!live(t))return;V("c_hint","Almost! Wash the bowl and try a different mix.");if(MX&&MX.fails>=2)$("#mrec").innerHTML="💡 "+rline(MX.target)},2400)}}}
function openMix(){screen(bar("menu","🥣 Mix paints")+`<div class="stip">🔴 🟡 🔵 are the <b>primary colors</b>. Tap or drag paint into the bowl! White makes colors lighter, black makes them darker.</div>`);mixer(null)}
const MK=["orange","green","purple","pink","lblue","brown","gray","dblue","lgreen","dred","lpurple","dgreen"];
function openMake(){const pool=MK.slice(0,Math.min(MK.length,3+SP.mk));let tg;do{tg=pool[rnd(pool.length)]}while(tg===openMake.last&&pool.length>1);openMake.last=tg;
 screen(bar("menu","🎯 Make this color")+`<div class="stip">Mix paints to match the big circle!</div>`);mixer(tg)}

// ---------- rainbow order ----------
const RB=[["red","#e53935"],["orange","#fb8c00"],["yellow","#fdd835"],["green","#43a047"],["blue","#1e63d6"],["indigo","#3f2b96"],["violet","#9c4dcc"]];
function openRainbow(){screen(bar("menu","🌈 Rainbow order")+`<div class="stip">Tap the colors in rainbow order. 🔊 Red, orange, yellow, green, blue, indigo, violet</div>
 <div class="rbow" id="rbow">${RB.map((c,i)=>`<div class="band" data-i="${i}" style="--r:${100-i*10.5}%"></div>`).join("")}<div class="cloud">☁️</div><div class="cloud r">☁️</div></div>
 <div class="rbblobs">${shuf(RB.map((c,i)=>i)).map(i=>`<button class="rbb" data-i="${i}" style="background:${RB[i][1]}" aria-label="${RB[i][0]}"><small>${RB[i][0]}</small></button>`).join("")}</div>
 <div class="mbtns"><button class="hear" id="rbh">🔊</button></div>`);
 const t=tok;let nx=0;const intro=()=>V("c_rbintro","Let's build a rainbow!",1);$("#rbh").onclick=intro;setTimeout(()=>{if(live(t))intro()},300);
 document.querySelectorAll(".rbb").forEach(b=>b.onclick=()=>{const i=+b.dataset.i;if(i!==nx){wig(b);V("c_n_"+RB[nx][0],RB[nx][0]+"!",1);return}
  b.classList.add("used");const band=$(`.band[data-i="${i}"]`);band.style.borderColor=RB[i][1];band.classList.add("on");ding([523*Math.pow(2,i/7)],.05);V("c_n_"+RB[i][0],RB[i][0]+"!",1);nx++;
  if(nx===7){SP.rb++;ssave();setTimeout(()=>{if(!live(t))return;V("c_rbwin","You made a rainbow!",1);$("#rbow").classList.add("done");win(()=>openRainbow(),5200)},900)}})}

// ---------- color by number (uses the mixed colors) ----------
const PIC={
 butterfly:{name:"Butterfly",emo:"🦋",pal:["orange","purple","pink","lblue","green","brown"],
  shapes:[["rect","x=0 y=0 width=400 height=300",4,[40,40]],["rect","x=0 y=300 width=400 height=100",5,[40,360]],
   ["path","d='M196 150 C120 20 20 40 40 140 C55 190 140 190 196 170Z'",1,[150,140]],["path","d='M204 150 C280 20 380 40 360 140 C345 190 260 190 204 170Z'",1,[250,140]],
   ["path","d='M196 178 C130 200 70 260 110 300 C150 330 190 260 196 200Z'",2,[140,265]],["path","d='M204 178 C270 200 330 260 290 300 C250 330 210 260 204 200Z'",2,[260,265]],
   ["circle","cx=95 cy=110 r=22",3,[95,110]],["circle","cx=305 cy=110 r=22",3,[305,110]],
   ["path","d='M188 120 Q200 100 212 120 L212 300 Q200 320 188 300Z'",6,[200,220]]]},
 fish:{name:"Fish",emo:"🐠",pal:["lblue","orange","purple","green","lbrown","pink"],
  shapes:[["rect","x=0 y=0 width=400 height=330",1,[40,40]],["path","d='M0 330 Q100 300 200 330 T400 330 V400 H0Z'",5,[200,370]],
   ["path","d='M80 200 C120 110 260 110 300 200 C260 290 120 290 80 200Z'",2,[190,215]],["path","d='M300 200 L370 140 L370 260Z'",3,[345,200]],
   ["path","d='M160 140 Q200 80 240 135Z'",3,[200,122]],["path","d='M30 330 C10 260 60 230 40 170 C80 220 50 270 70 330Z'",4,[45,280]],["path","d='M330 330 C320 290 360 270 350 230 C385 260 370 300 375 330Z'",4,[352,300]],
   ["circle","cx=130 cy=185 r=18",6,[130,185]]]},
 garden:{name:"Flower",emo:"🌷",pal:["lblue","green","pink","purple","orange","dgreen"],
  shapes:[["rect","x=0 y=0 width=400 height=280",1,[40,40]],["rect","x=0 y=280 width=400 height=120",6,[40,370]],["rect","x=190 y=170 width=20 height=170",2,[200,300]],
   ["path","d='M200 300 C150 250 110 270 100 300 C140 320 180 315 200 300Z'",2,[135,295]],["path","d='M200 280 C250 230 290 250 300 280 C260 300 220 295 200 280Z'",2,[265,272]],
   ["circle","cx=200 cy=90 r=42",3,[200,90]],["circle","cx=145 cy=135 r=42",4,[145,140]],["circle","cx=255 cy=135 r=42",4,[255,140]],["circle","cx=200 cy=180 r=42",3,[200,190]],
   ["circle","cx=200 cy=135 r=30",5,[200,135]],["circle","cx=345 cy=55 r=35",5,[345,55]]]}};
function openCbnList(){screen(bar("menu","🖌️ Color by number")+`<div class="stip">Pick a picture!</div><div class="sgrid">${Object.entries(PIC).map(([k,p],i)=>`<button class="c${i+1}" data-pic="${k}">${p.emo}<small>${p.name}${SP.cbn[k]?" ⭐":""}</small></button>`).join("")}</div>`);
 document.querySelectorAll("[data-pic]").forEach(b=>b.onclick=()=>openCbn(b.dataset.pic))}
function openCbn(id){const P=PIC[id],t=tok+1;
 screen(bar("cbn","🖌️ "+P.name)+`<div class="cbnwrap"><svg id="cbn" viewBox="0 0 400 400">${P.shapes.map((s,i)=>`<${s[0]} class="rg" data-i="${i}" data-n="${s[2]}" ${s[1].startsWith("d=")?'d="'+s[1].slice(3,-1)+'"':s[1].replace(/(\w+)=(\S+)/g,'$1="$2"')} fill="#fff" stroke="#4a3b6b" stroke-width="3"/>`).join("")}
  ${P.shapes.map((s,i)=>`<text class="num" data-i="${i}" x="${s[3][0]}" y="${s[3][1]+9}">${s[2]}</text>`).join("")}</svg>
  <div class="cpal">${P.pal.map((k,i)=>`<button class="cp ${SP.made[k]||["red","yellow","blue"].includes(k)?"":"lock"}" data-k="${k}" data-n="${i+1}" style="--c:${CL[k][0]}"><b>${i+1}</b><small>${CL[k][1]}</small><span class="rr">${rline(k)}</span></button>`).join("")}</div></div>
  <div class="stip small">Grey numbers? 🔒 colors you haven't mixed yet. Tap one to learn its recipe!</div>`);
 let sel=null;const pick=b=>{document.querySelectorAll(".cp").forEach(x=>x.classList.toggle("on",x===b));sel=+b.dataset.n};
 document.querySelectorAll(".cp").forEach(b=>b.onclick=()=>{const k=b.dataset.k;
  if(b.classList.contains("lock")){const r=recipe(k).join(""),pair={ry:"c_ry",yb:"c_yb",rb:"c_rb",ryb:"c_ryb",wk:"c_wk"}[r];V(pair||"c_r_"+k,CL[k][1],1);if(!pair)setTimeout(()=>V(r.includes("w")?"c_tint":"c_shade",""),50);
   b.classList.remove("lock");b.classList.add("unl");SP.made[k]=1;ssave();pick(b);return}
  pick(b);V("c_r_"+k,CL[k][1],1)});
 const first=document.querySelector(".cp:not(.lock)");if(first)pick(first);
 document.querySelectorAll("#cbn .rg").forEach(r=>r.addEventListener("pointerdown",e=>{e.preventDefault();if(!live(t))return;const n=+r.dataset.n;if(r.dataset.done)return;
  if(sel!==n){wig(null);V("c_cbnwrong","Look at the number.",1);const nm=document.querySelector(`.num[data-i="${r.dataset.i}"]`);nm.classList.add("flash");setTimeout(()=>nm.classList.remove("flash"),900);return}
  r.setAttribute("fill",CL[P.pal[n-1]][0]);r.dataset.done=1;document.querySelector(`.num[data-i="${r.dataset.i}"]`).style.opacity=.25;ding([660+n*60],.05);
  if(document.querySelectorAll("#cbn .rg:not([data-done])").length===0){SP.cbn[id]=1;ssave();document.querySelectorAll("#cbn .num").forEach(x=>x.style.display="none");
   setTimeout(()=>{if(!live(t))return;V("c_cbnwin","Beautiful! Your picture is done!",1);toGallery();win(null)},500)}}));
 setTimeout(()=>{if(live(t))V("c_cbn","Color by number!",1)},300)}
function toGallery(){try{const svg=new XMLSerializer().serializeToString($("#cbn"));const img=new Image();img.onerror=()=>console.warn("gallery save failed");img.onload=()=>{const c=document.createElement("canvas");c.width=c.height=600;const x=c.getContext("2d");x.fillStyle="#fff";x.fillRect(0,0,600,600);x.drawImage(img,0,0,600,600);
  S.gallery.unshift(c.toDataURL("image/jpeg",.75));S.gallery=S.gallery.slice(0,12);save();toast("🖼️ Saved to your gallery!")};img.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent((/xmlns=/.test(svg.slice(0,200))?svg:svg.replace("<svg",'<svg xmlns="http://www.w3.org/2000/svg"')).replace("<svg",'<svg width="600" height="600"'))}catch(e){}}

// ---------- light is different ----------
function openLight(){screen(bar("menu","💡 Light is different")+`<div class="stip">Paint: 🔴+🟡+🔵 = 🟤 brown.<br>Light: <b style="color:#e53935">red</b> + <b style="color:#2e7d32">green</b> + <b style="color:#1e63d6">blue</b> light = white light!</div>
 <div class="lightbox" id="lbox"><div class="lc" style="background:#ff0000;left:20%;top:12%"></div><div class="lc" style="background:#00ff00;left:42%;top:12%"></div><div class="lc" style="background:#0000ff;left:31%;top:40%"></div></div>
 <div class="stip small">Drag the lights around! Where all three meet, you see white. (Like the tiny lights in a TV screen.)</div><div class="mbtns"><button class="hear" id="lh">🔊</button></div>`);
 const t=tok;$("#lh").onclick=()=>V("c_light","Light mixes differently.",1);setTimeout(()=>{if(live(t))V("c_light","Light mixes differently.",1)},300);
 const box=$("#lbox");document.querySelectorAll(".lc").forEach(c=>{let d=null;c.addEventListener("pointerdown",e=>{e.preventDefault();d={x:e.clientX-c.offsetLeft,y:e.clientY-c.offsetTop};try{c.setPointerCapture(e.pointerId)}catch(_){}});
  c.addEventListener("pointermove",e=>{if(!d)return;c.style.left=Math.max(-40,Math.min(box.clientWidth-c.offsetWidth+40,e.clientX-d.x))+"px";c.style.top=Math.max(-40,Math.min(box.clientHeight-c.offsetHeight+40,e.clientY-d.y))+"px"});
  ["pointerup","pointercancel"].forEach(ev=>c.addEventListener(ev,()=>{if(d){d=null;if(!SP.light){SP.light=1;ssave();addStar(1)}}}))})}

// ---------- rainbow xylophone ----------
const XB=[["C","#e53935",261.63],["D","#fb8c00",293.66],["E","#fdd835",329.63],["F","#43a047",349.23],["G","#1e88e5",392],["A","#3f2b96",440],["B","#9c4dcc",493.88],["C","#ec407a",523.25]];
const SONG={twinkle:{name:"Twinkle, Twinkle",emo:"⭐",n:"0044554 3322110 4433221 4433221 0044554 3322110"},mary:{name:"Mary Had a Little Lamb",emo:"🐑",n:"2101222 111 244 2101222 21121 0"},
 scale:{name:"Up the rainbow",emo:"🪜",n:"01234567 76543210"}};
function bell(f){const a=ac();if(!a)return;if(a.state==="suspended")a.resume();const t=a.currentTime;[[1,.32],[4,.06],[2.76,.05]].forEach(([m,v])=>{const o=a.createOscillator(),g=a.createGain();o.type="sine";o.frequency.value=f*m;g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0008,t+(m===1?1.4:.4));o.connect(g);g.connect(a.destination);o.start(t);o.stop(t+1.5)})}
function openXylo(song){screen(bar("menu","🎶 Rainbow xylophone")+`<div class="srow">${Object.entries(SONG).map(([k,s])=>`<button class="sbtn ${song===k?"on":""}" data-song="${k}">${s.emo} ${s.name}${SP.songs[k]?" ⭐":""}</button>`).join("")}<button class="sbtn ${song?"":"on"}" data-song="">🎵 Free play</button></div>
 <div class="xylo" id="xylo">${XB.map((b,i)=>`<button class="xb" data-i="${i}" style="--c:${b[1]};--k:${1-i*.06}"><span>${b[0]}</span></button>`).join("")}</div>`);
 const t=tok,seqN=song?SONG[song].n.replace(/\s/g,"").split("").map(Number):null;let pos=0;
 const glow=()=>{document.querySelectorAll(".xb").forEach(b=>b.classList.toggle("glow",seqN&&+b.dataset.i===seqN[pos]))};glow();
 document.querySelectorAll("[data-song]").forEach(b=>b.onclick=()=>openXylo(b.dataset.song||null));
 const hit=b=>{const i=+b.dataset.i;bell(XB[i][2]);b.classList.remove("hit");void b.offsetWidth;b.classList.add("hit");
  if(seqN&&i===seqN[pos]){pos++;if(pos>=seqN.length){SP.songs[song]=1;ssave();setTimeout(()=>{if(!live(t))return;V("m_win","You played a song!",1);win(()=>openXylo(song),3600)},700);pos=0;seqN.length=0}glow()}};
 let down=false,last=null;const X=$("#xylo");
 X.addEventListener("pointerdown",e=>{const b=e.target.closest(".xb");if(!b)return;e.preventDefault();down=true;last=b;hit(b)});
 X.addEventListener("pointermove",e=>{if(!down)return;const el=document.elementFromPoint(e.clientX,e.clientY),b=el&&el.closest(".xb");if(b&&b!==last){last=b;hit(b)}});
 addEventListener("pointerup",()=>{down=false;last=null});X.addEventListener("pointercancel",()=>{down=false});
 setTimeout(()=>{if(live(t))song?V("m_follow","Follow the glowing bar!",1):V("m_intro","Tap the colorful bars!",1)},300)}

// ---------- feelings ----------
const FE=[["happy","😀"],["sad","😢"],["mad","😠"],["scared","😨"],["surprised","😮"],["sleepy","😴"]];
const SC=[["happy","🐶"],["sad","🍦"],["mad","🧱"],["scared","⛈️"],["surprised","🎁"],["sleepy","🌙"]];
function openFeel(){const round=SP.feel%2,t=tok+1;let ans,prompt,pic="";
 if(round===0){ans=FE[rnd(6)][0];prompt=()=>V("f_q_"+ans,"Which face looks "+ans+"?",1)}else{const i=rnd(6);ans=SC[i][0];pic=SC[i][1];prompt=()=>V("f_s"+i,"How do you feel?",1)}
 const opts=shuf([ans,...shuf(FE.map(f=>f[0]).filter(f=>f!==ans)).slice(0,round?2:3)]);
 screen(bar("menu","😊 Feelings")+`<div class="fprompt">${pic?`<span class="fpic">${pic}</span>`:""}<button class="hear" id="fh">🔊</button><button class="sbtn" id="fbr">🌸 Calm breathing</button></div>
  <div class="fgrid">${opts.map(o=>`<button class="fc" data-f="${o}"><span>${FE.find(f=>f[0]===o)[1]}</span><small>${o}</small></button>`).join("")}</div><div class="stip" id="ftip"></div>`);
 $("#fh").onclick=prompt;$("#fbr").onclick=openBreathe;
 document.querySelectorAll(".fc").forEach(b=>b.onclick=()=>{if(!live(t))return;if(b.dataset.f!==ans){wig(b);return}b.classList.add("yay");SP.feel++;ssave();
  $("#ftip").textContent=FE.find(f=>f[0]===ans)[1]+" "+{happy:"Happy feelings make us want to smile and share!",sad:"When we feel sad, a hug can help.",mad:"When we feel mad, we can take a big, slow breath.",scared:"When we feel scared, we can hold a grown-up's hand.",surprised:"Surprises can make our eyes open wide!",sleepy:"When we feel sleepy, our body needs rest."}[ans];
  V("f_t_"+ans,"",1);win(()=>openFeel(),4200)});
 if(SP.feel===0&&!openFeel.said){openFeel.said=1;setTimeout(()=>{if(live(t)){V("f_intro","All feelings are okay!",1);prompt()}},300)}else setTimeout(()=>{if(live(t))prompt()},300)}
function openBreathe(){screen(bar("feel","🌸 Calm breathing")+`<div class="breath"><div id="bub" class="bub">🌸</div><div id="bl" class="blab">Smell the flower…</div></div><div class="stip small">Breathe in slowly while the circle grows. Breathe out while it shrinks.</div>`);
 const t=tok;let n=0;const cyc=()=>{if(!live(t))return;if(n>=3){addStar(1);ding([523,659,784],.1);$("#bl").textContent="Great breathing! 🌟";return}const b=$("#bub");
  b.textContent="🌸";$("#bl").textContent="Smell the flower…";b.classList.remove("out");void b.offsetWidth;b.classList.add("in");V("f_in","Smell the flower.",1);
  setTimeout(()=>{if(!live(t))return;b.textContent="🕯️";$("#bl").textContent="Blow out the candle…";b.classList.remove("in");b.classList.add("out");V("f_out","Blow out the candle.",1);n++;setTimeout(cyc,4200)},4200)};
 setTimeout(cyc,400)}

// ---------- ten frames ----------
function openTen(){const mode=SP.ten%2,max=SP.tenLv>=5?10:5,t=tok+1;let n;do{n=1+rnd(max)}while(n===openTen.last);openTen.last=n;
 const cells=i=>`<div class="tf">${[...Array(10)].map((_,j)=>`<div class="tcell" data-j="${j}">${j<i?'<i class="tdot"></i>':""}</div>`).join("")}</div>`;
 const after=()=>{SP.ten++;SP.tenLv++;ssave();setTimeout(()=>{if(live(t))n===10?V("n_ten","A full ten frame is ten!",1):V("n_more_"+n,n+" and "+(10-n)+" more make ten!",1)},900);
  $("#tmsg").innerHTML=n===10?"🔟 A full ten frame is ten!":`<b>${n}</b> and <b>${10-n}</b> more make <b>10</b>`;
  document.querySelectorAll(".tcell").forEach((c,j)=>{if(j>=n)c.innerHTML='<i class="tdot tghost"></i>'});win(()=>openTen(),4600)};
 if(mode===0){const ch=shuf([n,...shuf([...Array(max)].map((_,i)=>i+1).filter(x=>x!==n)).slice(0,2)]);
  screen(bar("menu","🔟 Ten frames")+`<div class="fprompt"><span class="stip">How many dots?</span><button class="hear" id="th">🔊</button></div>${cells(n)}<div class="tch">${ch.map(c=>`<button class="tn" data-n="${c}">${c}</button>`).join("")}</div><div class="stip" id="tmsg"></div>`);
  const pr=()=>V("n_how","How many dots?",1);$("#th").onclick=pr;
  document.querySelectorAll(".tn").forEach(b=>b.onclick=()=>{if(!live(t)||$("#tmsg").textContent)return;if(+b.dataset.n!==n){wig(b);return}b.classList.add("yay");after()});
  setTimeout(()=>{if(!live(t))return;if(!SP.tenIntro){SP.tenIntro=1;ssave();V("n_intro","Ten frames help us count.",1)}pr()},300)}
 else{screen(bar("menu","🔟 Ten frames")+`<div class="fprompt"><span class="tbig">${n}</span><span class="stip">Make ${n}! Tap the boxes.</span><button class="hear" id="th">🔊</button></div>${cells(0)}<div class="mbtns"><button class="tn ok" id="tok">✅</button></div><div class="stip" id="tmsg"></div>`);
  const pr=()=>V("n_mk_"+n,"Can you make "+n+"?",1);$("#th").onclick=pr;let done=false;
  document.querySelectorAll(".tcell").forEach(c=>c.addEventListener("pointerdown",e=>{e.preventDefault();if(done)return;c.innerHTML=c.innerHTML?"":'<i class="tdot"></i>';ding([500+document.querySelectorAll(".tcell .tdot").length*60],.04)}));
  $("#tok").onclick=()=>{if(done)return;const k=document.querySelectorAll(".tcell .tdot").length;if(k!==n){wig($("#tok"));$("#tmsg").textContent=k<n?"Add more dots! ➕":"Too many! Take some away ➖";return}done=true;
   const cs=[...document.querySelectorAll(".tcell")];cs.forEach((c,j)=>c.innerHTML=j<n?'<i class="tdot"></i>':"");after()};
  setTimeout(()=>{if(live(t))pr()},300)}}

// ---------- wiring ----------
const ACT={mix:openMix,make:openMake,rainbow:openRainbow,cbn:openCbnList,light:openLight,xylo:()=>openXylo(null),feel:openFeel,ten:openTen};
document.addEventListener("click",e=>{const g=e.target.closest('[data-go="studio"]');if(g){menu(true);return}
 const a=e.target.closest("[data-sa]");if(a&&ACT[a.dataset.sa]){ACT[a.dataset.sa]();return}
 const b=e.target.closest("[data-sb]");if(b){const w=b.dataset.sb;w==="home"?(tok++,home()):w==="cbn"?openCbnList():w==="feel"?openFeel():menu(false)}});
window.LLS={SP,mixKey,recipe,CL,menu,ACT,addDrop:c=>addDrop(c,tok),PIC};
})();
