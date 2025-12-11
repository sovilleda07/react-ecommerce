import { OrdersHeader } from "./OrdersHeader";
import { OrderDetailsGrid } from "./OrderDetailsGrid";

export function OrdersGrid({ orders }) {
  return (
    <div className="orders-grid">
      {orders.map((order) => {
        return (
          <div key={order.id} className="order-container">
            <OrdersHeader order={order} />

            <OrderDetailsGrid order={order} />
          </div>
        );
      })}
    </div>
  )
}