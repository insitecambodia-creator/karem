(() => {
  'use strict';

  // Banner auto-expires after this date — simplest way to avoid leaving a stale
  // "we're closed" notice up once the festival's over. Cambodia local time (UTC+7),
  // since that's what the dates mean regardless of a visitor's own timezone.
  const EXPIRES_AT = new Date('2026-11-26T00:00:00+07:00');
  const DISMISS_KEY = 'karem-dismissed-water-festival-2026';

  if (new Date() >= EXPIRES_AT) return;

  let dismissed = false;
  try { dismissed = localStorage.getItem(DISMISS_KEY) === 'true'; } catch (e) {}
  if (dismissed) return;

  const bar = document.getElementById('announcement-bar');
  const closeBtn = document.getElementById('announcement-close');
  if (!bar || !closeBtn) return;

  bar.hidden = false;
  document.body.classList.add('has-announcement');

  closeBtn.addEventListener('click', () => {
    bar.remove();
    document.body.classList.remove('has-announcement');
    try { localStorage.setItem(DISMISS_KEY, 'true'); } catch (e) {}
  });
})();
