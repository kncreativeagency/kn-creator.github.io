/* Páginas legales (aviso-legal.html y privacidad.html): idioma, nombre del estudio,
   email y datos del titular, todos tomados de js/content.js (studio y studio.legal). */
(function () {
  'use strict';
  var S = window.SITE || {}, studio = S.studio || {}, legal = studio.legal || {};
  var root = document.documentElement;
  var lang = root.lang === 'en' ? 'en' : 'es';
  function $$(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }

  function applyLang() {
    root.lang = lang;
    $$('[data-lang]').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-lang') === lang ? 'true' : 'false');
    });
    var title = document.querySelector('[data-only="' + lang + '"] h1');
    if (title) document.title = (studio.name ? studio.name + ' — ' : '') + title.textContent;
  }
  $$('[data-lang]').forEach(function (b) {
    b.addEventListener('click', function () {
      lang = b.getAttribute('data-lang') === 'en' ? 'en' : 'es';
      try { localStorage.setItem('lang', lang); } catch (e) { /* almacenamiento no disponible */ }
      applyLang();
    });
  });

  // Nombre del estudio (con el punto del logotipo en el color de acento)
  if (studio.name) $$('[data-studio-name]').forEach(function (el) {
    el.textContent = studio.name;
    if (el.classList.contains('brand') && /\.$/.test(studio.name)) {
      el.textContent = studio.name.slice(0, -1);
      var dot = document.createElement('span');
      dot.className = 'brand__dot';
      dot.textContent = '.';
      el.appendChild(dot);
    }
  });
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // Email de contacto
  if (studio.email) $$('[data-email]').forEach(function (slot) {
    var a = document.createElement('a');
    a.href = 'mailto:' + studio.email;
    a.textContent = studio.email;
    slot.parentNode.replaceChild(a, slot);
  });

  // Datos del titular: los huecos sin rellenar se quedan marcados como pendientes
  // Un dato puede ser un texto o { es: "…", en: "…" }; el NIF es opcional: vacío, su línea se quita.
  var optional = { taxId: true };
  var pending = 0;
  $$('[data-legal]').forEach(function (slot) {
    var key = slot.getAttribute('data-legal'), raw = legal[key];
    var block = slot.closest('[data-only]');
    var slotLang = block ? block.getAttribute('data-only') : lang;
    if (raw && typeof raw === 'object') raw = raw[slotLang] != null ? raw[slotLang] : (raw.es || raw.en);
    var value = String(raw || '').trim();
    if (value) { slot.textContent = value; slot.classList.remove('legal__todo'); return; }
    if (optional[key]) {
      var dd = slot.closest('dd'), dt = dd && dd.previousElementSibling;
      if (dt && dt.tagName === 'DT') dt.parentNode.removeChild(dt);
      if (dd) dd.parentNode.removeChild(dd); else slot.parentNode.removeChild(slot);
      return;
    }
    pending++;
  });
  if (!pending) $$('[data-legal-draft]').forEach(function (el) { el.hidden = true; });

  applyLang();
})();
