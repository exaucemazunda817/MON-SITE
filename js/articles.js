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
        <h2>Introduction</h2>
        <p>Imaginons un groupe d'individus amnésiques, échoués sur une île inconnue, sans repères ni direction. Chacun lutte pour survivre, se laissant guider par ses impulsions et créant des règles sociales au fur et à mesure. Pourtant, aucun ne se pose réellement la question du <em>pourquoi</em> de son existence. Ils cherchent à remplir le vide de leur quotidien par des distractions, des réussites matérielles, mais sans jamais interroger le sens profond de leur présence sur cette île. Cette image illustre la condition de l'humanité sans Dieu.</p>
        <p>L'homme, lorsqu'il est livré à lui-même, ne peut trouver la véritable paix et le bonheur <em>(Jean 15:5)</em>. Il peut accumuler des biens, atteindre des succès, ou multiplier les plaisirs pour tenter de combler un vide intérieur. Mais au bout de cette quête, il réalise souvent qu'il est passé à côté de quelque chose de fondamental <em>(Ecclésiaste 1:14)</em>.</p>
        <p>Ce n'est qu'au crépuscule de sa vie qu'il prend conscience qu'il a négligé la question essentielle : <strong>pourquoi suis-je ici ?</strong> Alors, à côté de la question de notre origine — « comment avons-nous été créés ? » — surgit une interrogation existentielle : quel est le but de ma vie sur terre ? Cette question est à l'origine de nombreuses philosophies et théories, qui tentent d'apporter des réponses, mais aucune n'atteint pleinement la vérité sans la reconnaissance de notre Créateur.</p>
        <p>Aujourd'hui, en observant les crises sociales et existentielles auxquelles l'humanité fait face — conflits d'identité, luttes pour le pouvoir, fractures sociales — il devient évident que ces maux découlent souvent d'un manque de compréhension du but de la création humaine.</p>
        <p>Cet article a pour but d'éclairer ces questions fondamentales : pourquoi avons-nous été créés ? Pourquoi sommes-nous homme ou femme ? Et quel est le véritable sens de notre existence ? En suivant ce cheminement, nous espérons que ces lignes, avec l'aide de Dieu, vous guideront vers une compréhension plus profonde de notre raison d'être et du sens ultime de notre vie.</p>

        <h2>L'homme : entre nature et autodétermination</h2>
        <p>La question de l'identité de genre fait aujourd'hui l'objet de nombreux débats. Pour certains, il s'agit d'une évolution positive des mentalités ; pour d'autres, c'est une rupture avec un ordre établi depuis toujours. Mais ce questionnement est-il vraiment nouveau ? Une étude des textes anciens, notamment bibliques, montre que des préoccupations similaires ont existé à travers les âges.</p>
        <p>Dès les premières civilisations, des comportements et des pratiques liés à la sexualité et à l'identité de genre ont été observés. Certains récits bibliques, comme celui de la tour de Babel ou de la ville de Sodome, semblent évoquer des transformations profondes dans la perception du genre. Ces textes, enrichis par d'autres traditions anciennes, illustrent la tension entre un ordre considéré comme divinement établi et les choix individuels.</p>
        <p>Cela nous amène à une question fondamentale : l'identité sexuelle d'une personne est-elle déterminée par son corps, ou bien découle-t-elle de sa perception personnelle et de son vécu ? Dans ce chapitre, nous explorerons les récits historiques et religieux autour de cette question, examinerons la vision de l'humanité telle qu'elle était envisagée à l'origine, et discuterons de la liberté de chacun à définir son identité.</p>
        <p><strong>L'autodétermination</strong> peut être définie comme « la capacité de l'être humain à se gouverner lui-même, à faire des choix libres et conscients concernant son existence, ses actions et son destin ». Dans le contexte de l'identité sexuelle, elle désigne l'aptitude des individus à déterminer leur genre en fonction de leur ressenti et de la manière dont ils se perçoivent.</p>
        <p>Plusieurs exemples bibliques illustrent comment des hommes ont cherché à s'autodéterminer en matière d'identité sexuelle, en suivant les impulsions de leurs pensées. La première mention de telles pratiques remonte à la tour de Babel <em>(Genèse 11:4-9)</em>, où se trouvaient des habitations appelées <em>ziggourats</em> — ces immenses constructions en briques que les peuples de Mésopotamie élevaient dans la cour de leurs temples. Ces lieux étaient associés à la prostitution et à des actes contraires aux normes divines, où hommes et femmes se livraient à des relations sexuelles contre nature.</p>
        <p>Il est rapporté que Nimrod, décrit dans la Bible comme « un grand chasseur devant l'Éternel » <em>(Genèse 10:9)</em>, était perçu comme une figure maléfique ayant contribué à la corruption de l'humanité. Fils de Kouch, petit-fils de Cham et arrière-petit-fils de Noé, Nimrod aurait établi un culte marqué par la perversion. Sa mère, Sémiramis, est présentée dans certaines traditions extrabibliques comme une femme ayant des origines surnaturelles, prétendument née de relations entre des anges et des humaines <em>(Genèse 6:1-2,4)</em>, et initiée aux pratiques occultes.</p>
        <p>Après la mort de son père, Nimrod aurait épousé sa propre mère, et ensemble, ils auraient organisé de grandes cérémonies de prostitution dans les ziggourats, où Sémiramis se livrait à des rites sexuels. Selon la tradition judaïque extrabiblique, c'est en raison de ces actes jugés contre nature que l'Éternel détruisit la tour de Babel et confondit le langage des hommes, dispersant ainsi les peuples à travers le monde.</p>
        <p>On retrouve également ces actes dans l'épisode de la destruction de Sodome. Lorsque Dieu envoya des anges pour sauver Lot et sa famille, les habitants de la ville exigèrent que Lot leur livre ces visiteurs afin de coucher avec eux. À cette époque, de telles dérives semblaient socialement acceptées, la distinction entre les sexes et le respect de l'ordre naturel étant complètement rejetés. Ce récit est rapporté dans <em>Genèse 19</em>, où il est précisé que les habitants de Sodome cherchaient à établir des relations contre nature avec des anges.</p>
        <p>Par conséquent, en l'absence de vie dans l'esprit, l'identité disparaît. Sans un fondement spirituel pour définir l'homme et faire asseoir sa domination sur terre, il tend à se percevoir en fonction de son apparence physique. C'est pourquoi les personnes présentant une déviation de genre se tournent facilement vers d'autres comportements qui corrompent la nature humaine.</p>
        <p>Imaginez la douleur de Dieu lorsqu'il voit ses enfants se laisser guider comme une foule par des forces inférieures. Dieu souhaite secourir ses enfants de ce piège, mais il demeure limité, car il ne peut nous contraindre à choisir la vie. Ainsi, incapable de combler le vide en lui à cause de son éloignement de Dieu <em>(Apocalypse 12:9 ; Ésaïe 14:12-15)</em> et de son impossibilité de se repentir, le diable s'efforce à tout prix de contredire les commandements divins <em>(Jean 8:44)</em>.</p>

        <blockquote><p>« C'est pourquoi l'homme quittera son père et sa mère, et s'attachera à sa femme, et ils deviendront une seule chair. »<br><span style="font-size:var(--fs-sm); font-style:normal;">— Genèse 2:24 (LSG)</span></p></blockquote>

        <p>Il n'est jamais question que deux hommes ou deux femmes quittent leurs parents pour s'attacher l'un à l'autre, ni qu'une femme devenue homme s'attache à une autre femme. La finalité de ce commandement est d'unir le couple en une seule chair <em>(Marc 10:6-8 ; Éphésiens 5:31)</em>. Or, les unions entre personnes de même sexe ne réalisent pas la volonté divine, car elles ne reflètent pas l'image de l'homme telle que Dieu l'a conçue. Nous approfondirons cette notion en examinant ultérieurement ce que la Bible entend par « homme ».</p>
        <p>De même, les anges se sont détournés de leur domaine en renonçant à leur nature pour s'unir aux filles des hommes <em>(Jude 1:6 ; Genèse 6:4)</em> et pratiquer des relations contraires à l'ordre naturel. Aujourd'hui, l'influence diabolique sur le genre et l'identité sexuelle incite certains à adopter des comportements analogues — unions entre personnes du même sexe, ou rapports avec des animaux — dans le but d'abaisser l'homme à un niveau inférieur, voire à celui d'un animal.</p>

        <blockquote><p>« C'est pourquoi Dieu les a livrés à des passions infâmes : car leurs femmes ont changé l'usage naturel en celui qui est contre nature ; et de même les hommes, abandonnant l'usage naturel de la femme, se sont enflammés dans leurs désirs les uns pour les autres, commettant, homme avec homme, des choses infâmes, et recevant en eux-mêmes le salaire que méritait leur égarement. »<br><span style="font-size:var(--fs-sm); font-style:normal;">— Romains 1:26-27 (LSG)</span></p></blockquote>

        <p>Examinons ce que révèle la Bible dès le commencement au sujet de l'homme :</p>

        <blockquote><p>« Puis Dieu dit : Faisons l'homme à notre image, selon notre ressemblance, et qu'il domine sur les poissons de la mer, sur les oiseaux du ciel, sur le bétail, sur toute la terre, et sur tous les reptiles qui rampent sur la terre. Dieu créa l'homme à son image, il le créa à l'image de Dieu ; il créa l'homme et la femme. »<br><span style="font-size:var(--fs-sm); font-style:normal;">— Genèse 1:26-27</span></p></blockquote>

        <p>Elle commence par dire : « Faisons l'homme », puis poursuit : « à notre image, selon notre ressemblance, afin qu'il domine ». Ensuite, elle précise que « Dieu créa l'homme à son image », le créant homme et femme, mâle et femelle.</p>
        <p>Spirituellement, l'homme est créé en tant que mâle et femelle <em>(Genèse 1:27)</em>. Dès lors, <strong>l'identité sexuelle ne découle pas du corps — formé après — mais se définit dans l'esprit</strong>, lequel incarne déjà l'essence de l'homme.</p>
        <p>Ce qui définit une femme ne se limite pas à son sexe, mais réside dans la mission spécifique qu'elle incarne. Elle est seule à pouvoir remplir ce rôle, comme nous l'expliquerons plus en détail dans la section sur le but de la femme. Le sexe n'intervient qu'en second lieu pour confirmer le genre, et uniquement chez ceux dont l'esprit a été renouvelé.</p>
        <p>De même, les individus qui adoptent des comportements déviants — par exemple, des hommes se comportant comme des femmes — le font faute d'une vie spirituelle et d'une connexion authentique avec Dieu. Sans ce lien, ils ne parviennent pas à saisir la mission et le mandat qui leur sont propres en tant qu'êtres mâles ou femelles. Leurs pensées, dominées par des passions désordonnées, les conduisent à commettre des actes sexuels contraires à l'ordre naturel.</p>
        <p>Par conséquent, l'esprit ne se définit pas lui-même quant à son genre et ne dépend pas de l'apparence physique pour établir son identité sexuelle. Son essence est inscrite en lui dès la création. Dieu a créé l'homme et la femme simultanément, bien que leur formation physique se soit faite en deux étapes distinctes : l'homme fut façonné à partir de la poussière <em>(Genèse 2:7)</em> et la femme fut tirée de sa côte <em>(Genèse 2:21-22)</em>.</p>
        <p>Ainsi, <strong>Dieu a créé chaque esprit soit mâle, soit femelle</strong>. Il n'existe ni esprit transgenre, ni homosexuel, ni lesbien, et Dieu n'a pas conçu de corps destiné à s'adapter à ces déviations. Ces dérives résultent d'un manque de vie spirituelle, exposant ces personnes à des influences démoniaques qui les détournent de leur véritable identité et les poussent à la rébellion contre Dieu.</p>
        <p>En conclusion, l'homme n'est pas défini comme mâle ou femelle par nature, mais par son esprit, tel qu'il a été créé. Ce n'est donc pas le corps qui établit en premier l'identité sexuelle d'une personne, mais son essence spirituelle. Toutes les formes de déviation en la matière ne résultent pas de l'apparence physique, mais d'un manque de vie spirituelle. Cette absence crée une brèche par laquelle les démons s'infiltrent, égarant ces individus et les entraînant vers toutes sortes de dérives.</p>

        <h2>Origine et formation de l'homme</h2>
        <p>Depuis toujours, l'origine et la formation de l'homme ont suscité de nombreuses interrogations. Diverses théories, qu'elles soient scientifiques, philosophiques ou ésotériques, tentent d'y répondre en proposant des explications souvent divergentes. Cependant, ce chapitre s'intéresse exclusivement à la perspective biblique pour éclairer la raison même de la création humaine.</p>

        <h3>La création spirituelle de l'homme</h3>
        <p>Selon les Écritures, l'homme a d'abord été conçu spirituellement avant de revêtir une forme physique <em>(Genèse 1:27)</em>, conformément à une volonté divine précise. Créé à l'image et à la ressemblance de Dieu <em>(Genèse 1:26)</em>, il a reçu pour mission de dominer sur la création et de refléter la nature divine sur terre.</p>
        <p>Dès lors, une question essentielle se pose : comment l'homme peut-il pleinement accomplir le but de son existence en restant fidèle à l'image divine qu'il est censé incarner ?</p>

        <h3>La mission de l'homme : dominer et manifester l'image de Dieu</h3>

        <blockquote><p>« Puis Dieu dit : Faisons l'homme à notre image, selon notre ressemblance, et qu'il domine sur les poissons de la mer, sur les oiseaux du ciel, sur le bétail, sur toute la terre, et sur tous les reptiles qui rampent sur la terre. »<br><span style="font-size:var(--fs-sm); font-style:normal;">— Genèse 1:26</span></p></blockquote>

        <p>Par une volonté commune entre Dieu, sa Parole et sa force agissante, l'homme fut créé, premièrement, selon l'image de Dieu et, deuxièmement, selon sa ressemblance. Mais pourquoi ? Afin qu'il domine. Dominer sur les hommes ou ses semblables ? Non : il fut créé pour dominer sur les poissons de la mer, les oiseaux du ciel, et plus largement sur la création et tout ce qui l'entoure.</p>
        <p>Ainsi, l'homme n'a pas été créé pour se laisser gouverner par ses instincts charnels <em>(Romains 6:16-19 ; 1 Corinthiens 7:23)</em>, mais pour refléter une facette de Dieu et accomplir une mission spécifique : exercer son autorité sur la création. Par conséquent, celui qui ne vit pas selon les paroles de Genèse 1:26 ne manifeste pas non plus l'image de Dieu. Ces bénédictions ne se manifestent que dans la vie d'une personne vivant spirituellement, car elles appartiennent à l'être spirituel créé en premier. Elles concernent autant l'homme que la femme, tous deux formés simultanément dans la pensée divine <em>(Genèse 1:27)</em>.</p>
        <p>L'être spirituel, issu du souffle de Dieu <em>(Genèse 2:7 ; Job 27:3)</em>, est le prolongement de Dieu sur terre. Issu de Lui, l'esprit humain contient toutes les informations nécessaires pour nous identifier à notre Père céleste. C'est en lui que réside l'ADN divin, faisant de nous des <em>bene Elohim</em> (fils de Dieu). Il renferme également les plans et desseins divins pour notre vie. Ainsi, celui qui meurt sans Dieu voit son esprit retourner à Lui avec ces plans inachevés <em>(Ecclésiaste 12:7,9)</em>, tandis que son âme se perd dans le séjour des morts.</p>

        <h3>La formation physique de l'homme et son lien avec la création</h3>
        <p>Contrairement à l'esprit, l'être physique émane de la poussière et provient directement de nos parents. Nous venons au monde avec un corps portant l'essentiel de leur héritage génétique et biologique. Ainsi, notre apparence est le reflet de nos parents, ce qui permet de nous identifier facilement à l'un ou à l'autre.</p>

        <blockquote><p>« L'Éternel Dieu forma l'homme de la poussière de la terre, il souffla dans ses narines un souffle de vie, et l'homme devint un être vivant. »<br><span style="font-size:var(--fs-sm); font-style:normal;">— Genèse 2:7</span></p></blockquote>

        <p>Étant donné que l'homme avait pour mission de dominer et d'assujettir la création physique, Dieu lui façonna un corps à partir de la poussière de la terre. Ce corps symbolisait son lien avec le monde matériel, tout en demeurant un être spirituel. Ainsi, l'homme spirituel prit une forme physique pour accomplir la mission que Dieu lui confiait.</p>
        <p>Bien que l'homme ait été créé en premier, il n'était pas destiné à être seul. <strong>La femme existait déjà en lui</strong>, en tant que partie essentielle de son être, avant de prendre forme physiquement. Nous verrons plus tard pourquoi elle apparaît après lui.</p>
        <p>Cet ordre de création n'est pas le fruit du hasard. Il révèle un mystère plus profond qui s'accomplit en Christ. Lorsque l'homme s'endort pour que Dieu puisse façonner la femme <em>(Genèse 2:21)</em>, cela préfigure la mort du Christ sur la croix. De même, son réveil équivaut à la résurrection de Christ. Et le moment où la femme est présentée à l'homme <em>(Genèse 2:22)</em> symbolise l'union future entre le Christ et son Église, comme le décrit la vision des noces de l'Agneau <em>(Apocalypse 19:7-9)</em>. Tout comme la femme était en Adam avant d'être révélée, l'Église était en Christ pendant l'épreuve de la croix.</p>

        <h2>Le sens de l'existence</h2>
        <p>Après avoir exploré la nature spirituelle et physique de l'être humain ainsi que la raison de sa création, il est fondamental d'aller plus loin dans la compréhension du dessein divin pour l'homme et la femme. Si Dieu a insufflé en chaque être humain un souffle porteur de vie et de destinée, encore faut-il saisir quelle mission spécifique Il a confiée à chacun selon son identité.</p>
        <p>Loin d'être le fruit du hasard, la distinction entre l'homme et la femme répond à un ordre divin précis, où chaque rôle a une signification et un impact déterminant sur l'accomplissement du plan de Dieu. L'homme, formé en premier, a reçu une mission bien définie avant même que la femme ne soit introduite comme son aide. De son côté, la femme n'a pas été créée simplement pour exister aux côtés de l'homme, mais pour jouer un rôle actif et complémentaire dans l'exécution de la volonté divine.</p>
        <p>À travers ce chapitre, nous allons examiner séparément la mission de l'homme et celle de la femme, en mettant en lumière l'importance de leur complémentarité et de leur alignement avec la volonté divine. Que chacun puisse ainsi discerner sa place et entrer pleinement dans l'appel que Dieu lui a destiné.</p>

        <h3>Qui sommes-nous ?</h3>

        <blockquote><p>« Il souffla dans ses narines un souffle de vie, et l'homme devint un être vivant. »<br><span style="font-size:var(--fs-sm); font-style:normal;">— Genèse 2:7</span></p></blockquote>

        <p>Ainsi, de la rencontre entre le corps, formé de la poussière, et l'esprit venant de Dieu, naît l'âme, notre véritable essence. <strong>Nous ne sommes pas qu'un simple corps : nous sommes une âme vivant dans un corps</strong>, avec un esprit renouvelé par notre relation avec l'Esprit de Dieu.</p>
        <p>Ce souffle divin porte en lui les plans de Dieu pour chaque être humain. Il contient les grâces, les bénédictions et le dessein que Dieu a déposé en chacun de nous. Car le corps, étant poussière, est voué à disparaître. Seule l'âme demeure et suit l'orientation que prend notre cœur.</p>
        <p>Nous allons à présent examiner le but de l'homme, afin que chacun puisse découvrir son rôle et comprendre le sens profond de son existence.</p>

        <h3>A. Le but de l'homme</h3>
        <p>Vous êtes-vous déjà demandé pourquoi vous êtes un homme ? Est-ce le fruit du hasard ? Avez-vous déjà réfléchi à la mission que vous incarnez en tant qu'homme ? Bien que créés simultanément, l'homme fut formé en premier, et cela n'est pas anodin. Dieu avait une raison précise pour ordonner ainsi leur apparition, ce qui révèle une distinction fondamentale entre les deux.</p>

        <p><strong>Cultiver</strong></p>

        <blockquote><p>« Aucun arbuste des champs n'était encore sur la terre, et aucune herbe des champs ne germait encore, car l'Éternel Dieu n'avait pas fait pleuvoir sur la terre, et il n'y avait point d'homme pour cultiver le sol. »<br><span style="font-size:var(--fs-sm); font-style:normal;">— Genèse 2:5</span></p></blockquote>

        <p>Ce verset montre que Dieu retarda la croissance de la végétation en retenant la pluie. Mais pourquoi ? Justement parce qu'il n'y avait pas encore d'homme pour cultiver la terre. Quel rôle devait donc jouer l'homme pour que Dieu interrompe ainsi le développement de Sa création ? Pourquoi sa présence était-elle si essentielle, voire déterminante ?</p>
        <p>Le mot <em>cultiver</em>, en hébreu <em>abad</em>, signifie à la fois servir, être soumis et cultiver. Ainsi, si la pluie ne tombait pas et que la croissance était stoppée, c'est parce qu'il n'y avait pas d'homme pour servir et soumettre la création. Celui qui avait reçu ce mandat devait apparaître pour déclencher ce processus. <strong>Le véritable problème, à ce stade, n'était donc pas l'absence de croissance, mais l'absence de celui à qui Dieu avait confié la mission de l'activer.</strong></p>
        <p>Par les paroles de bénédiction prononcées sur lui dès la création, l'homme devait cultiver la terre et exercer son autorité pour que la pluie survienne. De la même manière, si nous ne travaillons pas ou ne cultivons pas ce qui nous est confié, Dieu ne peut pas nous bénir. Pourquoi bénirait-Il celui qui refuse d'entrer dans son champ et d'en prendre soin ?</p>
        <p>Notre bénédiction dépend à la fois de notre nature et de notre position. D'une part, comment pourrions-nous y accéder si, bien que créés hommes, nous renions cette identité en modifiant notre corps ou en changeant de sexe ? Si nous voulons être bénis, devenons des hommes selon les standards divins, et non des hommes dénaturés.</p>
        <p>Comment Dieu pourrait-Il nous bénir si nous restons passifs, enfermés dans notre zone de confort, au lieu d'entrer pleinement dans l'appel qu'Il nous a adressé depuis la création du monde ? Pourquoi désirer la bénédiction sans être prêt à en porter la responsabilité ? Dieu bénit ceux qui travaillent, ceux qui s'engagent. L'homme ne peut voir la bénédiction divine s'il ne comprend pas qu'il doit cultiver. Car où l'Éternel enverrait-Il la pluie si aucun champ n'est prêt à la recevoir ?</p>
        <p>La pluie de bénédiction dépend de plusieurs éléments :</p>
        <ul>
          <li>D'abord, un champ occupé et cultivé.</li>
          <li>Ensuite, un homme qui reconnaît sa place et son rôle dans ce champ.</li>
        </ul>
        <p>Ce n'est qu'alors que Dieu fera pleuvoir sa bénédiction.</p>

        <p><strong>Garder</strong></p>

        <blockquote><p>« L'Éternel Dieu prit l'homme, et le plaça dans le jardin d'Éden pour le cultiver et pour le garder. »<br><span style="font-size:var(--fs-sm); font-style:normal;">— Genèse 2:15</span></p></blockquote>

        <p>Ce passage met en lumière l'une des responsabilités essentielles de l'humanité : garder ce lieu sacré. Le mot hébreu employé, <em>chamar</em>, recèle une richesse sémantique, signifiant non seulement « veiller », mais également « sauver » et « s'abstenir ».</p>
        <p>Ainsi, l'homme était investi de la mission de surveiller et de préserver le jardin, en le protégeant de toute intrusion, notamment celle émanant du « champ », origine du serpent. De la même manière, nous sommes appelés à prendre soin de notre cœur, à le défendre contre tout ce qui pourrait porter atteinte à notre foi, notre amour et notre confiance en Dieu.</p>

        <blockquote><p>« Garde ton cœur plus que toute autre chose, car de lui jaillissent les sources de la vie. »<br><span style="font-size:var(--fs-sm); font-style:normal;">— Proverbes 4:23</span></p></blockquote>

        <p>Ici, le « cœur » ne désigne pas l'organe physique, mais l'essence de notre être, notre âme. Il convient de le préserver des passions et des désirs charnels susceptibles de nous détourner du chemin spirituel et de l'intimité avec Dieu.</p>
        <p>L'homme devait veiller à la fois sur l'extérieur, c'est-à-dire le jardin, et sur son intérieur : son cœur, son esprit, et tout ce que Dieu y avait insufflé par son souffle divin. Cette double mission, de protéger à la fois l'intérieur et l'extérieur, était d'une importance capitale.</p>

        <p><strong>Lorsque l'homme eut besoin d'une aide semblable</strong></p>

        <blockquote><p>« Il n'est pas bon que l'homme soit seul ; je lui ferai une aide semblable à lui. »<br><span style="font-size:var(--fs-sm); font-style:normal;">— Genèse 2:18</span></p></blockquote>

        <p>Ce n'est qu'après avoir confié ces tâches à l'homme que Dieu prononça cette parole. Avant même la formation de la femme, l'homme devait comprendre la portée de sa mission, s'y engager pleinement et commencer à l'exécuter. Par la suite, la femme fut introduite pour agir en tant qu'aide, permettant ainsi à l'homme de réaliser ce dessein divin. La femme fut donc formée pour être une collaboratrice essentielle dans l'accomplissement du plan divin.</p>
        <p>Pourtant, comment les unions entre personnes de même sexe pourraient-elles répondre à cette mission ? Sur les plans spirituel et physique, ces unions apparaissent improductives, car elles ne se conforment ni à l'ordre divin ni à la place assignée à chacun dans la création. Elles ne sauraient ainsi bénéficier pleinement des bénédictions divines, n'étant pas alignées sur la mission et le dessein de Dieu.</p>
        <p>Ainsi, lorsqu'un homme cherche une épouse, il devrait se demander en quoi cette femme pourra l'aider dans sa mission. De la même manière, une femme, par rapport à un homme, doit réfléchir à la façon dont elle peut le soutenir. Chacun doit comprendre comment il peut jouer le rôle qui lui est attribué pour aider l'autre à accomplir ce que Dieu lui a confié. Si chacun ne saisit pas ce rôle réciproque, leur union risque de ne pas atteindre son objectif commun.</p>
        <p>Il est crucial de rappeler que l'ordre de cultiver et de garder fut d'abord confié à l'homme, avant même la création physique de la femme. Cela souligne la responsabilité première de l'homme dans la gestion et la préservation du jardin, tandis que la femme est appelée à l'accompagner et à le soutenir dans cette mission.</p>
        <p>C'est pourquoi, après la chute — lorsque l'homme et la femme goûtèrent au fruit défendu — Dieu interrogea d'abord l'homme : « Où es-tu ? » <em>(Genèse 3:9)</em>. La charge de veiller et de protéger le jardin incombait à l'homme. Même si la femme fut séduite par le serpent, c'est à l'homme que la désobéissance revient, puisqu'il avait reçu directement l'ordre divin.</p>

        <h3>B. Le but de la femme</h3>
        <p>Dans ce point, nous allons clarifier, de manière individuelle, le rôle et la vocation que Dieu destine à la femme. Ce but ne repose pas sur des critères physiques, car il ne se trouve pas dans le corps, mais dans l'esprit et dans le souffle divin présent en chaque être humain. Il ne s'agit pas qu'un garçon, se sentant physiquement différent, puisse revêtir automatiquement la mission qui incombe à la femme selon la vision de Dieu.</p>
        <p>Cette mission est exclusivement réservée à celles qui, sur le plan spirituel, ont été créées femelles. C'est à elles qu'appartient ce rôle particulier, que nous allons exposer dans les lignes qui suivent.</p>

        <p><strong>Le rôle initial de la femme</strong></p>

        <blockquote><p>« L'Éternel Dieu dit : Il n'est pas bon que l'homme soit seul ; je lui ferai une aide semblable à lui. »<br><span style="font-size:var(--fs-sm); font-style:normal;">— Genèse 2:18</span></p></blockquote>

        <p>La mission de la femme consiste ainsi à aider et à accompagner l'homme dans sa propre mission. Dieu emploie le terme « aider » dans deux circonstances principales : lorsqu'Il exprime Son action d'aider l'homme, et lorsqu'Il désigne la femme comme une aide semblable, celle qui soutient l'homme dans sa vocation.</p>

        <p><strong>Une mission partagée</strong></p>
        <p>Pour accomplir sa mission, l'homme a d'abord besoin de Dieu, puis de la femme, et non d'une autre personne. De son côté, la femme doit veiller à ce que l'homme connaisse et poursuive son appel, car la pluie de bénédictions ne tombe que sur celui qui s'engage pleinement dans sa vocation. Par ailleurs, la femme possède la capacité unique d'aider l'homme à découvrir et à révéler sa mission.</p>
        <p>En effet, il ne s'agit pas d'une mission propre à l'un ou à l'autre, mais d'un dessein commun. De nombreux hommes qui ignorent que leur vocation est intimement liée à celle de leur épouse ne parviennent jamais à entrer pleinement dans leur appel. De la même manière, Abraham ne réalisait pas que la promesse qui lui avait été faite était indissociable de Sara, ce qui expliquait pourquoi il la reniait partout où il allait.</p>

        <p><strong>L'influence de la femme sur l'homme</strong></p>
        <p>L'homme possède en lui les capacités nécessaires à l'accomplissement de sa mission, mais c'est souvent la femme qui l'aide à les révéler. Celui qui n'a pas trouvé la femme que Dieu lui destine ne pourra pas pleinement exprimer les dons que Dieu a déposés en lui. Pour que l'homme réussisse dans son appel, il doit reconnaître que la femme détient le mandat et l'aptitude de révéler en lui ses capacités enfouies.</p>
        <p>Les capacités sont le moyen par lequel l'ordre divin se manifeste. Si elles ne sont pas révélées, l'homme demeure dans l'incapacité de réaliser pleinement son potentiel. Une personne qui n'a pas conscience de ce qu'elle est ne pourra jamais exprimer ses dons. Toutes ces capacités proviennent de Dieu, et la question reste de savoir comment les faire émerger. Par exemple, Moïse n'a jamais suivi un enseignement spécifique pour séparer les eaux, car cette aptitude était déjà en lui. De même, certains aspects de notre être demeureront inconnus si nous n'avons pas à nos côtés la personne adéquate pour les révéler.</p>

        <p><strong>Le potentiel unique de la femme</strong></p>
        <p>La femme possède une grâce particulière, celle de faire naître et d'amener à l'existence. Cette capacité à engendrer l'inexistant témoigne de sa prédisposition naturelle à la foi, qui consiste à concrétiser des projets encore à l'état de rêve. Cette faculté unique explique pourquoi la femme semble avoir une plus grande facilité à croire et à incarner l'espérance.</p>

        <p><strong>Vers qui être une aide semblable ?</strong></p>
        <p>Pour répondre à cette question, il est essentiel que la femme réfléchisse à son propre rêve : que souhaite-t-elle accomplir en tant que femme ? En fonction de sa vision et de ses aspirations, elle pourra déterminer le type d'homme qu'elle doit soutenir, celui pour lequel elle pourra véritablement être une aide semblable. Ses rêves doivent s'harmoniser avec ceux de son partenaire, de manière à ne former qu'un seul dessein commun.</p>
        <p>Connaître son appel aide la femme à choisir l'homme qui saura l'accompagner dans l'accomplissement de sa vocation. Il est crucial d'être avec la bonne personne, car l'union harmonieuse des deux destinées est souvent la clé de l'exécution de la volonté divine.</p>

        <p><strong>L'influence de la femme dans la relation</strong></p>
        <p>La femme représente une porte majeure d'influence sur l'homme, et sa capacité à impacter positivement celui-ci peut parfois paraître plus puissante que celle de Dieu sur l'homme. Un exemple frappant se trouve dans l'histoire d'Ève. Séduite par le serpent, elle a conduit Adam à désobéir. Dieu reproche précisément à Adam d'avoir écouté Ève au lieu de suivre Son ordre, soulignant ainsi l'importance du rôle de la femme dans l'orientation de l'homme.</p>

        <h2>Que pouvons-nous retenir</h2>
        <p>En définitive, il est essentiel de saisir dès le départ le sens divin et la volonté de Dieu concernant l'homme, qui fut créé, à l'origine, en deux genres : mâle et femelle. Ces distinctions ne résultent pas d'une déviation ou d'une autodétermination fondée sur le ressenti physique, mais reposent sur l'esprit. Ceux qui se perdent dans ces dérives démontrent qu'au niveau spirituel, la vie s'est estompée.</p>
        <p>Pourquoi l'homme et la femme ? Parce qu'en eux se trouve le dépôt de Dieu ainsi que les missions qui leur sont confiées. Ce dessein se manifeste particulièrement par le fait que, bien qu'ils aient été créés simultanément, l'un fut formé en premier pour comprendre sa mission, afin que l'autre puisse lui être une aide semblable.</p>
        <p>Selon la vision divine, la mission de l'homme était, en premier lieu, de cultiver le jardin, de l'ordonner et de le servir, son travail étant déterminant pour faire pleuvoir sur la terre. Or, une croissance a été stoppée par l'inaction de l'homme. En second lieu, il devait garder le jardin en le protégeant de toute intrusion extérieure ou de toute force susceptible de perturber l'ordre de Dieu. De même, nous avons la responsabilité de veiller à ce qu'aucun élément ne compromette notre relation avec Lui. Malheureusement, c'est une créature issue des champs, de l'extérieur du jardin, qui poussa l'homme et la femme à désobéir à l'ordre divin.</p>
        <p>La femme, quant à elle, a pour rôle d'aider l'homme dans l'accomplissement de sa mission, de le soutenir et de lui permettre de manifester toutes les potentialités que Dieu a déposées en lui. Dotée de la capacité d'appeler à l'existence ce qui est invisible, elle révèle en l'homme des aptitudes cachées, permettant ainsi d'accomplir non seulement la mission de l'homme, mais une mission commune.</p>

        <blockquote><p>« C'est pourquoi l'homme quittera son père et sa mère, et s'attachera à sa femme, et ils deviendront une seule chair. »<br><span style="font-size:var(--fs-sm); font-style:normal;">— Genèse 2:24 (LSG)</span></p></blockquote>

        <p>Pour que cette aide soit véritable, la femme doit connaître son rêve, sa vision, car c'est en fonction de celle-ci qu'elle saura déterminer le type d'homme qu'elle doit soutenir, celui qui pourra être à ses côtés une aide semblable et sur qui elle pourra s'appuyer pour réaliser la mission de Dieu dans sa vie.</p>
        <p><strong>Puisse le Seigneur, à travers ces lignes, bénir vos vies et vous faire accéder à Sa grâce infinie dans Sa dimension d'excellence.</strong> Qu'en embrassant votre mission et en saisissant votre raison d'être sur cette terre, la nature obéisse à votre position de fils et de fille de Dieu dans la hiérarchie de la création.</p>
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
