(() => {
'use strict';
const IMG_SOURCES = window.IMG_SOURCES;
const CLUSTERS = [
{id:'escuelas',n:'1',x:1288,y:856,scale:1.00,angle:-20,accent:'#ad5b3b',title:'Escuelas Taller',phrase:'Aprender haciendo',idea:'Los oficios se preservan cuando alguien los practica, los enseña y los transmite.',detailTitle:'Escuelas Taller: aprender haciendo',detailPhrase:'El saber tradicional necesita manos, tiempo y transmisión.',reflection:'Las Escuelas Taller me permitieron entender que un oficio no se conserva solo escribiéndolo. Se conserva cuando alguien lo practica, lo enseña y lo convierte en posibilidad de futuro.',tags:['oficio','técnica','transmisión','aprendizaje'],symbol:'✣',note:'practicar · enseñar · futuro'},
{id:'mapa',n:'2',x:650,y:955,scale:.80,angle:18,accent:'#2a4558',title:'Mapa de oficios',phrase:'Una geografía de saberes',idea:'Los oficios están conectados con territorios, comunidades, materias primas y formas de vida.',detailTitle:'Mapa de oficios: una geografía de saberes',detailPhrase:'Cada oficio pertenece a un territorio y a una forma de vida.',reflection:'El mapa amplía la mirada: cada oficio está conectado con un territorio, una comunidad, una materia prima y una forma particular de entender el mundo.',tags:['territorio','comunidad','materia prima','geografía'],symbol:'⌖',note:'territorio · comunidad · mundo'},
{id:'materiales',n:'3',x:332,y:555,scale:.65,angle:78,accent:'#627257',title:'Materiales y territorio',phrase:'No se extrae, se transforma',idea:'Los materiales no son neutros; cada material exige una forma de conocerlo y transformarlo.',detailTitle:'Materiales y territorio',detailPhrase:'No se extrae solamente: se aprende a transformar.',reflection:'Los materiales no son neutros. El carbón, el werregue, la fibra, la hoja, el maíz o el metal revelan relaciones con el entorno y con las técnicas que los transforman.',tags:['carbón','werregue','materia','transformación'],symbol:'❧',note:'fuego · fibra · conocimiento'},
{id:'objeto',n:'4',x:724,y:228,scale:.50,angle:150,accent:'#84422d',title:'Objeto familiar',phrase:'La abundancia también envejece',idea:'Un objeto familiar puede perder parte de su origen exacto, pero conservar un valor simbólico profundo.',detailTitle:'La abundancia también envejece',detailPhrase:'Un regalo antiguo. Una memoria que permanece.',reflection:'La jarra familiar muestra que un objeto puede conservar valor aunque su origen exacto se vuelva incompleto. Su sentido permanece porque fue cuidado, exhibido y recordado.',tags:['memoria','símbolo','abundancia','permanencia','cuidado'],symbol:'♜',note:'objeto · símbolo · cuidado',poster:true},
{id:'cocina',n:'5',x:1138,y:424,scale:.38,angle:222,accent:'#b0792f',title:'Cocina familiar',phrase:'Tres sabores para no olvidar',idea:'La cocina transmite saberes, afectos y formas de cuidado familiar.',detailTitle:'Tres sabores para no olvidar',detailPhrase:'No se heredan solo recetas; se heredan formas de cuidar.',reflection:'Las galletas cucas, los tamales y el chocolate muestran que la cocina familiar transmite saberes, pero también afectos, vínculos y formas de cuidado.',tags:['cucas','tamales','chocolate','afecto','familia','cuidado'],symbol:'◡',note:'sabor · afecto · familia',poster:true}
];
const CORE = {id:'nucleo',n:'6',title:'Preservar no es congelar',phrase:'Cuidar, transformar y transmitir.',detailTitle:'Preservar no es congelar',detailPhrase:'Una primera experiencia textil y un regalo hecho para mí.',reflection:'Preservar no significa repetir el pasado mecánicamente. Significa cuidar lo que vale la pena, transformarlo con sentido y transmitirlo para que siga vivo.\n\nEste objeto textil fue una experiencia completamente nueva para mí. Nunca había cosido, tejido y rellenado una pieza de esta manera. Al principio solo veía telas, hilo y una espiral dibujada; durante el proceso tuve que aprender a unir las capas, controlar la puntada, darle volumen y corregir lo que no salía como esperaba. Fue un ejercicio de paciencia: avanzar despacio, deshacer cuando era necesario y confiar en que la forma aparecería con el trabajo de las manos.\n\nLa clase me ayudó a entender que un oficio no se conoce únicamente mirando el resultado. También está en el tiempo que exige, en la relación con el material y en las decisiones pequeñas que casi no se ven. Las costuras irregulares y las imperfecciones de esta primera pieza no son algo que quiera ocultar; son la evidencia de un aprendizaje real y de una técnica que apenas empecé a comprender al practicarla.\n\nDecidí hacerla como un regalo para mí. La espiral conecta con el recorrido de esta bitácora: volver sobre las mismas preguntas, pero hacerlo desde una mirada distinta. El objeto guarda el tiempo de la clase, la sorpresa de crear algo que antes no sabía hacer y la satisfacción de convertir materiales sencillos en una pieza con significado personal.\n\nAl terminarlo entendí que lo que permanece en las manos no es solamente una técnica. Permanece la paciencia, el cuidado, la memoria del proceso y la posibilidad de reconocerme en algo hecho por mí.',tags:['cuidar','transformar','transmitir','paciencia','aprendizaje','regalo personal'],gallery:[{key:'nucleo_proceso',label:'Proceso de creación',alt:'Proceso de creación del objeto textil en forma de espiral'},{key:'nucleo_resultado_claro',label:'Resultado final · cara clara',alt:'Resultado final del objeto textil en su cara clara'},{key:'nucleo_resultado_azul',label:'Resultado final · cara azul',alt:'Resultado final del objeto textil en su cara azul'}]};
const app=document.getElementById('app'),viewport=document.getElementById('viewport'),world=document.getElementById('world'),layer=document.getElementById('clustersLayer');
const panel=document.getElementById('detailPanel'),scrim=document.getElementById('scrim'),caption=document.getElementById('clusterCaption');
const live=document.getElementById('live');
let step=0, panelItem=null, resizeTimer=null;
document.getElementById('authorImage').src=IMG_SOURCES.author;
document.getElementById('logoImage').src=IMG_SOURCES.logo;
function rng(seed){let s=seed>>>0;return()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296}}
function atomHTML(type,x,y,content,detail,extra=''){
return `<span class="atom ${type} ${detail?'detail':'major'} ${extra}" style="left:${x.toFixed(1)}px;top:${y.toFixed(1)}px">${content||''}</span>`;
}
function buildCluster(c,idx){
const r=rng(4141+idx*937),a=c.angle*Math.PI/180,u=[Math.cos(a),Math.sin(a)],n=[-Math.sin(a),Math.cos(a)];
let atoms='';
const count=Math.round(40*c.scale+9),band=145;
for(let i=0;i<count;i++){
const t=(r()*2-1)*350;
const curve=Math.sin((t/350)*Math.PI)*42;
const off=(r()*2-1)*band + curve;
const x=u[0]*t+n[0]*off, y=u[1]*t+n[1]*off;
const p=r();
if(i<c.tags.length){
const tag=c.tags[i];atoms+=atomHTML('word',x,y,tag,i>1);
}else if(p<.58){
const size=3+r()*7;atoms+=`<span class="atom dot ${i%4?'detail':'major'}" style="left:${x.toFixed(1)}px;top:${y.toFixed(1)}px;width:${size.toFixed(1)}px;height:${size.toFixed(1)}px;opacity:${(.28+r()*.55).toFixed(2)}"></span>`;
}else if(p<.75){
const size=16+r()*26;atoms+=`<span class="atom ring detail" style="left:${x.toFixed(1)}px;top:${y.toFixed(1)}px;width:${size.toFixed(1)}px;height:${size.toFixed(1)}px"></span>`;
}else if(p<.9){atoms+=atomHTML('tile',x,y,'',true)}
else{atoms+=atomHTML('symbol',x,y,c.symbol,true)}
}
atoms+=atomHTML('note',u[0]*225+n[0]*-90,u[1]*225+n[1]*-90,c.note,true);
const el=document.createElement('section');
el.className='cluster';el.dataset.id=c.id;el.dataset.index=idx;
el.style.cssText=`left:${c.x}px;top:${c.y}px;transform:scale(${c.scale});--accent:${c.accent}`;
el.innerHTML=`${atoms}<div class="anchor" role="button" tabindex="0" aria-label="Acercarse a ${c.title}"><img class="thumb" src="${IMG_SOURCES[c.id]}" alt="Preview de ${c.title}"><div class="anchor-copy"><div class="anchor-top"><span class="number">${c.n}</span><span class="stage-label">Tramo ${c.n} · hacia el centro</span></div><h3>${c.title}</h3><p class="anchor-phrase">${c.phrase}</p><button class="open-detail" type="button">Abrir reflexión →</button></div></div>`;
layer.appendChild(el);
}
CLUSTERS.forEach(buildCluster);
const rail=document.getElementById('routeRail');
const routes=[{n:'00',title:'Vista general'},...CLUSTERS.map(c=>({n:c.n,title:c.title})),{n:'06',title:'Núcleo final'}];
routes.forEach((r,i)=>{
if(i===1||i===6){const d=document.createElement('span');d.className='route-divider';rail.appendChild(d)}
const b=document.createElement('button');b.className='route-step';b.dataset.step=i;b.innerHTML=`<b>${r.n}</b><span>${r.title}</span>`;b.addEventListener('click',()=>goTo(i));rail.appendChild(b);
});
function camera(targetX,targetY,scale,overview=false){
const w=viewport.clientWidth,h=viewport.clientHeight;
const screenX=overview && w>720?w*.67:w*.5;
const screenY=overview && w<=720?h*.73:h*.49;
world.style.transform=`translate(${screenX-scale*targetX}px,${screenY-scale*targetY}px) scale(${scale})`;
}
function overviewScale(){
const w=viewport.clientWidth,h=viewport.clientHeight;
const availableW=w>720?w*.70:w*.94;
return Math.min(availableW/1600,(h-76)/1160)*.96;
}
function focusScale(c){
const w=viewport.clientWidth;
const desired=w<720?w*.78:Math.min(570,w*.49);
return desired/(330*c.scale);
}
function updateRail(){
rail.querySelectorAll('.route-step').forEach(b=>b.classList.toggle('active',Number(b.dataset.step)===step));
const active=rail.querySelector('.route-step.active');if(active)active.scrollIntoView({inline:'center',block:'nearest',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
}
function clearFocus(){
document.querySelectorAll('.cluster').forEach(el=>el.classList.remove('active'));
world.classList.remove('has-focus');document.getElementById('core').classList.remove('active');caption.classList.remove('visible');
}
function updateCaption(c,index,isCore=false){
caption.querySelector('.cap-step').textContent=isCore?'Núcleo final':`Tramo ${index+1} de ${CLUSTERS.length}`;
caption.querySelector('h2').textContent=c.title;caption.querySelector('p').textContent=c.idea||c.phrase;
caption.querySelector('.instruction').textContent=isCore?'Abre el núcleo para leer la reflexión final.':'Selecciona «Abrir reflexión» para leer el detalle.';
caption.classList.add('visible');
}
function goTo(next){
step=Math.max(0,Math.min(CLUSTERS.length+1,next));closePanel();clearFocus();updateRail();
if(step===0){app.classList.remove('is-zoomed');camera(820,575,overviewScale(),true);live.textContent='Vista general de la bitácora';return}
app.classList.add('is-zoomed');world.classList.add('has-focus');
if(step<=CLUSTERS.length){
const c=CLUSTERS[step-1],el=document.querySelector(`.cluster[data-id="${c.id}"]`);el.classList.add('active');camera(c.x,c.y,focusScale(c));updateCaption(c,step-1);live.textContent=`Tramo ${step}: ${c.title}. ${c.phrase}`;
}else{
const core=document.getElementById('core');core.classList.add('active');camera(886,578,Math.min(viewport.clientWidth<720?4.0:5.4,viewport.clientWidth/170*.62));updateCaption({...CORE,idea:'Lo que permanece en las manos no es solo una técnica: es una forma de pertenecer.'},5,true);live.textContent='Núcleo final: Preservar no es congelar';
}
}
function openPanel(item){
panelItem=item;document.getElementById('panelIndex').textContent=item.id==='nucleo'?'Núcleo final':`Sección ${item.n} de ${CLUSTERS.length}`;
document.getElementById('panelTitle').textContent=item.detailTitle;document.getElementById('panelQuote').textContent=item.detailPhrase;document.getElementById('panelReflection').textContent=item.reflection;
const media=document.getElementById('panelMedia'),img=document.getElementById('panelImage'),gallery=document.getElementById('panelGallery'),galleryNote=document.getElementById('panelGalleryNote');
const hasGallery=Array.isArray(item.gallery)&&item.gallery.length;
media.classList.toggle('gallery',!!hasGallery);media.classList.toggle('poster',!hasGallery&&!!item.poster);
img.hidden=!!hasGallery;gallery.hidden=!hasGallery;galleryNote.hidden=!hasGallery;
if(hasGallery){
gallery.innerHTML=item.gallery.map((shot,i)=>`<button class="panel-shot ${i===0?'process':'result'}" type="button" data-shot="${i}" aria-label="Ampliar ${shot.label}"><img src="${IMG_SOURCES[shot.key]}" alt="${shot.alt}"><span>${shot.label}</span></button>`).join('');
}else{
gallery.innerHTML='';img.src=IMG_SOURCES[item.id];img.alt=`Pieza visual de ${item.title}`;
}
document.getElementById('panelTags').innerHTML=item.tags.map(t=>`<span class="tag">${t}</span>`).join('');
const expand=document.getElementById('mediaExpand');expand.hidden=!!hasGallery;expand.textContent=item.poster?'Ver pieza completa':'Ampliar preview';
panel.classList.add('open');panel.setAttribute('aria-hidden','false');scrim.classList.add('open');setTimeout(()=>document.getElementById('panelClose').focus(),120);
}
function closePanel(){panel.classList.remove('open');panel.setAttribute('aria-hidden','true');scrim.classList.remove('open')}
function showLightbox(src,alt,captionText){document.getElementById('lightboxImage').src=src;document.getElementById('lightboxImage').alt=alt;document.getElementById('lightboxCaption').textContent=captionText;document.getElementById('lightbox').classList.add('open');document.getElementById('lightbox').setAttribute('aria-hidden','false')}
function openLightbox(){if(!panelItem)return;showLightbox(IMG_SOURCES[panelItem.id],`Vista ampliada de ${panelItem.title}`,panelItem.detailTitle)}
function closeLightbox(){document.getElementById('lightbox').classList.remove('open');document.getElementById('lightbox').setAttribute('aria-hidden','true')}
layer.addEventListener('click',e=>{
const cluster=e.target.closest('.cluster');if(!cluster)return;const idx=Number(cluster.dataset.index);if(e.target.closest('.open-detail')){e.stopPropagation();openPanel(CLUSTERS[idx]);return}goTo(idx+1);
});
layer.addEventListener('keydown',e=>{
if(e.key!=='Enter'&&e.key!==' ')return;const anchor=e.target.closest('.anchor');if(!anchor)return;e.preventDefault();const idx=Number(anchor.closest('.cluster').dataset.index);goTo(idx+1);
});
document.getElementById('coreButton').addEventListener('click',()=>goTo(CLUSTERS.length+1));
document.getElementById('coreReveal').addEventListener('click',()=>openPanel(CORE));
document.getElementById('coreReveal').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openPanel(CORE)}});
document.getElementById('startBtn').addEventListener('click',()=>goTo(1));
document.getElementById('overviewBtn').addEventListener('click',()=>goTo(0));
document.getElementById('zoomInBtn').addEventListener('click',()=>goTo(step+1));
document.getElementById('zoomOutBtn').addEventListener('click',()=>goTo(step-1));
document.getElementById('panelClose').addEventListener('click',closePanel);document.getElementById('panelBack').addEventListener('click',closePanel);scrim.addEventListener('click',closePanel);
document.getElementById('mediaExpand').addEventListener('click',openLightbox);document.getElementById('lightboxClose').addEventListener('click',closeLightbox);document.getElementById('lightbox').addEventListener('click',e=>{if(e.target.id==='lightbox')closeLightbox()});
document.getElementById('panelGallery').addEventListener('click',e=>{const shot=e.target.closest('.panel-shot');if(!shot||!panelItem||!panelItem.gallery)return;const data=panelItem.gallery[Number(shot.dataset.shot)];showLightbox(IMG_SOURCES[data.key],data.alt,data.label)});
document.addEventListener('keydown',e=>{
if(e.key==='Escape'){if(document.getElementById('lightbox').classList.contains('open'))closeLightbox();else if(panel.classList.contains('open'))closePanel();else goTo(0)}
else if(!panel.classList.contains('open')&&!document.getElementById('lightbox').classList.contains('open')){if(e.key==='ArrowRight'){e.preventDefault();goTo(step+1)}else if(e.key==='ArrowLeft'){e.preventDefault();goTo(step-1)}}
});
window.addEventListener('resize',()=>{clearTimeout(resizeTimer);world.classList.add('no-anim');resizeTimer=setTimeout(()=>{goTo(step);requestAnimationFrame(()=>world.classList.remove('no-anim'))},80)});
world.classList.add('no-anim');goTo(0);requestAnimationFrame(()=>requestAnimationFrame(()=>world.classList.remove('no-anim')));
})();