import { useContext } from "react";

import "./cart-item.styles.scss";

import { UserContext } from "../../contexts/user.context";

const CartItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const { currency } = useContext(UserContext);

  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={name} />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">
          {quantity} x {currency}{price}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
