const cart = [];

export function addToCart(productId) {
  let matchingProduct;
 cart.forEach((cartItem)=>{
 if (cartItem.productId === productId) {
  matchingProduct = cartItem;
 }
 });
 if (matchingProduct) {
  matchingProduct.quantity += 1;
 }else{
  cart.push({
    productId:productId,
    quantity:1
  })
 }
 console.log(cart);
}

export function updateCartQuantity(productId) {
  let cartQuantiy = 0;
  cart.forEach((cartItem)=>{
    cartQuantiy += cartItem.quantity;
  });
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantiy;
}