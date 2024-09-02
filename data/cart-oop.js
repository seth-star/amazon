
 const cart = {

 cartItems : undefined,

  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem('cart-oop'));
  
  if (!this.cartItems) {
    this.cartItems = 
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
    localStorage.setItem('cart-oop',JSON.stringify(this.cartItems));
  },

  addToCart(productId) {
   let matchingItem;
   this.cartItems.forEach((cartItem)=>{
   if (cartItem.productId === productId) {
    matchingItem = cartItem;
   }
   });
  
   if (document.querySelector(`.js-select-${productId}`)) {
     const selector = document.querySelector(`.js-select-${productId}`).value;
     if (matchingItem) {
      matchingItem.quantity += Number(selector);
     }else{
    
      this.cartItems.push({
        productId,
        quantity: Number(selector),
        deliveryId:'1'
      })
     }
     
    }
   this.saveToStorage();
  
  },


  removeFromCart(productId) {
    let newCart = [];
    this.cartItems.forEach((cartItem)=>{
     if (cartItem.productId !== productId) {
      newCart.push(cartItem);
      this.cartItems = newCart;
     }
    });
    this.saveToStorage();
   },

   cartQuantity() {
    let cartQuantiy = 0;
    
    this.cartItems.forEach((cartItem)=>{
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
      this.cartItems.forEach((cartItem)=>{
        if (cartItem.productId === productId) {
          matchingProduct = cartItem;
        } 
       });
      if (matchingProduct) {
        matchingProduct.quantity += newQuantity;
      }
      
      document.querySelector(`.js-product-quantity-${productId}`).innerHTML = `Quantity: ${matchingProduct.quantity}`;
      
       this.saveToStorage();
    },

    updateDeliveryOption(productId,deliveryOptionId) {
      let matchingOption;
      this.cartItems.forEach((cartItem)=>{
        if (cartItem.productId === productId) {
          matchingOption = cartItem;
        } 
      })
      if (matchingOption) {
        matchingOption.deliveryId = deliveryOptionId;
      }
      this.saveToStorage();
    }
};

cart.loadFromStorage();

console.log(cart)








