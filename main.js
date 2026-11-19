(() => {
  const assetScriptUrl = document.currentScript.src;
  const menu = document.querySelector('.menu');
  const nav = document.getElementById('nav');
  function setMenu(open) {
    menu.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  }
  menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menu.focus();
    }
  });
  const wide = matchMedia('(min-width:691px)');
  wide.addEventListener('change', event => { if (event.matches) setMenu(false); });

  if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    const seam = document.querySelector('.seam');
    if (seam) seam.classList.add('is-ready');
    const observer = new IntersectionObserver(entries => {
      for (const {target, isIntersecting} of entries) {
        if (!isIntersecting) continue;
        target.classList.add(target === seam ? 'is-drawn' : 'rise');
        observer.unobserve(target);
      }
    }, {threshold: 0.15});
    if (seam) observer.observe(seam);
    document.querySelectorAll('[data-reveal]').forEach(item => {
      if (item.getBoundingClientRect().top >= innerHeight) observer.observe(item);
    });
  }

  const season = document.getElementById('season');
  if (!season) return;
  document.addEventListener('DOMContentLoaded', () => {
    const $ = id => document.getElementById(id);
    const buttons = [...season.querySelectorAll('[data-season]')];
    if (!window.SEASONAL_EDIT) return;
    function select(key, init = false) {
      const d = window.SEASONAL_EDIT[key];
      if (!d) return;
      buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.season === key)));
      $('season-kicker').textContent = d.kicker;
      $('season-heading').replaceChildren(document.createTextNode(d.title[0]), document.createElement('br'), document.createTextNode(d.title[1]));
      $('season-description').textContent = d.description;
      $('season-link').href = d.link;
      $('season-link').firstChild.textContent = d.label + ' ';
      $('season-picks').replaceChildren(...d.picks.map(([title, photo, href]) => {
        const a = document.createElement('a');
        a.href = href;
        const image = document.createElement('img');
        image.src = new URL('assets/' + photo, assetScriptUrl).href;
        image.alt = '';
        image.loading = 'lazy';
        image.width = 500;
        image.height = 357;
        const cap = document.createElement('span');
        cap.textContent = title;
        const arrow = document.createElement('b');
        arrow.setAttribute('aria-hidden', 'true');
        arrow.textContent = '↗';
        cap.append(arrow);
        a.append(image, cap);
        return a;
      }));
      if (!init) $('season-status').textContent = d.hero + 'を表示しました。';
    }
    const month = Number(new Intl.DateTimeFormat('en-US', {timeZone:'Asia/Tokyo',month:'numeric'}).format(new Date()));
    const auto = month <= 2 || month >= 11 ? 'winter' : month <= 5 ? 'spring' : month <= 8 ? 'summer' : 'autumn';
    select(window.SEASONAL_EDIT[window.FEATURED_SEASON] ? window.FEATURED_SEASON : auto, true);
    buttons.forEach(button => button.addEventListener('click', () => select(button.dataset.season)));
  });
})();

if (document.fonts) {
  document.fonts.load('700 32px "TKS Condensed Display"', '価値をつくり続ける。')
    .then(faces => { if (faces.length) document.documentElement.classList.add('display-ready'); })
    .catch(() => { /* The default headline size accommodates system fonts. */ });
}
