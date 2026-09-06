(() => {
  if (!document.querySelector('link[data-nutri-dark-mode]')) {
    const darkModeStylesheet = document.createElement('link');
    darkModeStylesheet.rel = 'stylesheet';
    darkModeStylesheet.href = 'assets/dark-mode.css';
    darkModeStylesheet.dataset.nutriDarkMode = 'true';
    document.head.appendChild(darkModeStylesheet);
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('.site-header');
  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 10);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const interfaceImage = document.querySelector('.interface-frame img');
  if (interfaceImage) {
    const localSrc = 'assets/interfaz.png?v=1';
    const fallbackSrc = 'https://raw.githubusercontent.com/luva104/Nutri-Consultas-Web/main/assets/interfaz.png';

    interfaceImage.addEventListener('error', () => {
      if (interfaceImage.dataset.fallbackApplied === 'true') return;
      interfaceImage.dataset.fallbackApplied = 'true';
      interfaceImage.src = fallbackSrc;
    });

    interfaceImage.src = localSrc;
  }

  if (reducedMotion || !('IntersectionObserver' in window)) return;

  const groups = [
    '.section-heading',
    '.feature',
    '.workflow-step',
    '.trust-card',
    '.cta-panel',
    '.page-hero .container > *',
    '.support-card',
    '.article',
    '.side-card'
  ];
  const elements = document.querySelectorAll(groups.join(','));
  elements.forEach((element, index) => {
    element.classList.add('reveal');
    element.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 70}ms`);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -36px' });

  elements.forEach((element) => observer.observe(element));
})();
