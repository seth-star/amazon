import { renderOrderSummary } from "./checkout/ordersummary.js";
import { renderPaymentSummary } from "./checkout/paymentsummary.js";
//import '../data/cart-class.js';
import { loadProducts } from "../data/products.js";



loadProducts(()=>{
  renderOrderSummary();
  renderPaymentSummary();
})

