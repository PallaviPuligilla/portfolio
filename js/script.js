/* ══════════════════════════════════════════════════════════
   PORTFOLIO JAVASCRIPT - Pallavi Puligila
   ══════════════════════════════════════════════════════════ */

/* ── SCROLL REVEAL ──────────────────────────────────────── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


/* ══════════════════════════════════════════════════════════
   CAROUSEL FUNCTIONALITY - All 3 Carousels
   ══════════════════════════════════════════════════════════ */

const carouselStates = {};

function initCarousel(carouselId) {
  const track = document.getElementById(carouselId);
  if (!track) return;
  
  carouselStates[carouselId] = {
    currentSlide: 0,
    totalSlides: track.querySelectorAll('.carousel-slide').length,
    autoPlayInterval: null
  };
  
  // Start auto-play
  startAutoPlay(carouselId);
  
  // Pause on hover
  const container = track.closest('.carousel-container, .carousel-container-small');
  if (container) {
    container.addEventListener('mouseenter', () => stopAutoPlay(carouselId));
    container.addEventListener('mouseleave', () => startAutoPlay(carouselId));
  }
}

function moveSlide(carouselId, direction) {
  const state = carouselStates[carouselId];
  if (!state) return;
  
  state.currentSlide += direction;
  
  if (state.currentSlide >= state.totalSlides) {
    state.currentSlide = 0;
  } else if (state.currentSlide < 0) {
    state.currentSlide = state.totalSlides - 1;
  }
  
  updateCarousel(carouselId);
}

function goToSlide(carouselId, slideIndex) {
  if (!carouselStates[carouselId]) return;
  carouselStates[carouselId].currentSlide = slideIndex;
  updateCarousel(carouselId);
}

function updateCarousel(carouselId) {
  const state = carouselStates[carouselId];
  const track = document.getElementById(carouselId);
  
  if (!track || !state) return;
  
  // Get the corresponding dots container
  const dotsId = carouselId.replace('Carousel', 'Dots');
  const dotsContainer = document.getElementById(dotsId);
  
  // Move track
  track.style.transform = `translateX(-${state.currentSlide * 100}%)`;
  
  // Update dots
  if (dotsContainer) {
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === state.currentSlide);
    });
  }
}

function startAutoPlay(carouselId) {
  const state = carouselStates[carouselId];
  if (!state || state.autoPlayInterval) return;
  
  state.autoPlayInterval = setInterval(() => {
    moveSlide(carouselId, 1);
  }, 4000);
}

function stopAutoPlay(carouselId) {
  const state = carouselStates[carouselId];
  if (!state) return;
  
  if (state.autoPlayInterval) {
    clearInterval(state.autoPlayInterval);
    state.autoPlayInterval = null;
  }
}

// Initialize all carousels when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initCarousel('listentogetherCarousel');
  initCarousel('interviewCarousel');
  initCarousel('newsmaniaCarousel');
});


/* ══════════════════════════════════════════════════════════
   FILTER FUNCTIONALITY
   ══════════════════════════════════════════════════════════ */

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const filter = btn.dataset.filter;
    
    // Filter all project cards
    const allCards = document.querySelectorAll('.proj-card, .featured-card, .proj-card-small');
    
    allCards.forEach(card => {
      const categories = card.dataset.category || '';
      const shouldShow = filter === 'all' || categories.includes(filter);
      
      if (shouldShow) {
        card.style.display = '';
        card.style.opacity = '1';
        card.style.transform = '';
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
          if (!categories.includes(filter) && filter !== 'all') {
            card.style.display = 'none';
          }
        }, 200);
      }
    });
    
    // Show/hide additional projects header
    setTimeout(() => {
      const visibleSmallCards = document.querySelectorAll('.proj-card-small:not([style*="display: none"])');
      const additionalHeader = document.querySelector('.additional-projects-header');
      if (additionalHeader) {
        additionalHeader.style.display = visibleSmallCards.length > 0 ? 'flex' : 'none';
      }
    }, 250);
  });
});


/* ══════════════════════════════════════════════════════════
   TAB SWITCHER (Experience/Education)
   ══════════════════════════════════════════════════════════ */

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
  });
});


/* ══════════════════════════════════════════════════════════
   EMAIL COPY FUNCTIONALITY
   ══════════════════════════════════════════════════════════ */

const emailBtn = document.getElementById('emailBtn');
const emailText = document.getElementById('emailBtnText');

if (emailBtn && emailText) {
  emailBtn.addEventListener('click', () => {
    navigator.clipboard && navigator.clipboard.writeText('puligillapallavi@gmail.com');
    emailBtn.classList.add('copied');
    emailText.textContent = '✓ Copied!';
    setTimeout(() => {
      emailBtn.classList.remove('copied');
      emailText.textContent = 'puligillapallavi@gmail.com';
    }, 2400);
  });
}


/* ══════════════════════════════════════════════════════════
   ACTIVE NAV LINK ON SCROLL
   ══════════════════════════════════════════════════════════ */

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === '#' + current ? 'var(--ink)' : '';
  });
}, { passive: true });


/* ══════════════════════════════════════════════════════════
   HAMBURGER MENU (Mobile)
   ══════════════════════════════════════════════════════════ */

const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.querySelector('.nav-links');

if (hamburger && navLinksContainer) {
  hamburger.addEventListener('click', () => {
    const isOpen = navLinksContainer.classList.contains('mobile-open');
    
    if (isOpen) {
      navLinksContainer.classList.remove('mobile-open');
      navLinksContainer.style.display = '';
    } else {
      navLinksContainer.classList.add('mobile-open');
      navLinksContainer.style.display = 'flex';
      navLinksContainer.style.flexDirection = 'column';
      navLinksContainer.style.position = 'absolute';
      navLinksContainer.style.top = '60px';
      navLinksContainer.style.left = '0';
      navLinksContainer.style.right = '0';
      navLinksContainer.style.background = 'var(--bg)';
      navLinksContainer.style.padding = '20px 24px';
      navLinksContainer.style.borderBottom = '1px solid var(--border)';
      navLinksContainer.style.gap = '16px';
      navLinksContainer.style.zIndex = '99';
    }
  });
  
  // Close mobile menu when clicking a link
  navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navLinksContainer.classList.remove('mobile-open');
        navLinksContainer.style.display = '';
      }
    });
  });
}


/* ══════════════════════════════════════════════════════════
   SMOOTH SCROLL FOR ANCHOR LINKS
   ══════════════════════════════════════════════════════════ */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});