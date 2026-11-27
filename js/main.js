/* =====================================================
   MAIN.JS — Monsieur Mazunda « Le Seuil »
   Utilitaires, en-tête, pied de page, cartes, animations
   ===================================================== */

const SITE = {
  whatsapp: 'https://wa.me/243828516026',
  whatsappLabel: '+243 828 516 026',
  email: 'exaucemazunda817@gmail.com',
  formspree: 'https://formspree.io/f/xoeajrbn',
  socials: [
    { name: 'YouTube', href: 'https://www.youtube.com/channel/UCEH1oUw3yWVAtDM6vBPnXpA' },
    { name: 'TikTok', href: 'https://www.tiktok.com/@monsieurmzd?_t=ZM-8u5NvLQ7aGD&_r=1' },
    { name: 'Facebook', href: 'https://www.facebook.com/share/15qBt1YB9n/?mibextid=wwXIfr' },
    { name: 'Instagram', href: 'https://www.instagram.com/monsieurmazunda?igsh=MTZ5YjduYjR5NjM0cg%3D%3D&utm_source=qr' },
    { name: 'X', href: 'https://x.com/exauce_maz817?s=21' }
  ]
};

// --- Icônes ---
const ICONS = {
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg>',
  play: '<svg viewBox="0 0 24 24"><path d="M8 5l11 7-11 7z" fill="#14163F"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>',
  star: '<svg viewBox="0 0 24 24" width="12" height="12"><path d="M12 2L13.9 9.1 21 12 13.9 14.9 12 22 10.1 14.9 3 12 10.1 9.1Z" fill="currentColor"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20l1.5-4A8 8 0 1 1 9 19.5z"/><circle cx="12" cy="12" r="1.6" fill="#F5B731" stroke="none"/></svg>',
  link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8.5V6.8c0-.8.5-1 1-1h2V2.5h-2.8C11.3 2.5 10.6 4.6 10.6 6v2.5H8.5V12h2.1v9.5H14V12h2.8l.4-3.5H14z"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
  // Domaines
  bible: 'M5 21V11a7 7 0 0 1 14 0v10M5 21h14M9.5 21v-6a2.5 2.5 0 0 1 5 0v6',
  droit: 'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 13h6M9 17h6',
  entre: 'M6 6h8a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h9',
  cap: 'M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5',
  book: 'M3 5h6a3 3 0 0 1 3 3v12a2.5 2.5 0 0 0-2.5-2.5H3zM21 5h-6a3 3 0 0 0-3 3v12a2.5 2.5 0 0 1 2.5-2.5H21z',
  mic: 'M12 3a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM5 11a7 7 0 0 0 14 0M12 18v3M8 21h8',
  doc: 'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 13h6M9 17h4',
  laptop: 'M4 5h16v10H4zM2 19h20'
};

// --- Utilitaires ---
function formatDate(dateStr, short) {
  const date = new Date(dateStr);
  if (isNaN(date)) return '';
  return date.toLocaleDateString('fr-FR', short
    ? { year: 'numeric', month: 'short', day: 'numeric' }
    : { year: 'numeric', month: 'long', day: 'numeric' });
}

function getUrlParam(param) {
  return new URLSearchParams(window.location.search).get(param);
}

async function fetchJSON(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Erreur de chargement: ${path}`, error);
    return [];
  }
}

function esc(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function byDateDesc(a, b) { return new Date(b.date) - new Date(a.date); }

// Domaine (Bible, Droit, Entrepreneuriat) déduit de la catégorie
function domainOf(category) {
  const c = (category || '').toLowerCase();
  if (/bibl|foi|théolog|theolog|âme|ame|chrét|spirit|évangile|predic|prédic/.test(c)) return 'bible';
  if (/droit|jurid|ohada|loi|légal|legal/.test(c)) return 'droit';
  return 'entre';
}
const DOMAIN_LABEL = { bible: 'Bible', droit: 'Droit', entre: 'Entrepreneuriat' };

// Glyphe des illustrations : première lettre significative du titre
function glyphOf(title) {
  const words = String(title || '').replace(/[«»"“”’'?!:.,]/g, ' ').split(/\s+/).filter(Boolean);
  const stop = /^(le|la|les|l|un|une|des|du|de|d|et|en|pour|pourquoi|comment|quel|quelle|quelles|quels|à|a|au|aux)$/i;
  const w = words.find(x => !stop.test(x)) || words[0] || 'M';
  if (/^\d+$/.test(w)) return w;
  return w.charAt(0).toUpperCase();
}

function archArt(domain, glyph, cls = '') {
  return `<div class="arch-art arch-art--${domain} ${cls}"><div class="arch-art__a"><div class="arch-art__b"><span>${esc(glyph)}</span></div></div></div>`;
}

// --- En-tête ---
const NAV = [
  { name: 'Articles', href: 'articles.html', id: 'articles' },
  { name: 'Formations vidéo', href: 'videos.html', id: 'videos' },
  { name: 'Ressources', href: 'resources.html', id: 'resources' },
  { name: 'Services', href: 'services.html', id: 'services' },
  { name: 'À propos', href: 'about.html', id: 'about' }
];

function renderHeader(activePage, theme) {
  const dark = theme === 'dark' || theme === 'indigo';
  const links = NAV.map(p =>
    `<a href="${p.href}" class="${p.id === activePage ? 'is-active' : ''}"${p.id === activePage ? ' aria-current="page"' : ''}>${p.name}</a>`
  ).join('');
  const ctaClass = dark ? 'btn--safran' : (activePage === 'contact' ? 'btn--nuit' : 'btn--primary');
  return `
    <header class="hd ${theme === 'dark' ? 'hd--dark' : ''} ${theme === 'indigo' ? 'hd--dark hd--indigo' : ''}" id="header">
      <div class="wrap hd__inner">
        <a href="index.html" class="hd__logo" aria-label="Monsieur Mazunda, accueil">
          <img class="full" src="assets/brand/logo-horizontal-${dark ? 'fonce' : 'clair'}.svg" alt="Monsieur Mazunda" width="236" height="79">
          <img class="mono" src="assets/brand/monogramme-${dark ? 'fonce' : 'clair'}.svg" alt="Monsieur Mazunda" width="38" height="44">
        </a>
        <nav class="hd__nav" aria-label="Navigation principale">${links}</nav>
        <a href="contact.html" class="btn hd__cta ${ctaClass}">Me contacter</a>
        <button class="hd__burger" id="navToggle" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="drawer"><span></span><span></span></button>
      </div>
    </header>
    <div class="drawer" id="drawer" aria-hidden="true">
      <div class="drawer__top">
        <img src="assets/brand/monogramme-clair.svg" alt="Monsieur Mazunda">
        <button class="drawer__close" id="navClose" aria-label="Fermer le menu">×</button>
      </div>
      <nav aria-label="Menu mobile">
        <a href="index.html" class="${activePage === 'home' ? 'is-active' : ''}">Accueil <span>→</span></a>
        ${NAV.map(p => `<a href="${p.href}" class="${p.id === activePage ? 'is-active' : ''}">${p.name} <span>→</span></a>`).join('')}
        <a href="contact.html" class="${activePage === 'contact' ? 'is-active' : ''}">Contact <span>→</span></a>
      </nav>
      <div class="drawer__actions">
        <a href="contact.html" class="btn btn--primary">Me contacter</a>
        <a href="${SITE.whatsapp}" target="_blank" rel="noopener" class="btn btn--outline">Écrire sur WhatsApp</a>
      </div>
    </div>
    <a href="${SITE.whatsapp}" target="_blank" rel="noopener" class="wa-fab" aria-label="Écrire sur WhatsApp">${ICONS.whatsapp.replace('currentColor', '#F4EFE6')}</a>
  `;
}

// --- Pied de page ---
function renderFooter() {
  const col = (title, items) => `
    <div class="ft__col"><h4>${title}</h4>${items.map(([label, href, ext]) =>
      `<a href="${href}"${ext ? ' target="_blank" rel="noopener"' : ''}>${label}</a>`).join('')}</div>`;
  return `
    <footer class="ft band-nuit stripes-soft">
      <div class="wrap">
        <div class="ft__grid">
          <div class="ft__brand">
            <img src="assets/brand/logo-horizontal-fonce.svg" alt="Monsieur Mazunda" width="240" height="81" loading="lazy">
            <em>Partager, former, inspirer.</em>
          </div>
          ${col('Explorer', [['Articles', 'articles.html'], ['Formations vidéo', 'videos.html'], ['Ressources', 'resources.html'], ['À propos', 'about.html']])}
          ${col('Travailler ensemble', [['Services', 'services.html'], ['Contact', 'contact.html'], ['WhatsApp', SITE.whatsapp, true], ['E-mail', 'mailto:' + SITE.email]])}
          ${col('Suivre', SITE.socials.map(s => [s.name, s.href, true]))}
        </div>
        <div class="ft__bottom">
          <span>© ${new Date().getFullYear()} Exaucé Mazunda · Kinshasa, RDC</span>
          <span>Enseignant · Juriste · Auteur</span>
        </div>
      </div>
    </footer>
  `;
}

// --- Initialisation de la mise en page ---
function initLayout(activePage, theme) {
  const headerEl = document.getElementById('site-header');
  if (headerEl) headerEl.innerHTML = renderHeader(activePage, theme);
  const footerEl = document.getElementById('site-footer');
  if (footerEl) footerEl.innerHTML = renderFooter();

  const header = document.getElementById('header');
  const toggle = document.getElementById('navToggle');
  const close = document.getElementById('navClose');
  const drawer = document.getElementById('drawer');

  const setMenu = (open) => {
    if (!drawer) return;
    drawer.classList.toggle('is-open', open);
    drawer.setAttribute('aria-hidden', String(!open));
    toggle && toggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
    if (open && close) close.focus();
  };
  toggle && toggle.addEventListener('click', () => setMenu(!drawer.classList.contains('is-open')));
  close && close.addEventListener('click', () => { setMenu(false); toggle && toggle.focus(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  initNewsletterForm();
  document.querySelectorAll('[data-logo]').forEach(el => mountLogo(el, el.getAttribute('data-logo')));
}

// --- Lettre d'information (Formspree) ---
function initNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;
  const message = document.getElementById('newsletterMessage');
  const button = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const original = button.textContent;
    button.disabled = true;
    button.textContent = 'Envoi…';
    if (message) { message.textContent = ''; message.className = 'nl__msg'; }
    try {
      const data = new FormData(form);
      data.append('_subject', 'Nouvelle inscription à la lettre');
      const response = await fetch(SITE.formspree, { method: 'POST', headers: { Accept: 'application/json' }, body: data });
      if (!response.ok) throw new Error('Formspree');
      form.reset();
      if (message) { message.textContent = 'Merci ! Vous êtes inscrit, à dimanche.'; message.classList.add('msg-ok'); }
    } catch (error) {
      if (message) { message.textContent = 'Une erreur est survenue, veuillez réessayer.'; message.classList.add('msg-err'); }
    } finally {
      button.disabled = false;
      button.textContent = original;
    }
  });
}

// --- Niveau d'animation ---
function motionLevel() {
  const c = navigator.connection;
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return 'reduit';
  if ((c && (c.saveData || /2g$/.test(c.effectiveType || ''))) || (navigator.deviceMemory && navigator.deviceMemory <= 1)) return 'allege';
  return 'complet';
}

// --- Révélations au défilement ---
// data-reveal="" (fondu + glissement) | "arch" (masque en arche) | "draw" (tracé SVG)
function initReveal(root) {
  root = root || document;
  if (!('IntersectionObserver' in window)) return;
  const level = motionLevel();
  const full = level === 'complet', red = level === 'reduit';
  const AP = 'cubic-bezier(.22,1,.36,1)', EAU = 'cubic-bezier(.45,.05,.35,1)';
  const els = Array.from(root.querySelectorAll('[data-reveal]:not([data-rv])'));
  els.forEach(el => {
    el.setAttribute('data-rv', '1');
    const t = el.getAttribute('data-reveal');
    const i = +(el.getAttribute('data-i') || 0);
    el.__d = red ? 0 : i * (t === 'arch' ? 120 : 80);
    el.style.transition = 'none';
    if (t === 'draw') { el.style.strokeDasharray = '1'; el.style.strokeDashoffset = full ? '1' : '0'; }
    else if (t === 'arch' && full) {
      el.style.clipPath = 'inset(100% 0 0 0 round 999px 999px 0 0)';
      const im = el.querySelector('img'); if (im) { im.style.transition = 'none'; im.style.transform = 'scale(1.08)'; }
    } else { el.style.opacity = '0'; if (full) el.style.transform = 'translateY(16px)'; }
  });
  const show = el => {
    const t = el.getAttribute('data-reveal'), d = el.__d || 0;
    if (t === 'draw') { el.style.transition = `stroke-dashoffset 1200ms ${EAU} ${d}ms`; el.style.strokeDashoffset = '0'; }
    else if (t === 'arch' && full) {
      el.style.transition = `clip-path 900ms ${AP} ${d}ms`; el.style.clipPath = 'inset(0 0 0 0 round 999px 999px 12px 12px)';
      const im = el.querySelector('img'); if (im) { im.style.transition = `transform 1200ms ${AP} ${d}ms`; im.style.transform = 'scale(1)'; }
    } else {
      const dur = full ? 600 : red ? 150 : 300;
      el.style.transition = `opacity ${dur}ms ${AP} ${d}ms, transform ${dur}ms ${AP} ${d}ms`;
      el.style.opacity = '1'; el.style.transform = 'none';
    }
  };
  // Un élément masqué par clip-path n'a plus de surface visible : on observe alors son parent.
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target.__rvEl || e.target;
        requestAnimationFrame(() => requestAnimationFrame(() => show(el)));
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => {
    if (el.getAttribute('data-reveal') === 'arch' && el.parentElement) {
      el.parentElement.__rvEl = el;
      io.observe(el.parentElement);
    } else io.observe(el);
  });
}

// --- Monogramme animé « Le Seuil » ---
function mountLogo(container, theme) {
  const level = motionLevel();
  const full = level === 'complet', dark = theme !== 'clair';
  const NS = 'http://www.w3.org/2000/svg';
  const keepCase = { viewBox: 1, pathLength: 1, maskUnits: 1 };
  const h = (tag, props, ...kids) => {
    const el = document.createElementNS(NS, tag);
    Object.entries(props || {}).forEach(([k, v]) => {
      if (k === 'style') Object.assign(el.style, v);
      else el.setAttribute(keepCase[k] ? k : k.replace(/[A-Z]/g, m => '-' + m.toLowerCase()), v);
    });
    kids.flat().forEach(c => c && el.appendChild(c));
    return el;
  };
  const AP = 'cubic-bezier(.22,1,.36,1)', EAU = 'cubic-bezier(.45,.05,.35,1)', ONDE = 'cubic-bezier(.16,1,.3,1)', REB = 'cubic-bezier(.34,1.56,.64,1)';
  const L = dark ? '#F4EFE6' : '#2A2FBF', S = dark ? '#F5B731' : '#E0A21C', star = dark ? '#FFE7AE' : '#E0A21C', corner = dark ? '#D8CFC0' : '#5A5FD8', hi = dark ? '#FFE7AE' : '#FFF3D6';
  const arches = dark ? ['#3539CF', '#4549DC', '#6A62C9'] : ['#E4E4F8', '#C9CAF2', '#A9ABEA'];
  const A = (n, d, delay, e) => full ? `${n} ${d}ms ${e || AP} ${delay}ms both` : 'none';
  const box = o => ({ transformBox: 'fill-box', transformOrigin: o || '50% 100%' });
  const draw = (d, delay, e) => ({ strokeDasharray: '1', strokeDashoffset: full ? '1' : '0', animation: A('mm-draw', d, delay, e || EAU) });
  const root = level === 'allege' ? { animation: 'mm-fade 300ms ease both' } : level === 'reduit' ? { animation: 'mm-fade 150ms linear both' } : {};
  const mid = 'mmz' + Math.random().toString(36).slice(2, 7);
  const lines = [[128, 72], [137, 76], [146, 68], [155, 75], [164, 64]];
  const ad = ['M82 182V150A39 39 0 0 1 160 150V182Z', 'M91 182V153A30 30 0 0 1 151 153V182Z', 'M100 182V156A21 21 0 0 1 142 156V182Z', 'M108 182V159A13 13 0 0 1 134 159V182Z'];
  const fills = arches.concat([S]);
  const svg = h('svg', { viewBox: '0 0 260 300', width: '100%', height: '100%', role: 'img', 'aria-label': 'Monogramme Monsieur Mazunda', style: root },
    h('defs', null, h('mask', { id: mid, maskUnits: 'userSpaceOnUse', x: -20, y: 0, width: 300, height: 320 },
      h('path', { d: 'M121 186 L121 204 Q122 212 138 212 L160 212 Q172 216 158 226 L112 258 Q104 267 126 267 L204 267', fill: 'none', stroke: '#fff', strokeWidth: 22, strokeLinecap: 'round', strokeLinejoin: 'round', pathLength: 1, style: draw(620, 1050) }))),
    h('g', { transform: 'translate(-6 -5)' },
      h('g', { stroke: L, strokeLinecap: 'round', strokeWidth: 2, opacity: dark ? .5 : .4 }, lines.map((l, i) => h('line', { x1: 52, y1: l[0], x2: l[1], y2: l[0], pathLength: 1, style: draw(260, 330 + i * 50, AP) }))),
      ad.map((d, i) => h('path', { d, fill: fills[i], style: Object.assign(box(), { animation: A('mm-arch', 460, 450 + i * 100) }) })),
      h('path', { d: 'M121 130L122.6 134.4L127 136L122.6 137.6L121 142L119.4 137.6L115 136L119.4 134.4Z', fill: star, style: Object.assign(box('50% 50%'), { animation: A('mm-star', 420, 900, REB) }) }),
      h('path', { d: 'M82 150A39 39 0 0 1 160 150', fill: 'none', stroke: S, strokeWidth: 1.4, pathLength: 1, style: draw(500, 520, AP) }),
      h('g', { fill: L, style: { animation: A('mm-rise', 380, 0) } },
        h('rect', { x: 34, y: 30, width: 9, height: 152 }), h('polygon', { points: '42,30 82,30 121,104 158,30 166,30 121,126' }), h('polygon', { points: '158,30 174,30 194,50 194,182 158,182' })),
      h('polygon', { points: '174,30 194,50 174,50', fill: corner, style: { animation: A('mm-rise', 380, 0) } }),
      h('g', { fill: L, style: Object.assign(box('50% 50%'), { animation: A('mm-open', 420, 160) }) },
        h('path', { d: 'M34 180Q80 166 121 186L121 193Q80 173 34 187Z' }), h('path', { d: 'M121 186Q162 166 194 180L194 187Q162 173 121 193Z' })),
      h('g', { fill: 'none', stroke: L, strokeWidth: 1.2, opacity: .5, style: Object.assign(box('50% 50%'), { animation: A('mm-open', 420, 240) }) }, h('path', { d: 'M38 192Q80 178 119 197' }), h('path', { d: 'M123 197Q162 178 190 190' })),
      h('g', { fill: S, mask: `url(#${mid})` }, h('path', { d: 'M116 186C117 198 113 205 124 207L132 207C126 202 127 196 126 186Z' }), h('path', { d: 'M120 207C134 206 150 207 158 207C174 207 178 217 166 225L121 255C116 259 118 261 126 261L160 261C176 261 192 262 200 266C190 271 162 272 120 272C96 272 93 261 106 253L146 222C150 219 148 218 142 218L126 218C116 218 112 210 120 207Z' })),
      h('path', { d: 'M160 222Q140 236 124 248', stroke: hi, strokeWidth: 2, strokeLinecap: 'round', fill: 'none', pathLength: 1, style: draw(240, 1500) }),
      h('ellipse', { cx: 184, cy: 270, rx: 30, ry: 7, fill: 'none', stroke: S, strokeWidth: 1.6, opacity: .6, style: Object.assign(box('50% 50%'), { animation: A('mm-ring', 520, 1560, ONDE) }) }),
      h('ellipse', { cx: 184, cy: 271, rx: 44, ry: 10.5, fill: 'none', stroke: S, strokeWidth: 1.1, opacity: .35, style: Object.assign(box('50% 50%'), { animation: A('mm-ring', 560, 1680, ONDE) }) }),
      h('circle', { cx: 208, cy: 250, r: 2.6, fill: S, style: Object.assign(box('50% 50%'), { animation: A('mm-drop', 320, 1500, REB) }) }),
      h('circle', { cx: 214, cy: 240, r: 1.6, fill: S, style: Object.assign(box('50% 50%'), { animation: A('mm-drop', 320, 1590, REB) }) })
    ));
  container.innerHTML = '';
  container.appendChild(svg);
}

// --- Cartes ---
function createArticleCard(article, i = 0) {
  const d = domainOf(article.category);
  return `
    <a href="article.html?slug=${encodeURIComponent(article.slug)}" class="acard" data-reveal="" data-i="${i % 3}">
      ${archArt(d, glyphOf(article.title))}
      <div class="acard__body">
        <span class="kick">${esc(article.category)}<small> · ${article.readTime} min</small></span>
        <h3 class="acard__title">${esc(article.title)}</h3>
        <p class="acard__ex">${esc(article.excerpt)}</p>
        <span class="acard__date">${formatDate(article.date, true)}</span>
      </div>
    </a>`;
}

function createFeaturedArticle(article) {
  const d = domainOf(article.category);
  return `
    <a href="article.html?slug=${encodeURIComponent(article.slug)}" class="feature" data-reveal="">
      <div class="arch-art arch-art--${d} feature__art">
        <div class="arch-art__a"><div class="arch-art__b"><div class="arch-art__c"><span>${esc(glyphOf(article.title))}</span></div></div></div>
        <span class="badge-new"><span class="star">${ICONS.star}</span>Nouveau</span>
      </div>
      <div class="feature__body">
        <span class="tag">${esc(DOMAIN_LABEL[d])} · ${esc(article.category)}</span>
        <h3 class="feature__title">${esc(article.title)}</h3>
        <p class="feature__ex">${esc(article.excerpt)}</p>
        <span class="meta"><span>${formatDate(article.date)}</span><span>${article.readTime} min de lecture</span></span>
        <span class="link-arrow">Lire l'article →</span>
      </div>
    </a>`;
}

const COVER_TONES = ['lin', 'nuit', 'safran'];
function videoCover(video, i, opts = {}) {
  const tone = opts.tone || COVER_TONES[i % COVER_TONES.length];
  return `
    <div class="vcover vcover--${tone} ${opts.arch ? 'vcover--arch' : ''}">
      ${opts.arch ? '<span class="vcover__arch"></span>' : ''}
      <span class="vcover__t">${esc(video.title)}</span>
      ${opts.noPlay ? '' : `<span class="play">${ICONS.play}</span>`}
      ${video.duration ? `<span class="dur">${esc(video.duration)}</span>` : ''}
    </div>`;
}

function createVideoCard(video, i = 0, opts = {}) {
  return `
    <a href="video.html?slug=${encodeURIComponent(video.slug)}" class="vcard" data-reveal="" data-i="${i % 3}">
      ${videoCover(video, i, opts)}
      <span class="vcard__kick">${esc(video.category)}<small> · ${formatDate(video.date, true)}</small></span>
      <h3 class="vcard__title">${esc(video.title)}</h3>
    </a>`;
}

function resourceHref(r) { return r.fileUrl || `assets/downloads/${r.fileName}`; }

function createResourceRow(r, i = 0) {
  const d = domainOf(r.theme);
  const dl = (r.downloads || 0) + getDownloads(r.id);
  return `
    <div class="rrow" data-reveal="" data-i="${i}">
      <span class="pdf-ico pdf-ico--${d}">PDF</span>
      <div class="rrow__body">
        <span class="kick">${esc(r.theme)}</span>
        <span class="rrow__title">${esc(r.title)}</span>
        <span class="meta"><span>${esc(r.fileSize || '')}</span>${dl ? `<span>${dl.toLocaleString('fr-FR')} téléchargements</span>` : ''}</span>
      </div>
      <a href="${resourceHref(r)}" class="btn btn--primary btn--sm" onclick="trackDownload('${esc(r.id)}')" download>${ICONS.download} Télécharger</a>
    </div>`;
}

// Alias conservé pour compatibilité
function createResourceCard(r) { return createResourceRow(r); }

// --- Compteur de téléchargements (localStorage, best effort) ---
function readCounts() {
  try { return JSON.parse(localStorage.getItem('downloadCounts') || '{}'); } catch (e) { return {}; }
}
function getDownloads(id) { return readCounts()[id] || 0; }
function trackDownload(id) {
  try {
    const counts = readCounts();
    counts[id] = (counts[id] || 0) + 1;
    localStorage.setItem('downloadCounts', JSON.stringify(counts));
  } catch (e) { /* stockage indisponible */ }
}

document.addEventListener('DOMContentLoaded', () => initReveal());
