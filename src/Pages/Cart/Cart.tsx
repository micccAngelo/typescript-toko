import "./Cart.css";
import { Card, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../Store/CartSlice";

export const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.cartItems);

  const handleRemove = (id: any) => {
    dispatch(removeFromCart(id));
  };

  const handleIncreaseQuantity = (id: any) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id: any) => {
    dispatch(decreaseQuantity(id));
  };

  const totalPrice = cartItems.reduce(
    (acc: any, cur: any) => acc + cur.price * cur.quantity,
    0
  );


  return (
    <div className="cart">
      <h2 className="cart-header header">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div>
            {cartItems.map((cartItem: any) => (
              <Card className="mb-4 cart" key={cartItem.id}>
                <div className="d-flex">
                  <Card.Img
                    className="card-img-cart"
                    variant="left"
                    src={cartItem.images[0]}
                  />
                  <div className="d-flex flex-column justify-content-between pl-3 cart-texts">
                    <Card.Title>
                      <h2>{cartItem.title}</h2>
                    </Card.Title>
                    <Card.Text className="cart-text">
                      {cartItem.description}
                    </Card.Text>
                    <Card.Text className="cart-text">
                      Price: ${cartItem.price}
                    </Card.Text>
                    <Card.Text className="cart-text">
                      Quantity: {cartItem.quantity}
                    </Card.Text>
                    <Card.Text className="cart-text">
                      Total: ${cartItem.price * cartItem.quantity}
                    </Card.Text>
                    <div className="d-flex buttons-cart">
                      <Button
                        variant="success"
                        onClick={() => handleIncreaseQuantity(cartItem.id)}
                      >
                        +
                      </Button>
                      <Button
                        variant="secondary"
                        className="mx-1"
                        onClick={() => handleDecreaseQuantity(cartItem.id)}
                      >
                        -
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleRemove(cartItem.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            <div className="text-right total-price">
              <h4>Total Price: ${totalPrice}</h4>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
