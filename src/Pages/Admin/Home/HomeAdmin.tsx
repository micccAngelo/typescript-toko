import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Loadings from "../../../Reusable/Loadings";
import "./HomeAdmin.css";
import GetAllProduct from "../../../API Services/GetAllProduct";
import { useNavigate } from "react-router-dom";
import DeleteProduct from "../../../API Services/DeleteProduct";
import { useState, useEffect } from "react";
import Modals from "../../../Reusable/Modals";
import AuthContext from "../../../Context/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Product from "../../../Model/Product";

const HomeAdmin = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deletedProductName, setDeletedProductName] = useState<
    string | undefined
  >();
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data: Product[] = await GetAllProduct();
      setProducts(data);
      setLoading(false);
      return data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    navigate("/Admin/AddProduct");
  };

  const handleDeleteProduct = async (id: any, title: string) => {
    try {
      await DeleteProduct(id);
      setDeleteModal(true);
      setDeletedProductName(title);
      await fetchProducts();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  if (loading) {
    return <Loadings variant="danger" />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/Login" replace />;
  }

  return (
    <div className="product-grid">
      <div className="product-container">
        <Button
          variant="primary"
          className="add-product-button"
          onClick={handleAddProduct}
          disabled={loading}
        >
          + Add New Product
        </Button>
        <div className="product-card-container">
          {products &&
            products.length > 0 &&
            products.map((product: Product) => (
              <Card
                style={{ width: "18rem", height: "450px" }}
                key={product.id}
                className="product-card"
              >
                <Card.Img variant="top" src={product.images[0]} />
                <Card.Body>
                  <Card.Text className="text-left title">
                    {product.title}
                  </Card.Text>
                  <Card.Text className="text-left price">
                    ${product.price}
                  </Card.Text>
                  <Card.Text className="text-left brand">
                    {product.brand}
                  </Card.Text>
                  <div className="card-button-container delete">
                    <Button
                      variant="outline-danger delete"
                      onClick={() =>
                        handleDeleteProduct(product.id, product.title)
                      }
                      disabled={loading}
                    >
                      Delete Item
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))}
        </div>
      </div>
      <Modals
        show={deleteModal}
        onCloseButtonClick={() => setDeleteModal(false)}
        title="Success!"
        message={`${deletedProductName} has been deleted.`}
      />
    </div>
  );
};

export default HomeAdmin;
