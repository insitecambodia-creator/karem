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

  /* ---------- Testimonials ---------- */
  const testimonials = [
    { quote: 'Karem lets us plate a dessert that feels as considered as everything else on the menu.', name: 'Executive Chef', role: 'Boutique Hotel, Siem Reap' },
    { quote: 'The Kampot pepper flavour has become the signature of our tasting menu.', name: 'Head Pastry Chef', role: 'Fine Dining Restaurant, Phnom Penh' },
    { quote: 'Consistent quality, every delivery, exactly what a resort kitchen needs.', name: 'F&B Director', role: 'Beach Resort, Sihanoukville' }
  ];

  const quoteEl = document.getElementById('testimonial-quote');
  const nameEl = document.getElementById('testimonial-name');
  const roleEl = document.getElementById('testimonial-role');
  const dotsEl = document.getElementById('testimonial-dots');
  let testimonialIndex = 0;
  let autoplayTimer = null;

  function renderTestimonial() {
    const t = testimonials[testimonialIndex];
    quoteEl.textContent = `"${t.quote}"`;
    nameEl.textContent = t.name;
    roleEl.textContent = t.role;
    Array.from(dotsEl.children).forEach((dot, i) => {
      dot.classList.toggle('is-active', i === testimonialIndex);
      dot.setAttribute('aria-selected', String(i === testimonialIndex));
    });
  }

  function renderDots() {
    dotsEl.innerHTML = testimonials.map((_, i) => `
      <button type="button" role="tab" data-idx="${i}" aria-label="Show testimonial ${i + 1}"></button>
    `).join('');
  }

  function goToTestimonial(idx) {
    testimonialIndex = (idx + testimonials.length) % testimonials.length;
    renderTestimonial();
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => goToTestimonial(testimonialIndex + 1), 6000);
  }
  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }

  dotsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-idx]');
    if (!btn) return;
    goToTestimonial(parseInt(btn.getAttribute('data-idx'), 10));
    startAutoplay();
  });

  renderDots();
  renderTestimonial();
  startAutoplay();

  const testimonialSection = document.getElementById('testimonials');
  testimonialSection.addEventListener('mouseenter', stopAutoplay);
  testimonialSection.addEventListener('mouseleave', startAutoplay);

  /* ---------- Signup form ---------- */
  // NOTE: this is n8n's TEST webhook URL — it only fires while the workflow is open
  // in the editor with "Listen for test event" active, and only for one request.
  // Once the workflow is built and Activated, swap this for the Production URL
  // (same path, without "-test": /webhook/quote-request instead of /webhook-test/quote-request).
  const N8N_WEBHOOK_URL = 'https://n8n.srv873866.hstgr.cloud/webhook-test/quote-request';

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
      if (!res.ok) throw new Error('Request failed');
      signupForm.reset();
      setStatus('Thanks! We’ll be in touch shortly.', 'is-success');
    } catch (err) {
      setStatus('Something went wrong. Please try again or email hello@karem.com.', 'is-error');
    } finally {
      submitBtn.disabled = false;
    }
  });
})();
