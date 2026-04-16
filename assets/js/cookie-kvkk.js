(function () {
  const KEY    = 'kvkk-ok';
  const banner = document.getElementById('kvkk-banner');
  if (!banner) return;
  if (localStorage.getItem(KEY)) { banner.classList.add('hidden'); return; }
  const btn = document.getElementById('kvkk-accept');
  if (btn) {
    btn.addEventListener('click', () => {
      localStorage.setItem(KEY, '1');
      banner.classList.add('hidden');
    });
  }
})();
