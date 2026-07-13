(() => {
  'use strict';

  /* Prices are per unit in USD, before VAT. Source: official price list, updated May 24, 2026. */
  const priceList = [
    {
      collection: 'Classic Ice Cream',
      flavours: [
        ['Vanilla', 21.00, 7.00, 1.45],
        ['Chocolate', 21.00, 7.00, 1.45],
        ['Chocolate Chips', 22.50, 7.50, 1.50],
        ['Chocolate Extreme', 19.50, 6.50, 1.45],
        ['White Chocolate', 21.00, 7.00, 1.45],
        ['Coffee', 19.50, 6.50, 1.45],
        ['Caramel', 19.50, 6.50, 1.45],
        ['Salted Butter Caramel', 22.50, 7.50, 1.50],
        ['Hazelnut', 24.00, 8.00, 1.60],
        ['Pistachio', 27.00, 9.00, 1.60],
        ['Rum Raisin', 19.50, 6.50, 1.45],
        ['Tiramisu', 24.00, 8.00, null],
        ['Speculoos', 19.50, 6.50, null],
        ['Baileys', 24.00, 8.00, 1.60],
        ['Wild Berries', 21.00, 7.00, 1.60],
        ['Vanilla Brownies', 22.50, 7.50, 1.60],
        ['Vanilla Cookies', 22.50, 7.50, 1.60],
        ['Cinnamon', 19.50, 6.50, 1.45]
      ]
    },
    {
      collection: 'Asian Collection',
      flavours: [
        ['Matcha Green Tea', 24.00, 8.00, 1.50],
        ['Green Tea', 19.50, 6.50, 1.45],
        ['Black Sesame', 19.50, 6.50, 1.45],
        ['Pandan Leaves', 19.50, 6.50, 1.45],
        ['Taro', 19.50, 6.50, 1.45],
        ['Durian', 21.00, 7.00, 1.50],
        ['Jackfruit', 19.50, 6.50, 1.45],
        ['Ginger', 19.50, 6.50, 1.45],
        ['Ginger Lemongrass', 19.50, 6.50, 1.45],
        ['Honey (Mondolkiri)', 19.50, 6.50, 1.45],
        ['Pepper Kampot', 19.50, 6.50, 1.45],
        ['Chocolate Extreme Pepper', 21.00, 7.00, 1.45],
        ['Wasabi', 19.50, 6.50, null],
        ['Romdeng Lemongrass', 19.50, 6.50, 1.45]
      ]
    },
    {
      collection: 'Fruit Sorbets',
      flavours: [
        ['Mango', 19.50, 6.50, 1.45],
        ['Mango Passion', 19.50, 6.50, 1.45],
        ['Passion', 19.50, 6.50, 1.45],
        ['Pineapple', 19.50, 6.50, 1.45],
        ['Strawberry', 24.00, 8.00, 1.60],
        ['Raspberry', 28.00, 9.50, 1.60],
        ['Blueberry', 27.00, 9.00, 1.50],
        ['Orange', 24.00, 8.00, 1.50],
        ['Pear', 24.00, 8.00, 1.50],
        ['Melon', 24.00, 8.00, 1.50],
        ['Coconut', 19.50, 6.50, 1.45],
        ['Coconut Chili', 19.50, 6.50, 1.45],
        ['Coconut Ginger', 19.50, 6.50, 1.45],
        ['Lime', 19.50, 6.50, 1.45],
        ['Lime Basil', 19.50, 6.50, 1.45],
        ['Lime Kampot Pepper', 19.50, 6.50, 1.45],
        ['Lychee', 21.00, 7.00, 1.50],
        ['Longan', 21.00, 7.00, 1.50],
        ['Soursop', 19.50, 6.50, 1.45],
        ['Red Dragon Fruit', 18.00, 6.00, null],
        ['Strawberry Basil', 25.50, 8.50, null]
      ]
    },
    {
      collection: 'Special Collection',
      flavours: [
        ['Almond Milk', 19.50, 6.50, 1.45],
        ['Banana', 19.50, 6.50, 1.45],
        ['Banana Caramelised Peanuts', 19.50, 6.50, 1.45],
        ['Mint Chocolate Chips', 21.00, 7.00, 1.50],
        ['Yoghurt Lime', 21.00, 7.00, null]
      ]
    }
  ].map(group => ({
    ...group,
    flavours: group.flavours.map(([name, threeL, oneL, cup]) => ({ name, threeL, oneL, cup }))
  }));

  function formatPrice(value) {
    return value == null ? '—' : `$${value.toFixed(2)}`;
  }

  const container = document.getElementById('price-tables');

  container.innerHTML = priceList.map(group => `
    <section class="price-group">
      <h2>${group.collection}</h2>
      <div class="price-table-scroll">
        <table class="price-table">
          <thead>
            <tr>
              <th scope="col">Flavour</th>
              <th scope="col">3L Tub</th>
              <th scope="col">1L Tub</th>
              <th scope="col">Cups (100ml)</th>
            </tr>
          </thead>
          <tbody>
            ${group.flavours.map(f => `
              <tr>
                <th scope="row">${f.name}</th>
                <td>${formatPrice(f.threeL)}</td>
                <td>${formatPrice(f.oneL)}</td>
                <td>${formatPrice(f.cup)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </section>
  `).join('');
})();
