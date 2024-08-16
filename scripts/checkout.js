import{cart} from '../data/cart.js';
import { products } from '../data/products.js';
import { deliveryOptions} from '../data/deliveryoptions.js';
import { formatCurrency } from './utils/moneycurrency.js';
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
                $${formatCurrency(matchingProduct.priceCents)}
              </div>
              <div class="product-quantity">
                Quantity: ${cartItem.quantity} <span class="update-delete">Update Delete</span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-head">
                Choose a delivery option:
              </div>
              ${deliveryOptionHTML()}
            </div>
          </div>
        </section>`
   
  })
  document.querySelector('.js-order-summary').innerHTML = orderSummaryHTML;

  
    function deliveryOptionHTML() {
      let html = '';
      deliveryOptions.forEach((deliveryOption)=>{
        const today = dayjs();
        const deliveryDays = today.add(deliveryOption.deliveryOptionDays,'days');
        const deliveryString = deliveryDays.format('dddd, MMMM D');
        const deliveryPrice = deliveryOption.deliveryOptionPriceCents === 0
        ? 'FREE'
        : `$${formatCurrency(deliveryOption.deliveryOptionPriceCents)}-`

        html += ` <div class="input-radio">
        <input type="radio" checked>
        <div class="paragraphe-for-delivery-option">
         <span class="paragraphe-span">${deliveryString}</span>
         <span class="paragraphe-span2">${deliveryPrice} Shipping</span>
       </div>
       </div>`
       
        });
        return html;
   }
