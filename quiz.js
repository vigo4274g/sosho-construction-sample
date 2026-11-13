// 工種診断：3問の回答で5工種に点数をつけ、いちばん高いものを出す
(() => {
  const box = document.getElementById('quizbox');
  if (!box) return;
  const T = {
    machine: ['機械整備', 'machine.jpg', '仕組みを理解して直すのが好きなタイプ。止まった重機を動かすと、現場全体から頼られます。自動車整備の経験も活かせます。'],
    earth:   ['土工', 'earth.jpg', '大きなものを動かして景色を変えたいタイプ。重機の資格を取りながら、造成や掘削の現場で腕を上げられます。'],
    rebar:   ['鉄筋工事', 'rebar.jpg', '図面どおりにきっちり仕上げたいタイプ。組んだ鉄筋が橋や建物の骨になり、完成後もずっと残ります。'],
    scaffold:['足場', 'scaffold.jpg', 'チームで息を合わせるのが得意なタイプ。高い所からの景色と、段取りを回す力が身につきます。'],
    weld:    ['溶接', 'weld.jpg', '一生ものの専門技術を持ちたいタイプ。資格を取れば、どの現場でも求められる職人になれます。']
  };
  let score = {};
  const qs = [...box.querySelectorAll('.q')];
  const show = i => qs.forEach((q, k) => q.classList.toggle('cur', k === i));
  box.querySelectorAll('.opts button').forEach(b => b.addEventListener('click', () => {
    b.dataset.a.split(' ').forEach((k, i) => score[k] = (score[k] || 0) + (i ? 1 : 2));
    const i = +b.closest('.q').dataset.q + 1;
    if (i < qs.length) return show(i);
    show(-1);
    const best = Object.keys(score).sort((a, c) => score[c] - score[a])[0];
    const [name, img, text] = T[best];
    document.getElementById('rname').textContent = name;
    document.getElementById('rtext').textContent = text;
    const im = document.getElementById('rimg');
    im.src = 'img/' + img; im.alt = name + 'の現場';
    document.getElementById('result').classList.add('cur');
  }));
  document.getElementById('again').addEventListener('click', () => {
    score = {};
    document.getElementById('result').classList.remove('cur');
    show(0);
  });
})();
