/* Portfolio — comportamiento. El contenido está en content.js y translations.js;
   no deberías necesitar editar este archivo. */
(function () {
  'use strict';

  var S = window.SITE || {};
  var T = window.TRANSLATIONS || {};
  var IMG = 'assets/images/', VID = 'assets/video/', POSTER = 'assets/posters/';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function h(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  /* ---------------------------------------------------------------- idioma */
  var lang = document.documentElement.lang === 'en' ? 'en' : 'es';   // lo fija el script de <head>
  var binders = [];

  // Texto de la página por clave (translations.js)
  function t(key) {
    var d = T[lang] || {};
    if (key in d) return d[key];
    return (T.es && T.es[key]) || key;
  }
  // Texto de un proyecto: admite "texto" o { es: "…", en: "…" }
  function L(v) {
    if (v && typeof v === 'object') return v[lang] != null ? v[lang] : (v.es || v.en || '');
    return v || '';
  }
  // Registra algo que debe volver a escribirse al cambiar de idioma
  function bind(fn) { binders.push(fn); fn(); }

  function applyLang() {
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
    $$('[data-i18n-html]').forEach(function (el) { el.innerHTML = t(el.getAttribute('data-i18n-html')); });
    $$('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var p = pair.split(':');
        if (p.length === 2) el.setAttribute(p[0].trim(), t(p[1].trim()));
      });
    });
    $$('[data-lang]').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-lang') === lang ? 'true' : 'false');
    });
    var name = S.studio && S.studio.name;
    document.title = (name ? name + ' — ' : '') + t('meta.title');
    binders.forEach(function (fn) { fn(); });
  }

  function setLang(next) {
    if (next !== 'es' && next !== 'en') return;
    lang = next;
    try { localStorage.setItem('lang', lang); } catch (e) { /* almacenamiento no disponible */ }
    applyLang();
  }
  $$('[data-lang]').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
  });

  /* -------------------------------------------------------------- imágenes */
  function picture(image, sizes, eager) {
    var i = document.createElement('img');
    bind(function () { i.alt = L(image.alt); });
    i.decoding = 'async';
    i.loading = eager ? 'eager' : 'lazy';
    if (eager) i.setAttribute('fetchpriority', 'high');
    if (image.w && image.h) {
      i.width = image.w; i.height = image.h;
      var small = Math.min(800, image.w);
      if (small < image.w) {
        i.sizes = sizes;
        i.srcset = IMG + image.file + '-800.jpg ' + small + 'w, ' + IMG + image.file + '.jpg ' + image.w + 'w';
      }
    }
    i.src = IMG + image.file + '.jpg';
    return i;
  }
  function ratio(image) { return image && image.w && image.h ? image.w / image.h : 0.8; }
  function emptyNote() {
    var p = h('p', 'empty');
    bind(function () { p.textContent = t('empty'); });
    return p;
  }

  /* ------------------------------------------------------------------ hero */
  (function hero() {
    var mount = $('#hero-media');
    if (!mount || !S.hero || !S.hero.main) return;
    mount.appendChild(picture(S.hero.main, '(min-width: 900px) 66vw, 100vw', true));
    if (S.hero.main.caption) {
      var cap = h('p', 'label hero__caption');
      bind(function () { cap.textContent = L(S.hero.main.caption); });
      mount.appendChild(cap);
    }
  })();

  /* --------------------------------------------------------------- marquee */
  (function marquee() {
    var track = $('#marquee');
    if (!track) return;
    bind(function () {
      var items = t('marquee').split('|').map(function (s) { return s.trim(); }).filter(Boolean);
      track.textContent = '';
      // Dos grupos idénticos: la animación desplaza exactamente uno y vuelve a empezar.
      for (var g = 0; g < 2; g++) {
        var ul = h('ul', 'marquee__group');
        for (var rep = 0; rep < 3; rep++) items.forEach(function (s) { ul.appendChild(h('li', null, s)); });
        track.appendChild(ul);
      }
    });
  })();

  /* -------------------------------------------------------------- clientes */
  (function clients() {
    var section = $('#clients'), track = $('#clients-marquee'), list = $('#clients-list');
    if (!section) return;
    var names = (S.clients || []).filter(Boolean);
    if (!names.length || !track) { section.hidden = true; return; }
    names.forEach(function (n) { if (list) list.appendChild(h('li', null, n)); });   // versión legible para lectores de pantalla
    for (var g = 0; g < 2; g++) {
      var ul = h('ul', 'marquee__group');
      for (var rep = 0; rep < 3; rep++) names.forEach(function (n) { ul.appendChild(h('li', null, n)); });
      track.appendChild(ul);
    }
  })();

  /* ------------------------------------------------------------ fotografía */
  var shots = []; // todas las imágenes de la galería, en orden, para el visor

  // Una imagen del mosaico: botón que abre el visor, con la marca superpuesta.
  function shotButton(image, project) {
    var b = h('button', 'shot reveal');
    b.type = 'button';
    b.style.setProperty('--r', ratio(image).toFixed(4));
    b.appendChild(picture(image, '(min-width: 1100px) 34vw, (min-width: 700px) 50vw, 66vw', false));

    var meta = h('span', 'shot__meta');
    var brand = h('span', 'shot__brand');
    var note = h('span', 'shot__note');
    meta.appendChild(brand);
    meta.appendChild(note);
    var tag = project.concept ? h('span', 'tag') : null;
    if (tag) meta.appendChild(tag);
    b.appendChild(meta);

    bind(function () {
      b.setAttribute('aria-label', t('viewer.open') + ': ' + L(project.brand) + (L(image.alt) ? ' — ' + L(image.alt) : ''));
      brand.textContent = L(project.brand);
      note.textContent = L(project.note);
      note.hidden = !note.textContent;
      if (tag) tag.textContent = t('tag.concept');
    });

    var index = shots.push({ image: image, project: project }) - 1;
    b.addEventListener('click', function () { openViewer(index); });
    return b;
  }

  // Reparte las imágenes (en orden) en k filas con una suma de proporciones lo más parecida posible,
  // para que todas las filas tengan una altura similar.
  function partition(ratios, k) {
    var n = ratios.length, pre = [0], dp = [], cut = [], i, j, m;
    ratios.forEach(function (r, x) { pre[x + 1] = pre[x] + r; });
    var ideal = pre[n] / k;
    for (i = 0; i <= n; i++) { dp[i] = []; cut[i] = []; for (j = 0; j <= k; j++) dp[i][j] = Infinity; }
    dp[0][0] = 0;
    for (j = 1; j <= k; j++) {
      for (i = j; i <= n; i++) {
        for (m = j - 1; m < i; m++) {
          var cost = dp[m][j - 1] + Math.pow(pre[i] - pre[m] - ideal, 2);
          if (cost < dp[i][j]) { dp[i][j] = cost; cut[i][j] = m; }
        }
      }
    }
    var rows = [];
    for (i = n, j = k; j > 0; j--) { m = cut[i][j]; rows.unshift([m, i]); i = m; }
    return rows;
  }

  (function photography() {
    var mount = $('#photography-list');
    if (!mount) return;
    var tiles = [];
    (S.photography || []).forEach(function (project) {
      (project.images || []).forEach(function (image) {
        tiles.push({ el: shotButton(image, project), r: ratio(image) });
      });
    });
    if (!tiles.length) { mount.appendChild(emptyNote()); return; }

    var total = tiles.reduce(function (sum, tile) { return sum + tile.r; }, 0);
    var mqWide = window.matchMedia('(min-width: 1100px)'), mqMid = window.matchMedia('(min-width: 700px)');
    var currentRows = 0;

    function layout() {
      // Suma de proporciones por fila: cuanto mayor, más imágenes por fila y filas más bajas.
      var target = mqWide.matches ? 2.7 : mqMid.matches ? 2 : 1.35;
      var k = Math.max(1, Math.min(tiles.length, Math.round(total / target)));
      if (k === currentRows) return;
      currentRows = k;
      mount.textContent = '';
      partition(tiles.map(function (tile) { return tile.r; }), k).forEach(function (range) {
        var row = h('div', 'mosaic__row');
        for (var x = range[0]; x < range[1]; x++) row.appendChild(tiles[x].el);
        mount.appendChild(row);
      });
    }
    layout();
    window.addEventListener('resize', layout);
  })();

  /* ----------------------------------------------------------------- visor */
  var viewer = $('#lightbox'), viewerImg = $('#lightbox-img');
  var current = 0;

  function showShot(i) {
    current = (i + shots.length) % shots.length;
    var s = shots[current];
    var note = L(s.project.note);
    viewerImg.src = IMG + s.image.file + '.jpg';
    viewerImg.alt = L(s.image.alt);
    $('#lightbox-caption').textContent = L(s.project.brand) + (note ? ' — ' + note : '');
    $('#lightbox-count').textContent = pad(current + 1) + ' / ' + pad(shots.length);
  }
  function openViewer(i) {
    if (!viewer) return;
    showShot(i);
    if (viewer.showModal) viewer.showModal(); else viewer.setAttribute('open', '');
  }
  function closeViewer() {
    if (viewer.close) viewer.close(); else viewer.removeAttribute('open');
  }
  if (viewer) {
    viewer.addEventListener('click', function (e) {
      var target = e.target.closest('[data-lb]');
      if (!target) return;
      var act = target.getAttribute('data-lb');
      if (act === 'prev') showShot(current - 1);
      else if (act === 'next') showShot(current + 1);
      else closeViewer();
    });
    viewer.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') showShot(current - 1);
      if (e.key === 'ArrowRight') showShot(current + 1);
    });
  }

  /* ----------------------------------------------------------------- vídeo */
  var videos = [];

  var ICONS = {
    play:   '<path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none"/>',
    pause:  '<path d="M8.5 5.5v13M15.5 5.5v13" stroke-width="1.8"/>',
    sound:  '<path d="M4 9.5v5h3.5l4.5 4v-13l-4.5 4z"/><path d="M15.5 9a4.2 4.2 0 0 1 0 6M18 6.5a7.8 7.8 0 0 1 0 11"/>',
    muted:  '<path d="M4 9.5v5h3.5l4.5 4v-13l-4.5 4z"/><path d="M16 9.5l5 5M21 9.5l-5 5"/>',
    expand: '<path d="M5 9.5V5h4.5M14.5 5H19v4.5M19 14.5V19h-4.5M9.5 19H5v-4.5"/>'
  };
  // Icono + etiqueta accesible (la etiqueta se vuelve a escribir al cambiar de idioma)
  function relabel(btn) {
    if (!btn || !btn._key) return;
    btn.setAttribute('aria-label', t(btn._key) + ': ' + L(btn._item.title));
    btn.title = t(btn._key);
  }
  function setIcon(btn, icon, key, item) {
    btn.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">' + ICONS[icon] + '</svg>';
    btn._key = key; btn._item = item;
    relabel(btn);
  }

  function load(v) { if (!v.getAttribute('src')) v.src = v.dataset.src; }
  function play(v) {
    load(v);
    var p = v.play();
    if (p && p.catch) p.catch(function () { /* autoplay bloqueado: el botón de reproducir sigue funcionando */ });
  }
  function setMuted(v, muted) {
    v.muted = muted;
    if (v._soundBtn) setIcon(v._soundBtn, muted ? 'muted' : 'sound', muted ? 'video.soundOn' : 'video.soundOff', v._item);
  }

  function clip(item) {
    var shape = item.format === 'wide' ? 'wide' : item.format === 'poster' ? 'poster' : 'tall';
    var fig = h('figure', 'clip reveal');
    var frame = h('div', 'clip__frame is-paused clip__frame--' + shape);

    var v = document.createElement('video');
    v.muted = true; v.defaultMuted = true; v.loop = true; v.playsInline = true;
    v.setAttribute('muted', ''); v.setAttribute('playsinline', '');
    v.preload = 'none';
    v.poster = POSTER + item.file + '.jpg';
    v.dataset.src = VID + item.file + '.mp4';
    v._item = item;
    frame.appendChild(v);

    var controls = h('div', 'clip__controls');
    var toggle = h('button', 'clip__btn');
    toggle.type = 'button';
    setIcon(toggle, 'play', 'video.play', item);
    controls.appendChild(toggle);

    var sound = null;
    if (item.sound) {
      sound = h('button', 'clip__btn');
      sound.type = 'button';
      setIcon(sound, 'muted', 'video.soundOn', item);
      sound.addEventListener('click', function () {
        var unmute = v.muted;
        if (unmute) videos.forEach(function (o) { if (o !== v) setMuted(o, true); });
        setMuted(v, !unmute);
        if (unmute && v.paused) { v._userPaused = false; play(v); }
      });
      v._soundBtn = sound;
      controls.appendChild(sound);
    }

    var full = h('button', 'clip__btn');
    full.type = 'button';
    full.setAttribute('data-act', 'full');
    setIcon(full, 'expand', 'video.fullscreen', item);
    full.addEventListener('click', function () {
      load(v);
      if (v.requestFullscreen) v.requestFullscreen();
      else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen();   // iPhone
    });
    controls.appendChild(full);
    frame.appendChild(controls);

    function userToggle() {
      if (v.paused) { v._userPaused = false; play(v); }
      else { v._userPaused = true; v.pause(); }
    }
    toggle.addEventListener('click', userToggle);
    v.addEventListener('click', function () { if (document.fullscreenElement !== v) userToggle(); });
    v.addEventListener('play', function () {
      setIcon(toggle, 'pause', 'video.pause', item);
      frame.classList.remove('is-paused');
    });
    v.addEventListener('pause', function () {
      setIcon(toggle, 'play', 'video.play', item);
      frame.classList.add('is-paused');
    });

    fig.appendChild(frame);
    var cap = h('figcaption');
    var title = h('span', 'clip__title');
    var note = h('span', 'clip__note');
    cap.appendChild(title);
    cap.appendChild(note);
    var tag = item.concept ? h('span', 'tag') : null;
    if (tag) cap.appendChild(tag);
    fig.appendChild(cap);

    bind(function () {
      var noteText = L(item.note);
      title.textContent = L(item.title);
      note.textContent = noteText;
      note.hidden = !noteText;
      if (tag) tag.textContent = t('tag.concept');
      v.setAttribute('aria-label', L(item.title) + (noteText ? ' — ' + noteText : ''));
      relabel(toggle); relabel(sound); relabel(full);
    });

    videos.push(v);
    return fig;
  }

  function renderClips(list, mount) {
    if (!mount) return;
    list = list || [];
    if (!list.length) { mount.appendChild(emptyNote()); return; }
    var wide = list.filter(function (i) { return i.format === 'wide'; });
    var poster = list.filter(function (i) { return i.format === 'poster'; });
    var tall = list.filter(function (i) { return i.format !== 'wide' && i.format !== 'poster'; });

    // Pocas piezas y de los dos formatos: una sola fila en la que todas tienen la misma altura.
    if (wide.length && tall.length && !poster.length && list.length <= 3) {
      var mix = h('div', 'clips__grid clips__grid--mix');
      list.forEach(function (i) {
        var fig = clip(i);
        fig.style.setProperty('--r', i.format === 'wide' ? '1.7778' : '0.5625');
        if (i.format !== 'wide') fig.classList.add('clip--narrow');
        mix.appendChild(fig);
      });
      mount.appendChild(mix);
      return;
    }
    [[wide, 'clips__grid clips__grid--wide'], [tall, 'clips__grid clips__grid--tall'],
     [poster, 'clips__grid clips__grid--tall clips__grid--poster']].forEach(function (g) {
      if (!g[0].length) return;
      var grid = h('div', g[1]);
      // columnas en escritorio: 5 si son exactamente cinco piezas; si no, 4 (3 para los 2:3)
      grid.style.setProperty('--n', g[0] === poster ? 3 : (g[0].length === 5 ? 5 : 4));
      g[0].forEach(function (i) { grid.appendChild(clip(i)); });
      mount.appendChild(grid);
    });
  }
  renderClips(S.ugc, $('#ugc-list'));
  renderClips(S.ads, $('#ads-list'));
  renderClips(S.hypermotion, $('#hypermotion-list'));

  // Servicios: imagen o vídeos en bucle (sin sonido ni controles) junto a cada servicio.
  $$('[data-service-media]').forEach(function (mount) {
    var cfg = (S.services || {})[mount.getAttribute('data-service-media')];
    if (!cfg) { mount.hidden = true; return; }
    if (cfg.image) mount.appendChild(picture(cfg.image, '(min-width: 900px) 50vw, 100vw', false));
    (cfg.videos || []).forEach(function (file) {
      var v = document.createElement('video');
      v.muted = true; v.defaultMuted = true; v.loop = true; v.playsInline = true;
      v.setAttribute('muted', ''); v.setAttribute('playsinline', '');
      v.setAttribute('aria-hidden', 'true'); v.tabIndex = -1;
      v.preload = 'none';
      v.poster = POSTER + file + '.jpg';
      v.dataset.src = VID + file + '.mp4';
      mount.appendChild(v);
      videos.push(v);
    });
  });

  // Reproduce (sin sonido) solo mientras está en pantalla; pausa y silencia al salir.
  if ('IntersectionObserver' in window) {
    var vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) {
          if (!reduceMotion && !v._userPaused) play(v);
        } else {
          if (!v.paused) v.pause();
          if (!v.muted) setMuted(v, true);
        }
      });
    }, { threshold: 0.4 });
    videos.forEach(function (v) { vio.observe(v); });
  }
  // Controles nativos mientras un vídeo está a pantalla completa.
  document.addEventListener('fullscreenchange', function () {
    videos.forEach(function (v) { v.controls = document.fullscreenElement === v; });
  });

  /* ------------------------------------------------------ datos sencillos */
  $$('[data-count]').forEach(function (el) {
    var n = (S[el.getAttribute('data-count')] || []).length;
    el.textContent = n ? pad(n) : '';
  });

  var name = S.studio && S.studio.name;
  if (name) $$('[data-studio-name]').forEach(function (el) {
    el.textContent = name;
    // En el logotipo, el punto final del nombre va en el color de acento.
    if (el.classList.contains('brand') && /\.$/.test(name)) {
      el.textContent = name.slice(0, -1);
      el.appendChild(h('span', 'brand__dot', '.'));
    }
  });
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  var email = S.studio && S.studio.email && S.studio.email.trim();
  if (email) $$('[data-email]').forEach(function (slot) {
    var a = h('a', slot.getAttribute('data-email') || null, email);
    a.href = 'mailto:' + email;
    slot.parentNode.replaceChild(a, slot);
  });

  // Formulario de brief: abre el correo del visitante con el brief ya escrito.
  (function brief() {
    var form = $('#brief-form');
    if (!form) return;
    var send = $('button[type="submit"]', form), pending = $('[data-brief-pending]', form);
    if (!email) { send.disabled = true; if (pending) pending.hidden = false; }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!email) return;
      var f = form.elements, brand = f.brand.value.trim();
      var needs = $$('input[name="need"]:checked', form).map(function (c) { return c.parentNode.textContent.trim(); });
      var lines = [t('brief.name') + ': ' + f.name.value.trim()];
      if (brand) lines.push(t('brief.brand') + ': ' + brand);
      if (needs.length) lines.push(t('brief.need') + ' ' + needs.join(', '));
      lines.push('', f.message.value.trim());
      var link = h('a');
      link.href = 'mailto:' + email +
        '?subject=' + encodeURIComponent(t('brief.subject') + (brand ? ' — ' + brand : '')) +
        '&body=' + encodeURIComponent(lines.join('\n'));
      link.hidden = true;
      form.appendChild(link);
      link.click();
      form.removeChild(link);
    });
  })();

  /* ------------------------------------------------------------------- nav */
  var nav = $('.nav'), toggle = $('.nav__toggle'), progress = $('.progress');
  function onScroll() {
    nav.classList.toggle('is-scrolled', window.scrollY > 24);
    if (progress) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.setProperty('--progress', max > 0 ? Math.min(1, window.scrollY / max).toFixed(4) : 0);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.textContent = t(open ? 'nav.close' : 'nav.menu');
    document.documentElement.style.overflow = open ? 'hidden' : '';
  }
  if (toggle) {
    toggle.addEventListener('click', function () { setMenu(!nav.classList.contains('is-open')); });
    $$('.nav__links a').forEach(function (l) { l.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('is-open')) setMenu(false); });
    bind(function () { toggle.textContent = t(nav.classList.contains('is-open') ? 'nav.close' : 'nav.menu'); });
  }

  // Escribe todos los textos fijos en el idioma activo.
  applyLang();

  /* ---------------------------------------------------------------- reveal */
  var reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var rio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); rio.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { rio.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }
})();
