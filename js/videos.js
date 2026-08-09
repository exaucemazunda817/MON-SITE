/* ============================================
   VIDEOS.JS — Video gallery & single video page
   ============================================ */

document.addEventListener('DOMContentLoaded', async () => {
  const videos = await fetchJSON('content/videos.json');
  if (!videos.length) return;

  // --- Gallery Page ---
  const galleryContainer = document.getElementById('videos-gallery');
  if (galleryContainer) {
    renderVideoGallery(videos, galleryContainer);
  }

  // --- Single Video Page ---
  const videoContainer = document.getElementById('video-single');
  if (videoContainer) {
    renderSingleVideo(videos, videoContainer);
  }
});

function renderVideoGallery(videos, container) {
  // Get unique categories
  const categories = ['Toutes', ...new Set(videos.map(v => v.category))];

  // Filter bar
  const filterBar = document.getElementById('videos-filter');
  if (filterBar) {
    filterBar.innerHTML = categories.map(cat =>
      `<button class="filter-btn ${cat === 'Toutes' ? 'active' : ''}" data-category="${cat}">${cat}</button>`
    ).join('');

    filterBar.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const cat = btn.dataset.category;
        const filtered = cat === 'Toutes' ? videos : videos.filter(v => v.category === cat);
        container.innerHTML = `<div class="grid grid--3">${filtered.map(v => createVideoCard(v)).join('')}</div>`;
        initReveal();
      });
    });
  }

  // Sort by date descending
  const sorted = [...videos].sort((a, b) => new Date(b.date) - new Date(a.date));
  container.innerHTML = `<div class="grid grid--3">${sorted.map(v => createVideoCard(v)).join('')}</div>`;
}

function renderSingleVideo(videos, container) {
  const slug = getUrlParam('slug');
  const video = videos.find(v => v.slug === slug);

  if (!video) {
    container.innerHTML = `
      <div class="container" style="padding: 4rem 0; text-align: center;">
        <h2>Vidéo introuvable</h2>
        <p style="margin: 1rem 0;">La vidéo que vous recherchez n'existe pas ou a été déplacée.</p>
        <a href="videos.html" class="btn btn--primary">Voir toutes les vidéos</a>
      </div>
    `;
    return;
  }

  // Update page title
  document.title = `${video.title} — Exauce Mazunda`;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = video.description;

  container.innerHTML = `
    <div class="container container--narrow" style="padding: var(--space-3xl) 0 var(--space-4xl);">
      <a href="videos.html" class="back-link">
        ${ICONS.arrowLeft} Retour aux formations
      </a>

      <div class="video-player">
        <iframe src="${video.embedUrl}" title="${video.title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>

      <div class="article-header__meta" style="margin-bottom: var(--space-md);">
        <span class="card__category">${video.category}</span>
        <span>${ICONS.calendar} ${formatDate(video.date)}</span>
        <span>${ICONS.clock} ${video.duration}</span>
      </div>

      <h1 style="font-size: var(--fs-3xl); margin-bottom: var(--space-lg);">${video.title}</h1>
      <p style="font-size: var(--fs-md); color: var(--color-text-light); line-height: var(--lh-relaxed);">${video.description}</p>

      <div class="share-bar">
        <span>Partager :</span>
        <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(video.title)}&url=${encodeURIComponent(window.location.href)}" target="_blank" class="social-link" aria-label="Partager sur X">${ICONS.twitter}</a>
        <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}" target="_blank" class="social-link" aria-label="Partager sur LinkedIn">${ICONS.linkedin}</a>
      </div>
    </div>
  `;
}
