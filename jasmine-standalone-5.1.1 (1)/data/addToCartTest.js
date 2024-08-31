import { addToCart ,cart,loadFromStorage} from "../../data/cart.js";


describe('Test Suite:Add To Cart',()=>{
  it('adds new product',()=>{
    spyOn(localStorage,'setItem')
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([])
    })
    
    loadFromStorage()
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(0);
    if (cart[0]) {
      expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
      expect(cart[0].deliveryId).toEqual('1');
      expect(cart[0].quantity).toEqual(2); 
    }
    
  })

  it('adds another product',()=>{
    spyOn(localStorage,'setItem')
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity:2,
        deliveryId:'1'
      }])
    })
    
    loadFromStorage()
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);

    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].deliveryId).toEqual('1');
    expect(cart[0].quantity).toEqual(2);
  })
})