import{cart,removeFromCart, updateItemQuantity} from '../data/cart.js';
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
    let matchingOption;
    deliveryOptions.forEach((option)=>{
      if (cartItem.deliveryId === option.deliveryOptionId) {
        matchingOption = option;
      }
    })
    const today = dayjs();
    const deliveryDays = today.add(matchingOption.deliveryOptionDays,'days');
    const deliveryString = deliveryDays.format('dddd, MMMM D');

    orderSummaryHTML += 

    `<section class="order-summary-section order-summary-section-${matchingProduct.id}">
          <div class="delivery-date">
             Delivery date: ${deliveryString}
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
                Quantity: ${cartItem.quantity} 
                <span class="update-delete js-update js-update-${matchingProduct.id}"data-product-id="${matchingProduct.id}" >
                 Update
                </span>
                <input type="number" class="input  js-input-${matchingProduct.id}">
                <span class="save js-save js-save-${matchingProduct.id}" data-product-id="${matchingProduct.id}" >Save</span>
                <span class="update-delete js-delete" data-product-id="${matchingProduct.id}">
                 Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-head">
                Choose a delivery option:
              </div>
              ${deliveryOptionHTML(matchingProduct,cartItem)}
            </div>
          </div>
     </section>`
   
  })
  document.querySelector('.js-order-summary').innerHTML = orderSummaryHTML;

  
    function deliveryOptionHTML(matchingProduct,cartItem) {
      let html = '';
      deliveryOptions.forEach((deliveryOption)=>{
        const today = dayjs();
        const deliveryDays = today.add(deliveryOption.deliveryOptionDays,'days');
        const deliveryString = deliveryDays.format('dddd, MMMM D');
        const deliveryPrice = deliveryOption.deliveryOptionPriceCents === 0
        ? 'FREE'
        : `$${formatCurrency(deliveryOption.deliveryOptionPriceCents)}-`;

        const isChecked = cartItem.deliveryId === deliveryOption.deliveryOptionId;

        html += 
     ` <div class="input-radio">
         <input type="radio" name="radio-${matchingProduct.id}" ${isChecked ? 'checked': ''}>
         <div class="paragraphe-for-delivery-option">
           <span class="paragraphe-span">${deliveryString}</span>
           <span class="paragraphe-span2">${deliveryPrice} Shipping</span>
         </div>
       </div>`
       
        });
        return html;
   }

   document.querySelectorAll('.js-delete').forEach((link)=>{
    link.addEventListener('click',()=>{
      const productId = link.dataset.productId;
      removeFromCart(productId);
      const container = document.querySelector(`.order-summary-section-${productId}`);
      container.remove();

    })
   });
   document.querySelectorAll('.js-update').forEach((link)=>{
    link.addEventListener('click',()=>{

      const productId = link.dataset.productId;
      document.querySelector(`.js-update-${productId}`).classList.add('update');
      document.querySelector(`.js-input-${productId}`).classList.add('input2');
      document.querySelector(`.js-save-${productId}`).classList.add('save2');
    });
   });
   
   document.querySelectorAll('.js-save').forEach((link)=>{
     link.addEventListener('click',()=>{
      const productId = link.dataset.productId;
      updateItemQuantity(productId);
     })
   })
