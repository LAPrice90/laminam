/* === NAVIGATION SCRIPT ===================== */
(function () {
  const header     = document.getElementById('main-header');
  const logo       = document.getElementById('header-logo');
  const hamburger  = document.querySelector('.hamburger');
  const navWrapper = document.querySelector('.nav-wrapper');
  const navLinks   = document.querySelector('.nav-links');

  let isHovered = false;

  function isHomePage() {
    const p = window.location.pathname;
    return p === '/' || p.endsWith('index.html');
  }

  function isMobile() {
    return window.innerWidth < 1200;
  }

  function getCorrectLogo() {
    if (isMobile()) return 'images/symbol-blue.svg';
    if (isHovered || window.scrollY > 10 || !isHomePage()) {
      return 'images/symbol-white.svg';
    }
    return 'images/symbol-blue.svg';
  }

  function updateHeaderState() {
    const scrolled = window.scrollY > 10;
    const mobileMenuOpen = navWrapper && navWrapper.classList.contains('open');

    // When on mobile with the menu closed: if at the top and not hovered, remove the background
    if (mobileMenuOpen) {
        header.classList.add('scrolled');
    } else if (!isHomePage() || isHovered || scrolled) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    const logoSrc = getCorrectLogo();
    if (!logo.src.includes(logoSrc)) {
      logo.src = logoSrc;
    }
  }

  /* MOBILE MENU TOGGLE */
  if (hamburger && navWrapper) {
    hamburger.addEventListener('click', () => {
      navWrapper.classList.toggle('open');
      hamburger.classList.toggle('active');
      header.classList.toggle('menu-open', navWrapper.classList.contains('open'));
      hamburger.setAttribute('aria-expanded', navWrapper.classList.contains('open'));
      updateHeaderState();
    });
  }

  /* DESKTOP HOVER LOGIC */
  if (header) {
    header.addEventListener('mouseenter', () => {
      if (isMobile() || (navWrapper && navWrapper.classList.contains('open'))) return;
      isHovered = true;
      updateHeaderState();
    });

    header.addEventListener('mouseleave', () => {
      if (isMobile() || (navWrapper && navWrapper.classList.contains('open'))) return;
      isHovered = false;
      updateHeaderState();
    });
  }

  window.addEventListener('scroll', updateHeaderState);
  window.addEventListener('resize', updateHeaderState);

  updateHeaderState();
})();

/* === INSTALLATION PROCESS carousel === */
(function () {                         // ← line 1  (was document.addEventListener …)
  if (typeof Swiper === 'undefined') return;

  const processSwiper = new Swiper('.process-swiper', {
    loop: true,
    centeredSlides: true,
    centeredSlidesBounds: true,
    spaceBetween: 20,
    slidesPerView: 1.35,           // desktop width
    breakpoints: {                 // tablet & mobile widths
        1200: { slidesPerView: 2.8 },
        900: { slidesPerView: 2.4 },
        600: { slidesPerView: 2 },
          0: { slidesPerView: 1.40 }
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  /* pill ⇄ slide sync */
  const tabs = document.querySelectorAll('.process-tabs .tab');
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      processSwiper.slideToLoop(i);
    });
  });

  processSwiper.on('slideChange', () => {
    const idx = processSwiper.realIndex;
    tabs.forEach((t, i) => t.classList.toggle('active', i === idx));
  });
})();                                   // ← last line (was just });)

