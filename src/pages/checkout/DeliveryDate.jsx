import dayjs from "dayjs";

export function DeliveryDate({ cartItem, deliveryOptions }) {
  const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
    return deliveryOption.id == cartItem.deliveryOptionId
  });

  return (
    <div className="delivery-date">
      Delivery date: {dayjs().add(selectedDeliveryOption.deliveryDays, 'days').format('dddd, MMMM D')}
    </div>
  )
}