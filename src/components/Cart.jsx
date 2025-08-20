import { useContext } from "react";

import Modal from "./UI/Modal";
import CartContext from "./store/CartContext";
import Button from "./UI/Button";
import UserProgressContext from "./store/UserProgressContext";
import CartItem from "./CartItem";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const cartTotal = cartCtx.items.reduce((totalPrice, currItem) => {
    return totalPrice + currItem.price * currItem.quantity;
  }, 0);
  function handleGoToCheckout() {
    userProgressCtx.showCheckout();
  }
  function handleClose() {
    userProgressCtx.hideCart();
  }
  function handlePlusButton(item) {
    cartCtx.addItem(item);
  }
  function handleMinusButton(id) {
    cartCtx.removeItem(id);
  }
  return (
    <Modal className="cart" open={userProgressCtx.progress === "cart"}>
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            itemName={item.name}
            quantity={item.quantity}
            price={item.price}
            addQuantity={() => handlePlusButton(item)}
            removeQuantity={() => handleMinusButton(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">${cartTotal}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleClose}>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={handleGoToCheckout}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
}
