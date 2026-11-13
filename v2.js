// v2：工程に合わせて図面を描き足す／事例レールの矢印
(() => {
  const fig = document.getElementById('fig');
  if (fig) {
    const layers = [...fig.querySelectorAll('.ly')];
    const no = document.getElementById('stepno');
    const steps = [...document.querySelectorAll('.step')];
    const set = n => {
      layers.forEach(l => {
        const i = +l.dataset.ly;
        l.classList.toggle('on', i <= n);
        l.classList.toggle('now', i === n && i > 0);
      });
      steps.forEach(s => s.classList.toggle('cur', +s.dataset.step === n));
      no.textContent = String(n).padStart(2, '0');
    };
    // 画面の55%の高さを越えた最後のステップを「いまの工程」にする
    let cur = -1;
    const onScroll = () => {
      const line = innerHeight * 0.55;
      let n = 0;
      steps.forEach(s => { if (s.getBoundingClientRect().top < line) n = +s.dataset.step; });
      if (n !== cur) { cur = n; set(n); }
    };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    onScroll();
  }

  const rail = document.getElementById('rail');
  document.querySelectorAll('[data-rail]').forEach(b => b.addEventListener('click', () => {
    const card = rail.querySelector('.case');
    rail.scrollBy({ left: (+b.dataset.rail) * (card.offsetWidth + 28), behavior: 'smooth' });
  }));
})();
