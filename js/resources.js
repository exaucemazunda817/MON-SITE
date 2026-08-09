/* ============================================
   RESOURCES.JS — Downloadable resources page
   ============================================ */

document.addEventListener('DOMContentLoaded', async () => {
  const resources = await fetchJSON('content/resources.json');
  if (!resources.length) return;

  const container = document.getElementById('resources-list');
  if (!container) return;

  renderResourcesList(resources, container);
});

function renderResourcesList(resources, container) {
  // Get unique themes
  const themes = ['Tous', ...new Set(resources.map(r => r.theme))];

  // Filter bar
  const filterBar = document.getElementById('resources-filter');
  if (filterBar) {
    filterBar.innerHTML = themes.map(theme =>
      `<button class="filter-btn ${theme === 'Tous' ? 'active' : ''}" data-theme="${theme}">${theme}</button>`
    ).join('');

    filterBar.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const theme = btn.dataset.theme;
        const filtered = theme === 'Tous' ? resources : resources.filter(r => r.theme === theme);
        renderResourceCards(filtered, container);
      });
    });
  }

  renderResourceCards(resources, container);
}

function renderResourceCards(resources, container) {
  // Merge JSON download counts with localStorage counts
  const mergedResources = resources.map(r => {
    const localCount = getDownloads(r.id);
    return { ...r, totalDownloads: r.downloads + localCount };
  });

  // Featured resources stay at the top, then sort the rest by downloads.
  const sorted = [...mergedResources].sort((a, b) =>
    Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
    b.totalDownloads - a.totalDownloads
  );

  container.innerHTML = sorted.map(r => {
    const downloads = r.totalDownloads;
    return `
      <div class="resource-card fade-in">
        <div class="resource-card__icon">
          ${ICONS.file}
        </div>
        <div class="resource-card__content">
          <h3 class="resource-card__title">${r.title}</h3>
          <p class="resource-card__desc">${r.description}</p>
          <div class="resource-card__meta">
            <span>${r.theme}</span>
            <span>•</span>
            <span>${r.fileSize}</span>
            <span>•</span>
            <span>${downloads} téléchargements</span>
          </div>
        </div>
        <div class="resource-card__action">
          <a href="assets/downloads/${r.fileName}" class="btn btn--accent btn--sm" onclick="trackDownload('${r.id}')" download>
            ${ICONS.download} Télécharger
          </a>
        </div>
      </div>
    `;
  }).join('');

  initReveal();
}
