/* ============================================================
   MERUGU.BHAVANA — Portfolio JavaScript
   ============================================================ */

/* ── 1. LOADER ─────────────────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1200);
});

/* ── 2. NAVBAR ─────────────────────────────────────────────── */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
const navLinkEls = document.querySelectorAll('.nav-link');

// Sticky + scroll highlight
window.addEventListener('scroll', () => {
  // Sticky shadow
  navbar.classList.toggle('scrolled', window.scrollY > 50);

  // Scroll to top button
  document.getElementById('scrollTop').classList.toggle('visible', window.scrollY > 400);

  // Active nav link
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinkEls.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
});

// Hamburger toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close on nav link click (mobile)
navLinkEls.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ── 3. DARK / LIGHT THEME ─────────────────────────────────── */
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');
const html        = document.documentElement;

// Persist preference
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

/* ── 4. TYPING ANIMATION ───────────────────────────────────── */
const typingEl = document.getElementById('typingText');
const phrases  = [
  '3rd Year B.Tech Student',
  'Web Development Learner',
  'Creative Problem Solver',
  'Future Full-Stack Dev',
  'HTML & CSS Enthusiast',
];

let phraseIndex = 0, charIndex = 0, isDeleting = false;

function typeWriter() {
  const current = phrases[phraseIndex];
  if (isDeleting) {
    typingEl.textContent = current.slice(0, --charIndex);
  } else {
    typingEl.textContent = current.slice(0, ++charIndex);
  }

  if (!isDeleting && charIndex === current.length) {
    setTimeout(() => { isDeleting = true; typeWriter(); }, 1800);
    return;
  }
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
  }
  setTimeout(typeWriter, isDeleting ? 50 : 80);
}

typeWriter();

/* ── 5. SCROLL REVEAL ───────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── 6. SKILL BAR ANIMATION ─────────────────────────────────── */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(fill => {
        const pct = fill.closest('.skill-bar').dataset.width;
        fill.style.width = pct + '%';
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skills-grid').forEach(el => skillObserver.observe(el));

/* ── 7. CGPA BAR ANIMATION ──────────────────────────────────── */
const cgpaObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.cgpa-fill').forEach(fill => {
        fill.style.width = fill.dataset.width + '%';
      });
      cgpaObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.timeline').forEach(el => cgpaObserver.observe(el));

/* ── 8. SCROLL TO TOP ───────────────────────────────────────── */
document.getElementById('scrollTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── 9. POPUP HELPERS ───────────────────────────────────────── */
function openPopup(id) {
  document.getElementById(id).classList.add('active');
  document.getElementById('popupOverlay').classList.add('active');
}
function closePopup(id) {
  document.getElementById(id).classList.remove('active');
  document.getElementById('popupOverlay').classList.remove('active');
}
function closeAllPopups() {
  document.querySelectorAll('.popup').forEach(p => p.classList.remove('active'));
  document.getElementById('popupOverlay').classList.remove('active');
}

/* ── 10. CONTACT FORM — FormSubmit (no signup needed) ───────── */
/*
  HOW IT WORKS:
  - First submission → FormSubmit sends a confirmation email to bhavanamrecw07@gmail.com
  - Click "Confirm Email" in that email ONE TIME to activate
  - After that, every form submission goes straight to your Gmail — no setup needed!
*/

const FORMSUBMIT_URL = 'https://formsubmit.co/ajax/bhavanamrecw07@gmail.com';

const form    = document.getElementById('contactForm');
const sendBtn = document.getElementById('sendBtn');

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function showFieldError(fieldId, message) {
  document.getElementById(fieldId + 'Error').textContent = message;
  document.getElementById(fieldId).style.borderColor = '#ff6b6b';
}

function clearFieldError(fieldId) {
  document.getElementById(fieldId + 'Error').textContent = '';
  document.getElementById(fieldId).style.borderColor = '';
}

// Live clear errors on input
['name', 'email', 'message'].forEach(id => {
  document.getElementById(id).addEventListener('input', () => clearFieldError(id));
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  let valid = true;

  if (!name || name.length < 2) {
    showFieldError('name', name ? 'Name must be at least 2 characters.' : 'Please enter your name.');
    valid = false;
  }
  if (!email) {
    showFieldError('email', 'Please enter your email address.');
    valid = false;
  } else if (!isValidEmail(email)) {
    showFieldError('email', 'Please enter a valid email address.');
    valid = false;
  }
  if (!message || message.length < 10) {
    showFieldError('message', message ? 'Message should be at least 10 characters.' : 'Please enter a message.');
    valid = false;
  }

  if (!valid) return;

  // Loading state
  sendBtn.disabled = true;
  sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';

  try {
    const response = await fetch(FORMSUBMIT_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        name:     name,
        email:    email,
        message:  message,
        _subject: 'New Portfolio Message from ' + name,
        _captcha: 'false',
        _template: 'table',
      }),
    });

    const result = await response.json();

    if (result.success === 'true' || result.success === true) {
      form.reset();
      openPopup('successPopup');
    } else {
      openPopup('errorPopup');
    }
  } catch (err) {
    console.error('FormSubmit error:', err);
    openPopup('errorPopup');
  } finally {
    sendBtn.disabled = false;
    sendBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
  }
});

/* ── 11. SMOOTH SCROLL for anchor links ─────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 70; // navbar height
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  });
});

/* ── 12. ACTIVE NAV ON LOAD ─────────────────────────────────── */
window.dispatchEvent(new Event('scroll'));
