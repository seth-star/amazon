import { products } from "../data/products.js";
import {addToCart, updateCartQuantity} from "../data/cart.js"
let productsHTML = '';

products.forEach((product)=>{
  productsHTML += 
  ` <section class="product-details-container">
        <div class="images-container">
          <img src="${product.image}" class="images">
        </div>
        <div class="paragraphe-container">
          <p class="paragraphes">${product.name}</p>
        </div>
        <div class="rating-count-container">
          <img src="images/images/ratings/rating-${product.rating.stars*10}.png" class="images-rating">
          <span class="count">${product.rating.count}</span>
        </div>
        <div class="price-container">$${product.priceCents/100}</div>
        <div class="select-container">
          <select class="select">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
          </select>
        </div>

        <div class="add-to-cart-container js-add-to-cart " data-product-id="${product.id}">
          <button class="add-to-cart-button" >Add To Cart</button>
          <div class="added js-add-cart-${product.id}"><img src="images/images/icons/checkmark.png" class="check-mark">Added</div>
        </div>

      </section>`

});
document.querySelector('.js-main').innerHTML = productsHTML;

document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
button.addEventListener('click',()=>{
  const productId = button.dataset.productId;
  addToCart(productId);
  updateCartQuantity(productId);

  let timeoutId;
  let clickOn = false;
  if (!clickOn) {
    document.querySelector(`.js-add-cart-${productId}`).classList.add('added-to');
    timeoutId = setTimeout(()=>{
      document.querySelector(`.js-add-cart-${productId}`).classList.remove('added-to');
    },2000);
    clickOn = true;
  }else{
   clearTimeout(timeoutId);
   clickOn = false;
  }
  
});
});
