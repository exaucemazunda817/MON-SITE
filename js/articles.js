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

async function renderSingleArticle(articles, container) {
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
  document.title = `${article.title} — MonsieurMazunda`;

  // Update meta description
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = article.excerpt;

  const content = await getArticleContent(article);

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
      ${content}

      ${article.pdfUrl ? `
        <div class="article-download">
          <h2>Lire l’étude complète</h2>
          <p>Retrouvez l’intégralité de cette étude au format PDF.</p>
          <a href="${article.pdfUrl}" class="btn btn--primary" download>
            ${ICONS.download} Télécharger le PDF
          </a>
        </div>
      ` : ''}
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

function formatArticleText(text, article) {
  const normalized = text.replace(/\r\n/g, '\n').trim();
  const introText = article.slug === 'pourquoi-dieu-crea-l-homme-et-la-femme'
    ? extractIntroductionText(normalized)
    : normalized;

  const blocks = introText.split(/\n{2,}/).map(block => block.trim()).filter(Boolean);
  return blocks.map(block => {
    const upper = block.toUpperCase();
    if (upper === 'INTRODUCTION' || /^INTRODUCTION\b/.test(block)) {
      return '<h2><strong>INTRODUCTION</strong></h2>';
    }
    if (/^[A-ZÀÂÄÇÉÈÊËÎÏÔÖÛÜÙŸÆŒ][^\n]*$/.test(block) && block.length < 120) {
      return `<h2>${escapeHTML(block)}</h2>`;
    }
    return `<p>${escapeHTML(block)}</p>`;
  }).join('');
}

function extractIntroductionText(text) {
  const headingIndex = text.search(/\n{2,}L[’']?HOMME\b/i);
  if (headingIndex !== -1) {
    return text.slice(0, headingIndex).trim();
  }
  return text;
}

async function getArticleContent(article) {
  if (article.slug === 'pourquoi-dieu-crea-l-homme-et-la-femme') {
    return `
      <div class="article-full-text">
        <h2><strong>INTRODUCTION</strong></h2>
        <p>Imaginons un groupe d’individus amnésiques, échoués sur une île inconnue, sans repères ni direction. Chacun lutte pour survivre, se laissant guider par ses impulsions et créant des règles sociales au fur et à mesure. Pourtant, aucun ne se pose réellement la question du pourquoi de son existence. Ils cherchent à remplir le vide de leur quotidien par des distractions, des réussites matérielles, mais sans jamais interroger le sens profond de leur présence sur cette île. Cette image illustre la condition de l’humanité sans Dieu.</p>
        <p>L’homme, lorsqu’il est livré à lui-même, ne peut trouver la véritable paix et le bonheur (Jean 15:5). Il peut accumuler des biens, atteindre des succès, ou multiplier les plaisirs pour tenter de combler un vide intérieur. Mais au bout de cette quête, il réalise souvent qu’il est passé à côté de quelque chose de fondamental (Ecclésiaste 1:14).</p>
        <p>Ce n’est qu’au crépuscule de sa vie qu’il prend conscience qu’il a négligé la question essentielle : pourquoi suis-je ici ? Alors, à côté de la question de notre origine « comment avons-nous été créés ? » surgit une interrogation existentielle : quel est le but de ma vie sur terre ? Cette question est à l’origine de nombreuses philosophies et théories, qui tentent d’apporter des réponses, mais aucune n’atteint pleinement la vérité sans la reconnaissance de notre Créateur.</p>
        <p>Aujourd’hui, en observant les crises sociales et existentielles auxquelles l’humanité fait face, que ce soit les conflits d’identité, les luttes pour le pouvoir ou les fractures sociales, il devient évident que ces maux découlent souvent d’un manque de compréhension du but de la création humaine.</p>
        <p>Cet article a pour but d’éclairer ces questions fondamentales : pourquoi avons-nous été créés ? Pourquoi sommes-nous homme ou femme ? Et quel est le véritable sens de notre existence ? En suivant ce cheminement, nous espérons que ces lignes, avec l’aide de Dieu, vous guideront vers une compréhension plus profonde de notre raison d’être et du sens ultime de notre vie.</p>
      </div>
    `;
  }

  if (!article.contentFile) return article.content || '';

  try {
    const response = await fetch(article.contentFile);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const text = await response.text();
    return `<div class="article-full-text">${formatArticleText(text, article)}</div>`;
  } catch (error) {
    console.error(`Erreur de chargement: ${article.contentFile}`, error);
    return '<p>Le contenu complet de cet article ne peut pas être chargé pour le moment.</p>';
  }
}

function escapeHTML(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}
