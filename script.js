
const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
if(toggle&&nav){
  toggle.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded',open);
  });
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
}

const themeBtn=document.querySelector('.theme-toggle');
const funBtn=document.querySelector('.fun-toggle');
const body=document.body;
const savedTheme=localStorage.getItem('portfolio-theme');
if(savedTheme==='light') body.classList.add('light');
if(themeBtn) themeBtn.textContent=body.classList.contains('light')?'☾':'☀︎';
themeBtn?.addEventListener('click',()=>{
  body.classList.toggle('light');
  localStorage.setItem('portfolio-theme',body.classList.contains('light')?'light':'dark');
  themeBtn.textContent=body.classList.contains('light')?'☾':'☀︎';
});
funBtn?.addEventListener('click',()=>{
  body.classList.toggle('matrix');
  if(body.classList.contains('matrix')){
    funBtn.textContent='10';
    setTimeout(()=>{ body.classList.remove('matrix'); funBtn.textContent='01'; },1200);
  } else funBtn.textContent='01';
});

/* Veille filters */
const filters=document.querySelectorAll('.filter');
const weeks=document.querySelectorAll('.week-card');
filters.forEach(btn=>btn.addEventListener('click',()=>{
  filters.forEach(x=>x.classList.remove('active')); btn.classList.add('active');
  const f=btn.dataset.filter;
  weeks.forEach(card=>{
    const t=card.dataset.topic;
    let show=f==='all';
    if(f==='ia') show=/ia|intelligence|modèle|deepfake|agent|automatisation|génér/.test(t);
    if(f==='cyber') show=/cyber|sécurité|attaque|prompt|vulnér/.test(t);
    if(f==='régulation') show=/réglement|ai act|gouvernance|transparence|droit|norme/.test(t);
    if(f==='vie privée') show=/données|vie privée|rgpd|mineur|protection/.test(t);
    card.style.display=show?'block':'none';
  });
});

/* Matrix mode: binary rain + transitions */
const layer=document.getElementById('binary-layer');
function makeRain(){
  if(!layer) return ()=>{};
  layer.innerHTML='';
  const canvas=document.createElement('canvas'); layer.appendChild(canvas);
  const ctx=canvas.getContext('2d'); let raf,cols,drops;
  const resize=()=>{canvas.width=innerWidth;canvas.height=innerHeight;cols=Math.floor(canvas.width/16);drops=Array(cols).fill(0).map(()=>Math.random()*-50)};
  const draw=()=>{ctx.fillStyle='rgba(0,8,2,.10)';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.fillStyle='#54ff78';ctx.font='13px monospace';for(let i=0;i<cols;i++){ctx.fillText(Math.random()>.5?'1':'0',i*16,drops[i]*16);if(drops[i]*16>canvas.height&&Math.random()>.975)drops[i]=0;drops[i]++}raf=requestAnimationFrame(draw)};
  resize();addEventListener('resize',resize);draw();return ()=>{cancelAnimationFrame(raf);removeEventListener('resize',resize)};
}
let stopRain=null;
function binaryFlash(){if(!document.body.classList.contains('matrix')||!layer)return;layer.style.display='block';layer.style.opacity='1';setTimeout(()=>layer.style.opacity='0',650);setTimeout(()=>layer.style.display='none',950)}
document.querySelector('.fun-toggle')?.addEventListener('click',()=>{document.body.classList.toggle('matrix');const b=document.querySelector('.fun-toggle');if(document.body.classList.contains('matrix')){b.textContent='10';stopRain=makeRain();binaryFlash()}else{b.textContent='01';stopRain?.();layer&&(layer.style.display='none')}});
let lastY=scrollY;addEventListener('scroll',()=>{if(document.body.classList.contains('matrix')&&Math.abs(scrollY-lastY)>180){lastY=scrollY;binaryFlash()}},{passive:true});
const originalText=new WeakMap();
const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(!e.isIntersecting||!document.body.classList.contains('matrix'))return;e.target.querySelectorAll('h1,h2,h3,p').forEach(el=>{if(originalText.has(el))return;originalText.set(el,el.textContent);const target=el.textContent;let n=0;const timer=setInterval(()=>{n++;el.classList.add('binary-scramble');el.textContent=target.split('').map(ch=>ch===' '?' ':Math.random()>.5?'0':'1').join('');if(n>5){clearInterval(timer);el.textContent=target;el.classList.remove('binary-scramble')}},45)})}),{threshold:.25});
document.querySelectorAll('.section,.page-hero').forEach(x=>obs.observe(x));
