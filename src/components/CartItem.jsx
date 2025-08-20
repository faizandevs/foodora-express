export default function CartItem({
  itemName,
  quantity,
  price,
  addQuantity,
  removeQuantity,
}) {
  return (
    <li className="cart-item">
      <p>
        {itemName} -- {quantity} x {price}
      </p>
      <p className="cart-item-actions">
        <button onClick={removeQuantity}>-</button>
        <span>{quantity}</span>
        <button onClick={addQuantity}>+</button>
      </p>
    </li>
  );
}
