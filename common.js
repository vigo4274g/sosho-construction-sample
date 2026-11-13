// 出現アニメ・ヘッダー切替・メニュー・数字カウント（JSが動かなければ全部最初から表示）
(() => {
  const root = document.documentElement;
  root.classList.add('js');

  const header = document.querySelector('.header');
  const fv = document.querySelector('.fv, .r-fv');
  const toTop = document.querySelector('.to-top');
  const tab = document.querySelector('.contact-tab');
  const onScroll = () => {
    const y = scrollY;
    if (header && fv && fv.classList.contains('fv')) header.classList.toggle('is-top', y < fv.offsetHeight - 100);
    if (toTop) toTop.classList.toggle('show', y > 600);
    if (tab) tab.classList.toggle('show', !fv || y > fv.offsetHeight - 200);
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const btn = document.querySelector('.menu-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      const open = document.body.classList.toggle('nav-open');
      btn.setAttribute('aria-expanded', open);
    });
    document.querySelectorAll('.gnav a').forEach(a => a.addEventListener('click', () => document.body.classList.remove('nav-open')));
  }

  const count = el => {
    const end = +el.dataset.count;
    const t0 = performance.now();
    const step = t => {
      const p = Math.min((t - t0) / 1600, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      e.target.querySelectorAll('[data-count]').forEach(count);
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('.fade').forEach(el => io.observe(el));
})();
