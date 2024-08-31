const cart = {
  cartItem : undefined,

  loadFromStorage() {
    this.cartItem = JSON.parse(localStorage.getItem('cart-oop'));
  
  if (!this.cartItem) {
    this.cartItem = 
    [{
      productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity:2,
      deliveryId:'1'
    },{
      productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity:1,
      deliveryId:'2'
    }];
  }
  },
  saveToStorage() {
    return localStorage.setItem('cart-oop',JSON.stringify(this.cartItem));
   },
   addToCart(productId) {
    let matchingItem;
   this.cartItem.forEach((cartItem)=>{
   if (cartItem.productId === productId) {
    matchingItem = cartItem;
   }
   });
  
   if (document.querySelector(`.js-select-${productId}`)) {
    const selector = document.querySelector(`.js-select-${productId}`).value;
    if (matchingItem) {
      matchingItem.quantity += Number(selector) ;
     }else{
    
      this.cartItem.push({
        productId:productId,
        quantity:  Number(selector),
        deliveryId:'1'
      })
     }
   }
   this.saveToStorage();
  },
  removeFromCart(productId) {
    let newCart = [];
    this.cartItem.forEach((cartItem)=>{
     if (cartItem.productId !== productId) {
      newCart.push(cartItem);
      this.cartItem = newCart;
     }
    });
    this.saveToStorage();
  },
   cartQuantity() {
    let cartQuantiy = 0;
    
    this.cartItem.forEach((cartItem)=>{
    cartQuantiy += cartItem.quantity ;
    });
    if (document.querySelector('.js-items')) {
      document.querySelector('.js-items').innerHTML = `${cartQuantiy} items`
    }
    if (document.querySelector('.js-items2')) {
      document.querySelector('.js-items2').innerHTML = `items(${cartQuantiy})`
    }else if (document.querySelector('.js-cart-quantity')) {
      document.querySelector('.js-cart-quantity').innerHTML = cartQuantiy;
    }
    this.saveToStorage();
    },
    updateCartQuantity(productId,newQuantity) {
      let matchingProduct;
      this.cartItem.forEach((cartItem)=>{
        if (cartItem.productId === productId) {
          matchingProduct = cartItem;
        } 
       });
      if (matchingProduct) {
        matchingProduct.quantity += newQuantity;
      }
      console.log(matchingProduct.quantity)
      document.querySelector(`.js-product-quantity-${productId}`).innerHTML = `Quantity: ${matchingProduct.quantity}`;
      
       this.saveToStorage();
    },
    updateDeliveryOption(productId,deliveryOptionId) {
      let matchingOption;
      this.cartItem.forEach((cartItem)=>{
        if (cartItem.productId === productId) {
          matchingOption = cartItem
        } 
      })
      if (matchingOption) {
        matchingOption.deliveryId = deliveryOptionId
      }
      saveToStorage()
    }
   
}
cart.loadFromStorage();


console.log(cart)








