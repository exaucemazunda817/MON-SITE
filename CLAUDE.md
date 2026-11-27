# Site « Monsieur Mazunda » — monsieurmazunda.site

Toujours répondre en français.

## Contexte
- Site personnel statique (HTML/CSS/JS sans framework, contenu en JSON dans `content/`) d'Exaucé Mazunda, « Monsieur Mazunda » — enseignant, juriste, auteur (Bible, droit, entrepreneuriat).
- Dépôt GitHub : `exaucemazunda817/MON-SITE` (branche `main`), relié au projet Vercel `monsieur-mazunda` (id `prj_icZMHfII0tCukOfxqKe4nOQblovh`), équipe Vercel « MAZUNDA » (id `team_A7J72XMqVTSGMn7mLcnFScGP`, slug `mazunda`). Domaines : monsieurmazunda.site et www.monsieurmazunda.site (DNS Vercel).
- Le design vient du projet Claude Design « Monsieur Mazunda website mockups » (artifact `4922ba65-ccf6-42c2-b3bb-346d939b7881`), concept « Le Seuil ».

## Charte graphique (à respecter)
- Couleurs : Indigo `#2A2FBF` · Safran `#F5B731` · Lin `#F4EFE6` (fond) · Nuit `#14163F` (texte / fonds sombres).
- Polices : Bodoni Moda (titres, optical sizes) + Hanken Grotesk (texte), chargées depuis Google Fonts.
- Formes : arches (`border-radius: 999px 999px 16px 16px`), boutons `26px 26px 8px 8px`, rayures fines sur les bandes sombres.
- Signature de marque : « Enseignant · Juriste · Auteur ». Devise : « Partager, former, inspirer. »

## État au 27 novembre 2026
- Refonte « Le Seuil » **EN LIGNE** sur monsieurmazunda.site et www (commit de fusion `8ce7a3d`, déploiement `dpl_Cx6REvQdHn3B8RDz3y1CUCXGpkD6`). Le blocage de facturation Vercel (402) du 23/11 est levé.
- Copie de travail : ce dossier (`~/Documents/Mazunda/05-Site-Personnel/MON-SITE`). L'ancienne copie `~/Downloads/site-monsieur-mazunda` n'est plus utile.
- Contenu existant conservé (articles, vidéos YouTube, ressources, services, textes, liens réseaux, Formspree `xoeajrbn`, WhatsApp +243 828 516 026).
- `vercel.json` : en-têtes de sécurité (nosniff, X-Frame-Options SAMEORIGIN, Referrer-Policy, Permissions-Policy, HSTS), vérifiés en ligne.
- Publier : branche → push → vérifier l'aperçu Vercel (protégé par connexion : passer par `get_access_to_vercel_url`) → fusion dans `main` avec l'accord de Mazunda → Vercel déploie seul.
- À vérifier par Mazunda sur téléphone/Chrome : lecture des vidéos YouTube (le navigateur intégré de Claude ne charge pas YouTube) et envoi du formulaire de contact.

## Structure du code
- `css/style.css` : tout le design (variables de la charte en `:root`, responsive à 1180 / 1024 / 760 px).
- `js/main.js` : en-tête (thèmes clair / `dark` / `indigo`), menu mobile, pied de page, cartes (articles, vidéos, ressources), logo animé (`data-logo`), apparitions au défilement (`data-reveal` = "" | "arch" | "draw"), newsletter Formspree. `domainOf()` classe une catégorie en bible / droit / entre(preneuriat).
- `js/articles.js` : liste (recherche, filtres `?domaine=`), page article (sommaire auto, partage, encadré PDF, carte auteur). Le texte complet de « Pourquoi Dieu créa l'homme et la femme ? » est codé en dur dans `getArticleContent()`.
- `js/videos.js`, `js/resources.js`, `js/services.js` : pages correspondantes. `contact.html?demande=…` pré-remplit le message.
- Images : `assets/images/portrait.jpg` (accueil, auteur), `assets/images/studio.jpg` (accueil « Qui suis-je », À propos) ; logos dans `assets/brand/`. `assets/images/monsieur-mazunda.png` n'est plus utilisé.
- Pour ajouter du contenu : modifier les JSON de `content/` (articles, videos, resources, services, portfolio).

## Choix faits pendant la refonte (à valider avec Exaucé)
- Page « Publications » et témoignages des maquettes non repris (contenus fictifs dans les maquettes).
- Section « Trois étapes simples » ajoutée sur Services, texte rédigé par Claude : à relire.
- Photo de l'événement non utilisée (site gardé léger) ; À propos utilise la photo studio.

## Problèmes connus
- Liens de téléchargement cassés (déjà avant la refonte) : `strategie-digitale-guide.pdf`, `checklist-seo-50-points.pdf`, `calendrier-editorial-template.pdf` sont listés dans `content/resources.json` mais absents de `assets/downloads/`. Ajouter les fichiers ou retirer ces entrées.
- `sitemap.xml` inchangé.
