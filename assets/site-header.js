// Header de site PARTAGÉ — source unique, injecté sur la landing ET les pages
// /outils (site statique sans build : pas d'include natif entre fichiers HTML).
// Modifier le header = modifier CE fichier, point.
(function () {
  var onOutils = /^\/outils(\/|$)/.test(location.pathname);
  var nav = document.createElement("nav");
  nav.className = "site-nav";
  nav.innerHTML =
    '<div class="site-nav-in">' +
      '<a class="site-brand" href="/">' +
        '<img src="/icon.png?v=3" alt="ECOM AI BUILDER">' +
        "<span>ECOM <b>AI</b> BUILDER</span>" +
      "</a>" +
      '<div class="site-nav-links">' +
        '<a href="/#features">Fonctionnalités</a>' +
        '<a href="/#how">Comment ça marche</a>' +
        '<a href="/#avis">Avis</a>' +
        '<a href="/#equipe">L\'équipe</a>' +
        '<a href="/#faq">FAQ</a>' +
        '<a href="/outils"' + (onOutils ? ' class="is-active"' : "") + ">Outils</a>" +
        '<a href="/#download">Télécharger</a>' +
        '<a class="site-nav-cta" href="https://whop.com/joined/ecom-ai-builder/" target="_blank" rel="noopener">Rejoindre &rarr;</a>' +
      "</div>" +
    "</div>";
  document.body.insertBefore(nav, document.body.firstChild);
  document.body.classList.add("has-site-nav");
})();
