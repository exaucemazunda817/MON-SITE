/* =====================================================
   SERVICES.JS — Services & réalisations
   ===================================================== */

const SERVICE_ICONS = [ICONS.laptop, ICONS.doc, ICONS.droit, ICONS.entre, ICONS.book, ICONS.cap, ICONS.mic];

function serviceIcon(s, i) {
  const t = (s.title || '').toLowerCase();
  if (/bibl|théolog|theolog/.test(t)) return ICONS.book;
  if (/jurid|droit/.test(t)) return ICONS.droit;
  if (/entrepren/.test(t)) return ICONS.entre;
  if (/mémoire|memoire|tfc|rédaction|redaction/.test(t)) return ICONS.doc;
  if (/bureautique|digital|informatique/.test(t)) return ICONS.laptop;
  if (/conférence|conference|intervention/.test(t)) return ICONS.mic;
  return SERVICE_ICONS[i % SERVICE_ICONS.length];
}

document.addEventListener('DOMContentLoaded', async () => {
  const services = await fetchJSON('content/services.json');
  const servicesContainer = document.getElementById('services-list');
  if (servicesContainer) {
    servicesContainer.innerHTML = services.map((s, i) => `
      <article class="svc" data-reveal="" data-i="${i % 2}">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="${serviceIcon(s, i)}"/></svg>
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.description)}</p>
        <a href="contact.html?demande=${encodeURIComponent(s.title)}" class="svc__link">En parler →</a>
      </article>`).join('');
  }

  const portfolio = await fetchJSON('content/portfolio.json');
  const portfolioSection = document.getElementById('portfolio-section');
  const portfolioContainer = document.getElementById('portfolio-list');
  if (portfolioContainer) {
    if (!portfolio.length) {
      if (portfolioSection) portfolioSection.remove();
    } else {
      renderPortfolio(portfolio, portfolioContainer);
    }
  }

  initReveal();
});

const PORTFOLIO_TYPE_LABELS = { image: 'Images', pdf: 'Documents', text: 'Écrits' };

function renderPortfolio(posts, container) {
  const sorted = [...posts].sort(byDateDesc);
  const types = [...new Set(sorted.map(p => PORTFOLIO_TYPE_LABELS[p.type] || p.type))];
  const filterBar = document.getElementById('portfolio-filter');
  let current = 'all';

  if (filterBar && types.length > 1) {
    filterBar.innerHTML = `<button class="pill is-active" data-t="all">Tout</button>` +
      types.map(t => `<button class="pill" data-t="${esc(t)}">${esc(t)}</button>`).join('');
    filterBar.addEventListener('click', e => {
      const b = e.target.closest('.pill'); if (!b) return;
      current = b.dataset.t;
      filterBar.querySelectorAll('.pill').forEach(x => x.classList.toggle('is-active', x === b));
      draw();
    });
  }

  function item(p, i) {
    if (p.type === 'image') {
      return `
        <a href="${esc(p.image)}" target="_blank" rel="noopener" class="rrow" data-reveal="" data-i="${i}">
          <img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy" style="width:56px;height:68px;object-fit:cover;border-radius:6px">
          <div class="rrow__body"><span class="kick">${formatDate(p.date, true)}</span><span class="rrow__title">${esc(p.title)}</span><span class="rrow__desc">${esc(p.description || '')}</span></div>
          <span class="link-arrow">Voir →</span>
        </a>`;
    }
    if (p.type === 'pdf') {
      return `
        <div class="rrow" data-reveal="" data-i="${i}">
          <span class="pdf-ico pdf-ico--droit">PDF</span>
          <div class="rrow__body"><span class="kick">${formatDate(p.date, true)}${p.fileSize ? ' · ' + esc(p.fileSize) : ''}</span><span class="rrow__title">${esc(p.title)}</span><span class="rrow__desc">${esc(p.description || '')}</span></div>
          <a href="assets/downloads/${esc(p.fileName)}" class="btn btn--primary btn--sm" download>${ICONS.download} Télécharger</a>
        </div>`;
    }
    return `
      <div class="rrow" data-reveal="" data-i="${i}" style="grid-template-columns:minmax(0,1fr)">
        <div class="rrow__body"><span class="kick">${formatDate(p.date, true)}</span><span class="rrow__title">${esc(p.title)}</span><span class="rrow__desc">${esc(p.body || p.description || '')}</span></div>
      </div>`;
  }

  function draw() {
    const list = current === 'all' ? sorted : sorted.filter(p => (PORTFOLIO_TYPE_LABELS[p.type] || p.type) === current);
    container.innerHTML = list.map(item).join('');
    initReveal();
  }
  draw();
}
