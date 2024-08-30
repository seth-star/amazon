import { renderOrderSummary } from "../../scripts/checkout/ordersummary.js";
import { loadFromStorage,cart} from "../../data/cart.js";

describe('Test Suite:RenderOrderSummary',()=>{
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
   
  beforeEach(()=>{
    document.querySelector('.js-container').innerHTML = 
    `<div class="js-order-summary"></div>
     <div class="js-payment-summary"></div>`;
     
    spyOn(localStorage,'setItem')
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId:productId1,
        quantity:2,
        deliveryId:'1'
      },{
        productId:productId2,
        quantity:1,
        deliveryId:'2'
      }])
     })
    
     loadFromStorage();
    
     renderOrderSummary();
  })
  it('displays the page',()=>{
 
    
    expect(document.querySelector(`.js-quantity-${productId1}`).innerText).toContain('Quantity: 2');
    expect(document.querySelector(`.js-quantity-${productId2}`).innerText).toContain('Quantity: 1');
    expect(document.querySelectorAll('.js-order-section').length).toEqual(2);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[1].productId).toEqual(productId2);
    document.querySelector('.js-container').innerHTML = '';
  })

  it('removes products from the cart',()=>{
   
     document.querySelector(`.js-delete-${productId1}`).click();
     expect(document.querySelectorAll('.js-order-section').length).toEqual(1);
     expect(cart[0].productId).toEqual(productId2);
     expect(cart[0].quantity).toEqual(1);
     expect(cart.length).toEqual(1);
     document.querySelector('.js-container').innerHTML = '';
  })
})