

export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = 
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



function saveToStorage() {
 return localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem;
 cart.forEach((cartItem)=>{
 if (cartItem.productId === productId) {
  matchingItem = cartItem;
 }
 });
 if (matchingItem) {
  const selector = document.querySelector(`.js-select-${productId}`).value;
  const selectorNum = Number(selector)
  matchingItem.quantity += selectorNum;
 }else{
  cart.push({
    productId:productId,
    quantity:1,
    deliveryId:'1'
  })
 }
 saveToStorage();
}

export function removeFromCart(productId) {
  let newCart = [];
  cart.forEach((cartItem)=>{
   if (cartItem.productId !== productId) {
    newCart.push(cartItem);
    cart = newCart;
   }
  });
  saveToStorage();
}
export function cartQuantity() {
  let cartQuantiy = 0;
  
  cart.forEach((cartItem)=>{
  cartQuantiy += cartItem.quantity;
 
  });
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantiy;
 
  
  saveToStorage();
}
export function cartQuantity2() {
  let cartQuantiy = 0;
  
  cart.forEach((cartItem)=>{
  cartQuantiy += cartItem.quantity;
 
  });
  
  document.querySelector('.js-items').innerHTML = `${cartQuantiy} items`
  
  saveToStorage();
}
export function cartQuantity3() {
  let cartQuantiy = 0;
  
  cart.forEach((cartItem)=>{
  cartQuantiy += cartItem.quantity;
 
  });
  
  document.querySelector('.js-items2').innerHTML = `items(${cartQuantiy})`
  
  saveToStorage();
}

export function updateItemQuantity(productId,newQuantity) {
  let matchingProduct;
  cart.forEach((cartItem)=>{
    if (cartItem.productId === productId) {
      matchingProduct = cartItem;
    }
    
  });
  if (matchingProduct) {
    matchingProduct.quantity += newQuantity;
  }
  console.log(matchingProduct.quantity)
  document.querySelector(`.js-product-quantity-${productId}`).innerHTML = `Quantity: ${matchingProduct.quantity}`;
  
   saveToStorage();
}

export function updateDeliveryOption(productId,deliveryOptionId) {
  let matchingOption;
  cart.forEach((cartItem)=>{
    if (cartItem.productId === productId) {
      matchingOption = cartItem
    } 
  })
  if (matchingOption) {
    matchingOption.deliveryId = deliveryOptionId
  }
  saveToStorage()
}