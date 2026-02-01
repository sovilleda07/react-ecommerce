import { cartService } from "../../services/cartService";
import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";

export function DeliveryOptions({ deliveryOptions, cartItem, loadCart }) {
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">
        Choose a delivery option:
      </div>
      {deliveryOptions.map((deliveryOption) => {
        let priceString = `FREE Shipping`;

        if (deliveryOption.priceCents > 0) {
          priceString = `${formatMoney(deliveryOption.priceCents)} - Shipping`
        }

        const updateDeliveryOption = async () => {
          await cartService.updateDeliveryOption(cartItem.productId, deliveryOption.id);

          await loadCart();
        }

        return (
          <div key={deliveryOption.id} className="delivery-option" data-testid="delivery-option" onClick={updateDeliveryOption}>
            <input type="radio"
              checked={deliveryOption.id === cartItem.deliveryOptionId}
              onChange={() => { }}
              className="delivery-option-input"
              name={`delivery-option-${cartItem.productId}`}
              data-testid="delivery-option-input" />
            <div>
              <div className="delivery-option-date">
                {dayjs().add(deliveryOption.deliveryDays, 'days').format('dddd, MMMM D')}
              </div>
              <div className="delivery-option-price">
                {priceString}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}