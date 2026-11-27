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

## État au 23 novembre 2026
- Refonte complète faite (nouveau design appliqué aux 9 pages : index, articles, article, videos, video, resources, services, about, contact), testée desktop + mobile.
- Contenu existant conservé à l'identique (articles, vidéos YouTube, ressources, services, textes, liens réseaux, Formspree `xoeajrbn`, WhatsApp +243 828 516 026).
- **PAS ENCORE EN LIGNE** : Vercel a refusé la mise en ligne (erreur 402 `resource_creation_blocked` : solde impayé sur l'équipe MAZUNDA). Le site en ligne est toujours l'ancien design.
- **PAS ENCORE SUR GITHUB** : l'accès GitHub de la session Cowork ne fonctionnait pas ; les fichiers ont été livrés dans `site-monsieur-mazunda.zip`.
- Aperçu privé du nouveau site (sans vidéos/formulaires/téléchargements) : artifact `635941e9-6608-4cb2-b9f9-869afc633568` — https://claude.ai/artifact/DGYYJNWQ1JnAF99Qk6Wycb (contient aussi tous les fichiers du site, sauf le PDF et `monsieur-mazunda.png` déjà présents sur GitHub).

## Pour reprendre (une fois le paiement Vercel réglé)
1. Récupérer les fichiers (zip, ou l'artifact d'aperçu ci-dessus) et les mettre dans le dépôt `MON-SITE`, puis commit + push sur `main` → Vercel déploie automatiquement.
2. Sinon, déployer directement via l'outil Vercel `create_deployment` (projet `monsieur-mazunda`, `target: production`, `framework: null`) en référençant les fichiers par sha + taille ; téléverser ceux que Vercel signale manquants. Puis pousser quand même sur GitHub, sinon le prochain push écrasera le nouveau design.
3. Vérifier monsieurmazunda.site sur ordinateur et téléphone (vidéos YouTube, formulaires Formspree, téléchargements).

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
