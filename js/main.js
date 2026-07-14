/* ============================================
   PADELBELL - JavaScript Principal
   Lógica de UI, navegación, animaciones
   ============================================ */

/* =====================
   TOAST NOTIFICATIONS
   ===================== */
function showToast(message, type = 'info', duration = 3500) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${icons[type]}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/* =====================
   MODAL SYSTEM
   ===================== */
function openModal(modalId) {
  const overlay = document.getElementById(modalId);
  if (overlay) {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const overlay = document.getElementById(modalId);
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Cerrar modal al click en overlay
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Cerrar con ESC
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.active').forEach(m => {
      m.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
});

/* =====================
   HEADER SCROLL
   ===================== */
function initHeaderScroll() {
  const header = document.getElementById('main-header');
  if (!header) return;

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (currentScroll > lastScroll && currentScroll > 200) {
      header.classList.add('hidden-nav');
    } else {
      header.classList.remove('hidden-nav');
    }

    lastScroll = currentScroll;
  }, { passive: true });
}

/* =====================
   MOBILE MENU
   ===================== */
function initMobileMenu() {
  const toggler = document.getElementById('menu-toggler');
  const menu    = document.getElementById('mobile-menu');
  if (!toggler || !menu) return;

  toggler.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggler.setAttribute('aria-expanded', isOpen);
    toggler.innerHTML = isOpen ? '✕' : '☰';
  });
}

/* =====================
   COUNTDOWN TIMERS
   ===================== */
function startCountdown(elementId, targetDate) {
  const el = document.getElementById(elementId);
  if (!el) return;

  function update() {
    const now  = new Date().getTime();
    const dist = new Date(targetDate).getTime() - now;

    if (dist <= 0) {
      el.innerHTML = '<span class="live-tag">🔴 EN VIVO</span>';
      return;
    }

    const d = Math.floor(dist / (1000 * 60 * 60 * 24));
    const h = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((dist % (1000 * 60)) / 1000);

    el.innerHTML = `
      <div class="countdown-unit"><span class="countdown-num">${String(d).padStart(2,'0')}</span><span class="countdown-lbl">días</span></div>
      <span class="countdown-sep">:</span>
      <div class="countdown-unit"><span class="countdown-num">${String(h).padStart(2,'0')}</span><span class="countdown-lbl">hs</span></div>
      <span class="countdown-sep">:</span>
      <div class="countdown-unit"><span class="countdown-num">${String(m).padStart(2,'0')}</span><span class="countdown-lbl">min</span></div>
      <span class="countdown-sep">:</span>
      <div class="countdown-unit"><span class="countdown-num">${String(s).padStart(2,'0')}</span><span class="countdown-lbl">seg</span></div>
    `;
  }

  update();
  setInterval(update, 1000);
}

/* =====================
   COUNTER ANIMATION
   ===================== */
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = Math.floor(eased * target).toLocaleString('es-AR');
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el     = entry.target;
        const target = parseInt(el.dataset.counter);
        animateCounter(el, target);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* =====================
   INTERSECTION OBSERVER (animations)
   ===================== */
function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-animate]');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('animated');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  elements.forEach(el => observer.observe(el));
}

/* =====================
   PHOTO UPLOAD PREVIEW
   ===================== */
function initPhotoUploads() {
  document.querySelectorAll('.photo-upload-area').forEach(area => {
    const input = area.querySelector('input[type="file"]');
    if (!input) return;

    area.addEventListener('click', () => input.click());

    area.addEventListener('dragover', e => {
      e.preventDefault();
      area.classList.add('dragover');
    });

    area.addEventListener('dragleave', () => area.classList.remove('dragover'));

    area.addEventListener('drop', e => {
      e.preventDefault();
      area.classList.remove('dragover');
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) previewImage(area, file);
    });

    input.addEventListener('change', () => {
      if (input.files[0]) previewImage(area, input.files[0]);
    });
  });
}

function previewImage(area, file) {
  const reader = new FileReader();
  reader.onload = e => {
    area.innerHTML = `
      <img src="${e.target.result}" style="width:100%;height:140px;object-fit:cover;border-radius:8px;" alt="Preview">
      <p style="text-align:center;color:var(--text-secondary);font-size:12px;margin-top:8px;">✓ ${file.name}</p>
    `;
  };
  reader.readAsDataURL(file);
}

/* =====================
   RANGE SLIDER DISPLAY
   ===================== */
function initRangeSliders() {
  document.querySelectorAll('.range-with-display').forEach(wrapper => {
    const input   = wrapper.querySelector('input[type="range"]');
    const display = wrapper.querySelector('.range-display');
    const unit    = wrapper.dataset.unit || '';

    if (!input || !display) return;

    function updateDisplay() {
      display.textContent = input.value + unit;
    }

    input.addEventListener('input', updateDisplay);
    updateDisplay();
  });
}

/* =====================
   ACTIVE NAV LINK
   ===================== */
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* =====================
   TABS
   ===================== */
function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabGroup = btn.closest('[data-tab-group]');
      if (!tabGroup) return;

      const target = btn.dataset.tab;

      tabGroup.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const panelGroup = btn.dataset.panelGroup
        ? document.querySelector(`[data-panel-group="${btn.dataset.panelGroup}"]`)
        : tabGroup.closest('.tabs-wrapper')?.querySelector('.tab-panels');

      if (panelGroup) {
        panelGroup.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        const targetPanel = panelGroup.querySelector(`[data-panel="${target}"]`);
        if (targetPanel) targetPanel.classList.add('active');
      }
    });
  });
}

/* =====================
   SEARCH DEBOUNCE
   ===================== */
function debounce(fn, delay = 300) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
}

/* =====================
   HERO PARTICLE CANVAS
   ===================== */
function initHeroParticles() {
  const canvas = document.getElementById('hero-particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x     = Math.random() * canvas.width;
      this.y     = Math.random() * canvas.height;
      this.size  = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.color = Math.random() > 0.5 ? '0, 180, 216' : '242, 140, 56';
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 80; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }

  animate();
}

/* =====================
   PROVINCIA LOADER (dependiente del país)
   ===================== */
function initProvinceLoader() {
  document.querySelectorAll('[data-country-select]').forEach(countrySelect => {
    const provinceSelect = document.querySelector(
      `[data-province-select="${countrySelect.dataset.countrySelect}"]`
    );
    if (!provinceSelect) return;

    function loadProvinces(country) {
      const regions = getRegions();
      const reg = regions[country];
      provinceSelect.innerHTML = '<option value="">Seleccionar provincia/dpto.</option>';

      if (reg) {
        reg.provinces.forEach(prov => {
          const opt = document.createElement('option');
          opt.value = prov;
          opt.textContent = prov;
          provinceSelect.appendChild(opt);
        });
        provinceSelect.disabled = false;
      } else {
        provinceSelect.disabled = true;
      }
    }

    countrySelect.addEventListener('change', () => loadProvinces(countrySelect.value));
    if (countrySelect.value) loadProvinces(countrySelect.value);
  });
}

/* =====================================================================
   PATRÓN 240504 — Lazy Loading de Imágenes (IntersectionObserver)
   Carga imágenes solo cuando entran al viewport con efecto fade-in suave.
   Usar en HTML:  <img data-src="ruta.jpg" alt="..." class="lazy-img">
   ===================================================================== */
function initLazyImages() {
  const lazyImgs = document.querySelectorAll('img[data-src]');
  if (!lazyImgs.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      img.addEventListener('load', () => {
        img.classList.add('img-loaded');
        // Quitar skeleton del wrapper si existe
        const wrapper = img.closest('.img-skeleton');
        if (wrapper) wrapper.classList.add('img-skeleton--loaded');
      }, { once: true });
      io.unobserve(img);
    });
  }, {
    rootMargin: '200px 0px',   // pre-carga 200px antes de ser visible
    threshold: 0
  });

  lazyImgs.forEach(img => io.observe(img));
}

/* =====================================================================
   PATRÓN 240504 — Dynamic Import (Code Splitting Vanilla JS)
   Carga módulos pesados solo cuando el usuario los necesita.
   ===================================================================== */
function loadModuleOnDemand(triggerSelector, importFn) {
  const triggers = document.querySelectorAll(triggerSelector);
  if (!triggers.length) return;

  let moduleLoaded = false;
  const load = async () => {
    if (moduleLoaded) return;
    moduleLoaded = true;
    try { await importFn(); } catch(e) { console.warn('Module load error:', e); }
  };

  triggers.forEach(el => {
    el.addEventListener('click', load, { once: true });
    // Pre-carga cuando el trigger está cerca del viewport
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { load(); io.disconnect(); }
    }, { rootMargin: '400px' });
    io.observe(el);
  });
}

/* =====================
   THEME TOGGLE SYSTEM
   ===================== */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  
  const savedTheme = localStorage.getItem('padelbell_theme') || 'dark';
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    if (toggleBtn) {
      toggleBtn.dataset.icon = 'moon';
      toggleBtn.title = 'Cambiar a modo oscuro';
    }
  } else {
    document.body.classList.remove('light-theme');
    if (toggleBtn) {
      toggleBtn.dataset.icon = 'sun';
      toggleBtn.title = 'Cambiar a modo claro';
    }
  }
  
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('light-theme');
      localStorage.setItem('padelbell_theme', isLight ? 'light' : 'dark');
      toggleBtn.dataset.icon = isLight ? 'moon' : 'sun';
      toggleBtn.title = isLight ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro';
      renderIcons();
      document.dispatchEvent(new CustomEvent('themechanged', { detail: { theme: isLight ? 'light' : 'dark' } }));
    });
  }
}

/* =====================
   RENDER ICONS SYSTEM
   ===================== */
function renderIcons() {
  if (typeof icon !== 'function') return;
  document.querySelectorAll('[data-icon]').forEach(el => {
    const name = el.dataset.icon;
    const size = el.dataset.size ? parseInt(el.dataset.size) : 16;
    const color = el.dataset.color || 'currentColor';
    const cls = el.dataset.class || '';
    el.innerHTML = icon(name, { size, color, class: cls });
  });
}

/* =====================
   INIT GLOBAL
   ===================== */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderIcons();
  initHeaderScroll();
  initMobileMenu();
  initCounters();
  initScrollAnimations();
  initPhotoUploads();
  initRangeSliders();
  setActiveNavLink();
  initTabs();
  initHeroParticles();
  initProvinceLoader();
  initLazyImages();        // 240504 — lazy loading de imágenes
  initRoleBanner();        // Barra de sesión activa por rol
  initLiveBar();           // Barra de partido/torneo en vivo
  applyRolePermissions();  // Restricciones de permisos para espectador
});

/* =====================
   RESTRICT SPECTATOR ACTIONS
   ===================== */
function applyRolePermissions() {
  if (typeof AUTH === 'undefined') return;
  const role = AUTH.getRole();
  
  if (role !== 'admin' && role !== 'organizador') {
    // Hide add/edit buttons on list screens
    const addPlayerBtn = document.getElementById('btn-add-player');
    if (addPlayerBtn) addPlayerBtn.style.display = 'none';

    const addCourtBtn = document.getElementById('btn-add-court');
    if (addCourtBtn) addCourtBtn.style.display = 'none';

    const addNewsBtn = document.getElementById('fab-add-news');
    if (addNewsBtn) addNewsBtn.style.display = 'none';

    const generateBracketBtn = document.getElementById('btn-generate-bracket');
    if (generateBracketBtn) generateBracketBtn.style.display = 'none';

    const addMatchBtn = document.getElementById('btn-add-match');
    if (addMatchBtn) addMatchBtn.style.display = 'none';

    // Disable inline player registration form in index.html and show warning notice
    const inlineRegisterForm = document.getElementById('form-add-player-inline');
    if (inlineRegisterForm) {
      const parent = inlineRegisterForm.parentElement;
      parent.style.position = 'relative';
      
      const overlay = document.createElement('div');
      overlay.style.position = 'absolute';
      overlay.style.inset = '0';
      overlay.style.background = 'rgba(2, 4, 6, 0.95)';
      overlay.style.backdropFilter = 'blur(4px)';
      overlay.style.display = 'flex';
      overlay.style.flexDirection = 'column';
      overlay.style.alignItems = 'center';
      overlay.style.justifyContent = 'center';
      overlay.style.padding = '24px';
      overlay.style.textAlign = 'center';
      overlay.style.borderRadius = '16px';
      overlay.style.border = '1px dashed var(--border-default)';
      overlay.style.zIndex = '10';
      
      overlay.innerHTML = `
        <div style="background:rgba(242,140,43,0.1); width:48px; height:48px; border-radius:50%; display:flex; align-items:center; justify-content:center; margin-bottom:16px;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-orange)" stroke-width="2">
            <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
        </div>
        <h4 style="font-family:'Montserrat',sans-serif; font-weight:800; font-size:15px; margin-bottom:8px; color:var(--text-primary); letter-spacing:1px;">ACCESO RESTRINGIDO</h4>
        <p style="font-size:12px; color:var(--text-secondary); margin-bottom:20px; max-width:280px; line-height:1.6;">
          Para registrar jugadores en el circuito oficial, debés acceder con un perfil de Organizador o Administrador.
        </p>
        <a href="login.html" class="btn btn-primary btn-sm" style="font-family:'Montserrat',sans-serif; font-weight:700; text-transform:uppercase;">Iniciar Sesión</a>
      `;
      
      parent.appendChild(overlay);
    }
  }
}

/* =====================
   ROLE BANNER — Barra de sesión activa
   ===================== */
function initRoleBanner() {
  if (typeof AUTH === 'undefined') return;
  const role = AUTH.getRole();
  if (!role) return;

  const header = document.getElementById('main-header');
  if (!header) return;

  let bannerHTML = '';

  if (role === 'admin') {
    bannerHTML = `
      <div id="role-banner" class="role-banner role-banner--admin">
        <div class="container">
          <div class="role-banner__inner">
            <div class="role-banner__left">
              <span class="role-banner__dot"></span>
              <span class="role-banner__icon" data-icon="settings" data-size="14"></span>
              <span class="role-banner__label">Panel Admin</span>
              <span class="role-banner__name">Mariano Romero</span>
            </div>
            <div class="role-banner__right">
              <a href="admin.html" class="role-banner__link">Ir al panel</a>
              <button class="role-banner__logout" onclick="handleLogout()">Cerrar sesión</button>
            </div>
          </div>
        </div>
      </div>`;
  } else if (role === 'organizador') {
    const org = AUTH.getCurrentOrganizer();
    const t   = AUTH.getOrgTournament();
    const orgName  = org  ? org.name  : 'Organizador';
    const tName    = t    ? t.name    : 'Sin torneo asignado';
    bannerHTML = `
      <div id="role-banner" class="role-banner role-banner--organizer">
        <div class="container">
          <div class="role-banner__inner">
            <div class="role-banner__left">
              <span class="role-banner__dot"></span>
              <span class="role-banner__icon" data-icon="trophy" data-size="14"></span>
              <span class="role-banner__label">Organizador:</span>
              <span class="role-banner__name">${orgName}</span>
              <span class="role-banner__sep">·</span>
              <span class="role-banner__tournament">${tName}</span>
            </div>
            <div class="role-banner__right">
              <a href="organizador.html" class="role-banner__link">Mi panel</a>
              <button class="role-banner__logout" onclick="handleLogout()">Cerrar sesión</button>
            </div>
          </div>
        </div>
      </div>`;
  }

  if (bannerHTML) {
    header.insertAdjacentHTML('afterend', bannerHTML);
    renderIcons();
    // Ajustar el padding-top del body para no quedar bajo el header+banner
    const mainContent = document.querySelector('.page-content, main, section:first-of-type');
    const bannerEl = document.getElementById('role-banner');
    if (bannerEl && mainContent) {
      const bannerH = bannerEl.offsetHeight;
      document.body.style.paddingTop = (72 + bannerH) + 'px';
    }
  }
}

function handleLogout() {
  if (typeof AUTH !== 'undefined') AUTH.logout();
  location.href = 'login.html';
}

/* =====================
   PARTIDOS EN JUEGO BAR
   Barra verde con parejas, sede y opción de ocultar
   ===================== */
function initPlayingBar() {
  // Buscar partidos activos en LIVE_MATCHES o SAMPLE_MATCHES
  let playingMatches = [];
  if (typeof LIVE_MATCHES !== 'undefined') {
    playingMatches = LIVE_MATCHES.filter(m => m.status === 'live' || m.status === 'in_progress');
  }
  if (!playingMatches.length) return;

  // No mostrar en torneos.html (tiene su propio marcador)
  if (window.location.pathname.includes('torneos')) return;

  const header    = document.getElementById('main-header');
  const roleBanner = document.getElementById('role-banner');
  const insertAfter = roleBanner || header;
  if (!insertAfter) return;

  // ── Construir HTML del primer partido mostrado ──
  const m = playingMatches[0];
  const count = playingMatches.length;
  const countBadge = count > 1
    ? `<span class="playing-bar__count">+${count - 1} más</span>`
    : '';

  const bar = document.createElement('div');
  bar.id = 'playing-bar';
  bar.className = 'playing-bar';
  bar.innerHTML = `
    <div class="container">
      <div class="playing-bar__inner">
        <div class="playing-bar__left">
          <span class="playing-bar__dot"></span>
          <span class="playing-bar__label">EN JUEGO</span>
          <span class="playing-bar__sep">·</span>
          <div class="playing-bar__match">
            <span class="playing-bar__pairs">
              <strong>${m.pairA || 'Pareja A'}</strong>
              <span class="vs-txt">vs</span>
              <strong>${m.pairB || 'Pareja B'}</strong>
            </span>
          </div>
          ${m.venue ? `<span class="playing-bar__sep">·</span><span class="playing-bar__venue">${m.venue}</span>` : ''}
          ${countBadge}
        </div>
        <div class="playing-bar__right">
          <a href="torneos.html" class="playing-bar__cta">Ver partido</a>
          <button class="playing-bar__hide" onclick="hidePlayingBar()" title="Ocultar">Ocultar</button>
        </div>
      </div>
    </div>`;

  insertAfter.insertAdjacentElement('afterend', bar);

  // Botón flotante para restaurar
  const restore = document.createElement('button');
  restore.id = 'playing-bar-restore';
  restore.className = 'playing-bar__restore';
  restore.textContent = 'Partidos en juego';
  restore.onclick = showPlayingBar;
  document.body.appendChild(restore);

  // Ajustar padding del body
  _adjustBodyPaddingForBars();
}

function hidePlayingBar() {
  const bar = document.getElementById('playing-bar');
  const restore = document.getElementById('playing-bar-restore');
  if (bar) bar.classList.add('is-hidden');
  if (restore) restore.classList.add('visible');
  sessionStorage.setItem('playing_bar_hidden', '1');
  _adjustBodyPaddingForBars();
}

function showPlayingBar() {
  const bar = document.getElementById('playing-bar');
  const restore = document.getElementById('playing-bar-restore');
  if (bar) bar.classList.remove('is-hidden');
  if (restore) restore.classList.remove('visible');
  sessionStorage.removeItem('playing_bar_hidden');
  _adjustBodyPaddingForBars();
}

function _adjustBodyPaddingForBars() {
  // Recalcular padding-top del body según barras visibles
  const header  = document.getElementById('main-header');
  const role    = document.getElementById('role-banner');
  const playing = document.getElementById('playing-bar');
  const mobileMenu = document.getElementById('mobile-menu');
  const restore = document.getElementById('playing-bar-restore');
  
  let h1 = header ? header.offsetHeight : 72;
  
  if (role) {
    role.style.top = h1 + 'px';
    role.style.position = 'fixed';
    role.style.left = '0';
    role.style.right = '0';
    role.style.zIndex = '98';
  }
  
  let h2 = (role && !role.classList.contains('is-hidden')) ? role.offsetHeight : 0;
  
  if (playing) {
    playing.style.top = (h1 + h2) + 'px';
  }
  
  if (restore) {
    restore.style.top = (h1 + h2) + 'px';
  }
  
  let h3 = (playing && !playing.classList.contains('is-hidden')) ? playing.offsetHeight : 0;
  
  const total = h1 + h2 + h3;
  document.body.style.paddingTop = total + 'px';
  
  if (mobileMenu) {
    mobileMenu.style.top = total + 'px';
  }
  
  // Posicionamiento dinámico de elementos sticky en páginas específicas
  const filterBar = document.querySelector('.filter-bar');
  if (filterBar) {
    filterBar.style.top = total + 'px';
    const thead = document.querySelector('.ranking-table thead');
    if (thead) {
      thead.style.top = (total + filterBar.offsetHeight) + 'px';
    }
  }
}

// Compatibilidad con el nombre antiguo
function initLiveBar() { initPlayingBar(); }

