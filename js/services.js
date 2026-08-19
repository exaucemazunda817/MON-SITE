/* ============================================
   SERVICES.JS — Services offered & portfolio feed
   ============================================ */

document.addEventListener('DOMContentLoaded', async () => {
  const services = await fetchJSON('content/services.json');
  const servicesContainer = document.getElementById('services-list');
  if (servicesContainer && services.length) {
    servicesContainer.innerHTML = services.map(s => `
      <div class="service-card fade-in">
        <div class="service-card__icon">${ICONS.briefcase}</div>
        <h3 class="service-card__title">${s.title}</h3>
        <p class="service-card__desc">${s.description}</p>
      </div>
    `).join('');
  }

  const portfolio = await fetchJSON('content/portfolio.json');
  const portfolioContainer = document.getElementById('portfolio-list');
  if (portfolioContainer) {
    renderPortfolioList(portfolio, portfolioContainer);
  }

  initReveal();
});

const PORTFOLIO_TYPE_LABELS = {
  image: 'Images',
  pdf: 'Documents',
  text: 'Écrits'
};

function renderPortfolioList(posts, container) {
  if (!posts.length) {
    container.innerHTML = `
      <p style="text-align: center; color: var(--color-text-light);">
        Aucune publication pour le moment. Revenez bientôt pour découvrir des réalisations, documents et réflexions.
      </p>
    `;
    return;
  }

  const types = ['Tous', ...new Set(posts.map(p => PORTFOLIO_TYPE_LABELS[p.type] || p.type))];

  const filterBar = document.getElementById('portfolio-filter');
  if (filterBar) {
    filterBar.innerHTML = types.map(type =>
      `<button class="filter-btn ${type === 'Tous' ? 'active' : ''}" data-type="${type}">${type}</button>`
    ).join('');

    filterBar.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const type = btn.dataset.type;
        const filtered = type === 'Tous' ? posts : posts.filter(p => (PORTFOLIO_TYPE_LABELS[p.type] || p.type) === type);
        renderPortfolioCards(filtered, container);
      });
    });
  }

  renderPortfolioCards(posts, container);
}

function renderPortfolioCards(posts, container) {
  const sorted = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));

  container.innerHTML = sorted.map(p => {
    if (p.type === 'image') {
      return `
        <a href="${p.image}" target="_blank" rel="noopener" class="resource-card fade-in">
          <div class="resource-card__icon resource-card__icon--photo">
            <img src="${p.image}" alt="${p.title}" loading="lazy">
          </div>
          <div class="resource-card__content">
            <h3 class="resource-card__title">${p.title}</h3>
            <p class="resource-card__desc">${p.description || ''}</p>
            <div class="resource-card__meta">
              <span>${formatDate(p.date)}</span>
            </div>
          </div>
        </a>
      `;
    }

    if (p.type === 'pdf') {
      return `
        <div class="resource-card fade-in">
          <div class="resource-card__icon">${ICONS.file}</div>
          <div class="resource-card__content">
            <h3 class="resource-card__title">${p.title}</h3>
            <p class="resource-card__desc">${p.description || ''}</p>
            <div class="resource-card__meta">
              <span>${formatDate(p.date)}</span>
              ${p.fileSize ? `<span>•</span><span>${p.fileSize}</span>` : ''}
            </div>
          </div>
          <div class="resource-card__action">
            <a href="assets/downloads/${p.fileName}" class="btn btn--accent btn--sm" download>
              ${ICONS.download} Télécharger
            </a>
          </div>
        </div>
      `;
    }

    // type === 'text'
    return `
      <div class="resource-card fade-in">
        <div class="resource-card__icon">${ICONS.pen}</div>
        <div class="resource-card__content">
          <h3 class="resource-card__title">${p.title}</h3>
          <p class="resource-card__desc">${p.body || p.description || ''}</p>
          <div class="resource-card__meta">
            <span>${formatDate(p.date)}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  initReveal();
}
