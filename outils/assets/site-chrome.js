// Chrome partagé des pages Outils = UNE seule source qui aligne les outils sur
// la landing (site statique multi-fichiers : pas d'héritage natif du <head>/
// <header> entre fichiers). Injecte : favicon identique à la landing + header de
// la landing + lien retour vers le hub sur les pages détail.
(function () {
  // --- Favicon (identique à la landing, pas de favicon par page) -----------
  var fav = document.createElement("link");
  fav.rel = "icon";
  fav.type = "image/png";
  fav.href = "/icon.png?v=3";
  document.head.appendChild(fav);

  // --- Header de la landing -------------------------------------------------
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

  // --- Lien retour vers le hub (pages détail uniquement, pas le hub) --------
  var isHub = /\/outils\/?(index(\.html)?)?$/.test(location.pathname);
  if (!isHub) {
    var back = document.createElement("a");
    back.className = "site-back";
    back.href = "/outils";
    back.innerHTML = "&larr; Retourner à la liste des outils";
    var wrap = document.querySelector(".wrap");
    if (wrap) wrap.insertBefore(back, wrap.firstChild);
    else document.body.insertBefore(back, nav.nextSibling);
  }
})();
