/* ══════════════════════════════════════════════════════
   AGRO WARRIORS — script.js
   Works across: index.html, timeline.html, gallery.html,
                 team.html, achievements.html
══════════════════════════════════════════════════════ */

// ── NAVBAR SCROLL ────────────────────────────────────
const navbar  = document.getElementById('navbar');
const backTop = document.getElementById('backTop');

window.addEventListener('scroll', () => {
  if (navbar)  navbar.classList.toggle('scrolled', window.scrollY > 60);
  if (backTop) backTop.classList.toggle('show', window.scrollY > 400);
});

// ── HAMBURGER MENU ───────────────────────────────────
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (mobileMenu.classList.contains('open')) {
      spans[0].style.cssText = 'transform:translateY(7px) rotate(45deg)';
      spans[1].style.cssText = 'opacity:0';
      spans[2].style.cssText = 'transform:translateY(-7px) rotate(-45deg)';
    } else {
      spans.forEach(s => s.style.cssText = '');
    }
  });
  document.querySelectorAll('.mm-link').forEach(l => {
    l.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => s.style.cssText = '');
    });
  });
}

// ── YEAR TABS (timeline.html) ────────────────────────
document.querySelectorAll('.ytab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.ytab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.year-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const panel = document.getElementById('yp-' + tab.dataset.year);
    if (panel) panel.classList.add('active');
  });
});

// ── TEAM TABS (team.html) ────────────────────────────
document.querySelectorAll('.team-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.team-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.team-section').forEach(s => s.classList.remove('active'));
    tab.classList.add('active');
    const sec = document.getElementById('ts-' + tab.dataset.tsec);
    if (sec) sec.classList.add('active');
  });
});

// ── GALLERY FILTER (gallery.html) ───────────────────
document.querySelectorAll('.gf-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.gf-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.gallery-item').forEach(item => {
      const show = filter === 'all' || item.dataset.cat === filter;
      item.style.display = show ? 'block' : 'none';
      if (show) {
        item.style.animation = 'none';
        requestAnimationFrame(() => {
          item.style.animation = 'fadeUp 0.35s ease forwards';
        });
      }
    });
  });
});

// ── CONTACT FORM SUBMIT ──────────────────────────────
window.handleSubmit = function(btn) {
  const original = btn.innerHTML;
  btn.innerHTML = '&#10003; Message Sent!';
  btn.style.background = '#1a7a38';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = original;
    btn.style.background = '';
    btn.disabled = false;
  }, 3000);
};

// ── SCROLL REVEAL (all pages) ────────────────────────
const revealEls = document.querySelectorAll(
  '.spec-card, .team-card, .ach-card, .faculty-big-card, ' +
  '.gallery-item, .sponsor-card, .contact-item, ' +
  '.ach-card, .faculty-big-card, .award-item, .faculty-card, .member-row'
);

if ('IntersectionObserver' in window && revealEls.length) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  revealEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(22px)';
    el.style.transition = 'opacity 0.5s ease ' + (i % 6) * 55 + 'ms, transform 0.5s ease ' + (i % 6) * 55 + 'ms';
    obs.observe(el);
  });
}
