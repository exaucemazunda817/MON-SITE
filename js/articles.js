/* ============================================
   ARTICLES.JS — Article list & single article page
   ============================================ */

document.addEventListener('DOMContentLoaded', async () => {
  const articles = await fetchJSON('content/articles.json');
  if (!articles.length) return;

  // --- List Page ---
  const listContainer = document.getElementById('articles-list');
  if (listContainer) {
    renderArticlesList(articles, listContainer);
  }

  // --- Single Article Page ---
  const articleContainer = document.getElementById('article-single');
  if (articleContainer) {
    renderSingleArticle(articles, articleContainer);
  }
});

function renderArticlesList(articles, container) {
  // Get unique categories
  const categories = ['Tous', ...new Set(articles.map(a => a.category))];

  // Filter bar
  const filterBar = document.getElementById('articles-filter');
  if (filterBar) {
    filterBar.innerHTML = categories.map(cat =>
      `<button class="filter-btn ${cat === 'Tous' ? 'active' : ''}" data-category="${cat}">${cat}</button>`
    ).join('');

    filterBar.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const cat = btn.dataset.category;
        const filtered = cat === 'Tous' ? articles : articles.filter(a => a.category === cat);
        container.innerHTML = filtered.map(a => createArticleCard(a)).join('');
        initReveal();
      });
    });
  }

  // Sort by date descending
  const sorted = [...articles].sort((a, b) => new Date(b.date) - new Date(a.date));
  container.innerHTML = sorted.map(a => createArticleCard(a)).join('');
}

function renderSingleArticle(articles, container) {
  const slug = getUrlParam('slug');
  const article = articles.find(a => a.slug === slug);

  if (!article) {
    container.innerHTML = `
      <div class="container" style="padding: 4rem 0; text-align: center;">
        <h2>Article introuvable</h2>
        <p style="margin: 1rem 0;">L'article que vous recherchez n'existe pas ou a été déplacé.</p>
        <a href="articles.html" class="btn btn--primary">Voir tous les articles</a>
      </div>
    `;
    return;
  }

  // Update page title
  document.title = `${article.title} — Exauce Mazunda`;

  // Update meta description
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = article.excerpt;

  container.innerHTML = `
    <div class="container">
      <a href="articles.html" class="back-link">
        ${ICONS.arrowLeft} Retour aux articles
      </a>

      <div class="article-header">
        <div class="article-header__meta">
          <span class="card__category">${article.category}</span>
          <span>${ICONS.calendar} ${formatDate(article.date)}</span>
          <span>${ICONS.clock} ${article.readTime} min de lecture</span>
        </div>
        <h1 class="article-header__title">${article.title}</h1>
        <p class="article-header__excerpt">${article.excerpt}</p>
      </div>
    </div>

    <div class="container">
      <img src="${article.image}" alt="${article.title}" class="article-cover">
    </div>

    <div class="article-content">
      ${article.content}
    </div>

    <div class="article-content">
      <div class="share-bar">
        <span>Partager :</span>
        <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}" target="_blank" class="social-link" aria-label="Partager sur X">${ICONS.twitter}</a>
        <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}" target="_blank" class="social-link" aria-label="Partager sur LinkedIn">${ICONS.linkedin}</a>
      </div>
    </div>
  `;
}
