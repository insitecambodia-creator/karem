(() => {
  'use strict';

  /* ---------- Flavour categories ---------- */
  const categories = [
    { name: 'Classic Ice Cream', flavours: ['Vanilla', 'Chocolate', 'Chocolate Chips', 'Chocolate Extreme', 'White Chocolate', 'Coffee', 'Caramel', 'Salted Butter Caramel', 'Hazelnut', 'Pistachio', 'Rum Raisin', 'Tiramisu', 'Speculoos', 'Baileys', 'Wild Berries', 'Vanilla Brownies', 'Vanilla Cookies', 'Cinnamon'] },
    { name: 'Asian Collection', flavours: ['Matcha Green Tea', 'Green Tea', 'Black Sesame', 'Pandan Leaves', 'Taro', 'Durian', 'Jackfruit', 'Ginger', 'Ginger Lemongrass', 'Honey (Mondolkiri)', 'Pepper Kampot', 'Chocolate Extreme Pepper', 'Wasabi', 'Romdeng Lemongrass'] },
    { name: 'Fruit Sorbets', flavours: ['Mango', 'Mango Passion', 'Passion', 'Pineapple', 'Strawberry', 'Raspberry', 'Blueberry', 'Orange', 'Pear', 'Melon', 'Coconut', 'Coconut Chili', 'Coconut Ginger', 'Lime', 'Lime Basil', 'Lime Kampot Pepper', 'Lychee', 'Longan', 'Soursop', 'Red Dragon Fruit', 'Strawberry Basil'] },
    { name: 'Special Collection', flavours: ['Almond Milk', 'Banana', 'Banana Caramelised Peanuts', 'Mint Chocolate Chips', 'Yoghurt Lime'] }
  ];

  const tabsEl = document.getElementById('category-tabs');
  const listEl = document.getElementById('flavour-list');
  const countEl = document.getElementById('flavour-count');
  let activeCategory = categories[0].name;

  function renderTabs() {
    tabsEl.innerHTML = categories.map(cat => `
      <button type="button" role="tab" aria-selected="${cat.name === activeCategory}"
        class="${cat.name === activeCategory ? 'is-active' : ''}" data-cat="${cat.name}">
        ${cat.name}
      </button>
    `).join('');
  }

  function renderList() {
    const active = categories.find(c => c.name === activeCategory) || categories[0];
    countEl.textContent = `${active.flavours.length} flavours in ${active.name}`;
    listEl.innerHTML = active.flavours.map(name => `
      <div class="flavour-list__item"><span class="dot"></span>${name}</div>
    `).join('');
  }

  tabsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-cat]');
    if (!btn) return;
    activeCategory = btn.getAttribute('data-cat');
    renderTabs();
    renderList();
  });

  renderTabs();
  renderList();

  /* ---------- Signup form ---------- */
  const N8N_WEBHOOK_URL = 'https://n8n.srv873866.hstgr.cloud/webhook/67081b87-3812-47b4-81c4-0c53bf660b8e';

  const signupForm = document.getElementById('signup-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = signupForm.querySelector('.form-submit');

  function setStatus(message, kind) {
    formStatus.textContent = message;
    formStatus.classList.remove('is-success', 'is-error');
    if (kind) formStatus.classList.add(kind);
  }

  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!signupForm.checkValidity()) {
      signupForm.reportValidity();
      return;
    }

    const data = Object.fromEntries(new FormData(signupForm).entries());

    submitBtn.disabled = true;
    setStatus('Sending…', null);

    try {
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) {
        const bodyText = await res.text().catch(() => '');
        console.error('Karem signup webhook responded with an error:', res.status, bodyText);
        throw new Error('http-status');
      }
      signupForm.reset();
      setStatus('Thanks! We’ll be in touch shortly.', 'is-success');
    } catch (err) {
      // A TypeError here means fetch never got an HTTP response at all —
      // almost always a CORS block or DNS/network failure, not a workflow error.
      console.error('Karem signup form submission failed:', err);
      setStatus('Something went wrong. Please try again or email hello@karem.com.', 'is-error');
    } finally {
      submitBtn.disabled = false;
    }
  });
})();
