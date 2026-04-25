/* ══════════════════════════════════
   Menuiserie Dubois — script.js
══════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  document.body.classList.add('js-loaded');

  /* ── NAV scroll ── */
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ── REVEAL ── */
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal, .reveal-l, .reveal-r').forEach(el => obs.observe(el));

  ['.sf-item', '.engagement', '.real-card', '.avis-card', '.g-item'].forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * 0.07}s`;
      obs.observe(el);
    });
  });

  /* ── LIGHTBOX ── */
  const images = Array.from(document.querySelectorAll('.g-item img'));
  const lightbox = document.getElementById('lightbox');
  const lbImg    = document.getElementById('lb-img');
  const lbCount  = document.getElementById('lb-count');
  let current = 0;

  function openLb(idx) {
    current = idx;
    lbImg.src = images[idx].src.replace(/w=\d+/, 'w=1400');
    lbCount.textContent = `${idx + 1} / ${images.length}`;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLb() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
  function prevImg() { openLb((current - 1 + images.length) % images.length); }
  function nextImg() { openLb((current + 1) % images.length); }

  document.querySelectorAll('.g-item').forEach((item, i) => {
    item.addEventListener('click', () => openLb(i));
  });
  document.getElementById('lb-close')?.addEventListener('click', closeLb);
  document.getElementById('lb-prev')?.addEventListener('click', (e) => { e.stopPropagation(); prevImg(); });
  document.getElementById('lb-next')?.addEventListener('click', (e) => { e.stopPropagation(); nextImg(); });
  lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) closeLb(); });
  document.addEventListener('keydown', e => {
    if (!lightbox?.classList.contains('open')) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') prevImg();
    if (e.key === 'ArrowRight') nextImg();
  });

  /* ── FORMULAIRE DEVIS ── */
  const btn = document.querySelector('.btn-devis');
  if (btn) {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const orig = btn.textContent;
      btn.textContent = '✓ Demande envoyée — nous vous rappelons sous 24h';
      btn.style.background = '#2d6a30';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
        btn.disabled = false;
      }, 5000);
    });
  }

  /* ── SMOOTH SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

});
