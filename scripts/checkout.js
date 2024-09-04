import { renderOrderSummary } from "./checkout/ordersummary.js";
import { renderPaymentSummary } from "./checkout/paymentsummary.js";
//import '../data/cart-class.js';
import { loadProducts } from "../data/products.js";

new Promise((resolve)=>{
loadProducts(()=>{
  resolve();
})
}).then(()=>{
  return new Promise((resolve)=>{
    renderOrderSummary();
    renderPaymentSummary();
    resolve()
  })
})

/*loadProducts(()=>{
  renderOrderSummary();
  renderPaymentSummary();
})
*/
