import "./Cart.css";
import { Card, Button, Row, Col } from "react-bootstrap";
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
          <Row className="justify-content-center">
            {cartItems.map((cartItem: any) => (
              <Col md={8} key={cartItem.id}>
                <Card className="mb-4 cart">
                  <Card.Body className="d-flex justify-content-between">
                    <div className="d-flex" style={{ width: "70%" }}>
                      <Card.Img
                        variant="left"
                        src={cartItem.images[0]}
                        style={{
                          height: "200px",
                          width: "210px",
                          marginRight: "1rem",
                        }}
                      />
                      <div className="texts" style={{ paddingLeft: "10px" }}>
                        <Card.Title style={{ paddingLeft: "10px" }}>
                          <h2>{cartItem.title}</h2>
                        </Card.Title>
                        <Card.Text style={{ paddingLeft: "10px" }}>
                          {cartItem.description}
                        </Card.Text>
                        <Card.Text style={{ paddingLeft: "10px" }}>
                          Price: ${cartItem.price}
                        </Card.Text>
                        <Card.Text style={{ paddingLeft: "10px" }}>
                          Quantity: {cartItem.quantity}
                        </Card.Text>
                        <Card.Text style={{ paddingLeft: "10px" }}>
                          Total: ${cartItem.price * cartItem.quantity}
                        </Card.Text>
                      </div>
                    </div>
                    <div className="d-flex flex-column justify-content-between">
                      <div className="d-flex buttons">
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
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <Row className="justify-content-end total-price">
            <Col md={4} className="text-right">
              <h4>Total Price: ${totalPrice}</h4>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default Cart;
