import "./ProductDetail.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loadings from "../../Reusable/Loadings";
import Card from "react-bootstrap/Card";
import Modals from "../../Reusable/Modals";
import Carousel from "react-bootstrap/Carousel";
import GetSingleProduct from "../../API Services/GetSingleProduct";
import { Badge, Button } from "react-bootstrap";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import Product from "../../Model/Product";
import { addToCart } from "../../Store/CartSlice";
import { useDispatch } from "react-redux";

interface ProductDetailProps {}

const ProductDetail: React.FC<ProductDetailProps> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<Product>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [productName, setProductName] = useState<string>();
  const [stock, setStock] = useState<number>();
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async (id: any) => {
      setLoading(true);
      try {
        const productData = await GetSingleProduct(id);
        console.log(id);
        setProduct(productData);
        setStock(productData.stock);
        console.log(productData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchProducts(id);
  }, [id]);

  const renderRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="star-half" />);
    }

    const remainingStars = 5 - stars.length;

    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaRegStar key={`empty-star-${i}`} />);
    }

    return stars;
  };

  if (loading) {
    return <Loadings variant="danger" />;
  }

  const handleAddToCart = (product: Product) => {
    if (stock === 0) {
      return;
    }
    setStock(product.stock - 1);
    setShowModal(true);
    setProductName(product.title);
    dispatch(addToCart(product));
    console.log(product.stock);
    console.log(stock);
  };

  return (
    <div className="card-container-detail">
      {product ? (
        <Card
          className="card-detail"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <Carousel slide={false} interval={3000} className="images">
            <Carousel.Item>
              <Card.Img
                className="card-img-carousel"
                variant="left"
                src={product.images[0]}
                style={{ objectFit: "cover", width: "350px", height: "450px" }}
              />
            </Carousel.Item>
            <Carousel.Item>
              <Card.Img
                className="card-img-carousel"
                variant="left"
                src={product.images[1]}
                style={{ objectFit: "cover", width: "350px", height: "450px" }}
              />
            </Carousel.Item>
            <Carousel.Item>
              <Card.Img
                className="card-img-carousel"
                variant="left"
                src={product.images[2]}
                style={{ objectFit: "cover", width: "350px", height: "450px" }}
              />
            </Carousel.Item>
          </Carousel>
          <Card.Body className="detail-texts">
            <Card.Title>
              <h1>{product.title}</h1>
            </Card.Title>
            <Card.Text>
              <p>
                ${product.price} <br />
              </p>
              <p>
                Stock: {stock} <br />
              </p>
              <div className="ratings">
                <p>Rating: {product.rating}</p>
                <p className="star">
                  {renderRating(product.rating)}
                  <br />{" "}
                </p>
              </div>
              <p>
                Tags
                <br />
              </p>
              <Badge bg="secondary">{product.category}</Badge>
              <h4>
                <br />
                Product Description
                <br />
              </h4>
              <p>
                {product.description} <br />
              </p>
            </Card.Text>
            <div
              className="card-add-button-container"
              style={{ marginLeft: "30px" }}
            >
              <Button
                className="button-add"
                style={{ fontSize: "20px", padding: "10px 20px" }}
                variant="primary"
                onClick={() => handleAddToCart(product)}
              >
                Add to cart
              </Button>
            </div>
          </Card.Body>
        </Card>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h1>There is no product with that ID</h1>
        </div>
      )}
      <Modals
        show={showModal}
        onCloseButtonClick={() => setShowModal(false)}
        title="Success!"
        message={`${productName} has been added to cart.`}
      />
    </div>
  );
};

export default ProductDetail;
