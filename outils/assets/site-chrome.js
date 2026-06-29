// Header partagé = la nav de la landing, injectée en haut de chaque page Outils
// pour que les outils fassent PARTIE du site (pas un standalone). Logo réel
// (icon.png) + wordmark Space Grotesk, comme la landing. Liens -> sections de
// la landing (absolus), « Outils » actif, CTA Rejoindre.
(function () {
  var nav = document.createElement("nav");
  nav.className = "site-nav";
  nav.innerHTML =
    '<div class="site-nav-in">' +
      '<a class="site-brand" href="/">' +
        '<img src="/icon.png?v=3" alt="ECOM AI BUILDER">' +
        '<span>ECOM <b>AI</b> BUILDER</span>' +
      "</a>" +
      '<div class="site-nav-links">' +
        '<a href="/#features">Fonctionnalités</a>' +
        '<a href="/#how">Comment ça marche</a>' +
        '<a href="/#avis">Avis</a>' +
        '<a href="/#download">Télécharger</a>' +
        '<a href="/outils" class="is-active">Outils</a>' +
        '<a class="site-nav-cta" href="https://whop.com/joined/ecom-ai-builder/" target="_blank" rel="noopener">Rejoindre &rarr;</a>' +
      "</div>" +
    "</div>";
  document.body.insertBefore(nav, document.body.firstChild);
  document.body.classList.add("has-site-nav");
})();
