import{cart} from '../data/cart.js';
import { products } from '../data/products.js';
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";



 let orderSummaryHTML = '';
  cart.forEach((cartItem)=>{
    let matchingProduct;
    products.forEach((product)=>{
     if (cartItem.productId === product.id) {
      matchingProduct = product;
     }
    })

    orderSummaryHTML += 

    ` <section class="order-summary-section">
          <div class="delivery-date">
             Delivery date: Thursday, August 15
          </div>
          <div class="delivery-container">
            <div class="image-container">
              <img src="${matchingProduct.image}" class="images">
            </div>
            <div class="delivery-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-price">
                $${matchingProduct.priceCents/100}
              </div>
              <div class="product-quantity">
                Quantity: ${cartItem.quantity} <span class="update-delete">Update Delete</span>
              </div>
  
            </div>
            <div class="delivery-options">
              <div class="delivery-options-head">
                Choose a delivery option:
              </div>
              <div class="input-radio">
                <input type="radio" checked>
                <div class="paragraphe-for-delivery-option">
                  <span class="paragraphe-span">Friday, August 16</span>
                  <span class="paragraphe-span2">FREE Shipping</span>
                </div>
              </div>
              <div class="input-radio">
                <input type="radio" checked>
                <div class="paragraphe-for-delivery-option">
                  <span class="paragraphe-span">Monday, August 12</span>
                  <span class="paragraphe-span2">$4.99 - Shipping</span>
                </div>
              </div>
              <div class="input-radio">
                <input type="radio" checked>
                <div class="paragraphe-for-delivery-option">
                  <span class="paragraphe-span">Thursday, August 8</span>
                  <span class="paragraphe-span2">$9.99 - Shipping</span>
                </div>
              </div>
            </div>
          </div>
        </section>`
   
  })
  document.querySelector('.js-order-summary').innerHTML = orderSummaryHTML;
  function deliveryOptionHTML(params) {
    const today = dayjs;
    
    ` <div class="input-radio">
                <input type="radio" checked>
                <div class="paragraphe-for-delivery-option">
                  <span class="paragraphe-span">Friday, August 16</span>
                  <span class="paragraphe-span2">FREE Shipping</span>
                </div>
              </div>`
  }