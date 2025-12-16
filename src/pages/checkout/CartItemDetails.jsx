import axios from "axios";
import { useState } from "react";
import { formatMoney } from "../../utils/money"

export function CartItemDetails({ cartItem, loadCart }) {
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);

  const updateQuantity = async () => {
    setIsUpdatingQuantity(!isUpdatingQuantity);

    if (isUpdatingQuantity) {
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        quantity
      });

      await loadCart();

      setIsUpdatingQuantity(false)
    }
  };

  const updateQuantityInput = (event) => {
    setQuantity(Number(event.target.value));
  }

  const handleQuantityKeyDown = (event) => {
    const keyPressed = event.key;
    if (keyPressed === 'Enter') {
      updateQuantity();
    } else if (keyPressed === 'Escape') {
      setQuantity(cartItem.quantity);
      setIsUpdatingQuantity(false);
    }
  }

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);

    await loadCart();
  };

  return (
    <>
      <img className="product-image" data-testid="cart-item-image" src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name" data-testid="cart-item-name">
          {cartItem.product.name}
        </div>
        <div className="product-price" data-testid="cart-item-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span data-testid="cart-item-quantity">
            Quantity: {isUpdatingQuantity
              ? <input type="text" className="quantity-input" value={quantity} onChange={updateQuantityInput} onKeyDown={handleQuantityKeyDown} />
              : <span className="quantity-label">{cartItem.quantity}</span>
            }
          </span>
          <span className="update-quantity-link link-primary" onClick={updateQuantity}>
            Update
          </span>
          <span className="delete-quantity-link link-primary" data-testid="cart-item-delete-quantity-link" onClick={deleteCartItem}>
            Delete
          </span>
        </div>
      </div>
    </>
  )
}