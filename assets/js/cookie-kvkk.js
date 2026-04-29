(function () {
  var KEY = 'kvkk-ok-v2';
  var banner = document.getElementById('kvkk-banner');
  if (!banner) return;
  if (localStorage.getItem(KEY)) { banner.classList.add('hidden'); return; }

  var acceptBtn = document.getElementById('kvkk-accept');
  var rejectBtn = document.getElementById('kvkk-reject');

  if (acceptBtn) {
    acceptBtn.addEventListener('click', function () {
      localStorage.setItem(KEY, 'accepted');
      banner.classList.add('hidden');
    });
  }
  if (rejectBtn) {
    rejectBtn.addEventListener('click', function () {
      localStorage.setItem(KEY, 'rejected');
      banner.classList.add('hidden');
    });
  }
})();
