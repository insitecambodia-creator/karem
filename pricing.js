(() => {
  'use strict';

  /* Prices are per unit in USD. Set to a number once confirmed; leave null to show "—". */
  const priceList = [
    {
      collection: 'Classic Ice Cream',
      flavours: [
        'Vanilla', 'Chocolate', 'Chocolate Chips', 'Chocolate Extreme', 'White Chocolate',
        'Coffee', 'Caramel', 'Salted Butter Caramel', 'Hazelnut', 'Pistachio', 'Rum Raisin',
        'Tiramisu', 'Speculoos', 'Baileys', 'Wild Berries', 'Vanilla Brownies', 'Vanilla Cookies'
      ]
    },
    {
      collection: 'Asian Collection',
      flavours: [
        'Matcha Green Tea', 'Green Tea', 'Black Sesame', 'Pandan Leaves', 'Taro', 'Durian',
        'Jackfruit', 'Ginger', 'Ginger Lemongrass', 'Honey (Mondolkiri)', 'Pepper Kampot',
        'Chocolate Extreme Pepper', 'Wasabi', 'Romdeng Lemongrass'
      ]
    },
    {
      collection: 'Fruit Sorbets',
      flavours: [
        'Mango', 'Mango Passion', 'Passion', 'Pineapple', 'Strawberry', 'Raspberry', 'Blueberry',
        'Orange', 'Pear', 'Melon', 'Coconut', 'Coconut Chili', 'Coconut Ginger', 'Lime',
        'Lime Basil', 'Lime Kampot Pepper', 'Lychee', 'Longan', 'Soursop', 'Red Dragon Fruit',
        'Strawberry Basil'
      ]
    },
    {
      collection: 'Special Collection',
      flavours: [
        'Almond Milk', 'Banana', 'Banana Caramelised Peanuts', 'Mint Chocolate Chips', 'Yoghurt Lime'
      ]
    }
  ].map(group => ({
    ...group,
    flavours: group.flavours.map(name => ({ name, threeL: null, oneL: null, cup: null }))
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
