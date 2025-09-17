/**
 * Creates a product card element
 * @param {Object} product - product data
 * @param {string} product.title - product name
 * @param {string} product.image - product image path (Webpack will resolve it)
 * @param {string} product.price - product price (string or formatted)
 * @returns {HTMLElement} product card element
 */
export function createProductCard({ title, image, price }) {
  const card = document.createElement('article');
  card.className = 'product-card';

  card.innerHTML = `
    <img class="product-card__img" src="${image}" alt="Dog food">
    <div class="product-card__body">
      <h2 class="product-card__title">${title}</h2>
      <p class="product-card__price">${price}</p>
      <button class="btn btn--primary js-add-to-bag" data-product-id="sku-123">Add to bag</button>
    </div>
  `;

  return card;
}