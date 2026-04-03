/**
 * Hospital Management Website - Main JavaScript
 */

/* ============================================================
   Loading Screen
   ============================================================ */
window.addEventListener('load', () => {
  const loader = document.getElementById('loading-screen');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 600);
    }, 1800);
  }
});

/* ============================================================
   Navbar: scroll behavior + mobile menu
   ============================================================ */
const navbar = document.getElementById('navbar');
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Scroll state
function handleNavbarScroll() {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll();

// Mobile toggle
if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });
}

// Close on link click
document.querySelectorAll('.nav-link, .mobile-menu .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger?.classList.remove('active');
    mobileMenu?.classList.remove('open');
  });
});

/* ============================================================
   Active Nav Link on Scroll
   ============================================================ */
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    if (navLink) {
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        navLink.classList.add('active');
      }
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });

/* ============================================================
   Smooth Scroll for anchor links
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ============================================================
   Scroll To Top Button
   ============================================================ */
const scrollTopBtn = document.getElementById('scroll-top');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   AOS – Animate On Scroll (lightweight custom impl)
   ============================================================ */
function initAOS() {
  const elements = document.querySelectorAll('[data-aos]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.aosDelay || 0;
        setTimeout(() => {
          entry.target.classList.add('aos-animate');
        }, parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  elements.forEach(el => observer.observe(el));
}

/* ============================================================
   Animated Counters
   ============================================================ */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString();
  }, 16);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

/* ============================================================
   Testimonial Slider
   ============================================================ */
function initTestimonialSlider() {
  const track = document.querySelector('.testimonials-track');
  const dots = document.querySelectorAll('.testimonial-dot');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');
  if (!track) return;

  const cards = track.querySelectorAll('.testimonial-card');
  const total = Math.ceil(cards.length / getCardsPerView());
  let current = 0;
  let autoTimer;

  function getCardsPerView() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1100) return 2;
    return 3;
  }

  function goTo(index) {
    const perView = getCardsPerView();
    const maxIndex = Math.ceil(cards.length / perView) - 1;
    current = Math.max(0, Math.min(index, maxIndex));
    // Gap value (28px) matches the CSS gap on .testimonials-track
    const CARD_GAP = 28;
    const cardWidth = cards[0].offsetWidth + CARD_GAP;
    track.style.transform = `translateX(-${current * perView * cardWidth}px)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      goTo(i);
      resetAuto();
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goTo(current - 1);
      resetAuto();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goTo(current + 1);
      resetAuto();
    });
  }

  function startAuto() {
    autoTimer = setInterval(() => {
      const perView = getCardsPerView();
      const max = Math.ceil(cards.length / perView) - 1;
      goTo(current >= max ? 0 : current + 1);
    }, 5000);
  }

  function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
  }

  goTo(0);
  startAuto();

  window.addEventListener('resize', () => goTo(0));
}

/* ============================================================
   Appointment Form
   ============================================================ */

// Loading spinner template used in the form submit button
const LOADING_SPINNER_HTML = `
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="width:18px;height:18px;fill:white;animation:spin 1s linear infinite">
    <path d="M12 2a10 10 0 110 20A10 10 0 0112 2zm0 2a8 8 0 100 16A8 8 0 0012 4zm0 1a1 1 0 011 1v5a1 1 0 01-.45.83l-3 2a1 1 0 01-1.1-1.66L11 10.5V6a1 1 0 011-1z" opacity=".3"/>
    <path d="M12 2a10 10 0 010 20V20a8 8 0 000-16V2z"/>
  </svg>
  Memproses...
`;

function initAppointmentForm() {
  const form = document.getElementById('appointment-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');

    // Loading state
    btn.disabled = true;
    btn.innerHTML = LOADING_SPINNER_HTML;

    // Simulate API call
    setTimeout(() => {
      form.style.display = 'none';
      const success = document.getElementById('form-success');
      if (success) success.style.display = 'block';
      showToast('Janji temu berhasil dibuat!');
    }, 1800);
  });
}

/* ============================================================
   Contact Form
   ============================================================ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Mengirim...';

    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = 'Kirim Pesan';
      form.reset();
      showToast('Pesan berhasil dikirim! Kami akan menghubungi Anda segera.');
    }, 1500);
  });
}

/* ============================================================
   Toast Notification
   ============================================================ */
function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
      <span></span>
    `;
    document.body.appendChild(toast);
  }
  toast.querySelector('span').textContent = message;
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 350);
  }, 3500);
}

/* ============================================================
   Quick Access Buttons
   ============================================================ */
function initQuickAccess() {
  const items = document.querySelectorAll('.quick-access-item');
  items.forEach(item => {
    item.addEventListener('click', () => {
      const target = item.dataset.target;
      if (target) {
        const section = document.querySelector(target);
        if (section) {
          const offset = 80;
          const top = section.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });
}

/* ============================================================
   CSS spin keyframes (for button loading)
   ============================================================ */
(function addSpinKeyframe() {
  const style = document.createElement('style');
  style.textContent = '@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }';
  document.head.appendChild(style);
})();

/* ============================================================
   Hero Typing Effect
   ============================================================ */
function initTypingEffect() {
  const el = document.getElementById('hero-typing');
  if (!el) return;
  const words = ['Terpercaya', 'Modern', 'Profesional', 'Inovatif'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let pause = false;

  function type() {
    const word = words[wordIndex];
    if (!isDeleting) {
      el.textContent = word.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === word.length) {
        pause = true;
        setTimeout(() => { pause = false; isDeleting = true; requestAnimationFrame(type); }, 2000);
        return;
      }
    } else {
      el.textContent = word.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }
    setTimeout(type, isDeleting ? 60 : 100);
  }

  type();
}

/* ============================================================
   Particle Background for Hero (subtle)
   ============================================================ */
function initParticles() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  const particles = Array.from({ length: 40 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 0.5,
    dx: (Math.random() - 0.5) * 0.4,
    dy: (Math.random() - 0.5) * 0.4,
    alpha: Math.random() * 0.4 + 0.1,
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    requestAnimationFrame(draw);
  }

  draw();
}

/* ============================================================
   Init All
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initAOS();
  initCounters();
  initTestimonialSlider();
  initAppointmentForm();
  initContactForm();
  initQuickAccess();
  initTypingEffect();
  initParticles();
});
