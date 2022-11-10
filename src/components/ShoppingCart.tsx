import { FC } from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import formatCurrency from "../utils/formatCurrency";
import { CartItem } from "./CartItem";
import storeItems from "../data/items.json";

type ShoppingCartProps = {
  isOpenCart: boolean;
};

export const ShoppingCart: FC<ShoppingCartProps> = ({ isOpenCart }) => {
  const { closeCart, cartItem } = useShoppingCart();
  return (
    <Offcanvas show={isOpenCart} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItem.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          {/* TOTAL */}
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatCurrency(
              cartItem.reduce((total, cartItem) => {
                const item = storeItems.find((i) => i.id === cartItem.id);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};
