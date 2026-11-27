/* =====================================================
   RESOURCES.JS — Bibliothèque de ressources à télécharger
   ===================================================== */

document.addEventListener('DOMContentLoaded', async () => {
  const resources = await fetchJSON('content/resources.json');
  const container = document.getElementById('resources-list');
  if (!container) return;

  const total = resources.reduce((s, r) => s + (r.downloads || 0) + getDownloads(r.id), 0);
  const nEl = document.getElementById('stat-resources');
  const dEl = document.getElementById('stat-downloads');
  if (nEl) nEl.textContent = resources.length;
  if (dEl) dEl.textContent = total.toLocaleString('fr-FR');

  renderResources(resources, container);
});

function renderResources(resources, container) {
  const sorted = [...resources].sort((a, b) =>
    Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
    ((b.downloads || 0) + getDownloads(b.id)) - ((a.downloads || 0) + getDownloads(a.id)));

  const themes = [...new Set(sorted.map(r => r.theme))];
  const filterBar = document.getElementById('resources-filter');
  const search = document.getElementById('resources-search');
  const countEl = document.getElementById('resources-count');
  let current = 'all', query = '';

  if (filterBar) {
    filterBar.innerHTML = `<button class="pill is-active" data-t="all" aria-pressed="true">Tout <small>${sorted.length}</small></button>` +
      themes.map(t => `<button class="pill" data-t="${esc(t)}" aria-pressed="false">${esc(t)} <small>${sorted.filter(r => r.theme === t).length}</small></button>`).join('');
    filterBar.addEventListener('click', e => {
      const b = e.target.closest('.pill'); if (!b) return;
      current = b.dataset.t;
      filterBar.querySelectorAll('.pill').forEach(x => { x.classList.toggle('is-active', x === b); x.setAttribute('aria-pressed', x === b); });
      draw();
    });
  }
  if (search) search.addEventListener('input', () => { query = search.value.trim().toLowerCase(); draw(); });

  function card(r, i) {
    const d = domainOf(r.theme);
    const dl = (r.downloads || 0) + getDownloads(r.id);
    return `
      <article class="rcard" data-reveal="" data-i="${i % 3}">
        <div class="rcard__top tint-${d}">
          <span class="rcard__type">${esc(r.theme)}</span>
          <span class="rcard__glyph">${esc(glyphOf(r.title.replace(/^.*?:\s*/, '')))}</span>
        </div>
        <div class="rcard__body">
          <span class="kick">${esc(DOMAIN_LABEL[d])}</span>
          <h3 class="rcard__title">${esc(r.title)}</h3>
          <p class="rcard__desc">${esc(r.description)}</p>
          <div class="rcard__stats">
            <div><b>PDF</b><span>format</span></div>
            <div><b>${esc(r.fileSize || '—')}</b><span>taille</span></div>
            <div><b>${dl.toLocaleString('fr-FR')}</b><span>téléchargements</span></div>
          </div>
          <a href="${resourceHref(r)}" class="btn btn--primary btn--sm" onclick="trackDownload('${esc(r.id)}')" download>${ICONS.download} Télécharger le PDF</a>
        </div>
      </article>`;
  }

  function draw() {
    const list = sorted.filter(r =>
      (current === 'all' || r.theme === current) &&
      (!query || (r.title + ' ' + r.description + ' ' + r.theme).toLowerCase().includes(query)));
    if (countEl) countEl.innerHTML = `<b>${list.length}</b> ressource${list.length > 1 ? 's' : ''}`;
    container.innerHTML = list.length ? list.map(card).join('') : '<p class="empty">Aucune ressource ne correspond à votre recherche.</p>';
    initReveal();
  }
  draw();
}
