(() => {
  if (!document.querySelector('link[data-nutri-dark-mode]')) {
    const darkModeStylesheet = document.createElement('link');
    darkModeStylesheet.rel = 'stylesheet';
    darkModeStylesheet.href = 'assets/dark-mode.css';
    darkModeStylesheet.dataset.nutriDarkMode = 'true';
    document.head.appendChild(darkModeStylesheet);
  }

  const storeUrl = 'https://apps.microsoft.com/detail/9NNQN98VTQLT?hl=neutral&gl=CR&ocid=pdpshare';

  const heroLead = document.querySelector('.hero .lead');
  if (heroLead && !document.querySelector('.store-availability-note')) {
    const storeNote = document.createElement('p');
    storeNote.className = 'store-availability-note';
    storeNote.style.marginTop = '14px';
    storeNote.style.fontWeight = '600';
    storeNote.innerHTML = `Disponible oficialmente en <a href="${storeUrl}" target="_blank" rel="noopener noreferrer">Microsoft Store</a> para Windows 10 y 11.`;
    heroLead.insertAdjacentElement('afterend', storeNote);
  }

  const productStatus = document.querySelector('.product-card .status');
  if (productStatus) {
    productStatus.textContent = 'Disponible oficialmente en Microsoft Store';
  }

  const installFeature = Array.from(document.querySelectorAll('.feature')).find((feature) =>
    feature.querySelector('h3')?.textContent.trim() === 'Instalación rápida'
  );
  if (installFeature) {
    const title = installFeature.querySelector('h3');
    const text = installFeature.querySelector('p');
    if (title) title.textContent = 'Instalación desde Microsoft Store';
    if (text) text.textContent = 'Descarga desde el canal oficial de Microsoft y recibe las actualizaciones de Nutri Consultas de forma sencilla.';
  }

  const versionText = document.querySelector('.cta-panel p');
  if (versionText) {
    fetch('version.json', { cache: 'no-store' })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => {
        const latest = data?.latestVersion || data?.latest;
        if (latest) {
          versionText.textContent = `Versión ${latest} · Windows 10 y 11 de 64 bits · Disponible oficialmente en Microsoft Store.`;
        }
      })
      .catch(() => null);
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
    '.support-card'
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
  }, { threshold: 0.08, rootMargin: '0px 0px -24px' });

  elements.forEach((element) => observer.observe(element));
})();
