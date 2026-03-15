const obs = new IntersectionObserver(e => e.forEach(x => {
  if (x.isIntersecting) x.target.classList.add('in');
}), { threshold: .1 });
document.querySelectorAll('.rv').forEach(el => obs.observe(el));
window.addEventListener('scroll', () => {
  const links = document.querySelectorAll('.nav-links a');
  let cur = '';
  document.querySelectorAll('section[id]').forEach(s => {
    if (scrollY >= s.offsetTop - 150) cur = s.id;
  });
  links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + cur));
});
function filter(type, btn) {
  document.querySelectorAll('.flt').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  document.querySelectorAll('.card').forEach(c => {
    c.style.display = type === 'all' || c.dataset.t === type ? '' : 'none';
  });
}
function openMenu() {
  document.getElementById('drawer').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  document.getElementById('drawer').classList.remove('open');
  document.body.style.overflow = '';
}
function send(btn) {
  btn.textContent = 'Запрос отправлен ✓';
  btn.style.background = 'var(--accent)';
  setTimeout(() => {
    btn.textContent = 'Отправить запрос';
    btn.style.background = '';
  }, 3000);
}
function openModal(card) {
  const d = card.dataset;
  document.getElementById('mImg').src = d.img;
  document.getElementById('mType').textContent = d.type + (d.badge ? ' · ' + d.badge : '');
  document.getElementById('mTitle').textContent = d.name;
  document.getElementById('mAddr').textContent = d.addr;
  document.getElementById('mPrice').textContent = d.price;
  document.getElementById('mDesc').textContent = d.desc;
  const specs = JSON.parse(d.specs);
  document.getElementById('mSpecs').innerHTML = specs.map(s =>
    `<div class="mspec"><div class="mspec-v">${s[0]}</div><div class="mspec-l">${s[1]}</div></div>`
  ).join('');
  document.getElementById('mMap').src =
    `https://yandex.ru/map-widget/v1/?ll=${d.ll}&z=16&pt=${d.pt}&l=map`;
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(e) {
  if (e && e.target !== document.getElementById('modalOverlay')) return;
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});
