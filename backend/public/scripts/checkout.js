import { renderOrderSummary } from "./checkout/ordersummary.js";
import { renderPaymentSummary } from "./checkout/paymentsummary.js";
//import '../data/cart-class.js';
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";

Promise.all([
  new Promise((resolve)=>{
    loadProducts(()=>{
      resolve();
    });
  }),
   new Promise((resolve)=>{
    loadCart(()=>{
     resolve();
    });
   })

]).then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
});
/*
new Promise((resolve)=>{
loadProducts(()=>{
  resolve();
})
}).then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
});
 */


/*
new Promise((resolve)=>{
  loadProducts(()=>{
    resolve();
  });

}).then(()=>{
  return new Promise((resolve)=>{
    loadCart(()=>{
     resolve();
    });
  });

}).then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
});
*/


/*loadProducts(()=>{
  loadCart(()=>{
    renderOrderSummary();
    renderPaymentSummary();
    });
});
*/
