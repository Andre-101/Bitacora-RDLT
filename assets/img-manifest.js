(() => {
  const svg = markup => 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(markup);
  const b64 = window.__IMG_B64 || {};
  const webp = (key, fallback = '') => b64[key] ? `data:image/webp;base64,${b64[key]}` : fallback;
  const card = (bg, accent, eyebrow, title, subtitle, art) => svg(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="760" viewBox="0 0 1200 760"><defs><linearGradient id="p" x2="1" y2="1"><stop stop-color="${bg}"/><stop offset="1" stop-color="#e1c79f"/></linearGradient></defs><rect width="1200" height="760" fill="url(#p)"/><path d="M0 650C260 560 420 730 680 620s340-80 520-10v150H0z" fill="${accent}" opacity=".09"/><text x="70" y="92" font-family="Arial" font-size="22" letter-spacing="6" fill="${accent}">${eyebrow}</text><text x="68" y="190" font-family="Georgia" font-size="66" fill="#2b1d15">${title}</text><text x="70" y="248" font-family="Georgia" font-style="italic" font-size="32" fill="${accent}">${subtitle}</text>${art}</svg>`);
  const logo = svg(`<svg xmlns="http://www.w3.org/2000/svg" width="520" height="230" viewBox="0 0 520 230"><g fill="#2b1d15"><g transform="translate(86 115)">${Array.from({length:24},(_,i)=>`<rect x="-5" y="-82" width="10" height="31" rx="5" transform="rotate(${i*15})"/>`).join('')}</g><circle cx="86" cy="115" r="25" fill="none" stroke="#2b1d15" stroke-width="9"/><text x="154" y="84" font-family="Arial, sans-serif" font-size="31">Universidad</text><text x="150" y="158" font-family="Arial, sans-serif" font-size="76" font-weight="700" letter-spacing="2">ICESI</text></g></svg>`);
  const fallbackCore = card('#eeeae0','#5e8790','NÚCLEO FINAL','Objeto para mí','Proceso y resultado','<path d="M650 530c0-150 250-150 250 0 0 112-190 112-190 0 0-70 120-70 120 0" fill="none" stroke="#5eb5c8" stroke-width="55" stroke-linecap="round"/>');

  window.IMG_SOURCES = {
    author: webp('author'),
    logo,
    objeto: webp('objeto'),
    cocina: webp('cocina', card('#f1dfbd','#a75b34','COCINA FAMILIAR','Tres sabores para no olvidar','Afecto · familia · cuidado','')),
    nucleo_proceso: webp('nucleo_proceso', fallbackCore),
    nucleo_resultado_claro: webp('nucleo_resultado_claro', fallbackCore),
    nucleo_resultado_azul: webp('nucleo_resultado_azul', fallbackCore),
    escuelas: card('#39251a','#ad5b3b','ESCUELAS TALLER','Aprender haciendo','El oficio vuelve a pasar de una mano a otra.','<g transform="translate(680 330)" fill="none" stroke="#e8c98a" stroke-width="12"><path d="M0 260V75l115-60 115 60v185M250 260V105l125-65 125 65v155M-35 260h570M70 260v-95h92v95M335 260v-120h100v120"/></g>'),
    mapa: card('#efe2c9','#2a4558','MAPA DE OFICIOS','Una geografía de saberes','Territorio · comunidad · materia prima','<g transform="translate(705 305)"><path d="M180 0l75 55 35 90 70 55-20 90 38 82-62 82-12 92-72 38-25 105-66 32-40-62-70-28-8-82-50-69 24-75-35-74 53-62 26-98 74-40z" fill="#f8edda" stroke="#2a4558" stroke-width="10"/><g fill="#ad5b3b" stroke="#fff" stroke-width="5"><circle cx="180" cy="85" r="17"/><circle cx="105" cy="250" r="17"/><circle cx="255" cy="308" r="17"/><circle cx="160" cy="445" r="17"/></g></g>'),
    materiales: card('#efe2c9','#627257','MATERIALES Y TERRITORIO','No se extrae','Se aprende a transformar','<g transform="translate(640 330)"><rect width="230" height="310" rx="24" fill="#171512"/><path d="M40 255l45-165 65 35 45 135z" fill="#2f2c28" stroke="#796c5e" stroke-width="6"/><rect x="270" width="230" height="310" rx="24" fill="#49633f"/><g fill="none" stroke="#ecdcae" stroke-width="7"><ellipse cx="385" cy="178" rx="82" ry="58"/><ellipse cx="385" cy="178" rx="60" ry="40"/><path d="M312 142c48 48 98 48 146 0M312 214c48-48 98-48 146 0M345 112v132M385 105v146M425 112v132"/></g></g>'),
    nucleo: fallbackCore
  };

  const required = ['author','objeto','cocina','nucleo_proceso','nucleo_resultado_claro','nucleo_resultado_azul'];
  const missing = required.filter(key => !b64[key]);
  if (missing.length) console.warn('Bitácora: recursos con respaldo visual:', missing);
  delete window.__IMG_B64;
})();
