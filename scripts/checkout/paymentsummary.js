import { setProduct } from "../../data/products.js";
import { cart,cartQuantity} from "../../data/cart.js";
import { formatCurrency } from "../utils/moneycurrency.js";
import { getOption } from "../../data/deliveryoptions.js";

export function renderPaymentSummary() {
  let initialPrice = 0;
  let shippingPrice = 0;
  cart.forEach((cartItem)=>{
  const shippingPriceDay = getOption(cartItem).deliveryOptionPriceCents
  const itemsEachPrice = setProduct(cartItem).priceCents;
  const itemsQuantity = cartItem.quantity;
  initialPrice += (itemsEachPrice * itemsQuantity);
  shippingPrice += shippingPriceDay; 
  })
  const totalBeforeTax = initialPrice + shippingPrice;
  const estimateTax = totalBeforeTax*0.1;
  const orderTotal = totalBeforeTax + estimateTax;
  let html =
  `<div class="oder-summary">
          Oder Summary
        </div>
        <div class="first-line">
          <div class="js-items2">Items (3):</div>
          <div>$${formatCurrency(initialPrice)}</div>
        </div>
        <div class="first-line">
          <div>Shipping & handling:</div>
          <div class="underline-total">$${formatCurrency(shippingPrice)}</div>
        </div>
        <div class="first-line">
          <div>Total before tax:</div>
          <div>$${formatCurrency(totalBeforeTax)}</div>
        </div>
        <div class="estimated-tax-container">
          <div>Estimated tax (10%):</div>
          <div >$${formatCurrency(estimateTax)}</div>
        </div>
       
        
        <div class="second-line">
          <div>Order total:</div>
          <div>$${formatCurrency(orderTotal)}</div>
        </div>
        <div class="third-line">
          <div>Use PayPal</div>
          <div>
            <input type="checkbox" class="checkbox">
          </div>
        </div>
        <div class="fourth-line">
          <a href="orders.html" target="_blank">
            <button class="place-your-order-button js-place-order">Place your order</button>
          </a>
        </div>`
        document.querySelector('.js-payment-summary').innerHTML = html;
        
        cartQuantity();
        document.querySelector('.js-place-order').addEventListener('click',async ()=>{
          const response = await fetch('https://supersimplebackend.dev/orders',{
            method:'POST',
            headers:{
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              cart:cart
            })
          });
          const order = await response.json();
          console.log(order);
          window.Location.href = '127.0.0.1:5500/order.html'
        });
}
