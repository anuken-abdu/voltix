/* ===================================================================
   VOLTIX.KZ — interactions
   =================================================================== */

(function () {
  'use strict';

  const PHONE_DIGITS = '77071811115';

  /* ----------- WhatsApp link generator ----------- */
  function waUrl(message) {
    const text = message || 'Здравствуйте! Подскажите по услугам Voltix.';
    return `https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent(text)}`;
  }

  function bindWaLinks() {
    document.querySelectorAll('[data-wa]').forEach(el => {
      const msg = el.getAttribute('data-wa');
      el.setAttribute('href', waUrl(msg));
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
    });
  }

  /* ----------- Hamburger menu ----------- */
  function bindMenu() {
    const btn = document.querySelector('[data-menu-open]');
    const panel = document.querySelector('.menu-panel');
    const overlay = document.querySelector('.menu-overlay');

    if (!btn || !panel || !overlay) return;

    function open() {
      panel.classList.add('is-open');
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      panel.classList.remove('is-open');
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    btn.addEventListener('click', open);
    document.querySelectorAll('[data-menu-close]').forEach(el => {
      el.addEventListener('click', close);
    });

    panel.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => setTimeout(close, 100));
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') close();
    });
  }

  /* ----------- Floating action buttons ----------- */
  function bindFloatingActions() {
    const fab = document.querySelector('.float-actions');
    if (!fab) return;
    function onScroll() {
      if (window.scrollY > 700) fab.classList.add('show');
      else fab.classList.remove('show');
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ----------- Mark active nav ----------- */
  function markActive() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    const current = path === '' ? 'index.html' : path;
    document.querySelectorAll('[data-nav]').forEach(a => {
      const href = a.getAttribute('href');
      if (href === current) a.classList.add('active');
    });
  }

  /* ----------- Year in footer ----------- */
  function setYear() {
    document.querySelectorAll('.year').forEach(el => {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ----------- Theme toggle ----------- */
  function bindThemeToggle() {
    const root = document.documentElement;
    // Ensure attribute exists (inline head-script sets it, but defensive)
    if (!root.getAttribute('data-theme')) {
      let saved = 'light';
      try { saved = localStorage.getItem('voltix-theme') || 'light'; } catch (e) {}
      root.setAttribute('data-theme', saved);
    }
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      btn.addEventListener('click', () => {
        const cur = root.getAttribute('data-theme') || 'light';
        const next = cur === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        try { localStorage.setItem('voltix-theme', next); } catch (e) {}
      });
    });
  }

  /* ----------- Scroll to top button ----------- */
  function bindScrollTop() {
    const btn = document.querySelector('[data-scroll-top]');
    if (!btn) return;
    function onScroll() {
      if (window.scrollY > 400) btn.classList.add('show');
      else btn.classList.remove('show');
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    onScroll();
  }

  document.addEventListener('DOMContentLoaded', () => {
    bindWaLinks();
    bindMenu();
    bindFloatingActions();
    markActive();
    setYear();
    bindThemeToggle();
    bindScrollTop();
  });
})();
