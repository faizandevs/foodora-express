import Modal from "./UI/Modal";
import CartContext from "./store/CartContext";
import { useContext } from "react";
import Input from "./Input";
import Button from "./UI/Button";
import UserProgressContext from "./store/UserProgressContext";
export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const cartTotal = cartCtx.items.reduce((totalPrice, currItem) => {
    return totalPrice + currItem.price * currItem.quantity;
  }, 0);
  function handleClose() {
    userProgressCtx.hideCart();
  }
  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: data,
        },
      }),
    });
  }
  return (
    <Modal open={userProgressCtx.progress === "checkout"}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {cartTotal}</p>
        <Input type="text" label="Full Name" id="name" />
        <Input type="text" label="E-mail Address" id="email" />
        <Input type="text" label="Street" id="street" />
        <div className="control-row">
          <Input type="text" label="Postal Code" id="postal-code" />
          <Input type="text" label="City" id="city" />
        </div>
        <p className="modal-actions">
          <Button type="button" textOnly onClick={handleClose}>
            Close
          </Button>
          <Button> Submit Order </Button>
        </p>
      </form>
    </Modal>
  );
}
