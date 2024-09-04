import { cart } from "../data/cart.js";
import { setProduct } from "../data/products.js";
import { getOption } from "../data/deliveryoptions.js";
import { formatCurrency } from "./utils/moneycurrency.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";


  
const id1 = Math.round().toString(4).substring(36);
const id2 = Date.now().toString(18);
const today = dayjs();
//const deliveryString = today.format(' MMMM D');


const orders = [{
  orderId: id2+id1+id2+id1+id2 ,
  orderDay: today,
}]
let html = '' 
orders.forEach((order)=>{
 const deliveryString = dayjs(order.orderDay).format('MMMM D');
  let initialPrice = 0;
  let shippingPrice = 0;

  
 cart.forEach((cartItem)=>{
 
  const shippingPriceDay = getOption(cartItem).deliveryOptionPriceCents
  const itemsEachPrice = setProduct(cartItem).priceCents;
  const itemsQuantity = cartItem.quantity;
  initialPrice += (itemsEachPrice * itemsQuantity);
  shippingPrice += shippingPriceDay;
  console.log(setProduct(cartItem).image) 
  })
  const totalBeforeTax = initialPrice + shippingPrice;
  const estimateTax = totalBeforeTax*0.1;
  const orderTotal = totalBeforeTax + estimateTax;
  
  
   html += 
  ` <div class="main">
     <section class="first-section">
        <div class="left-container">
          <div class="order">Order Placed:</div>
          <div class="date">${deliveryString}</div> 
        </div>
        <div class="middle-container">
          <span class="total">Total:</span>
          <span class="amount">$${formatCurrency(orderTotal)}</span>
        </div>
        <div class="right-container">
         <span class="order-id">Order ID:</span> 
         <span class="id-number">${order.orderId}</span>
        </div>
      </section>
      ${name()}
    </div> `
})
console.log(html)

document.querySelector('.js-main').innerHTML = html

function name() {

  let html2 = '';

     cart.forEach((cartItem)=>{
      const today = dayjs();
      const deliveryDays = today.add(getOption(cartItem).deliveryOptionDays,'days');
      const deliveryString = deliveryDays.format('dddd, MMMM D');
      
       const product = setProduct(cartItem);
       html2 += 
      `<section class="third-section">
        <div class="left-container3">
          <img src="${product.image}" class="images">
        </div>

        <div class="middle-container3">
          <div class="product-name">
           ${product.name}
          </div>
          <div class="paragraphe">
            Arriving on: ${deliveryString}
          </div>
          <div class="paragraphe">
            Quantity: ${cartItem.quantity}
          </div>
          <div class="buy-again-button">
            <img src="images/images/icons/buy-again.png" class="buy-again">
            <span class="paragraphe">Buy it again</span>
          </div>
        </div>
        <div class="right-container3">
          <button class="track-button">
            <span class="paragraphe-track">Track Package</span>
          </button>
        </div>
      </section>`
   
 })
 return html2
}
