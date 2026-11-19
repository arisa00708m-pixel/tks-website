(() => {
  const assetScriptUrl = document.currentScript.src;
  if (new URLSearchParams(location.search).get('motion') !== 'studio') return;
  const hero = document.querySelector('[data-hero]');
  const business = document.getElementById('business');
  if (!hero || !business) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const page = document.documentElement;
  page.classList.add('motion-studio');
  const create = (tag, cls, text) => {
    const el = document.createElement(tag);
    el.className = cls;
    if (text) el.textContent = text;
    return el;
  };

  const progress = create('div', 'studio-progress');
  progress.setAttribute('aria-hidden', 'true');
  document.body.prepend(progress);

  const rail = create('div', 'studio-rail');
  rail.setAttribute('aria-hidden', 'true');
  const track = create('div', 'studio-track');
  for (let i = 0; i < 3; i++) {
    track.append(create('span', 'studio-rail-word', 'YOKOHAMA'),create('i','studio-rail-dot'),
      create('span', 'studio-rail-word', 'THINK FORWARD'),create('i','studio-rail-dot'),
      create('span', 'studio-rail-word', 'RE–BORN'),create('i','studio-rail-dot'));
  }
  rail.append(track);
  business.after(rail);

  const photos = [['.business-consult','workspace'],['.business-lifestyle','design']];
  for (const [selector, file] of photos) {
    const card = business.querySelector(selector);
    if (!card) continue;
    const frame = create('div', 'studio-card-photo');
    frame.setAttribute('aria-hidden','true');
    const image = create('img', 'studio-card-image');
    image.src = new URL('assets/' + file + '.webp', assetScriptUrl).href;
    image.alt = '';
    image.loading = 'lazy';
    image.decoding = 'async';
    frame.append(image);
    card.append(frame);
  }

  for (const row of hero.querySelectorAll('h1 > span')) {
    const inner = create('span','studio-hero-line');
    inner.append(...row.childNodes);
    row.append(inner);
  }
  if (!reduce.matches && !location.hash && scrollY < 40) {
    page.classList.add('studio-entry');
  }

  const heroArt = hero.querySelector('.hero-art');
  const reflection = hero.querySelector('.reflection');
  let frame = 0;
  function paint() {
    frame = 0;
    if (reduce.matches) return;
    const h = innerHeight, scroll = scrollY, max = page.scrollHeight - h;
    progress.style.setProperty('--page-progress', max > 0 ? String(Math.min(1,scroll/max)) : '0');
    const art = heroArt.getBoundingClientRect();
    if (art.bottom > 0 && art.top < h) {
      const shift = Math.min(1, Math.max(0, (hero.offsetTop - art.top) / Math.max(1, art.height)));
      heroArt.style.setProperty('--sun-shift', (-28 * shift) + 'px');
      reflection.style.setProperty('--reflect-shift', (21 * shift) + 'px');
    }
    const box = rail.getBoundingClientRect();
    if (box.bottom > 0 && box.top < h) {
      const amount = Math.min(1, Math.max(0, (h - box.top)/(h + box.height)));
      track.style.setProperty('--rail-shift', (-12 - 260*amount) + 'px');
    }
    for (const image of business.querySelectorAll('.studio-card-image')) {
      const box = image.parentElement.getBoundingClientRect();
      if (box.bottom < 0 || box.top > h) continue;
      const shift = Math.min(14, Math.max(-14,(h/2-box.top-box.height/2) * .041));
      image.style.setProperty('--photo-shift', shift+'px');
    }
  }
  function schedule() {
    if (!frame && !reduce.matches) frame = requestAnimationFrame(paint);
  }
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',schedule,{passive:true});
  reduce.addEventListener('change',schedule);
  schedule();
})();
