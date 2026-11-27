/* =====================================================
   VIDEOS.JS — Formations vidéo & page vidéo
   ===================================================== */

document.addEventListener('DOMContentLoaded', async () => {
  const videos = (await fetchJSON('content/videos.json')).sort(byDateDesc);

  const gallery = document.getElementById('videos-gallery');
  if (gallery) renderVideoGallery(videos, gallery);

  const single = document.getElementById('video-single');
  if (single) renderSingleVideo(videos, single);
});

function youtubeId(video) {
  const m = String(video.embedUrl || '').match(/embed\/([\w-]+)/);
  return m ? m[1] : '';
}

function renderVideoGallery(videos, container) {
  const hero = document.getElementById('videos-hero');
  if (hero && videos.length) {
    const v = videos[0];
    hero.innerHTML = `
      <div data-reveal="">
        <span class="eyebrow eyebrow--safran">À la une · ${esc(v.category)}</span>
        <h1 class="h1">${esc(v.title)}</h1>
        <p>${esc(v.description)}</p>
        <div class="meta">${v.duration ? `<span>${esc(v.duration)}</span>` : ''}<span>${formatDate(v.date)}</span><span>Sur YouTube</span></div>
        <div class="btn-row" style="margin-top:28px">
          <a href="video.html?slug=${encodeURIComponent(v.slug)}" class="btn btn--safran">Regarder →</a>
        </div>
      </div>
      <a href="video.html?slug=${encodeURIComponent(v.slug)}" class="vcard" aria-label="Regarder ${esc(v.title)}" data-reveal="" data-i="1">
        <div class="vcover vcover--lin vcover--thumb">
          ${v.thumbnail ? `<img src="${esc(v.thumbnail)}" alt="" loading="eager">` : `<span class="vcover__t">${esc(v.title)}</span>`}
          <span class="play">${ICONS.play}</span>
          ${v.duration ? `<span class="dur">${esc(v.duration)}</span>` : ''}
        </div>
      </a>`;
  }

  const cats = [...new Set(videos.map(v => v.category))];
  const filterBar = document.getElementById('videos-filter');
  let current = 'all';
  if (filterBar) {
    filterBar.innerHTML = `<button class="pill is-active" data-c="all" aria-pressed="true">Tout <small>${videos.length}</small></button>` +
      cats.map(c => `<button class="pill" data-c="${esc(c)}" aria-pressed="false">${esc(c)} <small>${videos.filter(v => v.category === c).length}</small></button>`).join('');
    filterBar.addEventListener('click', e => {
      const b = e.target.closest('.pill'); if (!b) return;
      current = b.dataset.c;
      filterBar.querySelectorAll('.pill').forEach(x => { x.classList.toggle('is-active', x === b); x.setAttribute('aria-pressed', x === b); });
      draw();
    });
  }

  function draw() {
    const list = current === 'all' ? videos : videos.filter(v => v.category === current);
    container.innerHTML = list.length
      ? list.map((v, i) => createVideoCard(v, i, { arch: true, tone: ['nuit', 'safran', 'lin'][i % 3] })).join('')
      : '<p class="empty">Aucune vidéo pour le moment.</p>';
    initReveal();
  }
  draw();
}

function renderSingleVideo(videos, container) {
  const slug = getUrlParam('slug');
  const video = videos.find(v => v.slug === slug);

  if (!video) {
    container.innerHTML = `
      <div class="wrap notfound">
        <h1 class="h2">Vidéo introuvable</h1>
        <p class="lead">La vidéo que vous recherchez n'existe pas ou a été déplacée.</p>
        <a href="videos.html" class="btn btn--primary">Voir toutes les formations</a>
      </div>`;
    return;
  }

  document.title = `${video.title} — Monsieur Mazunda`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = video.description;

  const url = window.location.href;
  const id = youtubeId(video);
  const next = videos.filter(v => v.slug !== video.slug).slice(0, 4);

  container.innerHTML = `
    <section class="band-nuit stripes-soft vhero">
      <div class="wrap vhero__grid">
        <div class="player">
          <iframe src="${esc(video.embedUrl)}" title="${esc(video.title)}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <aside>
          <div class="vside__label">${next.length ? 'Vidéos suivantes' : 'Formations vidéo'}</div>
          <div class="vnext">
            ${next.length ? next.map((v, i) => `
              <a href="video.html?slug=${encodeURIComponent(v.slug)}">
                ${videoCover(v, i, { tone: ['indigo', 'safran', 'lin'][i % 3], noPlay: true })}
                <div><span class="kick">${esc(v.category)}</span><div class="t">${esc(v.title)}</div></div>
              </a>`).join('') : '<a href="videos.html"><div class="t">Voir toutes les formations →</div></a>'}
          </div>
        </aside>
      </div>
    </section>

    <section class="wrap" style="padding:48px var(--gutter) 112px">
      <nav class="crumbs" aria-label="Fil d'Ariane" style="padding-top:0">
        <a href="videos.html">Formations vidéo</a><span>/</span>
        <span>${esc(video.category)}</span><span>/</span>
        <strong>${esc(video.title)}</strong>
      </nav>
      <div style="max-width:860px">
        <span class="tag" style="margin-top:20px">${esc(video.category)}</span>
        <h1 class="h1" style="margin:18px 0 14px;font-size:clamp(36px,4.4vw,60px)">${esc(video.title)}</h1>
        <div class="meta"><span>${formatDate(video.date)}</span>${video.duration ? `<span>${esc(video.duration)}</span>` : ''}</div>
        <p class="lead" style="margin:22px 0 28px">${esc(video.description)}</p>
        <div class="btn-row">
          <a class="btn btn--nuit btn--sm" target="_blank" rel="noopener" href="https://wa.me/?text=${encodeURIComponent(video.title + ' ' + url)}">Partager sur WhatsApp</a>
          ${id ? `<a class="btn btn--soft btn--sm" target="_blank" rel="noopener" href="https://www.youtube.com/watch?v=${id}">Voir sur YouTube</a>` : ''}
          <a class="btn btn--soft btn--sm" href="videos.html">← Toutes les formations</a>
        </div>
      </div>
    </section>
  `;
}
