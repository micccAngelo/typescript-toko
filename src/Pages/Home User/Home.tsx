import './Home.css';
import { useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';
import Category from '../../Components/Category/Category';
import GetAllProduct from '../../API Services/GetAllProduct';
import GetProductbyCategory from '../../API Services/GetProductbyCategory';
import Search from '../../API Services/Search';
import Loadings from '../../Reusable/Loadings';
import Modals from '../../Reusable/Modals';
import { addToCart } from '../../Store/CartSlice';
import Product from '../../Model/Product';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';

const Home: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [productName, setProductName] = useState<string>();
  const [notFound, setNotFound] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [search] = useSearchParams();
  const dispatch = useDispatch();

  console.log(selectedCategory);

  useEffect(() => {
    if (search.toString()) {
      fetchProductbySearch(search.toString().trim());
    } else {
      fetchProducts();
    }
  }, [search]);

  useEffect(() => {
    setLoading(true);
    if (selectedCategory !== '') {
      fetchProductbyCategory(selectedCategory);
      setLoading(false);
    }
  }, [selectedCategory]);

  const fetchProducts = async (): Promise<Product[]> => {
    setLoading(true);
    try {
      const data: Product[] = await GetAllProduct();
      setProducts(data);
      setLoading(false);
      return data;
    } catch (error) {
      console.log(error);
      setLoading(false);
      return [];
    }
  };

  const fetchProductbySearch = async (query: string): Promise<void> => {
    setLoading(true);
    try {
      const data: Product[] = await Search(query);
      if (data.length === 0) {
        setNotFound(true);
      } else {
        setNotFound(false);
      }
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchProductbyCategory = async (selectedCategory: string): Promise<void> => {
    setLoading(true);
    try {
      const data: Product[] = await GetProductbyCategory(selectedCategory);
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleCategorySelect = (selectedCategory: string): void => {
    console.log(selectedCategory);
    setSelectedCategory(selectedCategory);
  };

  const handleAddToCart = (product: Product): void => {
    dispatch(addToCart(product));
    setShowModal(true);
    setProductName(product.title);
  };

  if (loading) {
    return <Loadings variant="danger" />;
  }

  if (isLoggedIn){
    return <Navigate to="/Admin/Home" replace />;
  }

  if (notFound) {
    return <h1 className="error-message">Product Does Not Exist</h1>;
  }

  return (
    <div className="user-product-grid">        
      <Category handleCategorySelect={handleCategorySelect} />
      <div className='title-name-container'>
        <div className='title-user'>
          <h3 className='category-title-name' style={{ width: '500px', height: '50px'}}>Selected Category: {selectedCategory === '' ? 'All' : selectedCategory}</h3>
        </div>
        <div className='user-card'>
        {products && products.length > 0 && products.map(product => (
          <Card style={{ width: '18rem', height: '450px' }} key={product.id} className="product-card-user">
              <Link to={`/User/Product/${product.id}`} style={{textDecoration: 'none', color: 'black'}}>
              <Card.Img variant="top" style={{ width: '100%', height: '200px', objectFit: 'cover' }} src={product.images[0]} />
              <Card.Body>
                  <Card.Text className='text-left title'>{product.title}</Card.Text>
                  <Card.Text className='text-left price'>${product.price}</Card.Text>
                  <Card.Text className='text-left brand'>{product.brand}</Card.Text>
              </Card.Body>
              </Link>
              <div className='card-button-container'>
                  <Button variant="outline-secondary" onClick={() => handleAddToCart(product)}>Add to cart</Button>
              </div>
          </Card>
          ))}
        </div> 
      </div>
        <Modals 
            show={showModal}
            onCloseButtonClick = {() => setShowModal(false)}
            title="Success!"
            message={`${productName} has been added to cart.`}
        />
      </div>
    );
};

export default Home;