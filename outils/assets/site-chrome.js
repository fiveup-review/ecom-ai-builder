// Spécifique aux pages /outils : favicon (identique à la landing) + lien retour
// vers le hub. Le HEADER, lui, vient de /assets/site-header.js (source PARTAGÉE
// avec la landing) — ne plus le dupliquer ici.
(function () {
  // Favicon identique à la landing (pas de favicon par page).
  var fav = document.createElement("link");
  fav.rel = "icon";
  fav.type = "image/png";
  fav.href = "/icon.png?v=3";
  document.head.appendChild(fav);

  // Lien retour vers le hub (pages détail uniquement, pas le hub lui-même).
  var isHub = /\/outils\/?(index(\.html)?)?$/.test(location.pathname);
  if (!isHub) {
    var back = document.createElement("a");
    back.className = "site-back";
    back.href = "/outils";
    back.innerHTML = "&larr; Retourner à la liste des outils";
    var wrap = document.querySelector(".wrap");
    if (wrap) wrap.insertBefore(back, wrap.firstChild);
  }
})();
