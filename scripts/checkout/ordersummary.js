import{cart,removeFromCart, updateDeliveryOption, updateCartQuantity} from '../../data/cart.js';
import { setProduct } from '../../data/products.js';
import { deliveryOptions, getOption} from '../../data/deliveryoptions.js';
import { formatCurrency } from '../utils/moneycurrency.js';
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { renderPaymentSummary } from './paymentsummary.js';


 export function renderOrderSummary() {
  let orderSummaryHTML = '';
   cart.forEach((cartItem)=>{
     const matchingProduct = setProduct(cartItem);
    
     const deliveryOption = getOption(cartItem);
     
     const today = dayjs();
     const deliveryDays = today.add(deliveryOption.deliveryOptionDays,'days');
     const deliveryString = deliveryDays.format('dddd, MMMM D');
 
     orderSummaryHTML += 
 
     `<section class="order-summary-section order-summary-section-${matchingProduct.id} 
     js-order-section">
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
                 ${matchingProduct.getPriceCents()}
               </div>
               <div class="product-quantity ">
                 <div class="js-product-quantity-${matchingProduct.id} js-quantity-${matchingProduct.id}">Quantity: ${cartItem.quantity} </div>
                 <span class="update-delete js-update js-update-${matchingProduct.id}"data-product-id="${matchingProduct.id}" >
                  Update
                 </span>
                 <input type="number" class="input  js-input-${matchingProduct.id}">
                 <span class="save js-save js-save-${matchingProduct.id}" data-product-id="${matchingProduct.id}" >Save</span>
                 <span class="update-delete js-delete js-delete-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
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
   document.querySelector('.js-order-summary').innerHTML =  orderSummaryHTML ;
  
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
      ` <div class="input-radio js-input-radio" data-delivery-option-id="${deliveryOption.deliveryOptionId}" data-product-id="${matchingProduct.id}"  >
          <input  type="radio" name="radio-${matchingProduct.id}" ${isChecked ? 'checked': ''}>
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
       renderOrderSummary();
       renderPaymentSummary();
       
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
       const selector = document.querySelector(`.js-input-${productId}`).value;
       const newQuantity = Number(selector);
       updateCartQuantity(productId,newQuantity);
       renderPaymentSummary();
       
       document.querySelector(`.js-input-${productId}`).classList.remove('input2');
       document.querySelector(`.js-save-${productId}`).classList.remove('save2');
       document.querySelector(`.js-update-${productId}`).classList.remove('update');
       
      })
    })
 
    document.querySelectorAll('.js-input-radio').forEach((link)=>{
     link.addEventListener('click',()=>{
       const {productId,deliveryOptionId} = link.dataset;
       updateDeliveryOption(productId,deliveryOptionId);
       renderOrderSummary();
       renderPaymentSummary();
     })
    })
     
 }