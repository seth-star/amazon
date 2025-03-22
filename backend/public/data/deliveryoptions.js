export const deliveryOptions = [{
  deliveryOptionDays: 7,
  deliveryOptionPriceCents: 0,
  deliveryOptionId: '1'
},{
  deliveryOptionDays: 3,
  deliveryOptionPriceCents: 499,
  deliveryOptionId: '2'
},{
  deliveryOptionDays: 1,
  deliveryOptionPriceCents: 999,
  deliveryOptionId: '3'
}]
export function getOption(cartItem) {
  let deliveryOption;
     deliveryOptions.forEach((option)=>{
       if (cartItem.deliveryId === option.deliveryOptionId) {
         deliveryOption = option;
       }
     })
  return deliveryOption;
}