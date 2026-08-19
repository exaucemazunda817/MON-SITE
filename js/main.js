/* ============================================
   MAIN.JS — Shared utilities, header/footer, navigation
   ============================================ */

// --- SVG Icons ---
const ICONS = {
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',
  arrowLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>',
  file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>',
  briefcase: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16M2 13h20"/></svg>',
  pen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',
  image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>',
  play: '<svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21" fill="currentColor"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
  twitter: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
  github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>',
  tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 5.82c-1.01-.88-1.66-2.16-1.66-3.6h-3.09v13.72c0 1.66-1.35 3.02-3.02 3.02a3.02 3.02 0 01-3.02-3.02 3.02 3.02 0 013.02-3.02c.31 0 .61.05.9.13V9.94a6.11 6.11 0 00-.9-.07 6.13 6.13 0 00-6.13 6.13A6.13 6.13 0 008.83 22a6.13 6.13 0 006.13-6.13V8.7a7.83 7.83 0 004.57 1.47V7.08c-1.01 0-1.95-.31-2.93-1.26z"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C8.74 0 8.333.014 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.014 8.333 0 8.74 0 12s.014 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.986 8.74 24 12 24s3.667-.014 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.058-1.28.072-1.687.072-4.947s-.014-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.014 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zm0 10.162c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.645-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>'
};

// --- Utility Functions ---
function formatDate(dateStr) {
  const date = new Date(dateStr);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('fr-FR', options);
}

function getUrlParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
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

// --- Header Component ---
function renderHeader(activePage) {
  const pages = [
    { name: 'Accueil', href: 'index.html', id: 'home' },
    { name: 'Articles', href: 'articles.html', id: 'articles' },
    { name: 'Mes services', href: 'services.html', id: 'services' },
    { name: 'Formations vidéo', href: 'videos.html', id: 'videos' },
    { name: 'Ressources', href: 'resources.html', id: 'resources' },
    { name: 'À propos', href: 'about.html', id: 'about' },
    { name: 'Contact', href: 'contact.html', id: 'contact' }
  ];

  const navLinks = pages.map(p =>
    `<li><a href="${p.href}" class="nav__link ${p.id === activePage ? 'active' : ''}">${p.name}</a></li>`
  ).join('');

  return `
    <header class="header" id="header">
      <div class="header__inner">
        <a href="index.html" class="header__logo">Monsieur<span>Mazunda</span></a>
        <button class="nav__toggle" id="navToggle" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
        <nav class="nav" id="nav">
          <ul class="nav__list">${navLinks}</ul>
        </nav>
        <div class="nav-overlay" id="navOverlay"></div>
      </div>
    </header>
  `;
}

// --- Footer Component ---
function renderFooter() {
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer__inner">
          <div class="footer__brand">
            <a href="index.html" class="header__logo" style="color: white;">Monsieur<span>Mazunda</span></a>
            <p>Partager, former et inspirer. Je crée du contenu autour de la formation biblique, du droit et de l'entrepreneuriat pour vous aider à grandir spirituellement et professionnellement.</p>
          </div>
          <div>
            <h4 class="footer__title">Navigation</h4>
            <ul class="footer__links">
              <li><a href="index.html">Accueil</a></li>
              <li><a href="articles.html">Articles</a></li>
              <li><a href="videos.html">Formations vidéo</a></li>
              <li><a href="resources.html">Ressources</a></li>
            </ul>
          </div>
          <div>
            <h4 class="footer__title">Liens</h4>
            <ul class="footer__links">
              <li><a href="about.html">À propos</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 class="footer__title">Suivez-moi</h4>
            <div class="footer__social">
              <a href="https://x.com/exauce_maz817?s=21" target="_blank" rel="noopener" aria-label="X (Twitter)">${ICONS.twitter}</a>
              <a href="https://www.youtube.com/channel/UCEH1oUw3yWVAtDM6vBPnXpA" target="_blank" rel="noopener" aria-label="YouTube">${ICONS.youtube}</a>
              <a href="https://www.tiktok.com/@monsieurmzd?_t=ZM-8u5NvLQ7aGD&_r=1" target="_blank" rel="noopener" aria-label="TikTok">${ICONS.tiktok}</a>
              <a href="https://www.facebook.com/share/15qBt1YB9n/?mibextid=wwXIfr" target="_blank" rel="noopener" aria-label="Facebook">${ICONS.facebook}</a>
              <a href="https://www.instagram.com/monsieurmazunda?igsh=MTZ5YjduYjR5NjM0cg%3D%3D&utm_source=qr" target="_blank" rel="noopener" aria-label="Instagram">${ICONS.instagram}</a>
            </div>
          </div>
        </div>
        <div class="footer__bottom">
          <p>&copy; ${new Date().getFullYear()} Monsieur Mazunda. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  `;
}

// --- Initialize Header & Footer ---
function initLayout(activePage) {
  // Insert header
  const headerEl = document.getElementById('site-header');
  if (headerEl) headerEl.innerHTML = renderHeader(activePage);

  // Insert footer
  const footerEl = document.getElementById('site-footer');
  if (footerEl) footerEl.innerHTML = renderFooter();

  // Mobile nav toggle
  setTimeout(() => {
    const toggle = document.getElementById('navToggle');
    const nav = document.getElementById('nav');
    const overlay = document.getElementById('navOverlay');

    if (toggle && nav) {
      toggle.addEventListener('click', () => {
        toggle.classList.toggle('open');
        nav.classList.toggle('open');
        overlay.classList.toggle('visible');
        document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
      });

      if (overlay) {
        overlay.addEventListener('click', () => {
          toggle.classList.remove('open');
          nav.classList.remove('open');
          overlay.classList.remove('visible');
          document.body.style.overflow = '';
        });
      }
    }

    // Header scroll effect
    const header = document.getElementById('header');
    if (header) {
      window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 10);
      });
    }
  }, 0);

  initNewsletterForm();
}

// --- Newsletter Form (Formspree) ---
const NEWSLETTER_ENDPOINT = 'https://formspree.io/f/xoeajrbn';

function initNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  const message = document.getElementById('newsletterMessage');
  const button = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const originalLabel = button.textContent;
    button.disabled = true;
    button.textContent = 'Envoi...';
    if (message) message.textContent = '';

    try {
      const response = await fetch(NEWSLETTER_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      });

      if (response.ok) {
        form.reset();
        if (message) {
          message.textContent = 'Merci pour votre inscription !';
          message.style.color = 'var(--color-success, green)';
        }
      } else {
        throw new Error('Formspree error');
      }
    } catch (error) {
      if (message) {
        message.textContent = "Une erreur est survenue, veuillez réessayer.";
        message.style.color = 'var(--color-error, red)';
      }
    } finally {
      button.disabled = false;
      button.textContent = originalLabel;
    }
  });
}

// --- Scroll Reveal ---
function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  reveals.forEach(el => observer.observe(el));
}

// --- Article Card ---
function createArticleCard(article) {
  return `
    <article class="card fade-in">
      <a href="article.html?slug=${article.slug}" class="card__image-wrapper">
        <img src="${article.image}" alt="${article.title}" class="card__image" loading="lazy">
      </a>
      <div class="card__body">
        <div class="card__meta">
          <span class="card__category">${article.category}</span>
          <span>${ICONS.calendar} ${formatDate(article.date)}</span>
        </div>
        <h3 class="card__title"><a href="article.html?slug=${article.slug}">${article.title}</a></h3>
        <p class="card__excerpt">${article.excerpt}</p>
        <div class="card__footer">
          <span class="badge">${ICONS.clock} ${article.readTime} min de lecture</span>
          <a href="article.html?slug=${article.slug}" class="btn btn--sm btn--secondary">Lire →</a>
        </div>
      </div>
    </article>
  `;
}

// --- Video Card ---
function createVideoCard(video) {
  return `
    <article class="card video-card fade-in">
      <a href="video.html?slug=${video.slug}" class="card__image-wrapper">
        <img src="${video.thumbnail}" alt="${video.title}" class="card__image" loading="lazy">
        <div class="play-icon">${ICONS.play}</div>
        ${video.duration ? `<span class="card__duration">${video.duration}</span>` : ''}
      </a>
      <div class="card__body">
        <div class="card__meta">
          <span class="card__category">${video.category}</span>
          <span>${ICONS.calendar} ${formatDate(video.date)}</span>
        </div>
        <h3 class="card__title"><a href="video.html?slug=${video.slug}">${video.title}</a></h3>
        <p class="card__excerpt">${video.description}</p>
      </div>
    </article>
  `;
}

// --- Resource Card ---
function createResourceCard(resource) {
  const downloads = getDownloads(resource.id);
  return `
    <div class="resource-card fade-in">
      <div class="resource-card__icon">
        ${ICONS.file}
      </div>
      <div class="resource-card__content">
        <h3 class="resource-card__title">${resource.title}</h3>
        <p class="resource-card__desc">${resource.description}</p>
        <div class="resource-card__meta">
          <span>${resource.theme}</span>
          <span>•</span>
          <span>${resource.fileSize}</span>
          <span>•</span>
          <span>${downloads} téléchargements</span>
        </div>
      </div>
      <div class="resource-card__action">
        <a href="assets/downloads/${resource.fileName}" class="btn btn--accent btn--sm" onclick="trackDownload('${resource.id}')" download>
          ${ICONS.download} Télécharger
        </a>
      </div>
    </div>
  `;
}

// --- Download Counter (localStorage) ---
function getDownloads(id) {
  const counts = JSON.parse(localStorage.getItem('downloadCounts') || '{}');
  return counts[id] || 0;
}

function trackDownload(id) {
  const counts = JSON.parse(localStorage.getItem('downloadCounts') || '{}');
  counts[id] = (counts[id] || 0) + 1;
  localStorage.setItem('downloadCounts', JSON.stringify(counts));
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
});
