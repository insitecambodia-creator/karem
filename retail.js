(() => {
  'use strict';

  /* Prices are per unit in USD. Source: official retail price list. */
  const priceList = [
    {
      collection: 'Sorbet',
      flavours: [
        ['Mango', 8, 1.6],
        ['Passion', 8, 1.6],
        ['Lime Kampot Pepper', 8, 1.6],
        ['Coconut Ginger', 8, null],
        ['Raspberry', 10, 1.6],
        ['Lychee', 8, null]
      ]
    },
    {
      collection: 'Ice Cream',
      flavours: [
        ['Vanilla', 8, 1.6],
        ['Chocolate Extreme', 8, 1.6],
        ['Salted Butter Caramel', 9, 1.6],
        ['Coffee', 8, 1.6],
        ['Pistachio', 10, 2],
        ['Durian', 10, null],
        ['Black Sesame', 8, null],
        ['Pepper Kampot', 8, 1.6],
        ['Pandan Leaves', 8, null],
        ['Ginger Lemongrass', 8, 1.6],
        ['Rum Raisin', 8, 1.6],
        ['Baileys', 9, null],
        ['Taro', 7, 1.6],
        ['Speculoos', 9, null]
      ]
    }
  ].map(group => ({
    ...group,
    flavours: group.flavours.map(([name, oneL, cup]) => ({ name, oneL, cup }))
  }));

  function formatPrice(value) {
    return value == null ? '—' : `$${value.toFixed(2)}`;
  }

  const container = document.getElementById('price-tables');

  container.innerHTML = priceList.map(group => `
    <section class="price-group">
      <h2>${group.collection}</h2>
      <div class="price-table-scroll">
        <table class="price-table price-table--2col">
          <thead>
            <tr>
              <th scope="col">Flavour</th>
              <th scope="col">1L Tub</th>
              <th scope="col">Cup (150ml)</th>
            </tr>
          </thead>
          <tbody>
            ${group.flavours.map(f => `
              <tr>
                <th scope="row">${f.name}</th>
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
